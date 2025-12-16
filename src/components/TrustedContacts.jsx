import React, { useState } from 'react';

const MOCK_CONTACTS = [
    { id: 1, name: "Mom", email: "mom@example.com" },
    { id: 2, name: "Partner", email: "partner@example.com" }
];

export default function TrustedContacts({ onClose }) {
    const [contacts, setContacts] = useState(MOCK_CONTACTS);
    const [notifying, setNotifying] = useState(false);

    const handleNotify = () => {
        setNotifying(true);
        setTimeout(() => {
            setNotifying(false);
            alert("Contacts notified via email!");
        }, 1500);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="bg-white w-full max-w-sm rounded-2xl shadow-xl p-6 animate-fade-in relative">
                <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>

                <h2 className="text-xl font-bold text-slate-900 mb-2">Trusted Safety Circle</h2>
                <p className="text-sm text-slate-500 mb-6">These contacts will be notified if you enter a high-risk zone or trigger an alert.</p>

                <div className="space-y-3 mb-6">
                    {contacts.map(contact => (
                        <div key={contact.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                                    {contact.name[0]}
                                </div>
                                <div>
                                    <p className="font-medium text-slate-900">{contact.name}</p>
                                    <p className="text-xs text-slate-500">{contact.email}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                    <button className="w-full py-3 border-2 border-dashed border-slate-200 rounded-xl text-slate-400 text-sm font-medium hover:border-blue-400 hover:text-blue-500 transition-colors">
                        + Add Contact
                    </button>
                </div>

                <button
                    onClick={handleNotify}
                    disabled={notifying}
                    className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded-xl shadow-lg shadow-red-500/30 transition-all active:scale-95 disabled:opacity-70"
                >
                    {notifying ? 'Sending Alerts...' : 'Notify Contacts Now'}
                </button>
            </div>
        </div>
    );
}
