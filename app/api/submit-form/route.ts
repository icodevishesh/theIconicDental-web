import { NextResponse } from 'next/server';
import { connectToDatabase } from "@/lib/database_utility";

const accessToken = process.env.ACCESS_TOKEN;
if (!accessToken) {
  throw new Error('ACCESS_TOKEN environment variable is required');
}

// --- Microsoft Graph (email) settings ---
const GRAPH_CLIENT_ID = process.env.GRAPH_CLIENT_ID || "";
const GRAPH_TENANT_ID = process.env.GRAPH_TENANT_ID || "";
const GRAPH_CLIENT_SECRET = process.env.GRAPH_CLIENT_SECRET || "";
const SENDER_EMAIL = process.env.SENDER_EMAIL || "info@theiconicdental.com";
const RECEIVER_EMAIL = process.env.RECEIVER_EMAIL || "info@theiconicdental.com";

interface Contact {
  firstName: string;
  email: string;
  phone: string;
  countryCode?: string;
  role?: string;
  position?: string;
  productCategory?: string;
  acceptTerms?: boolean;
  createdAt: Date;
}

// Acquire an app-only access token via the client-credentials flow.
async function getGraphToken(): Promise<string> {
  const tokenUrl = `https://login.microsoftonline.com/${GRAPH_TENANT_ID}/oauth2/v2.0/token`;
  const body = new URLSearchParams({
    client_id: GRAPH_CLIENT_ID,
    client_secret: GRAPH_CLIENT_SECRET,
    scope: "https://graph.microsoft.com/.default",
    grant_type: "client_credentials",
  });

  const res = await fetch(tokenUrl, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });

  const data = await res.json();
  if (!res.ok || !data.access_token) {
    throw new Error(`Failed to get Graph token: ${data.error_description || res.statusText}`);
  }
  return data.access_token as string;
}

// Send a single HTML email through the Microsoft Graph API.
async function sendEmail(token: string, subject: string, html: string, toEmail: string): Promise<boolean> {
  const endpoint = `https://graph.microsoft.com/v1.0/users/${SENDER_EMAIL}/sendMail`;
  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: {
        subject,
        body: { contentType: "HTML", content: html },
        toRecipients: [{ emailAddress: { address: toEmail } }],
      },
      saveToSentItems: "true",
    }),
  });

  if (res.status === 202) {
    console.log(`Email sent to ${toEmail}`);
    return true;
  }
  console.error(`Failed to send email to ${toEmail}. Status: ${res.status}`, await res.text());
  return false;
}

// Send both the admin notification and the client thank-you email.
async function sendContactEmails(contact: Contact): Promise<void> {
  const token = await getGraphToken();
  const role = contact.role || contact.position || "N/A";

  const adminHtml = `
    <html><body>
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${contact.firstName}</p>
      <p><strong>Email:</strong> ${contact.email}</p>
      <p><strong>Phone:</strong> ${contact.countryCode || ""} ${contact.phone}</p>
      <p><strong>Are You A:</strong> ${role}</p>
    </body></html>`;

  const clientHtml = `
    <html><body>
      <p>Dear ${contact.firstName},</p>
      <p>Thank you for reaching out to Iconic Dental Design. We have received your
      inquiry and our team will get back to you shortly.</p>
      <p>Here's a summary of your submission:</p>
      <ul>
        <li>Name: ${contact.firstName}</li>
        <li>Email: ${contact.email}</li>
        <li>Phone: ${contact.countryCode || ""} ${contact.phone}</li>
        <li>Are You A: ${role}</li>
      </ul>
      <p>If you have any urgent questions, please don't hesitate to contact us
      directly at ${SENDER_EMAIL}.</p>
      <p>Best regards,<br>The Iconic Dental Design Team</p>
      <p style="font-size:12px;color:#666666;">This is an automated message. Please do not reply to this email.</p>
    </body></html>`;

  // All submission details to the site owner.
  await sendEmail(token, `New Contact Form Submission from ${contact.firstName}`, adminHtml, RECEIVER_EMAIL);
  // Thank-you confirmation to the client.
  await sendEmail(token, "Thank You for Contacting Iconic Dental Design", clientHtml, contact.email);
}

export async function POST(request: Request) {
  try {
    const token = request.headers.get('access-token');
    if (!token || token !== accessToken) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
    const db = await connectToDatabase();
    // Parse the request body
    const formData = await request.json();

    // Basic validation
    if (!formData.firstName || !formData.email || !formData.phone) {
      return NextResponse.json(
        { error: 'First Name, email, and phone are required' },
        { status: 400 }
      );
    }
    const contact: Contact = {
      firstName: formData.firstName,
      email: formData.email,
      phone: formData.phone,
      countryCode: formData.countryCode,
      role: formData.role,
      position: formData.position,
      productCategory: formData.productCategory,
      acceptTerms: formData.acceptTerms,
      createdAt: new Date()
    };

    // The contact collection is already set up in database_utility.js
    const result = await db.contact.insertOne(contact);

    if (!result.acknowledged) {
      throw new Error('Failed to save contact to database');
    }

    console.log('Form submission saved to database with ID:', result.insertedId);

    // Send emails (thank-you to the client + all details to the site owner).
    // An email failure must never break the form submission itself.
    try {
      await sendContactEmails(contact);
    } catch (emailError) {
      console.error('Error sending contact emails:', emailError);
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Form submitted successfully',
        data: formData
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error processing form submission:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}