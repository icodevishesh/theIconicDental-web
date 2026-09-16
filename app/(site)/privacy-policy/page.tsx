import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Privacy Policy | Iconic Dental Designs',
    description: 'Review Iconic Dental Designs’ privacy policy. Learn how we collect, use, and protect client information in line with data protection standards.',
    keywords: [
        "dental design lab",
        "digital dental design services",
        "design dental lab",
        "3shape design services",
        "digital design dental lab",
        "digital smile design lab",
        "dental laboratory design",
        "oral design dental lab",
        "oral designs dental laboratory",
        "dental office lab design",
        "dent designers dental lab",
        "dental design laboratory",
        "dental lab slip design",
        "design dental laboratory",
        "design lab dental",
        "mcclure dental lab design",
        "perfect design dental lab",
        "dental lab design",
        "digital designs dental lab",
        "advantage dental design lab",
    ],
    openGraph: {
        title: "Privacy Policy | Iconic Dental Designs",
        description:
            "Review the privacy policy of Iconic Dental Designs. Learn how we protect your data and information when using our website and services.",
        url: "https://iconicdentaldesigns.com/privacy-policy",
        siteName: "Iconic Dental Designs",
        images: [
            {
                url: "https://iconicdentaldesigns.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fheaderwhitelogo.5100be96.png&w=640&q=75",
                width: 1200,
                height: 630,
                alt: "Iconic Dental Designs",
            },
        ],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Privacy Policy | Iconic Dental Designs",
        description:
            "Review the privacy policy of Iconic Dental Designs. Learn how we protect your data and information when using our website and services.",
        images: [
            "https://iconicdentaldesigns.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fheaderwhitelogo.5100be96.png&w=640&q=75"
        ],
    },
    alternates: {
        canonical: "https://iconicdentaldesigns.com/privacy-policy",
    },
}

function Privacy() {
    return (
        <>
            <main className="min-h-screen bg-white">
                <div className="mx-auto max-w-7xl px-6 py-16 md:py-24 lg:px-16">
                    {/* Page Title */}
                    <div className="mb-12 text-center font-poppins">
                        <h1 className="text-3xl font-semibold text-[#07796B] md:text-4xl lg:text-5xl font-poppins">Privacy Policy</h1>
                    </div>

                    {/* Privacy Policy Content */}
                    <div className="space-y-8 text-[#636571]">
                        {/* Introduction */}
                        <div className=" text-[#808586] text-center letter-spacing-wide">
                            <span className="font-poppins text-[18px]">
                                Iconic Dental Design Studio is committed to helping you maintain control over your personal information on the Internet. Iconic Dental Design Studio respects an individual’s right to privacy. This policy lays down our practices regarding confidentiality and disclosure of personal information. Please familiarize yourself with our privacy practices, as given below. Should you choose to share your personal information with Iconic Dental Design Studio, it will be assumed that you have no objection to the terms of this privacy policy.
                            </span>
                        </div>

                        {/* Collection of personal information */}
                        <div className=" text-[#808586] font-poppins">
                            <h2 className="mt-7 mb-7 text-xl font-semibold text-[#636571] md:text-2xl">Collection of personal information</h2>
                            <span className="leading-relaxed text-[18px]">
                                In any area of our website where Iconic Dental Design Studio asks you to provide personal information, that will enable us to enhance your site visit or to follow up with you after your visit.
                            </span>
                            <br />
                            <span className='text-[18px]'>
                                It is completely optional for you to participate and provide this information. For example, we request information from you when you:
                            </span>
                            <span className='text-[18px]'>
                                <ul className="ml-7 space-y-1 list-disc font-poppins">
                                    <li>Request information about a product or service</li>
                                    <li>Sign-up for email updates and marketing information</li>
                                    <li>Provide feedback in an online form</li>
                                </ul>
                            </span>
                            <span className="leading-relaxed text-[18px]">
                                In each of the instances above, Iconic Dental Design Studio may ask for your name, e-mail address, phone number, address, and type of business, as well as other similar information that is needed to register or subscribe you to services or offers. If we ever ask for significantly different information, we will inform you. Iconic Dental Design Studio may contact you with promotional offers or newsletters in the future. Contact Iconic Dental Design Studio at any time to unsubscribe and have your contact details removed.
                            </span>
                        </div>

                        {/* Sharing of your personal information */}
                        <div className=" text-[#808586] font-poppins">
                            <h2 className="mt-7 mb-7 text-xl font-semibold text-[#636571] md:text-2xl">Sharing of your personal information</h2>
                            <p className="leading-relaxed text-[18px]">
                                We may occasionally hire other companies to provide services on our behalf. Iconic Dental Design Studio may enhance or merge your information collected at its site with data from third parties for purposes of marketing products or services to you. Those companies will be permitted to obtain only the personal information they need to deliver the service. Iconic Dental Design Studio takes reasonable steps to ensure a confidentiality agreement and privacy obligations in relation to the protection of your personal information bind these organizations.
                            </p>
                        </div>

                        {/* Use of Personal Information */}
                        <div className=" text-[#808586] font-poppins">
                            <h2 className="mt-7 mb-7 text-xl font-semibold text-[#636571] md:text-2xl">Use of Personal Information</h2>
                            <span className="leading-relaxed text-[18px]">
                                We collect non-personally identifiable information, including browser type, version, language, operating system, pages viewed while browsing the site, page access times, and referring website address. This collected information is used internally to gauge visitor traffic and trends. If our information practices change in the future, we will use them for new purposes only. Data collected from the time of the policy change forward will adhere to our updated practices.
                            </span>
                            <br />
                            <span className='text-[18px]'>The personal information you provide will be kept confidential unless otherwise stated and used to support your customer relationship with Iconic Dental Design Studio. Among other things, we want to help you quickly find information on this site and alert you to product upgrades, new documentation, updated web information, and other new products, services, and special offers from Iconic Dental Design Studio.</span>
                        </div>

                        {/* Changes to this Privacy Policy */}
                        <div className=" text-[#808586] font-poppins">
                            <h2 className="mt-7 mb-7 text-xl font-semibold text-[#636571] md:text-2xl">Changes to this Privacy Policy</h2>
                            <p className="leading-relaxed text-[18px]">
                                Iconic Dental Design Studio reserves the right to make amendments to this privacy policy at any time. If you have objections to the privacy policy, you should not access or use the site.
                            </p>
                        </div>

                        {/* Accessing your Personal Information */}
                        <div className=" text-[#808586] font-poppins">
                            <h2 className="mt-7 mb-7 text-xl font-semibold text-[#636571] md:text-2xl">Accessing your Personal Information</h2>
                            <p className="leading-relaxed text-[18px]">
                                You have a right to access your personal information, subject to exceptions allowed by law. If you would like to do so, please let us know. You may be required to put your request in writing for security reasons.
                            </p>
                        </div>

                        {/* Why does this Privacy Policy apply to? */}
                        <div className=" text-[#808586] font-poppins">
                            <h2 className="mt-7 mb-7 text-xl font-semibold text-[#636571] md:text-2xl">Who does this Privacy Policy apply to?</h2>
                            <ul className="ml-6 space-y-2 list-disc text-[18px]">
                                <li>Prospective employees</li>
                                <li>Prospective clients</li>
                                <li>Clients</li>
                                <li>Individuals who are customers of Iconic Dental Design Studio</li>
                                <li>Business partners</li>
                                <li>Suppliers</li>
                                <li>Contractors</li>
                                <li>Shareholders</li>
                                <li>Other people who may come into contact with Iconic Dental Design Studio through its network</li>
                                <li>Iconic Dental Design Studio shall not be responsible for any violation or misuse of your personal information by unauthorized persons consequent to misuse of the internet environment.</li>
                            </ul>
                        </div>

                        {/* Contacting us */}
                        <div className=" text-[#808586] font-poppins">
                            <h2 className="mt-7 mb-7 text-xl font-semibold text-[#636571] md:text-2xl">Contacting us</h2>
                            <div className="mt-4 space-y-2 text-[18px]">
                                <ul className="ml-6 space-y-2 list-disc">
                                    <li>Iconic Dental Design Studio welcomes your comments regarding this privacy policy. If you have questions about this privacy policy and want more information, please contact us by any of the following means during business hours, Monday through Friday.</li>
                                    <li>Call: +91 124 6267878</li>
                                    <li>Post: Attn: Privacy Policy</li>
                                    <li>Iconic Dental Design Studio</li>
                                    <li>17131 63 Ave NW Edmonton, AB T5T 2K1</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default Privacy;