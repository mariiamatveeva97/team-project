import { useState } from "react";

function HelpCenter() {
    const [open, setOpen] = useState(null);

    const faqs = [
        {
        q: "How do I book an appointment?",
        a: "Go to the booking page, choose a service, select a time slot, and confirm your appointment."
        },
        {
        q: "Can I cancel or reschedule?",
        a: "Currently, you need to contact support to cancel or reschedule your appointment."
        },
        {
        q: "Is SmartBooking free to use?",
        a: "Yes, booking through our platform is completely free."
        }
    ];

    return (
        <div className="min-h-screen bg-white px-6 py-12 text-gray-900 max-w-3xl mx-auto">

            <h1 className="text-3xl font-bold mb-8 text-center">Help Center</h1>

            <p className="text-gray-600 text-center mb-12">
                Find answers to common questions about booking and using our platform.
            </p>

            <div className="space-y-4">
                    {faqs.map((item, index) => (
                    <div key={index} className="border rounded-lg p-4">
                        <button
                        className="w-full flex justify-between items-center text-left"
                        onClick={() => setOpen(open === index ? null : index)}
                        >
                        <span className="font-medium">{item.q}</span>
                        <span>{open === index ? "−" : "+"}</span>
                        </button>

                        {open === index && (
                        <p className="mt-3 text-gray-600 text-sm">{item.a}</p>
                        )}
                    </div>
                    ))}
            </div>

            <div className="mt-12 text-center">
                <a
                href="/"
                className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition"
                >
                Back to Home
                </a>
            </div>

        </div>
    );
}

export default HelpCenter;
