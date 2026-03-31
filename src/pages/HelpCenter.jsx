import { useState } from "react";
import "./HelpCenter.css";

function HelpCenter() {
    const [showModal, setShowModal] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowModal(true);
    };

    return (
        <div className="help-container">
            <h1>Help Center</h1>

            <form className="help-form" onSubmit={handleSubmit}>
                <input type="text" placeholder="Full Name" required />
                <input type="email" placeholder="Email" required />
                <input type="text" placeholder="Subject" required />
                <textarea placeholder="Message" rows="5" required></textarea>

                <button type="submit" className="send-btn">Send</button>
            </form>

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-box">
                        <h2>Message Sent!</h2>
                        <p>Your message has been delivered successfully.</p>
                        <button onClick={() => setShowModal(false)} className="close-btn">
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default HelpCenter;
