import os
import json
from datetime import time
import msal
import requests
import pymongo

# Helper to read .env file if running locally
def load_env():
    env_file = os.path.join(os.path.dirname(__file__), ".env")
    if os.path.exists(env_file):
        with open(env_file, "r") as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith("#") and "=" in line:
                    k, v = line.split("=", 1)
                    os.environ.setdefault(k.strip(), v.strip().strip('"').strip("'"))

load_env()

# --- 1. App Registration Settings ---
CLIENT_ID = os.getenv("GRAPH_CLIENT_ID", "")
TENANT_ID = os.getenv("GRAPH_TENANT_ID", "")
CLIENT_SECRET = os.getenv("GRAPH_CLIENT_SECRET", "")

AUTHORITY = f"https://login.microsoftonline.com/{TENANT_ID}"
# For app-only authentication, the scope is always .default
SCOPES = ["https://graph.microsoft.com/.default"]

# --- 2. Email Details ---
SENDER_EMAIL = os.getenv("SENDER_EMAIL", "info@theiconicdental.com")
RECEIVER_EMAIL = os.getenv("RECEIVER_EMAIL", "info@theiconicdental.com")

# MongoDB connection from environment
MONGO_URL = os.getenv("MONGO_URI") or os.getenv("MONGO_URL", "")

client = None
db = None
collection = None


def get_mongodb_connection():
    """Create a new MongoDB connection with detailed error handling"""
    try:
        print("Attempting to connect to MongoDB...")
        client = pymongo.MongoClient(
            MONGO_URL,
            serverSelectionTimeoutMS=5000
        )
        
        # Test the connection
        print("Testing MongoDB connection...")
        client.server_info()
        print("Successfully connected to MongoDB")
        
        # Get database and collection
        db_name = os.getenv("DB_NAME", "iconic")
        db = client[db_name]
        contact_collection = db["contact"]
        print(f"Successfully accessed database '{db_name}' and collection 'contact'")
        
        return client, contact_collection
        
    except Exception as e:
        print(f"Error connecting to MongoDB: {e}")
        if 'client' in locals():
            client.close()
        raise


def get_access_token():
    """Authenticate silently via the client secret and return an access token."""
    app = msal.ConfidentialClientApplication(
        CLIENT_ID, authority=AUTHORITY, client_credential=CLIENT_SECRET
    )
    result = app.acquire_token_for_client(scopes=SCOPES)

    if "access_token" in result:
        return result["access_token"]

    raise Exception(f"Failed to get token: {result.get('error_description')}")


def send_email(subject, html_content, to_email):
    """Send an HTML email through the Microsoft Graph API."""
    access_token = get_access_token()
    endpoint = f"https://graph.microsoft.com/v1.0/users/{SENDER_EMAIL}/sendMail"
    headers = {
        "Authorization": f"Bearer {access_token}",
        "Content-Type": "application/json",
    }

    email_data = {
        "message": {
            "subject": subject,
            "body": {
                "contentType": "HTML",
                "content": html_content,
            },
            "toRecipients": [{"emailAddress": {"address": to_email}}],
        },
        "saveToSentItems": "true",
    }

    print(f"Sending email to {to_email} ...")
    response = requests.post(endpoint, headers=headers, data=json.dumps(email_data))

    if response.status_code == 202:
        print(f"Success: Email sent to {to_email}")
        return True

    print(f"Error sending email to {to_email}. Status Code: {response.status_code}")
    try:
        print(response.json())
    except Exception:
        print(response.text)
    return False


def send_contact_form_emails(contact):
    """Send both emails for a contact-form submission.

    1. All the submitted details to the site owner (info@theiconicdental.com).
    2. A thank-you confirmation to the client who filled the form.

    `contact` may be a dict or any object with the form attributes
    (firstName, email, phone, and optionally role/position/productCategory).
    """
    # Normalise access so we accept both dicts and pydantic models / objects.
    def field(name, default=""):
        if isinstance(contact, dict):
            value = contact.get(name, default)
        else:
            value = getattr(contact, name, default)
        return value if value not in (None, "") else default

    first_name = field("firstName", "there")
    email = field("email")
    phone = field("phone", "N/A")
    # The form may send any of these depending on the page.
    role = field("role") or field("position", "N/A")
    product_category = field("productCategory", "N/A")

    results = {"admin": False, "client": False}

    # --- Email to the site owner (all form details) ---
    admin_html = f"""
    <html>
        <body>
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> {first_name}</p>
            <p><strong>Email:</strong> {email}</p>
            <p><strong>Phone:</strong> {phone}</p>
            <p><strong>Are You A:</strong> {role}</p>
            <p><strong>Product Category:</strong> {product_category}</p>
        </body>
    </html>
    """
    results["admin"] = send_email(
        subject=f"New Contact Form Submission from {first_name}",
        html_content=admin_html,
        to_email=RECEIVER_EMAIL,
    )

    # --- Thank-you email to the client (only if they gave an email) ---
    if email:
        client_html = f"""
        <html>
            <body>
                <p>Dear {first_name},</p>

                <p>Thank you for reaching out to Iconic Dental Design. We have
                received your inquiry and our team will get back to you shortly.</p>

                <p>Here's a summary of your submission:</p>
                <ul>
                    <li>Name: {first_name}</li>
                    <li>Email: {email}</li>
                    <li>Phone: {phone}</li>
                    <li>Are You A: {role}</li>
                </ul>

                <p>If you have any urgent questions, please don't hesitate to
                contact us directly at {SENDER_EMAIL}.</p>

                <p>Best regards,<br>
                The Iconic Dental Design Team</p>

                <p style="font-size: 12px; color: #666666;">
                    This is an automated message. Please do not reply to this email.
                </p>
            </body>
        </html>
        """
        results["client"] = send_email(
            subject="Thank You for Contacting Iconic Dental Design",
            html_content=client_html,
            to_email=email,
        )

    return results


if __name__ == "__main__":

    client, contact_collection = get_mongodb_connection()

    while True:
        try:
            print("Watching for changes in users collection")
            with contact_collection.watch(full_document="updateLookup") as stream:
                for change in stream:
                    if change.get("operationType") == "insert":
                        doc = change.get("fullDocument", {})
                        _id = str(doc.get("_id"))
                        user_email = doc.get("email")
                        user_name = doc.get("firstName", "there")

                        if not user_email:
                            print(f"New document inserted without email field: {user_name} ({_id})")
                            continue

                        # Check if emails were already sent
                        if doc.get("userEmailSent") and doc.get("adminEmailSent"):
                            print(f"Emails already sent for document {_id}, skipping.")
                            continue

                        print(f"New form submission detected (ID: {_id}), sending emails for: {user_email}")

                        email_results = send_contact_form_emails(doc)
                        user_sent = email_results.get("client", False)
                        admin_sent = email_results.get("admin", False)

                        print(f"Email results for {user_email}: userEmailSent={user_sent}, adminEmailSent={admin_sent}")

                        contact_collection.update_one(
                            {"_id": doc["_id"]},
                            {
                                "$set": {
                                    "userEmailSent": user_sent,
                                    "adminEmailSent": admin_sent,
                                }
                            },
                        )

        except pymongo.errors.PyMongoError as e:
            print(f"MongoDB error in watch stream: {str(e)}")
            time.sleep(5)  # Wait before reconnecting
        except Exception as e:
            print(f"Unexpected error in watch stream: {str(e)}")
            time.sleep(5)  # Wait before reconnecting