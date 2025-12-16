import React, { useState, useEffect } from 'react';

const OBSERVATIONS = [
    "Poor lighting",
    "Crowded",
    "Isolated",
    "Road blocked",
    "Accident / disturbance",
    "Police presence",
    "Felt uncomfortable"
];

const COMFORT_LEVELS = ["Yes", "Maybe", "No"];

export default function FeedbackForm({ zoneName, onClose, onSubmit }) {
    const [rating, setRating] = useState(0);
    const [selectedObservations, setSelectedObservations] = useState([]);
    const [otherObservation, setOtherObservation] = useState("");
    const [comfortLevel, setComfortLevel] = useState("");
    const [note, setNote] = useState("");
    const [photo, setPhoto] = useState(null);
    const [visitTime, setVisitTime] = useState(""); // Internal use

    useEffect(() => {
        // Auto-detect time of visit
        const hour = new Date().getHours();
        let timeOfDay = "Day";
        if (hour >= 18 && hour < 21) timeOfDay = "Evening";
        if (hour >= 21 || hour < 6) timeOfDay = "Night";
        setVisitTime(timeOfDay);
    }, []);

    const toggleObservation = (obs) => {
        if (selectedObservations.includes(obs)) {
            setSelectedObservations(prev => prev.filter(item => item !== obs));
        } else {
            if (selectedObservations.length < 3) {
                setSelectedObservations(prev => [...prev, obs]);
            }
        }
    };

    const handlePhotoChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setPhoto(URL.createObjectURL(e.target.files[0]));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (rating === 0) return; // Required

        const feedbackData = {
            zoneName,
            rating,
            observations: [...selectedObservations, otherObservation].filter(Boolean),
            comfortLevel,
            note,
            visitTime,
            timestamp: new Date().toISOString()
        };

        console.log("Submitting Feedback:", feedbackData);
        onSubmit(feedbackData);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center pointer-events-none">
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto"
                onClick={onClose}
            />

            <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-t-3xl sm:rounded-2xl shadow-xl pointer-events-auto max-h-[90vh] overflow-y-auto animate-slide-up sm:animate-fade-in relative">
                <div className="p-6">
                    {/* Header */}
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Feedback</h2>
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                For <span className="font-semibold text-blue-500">{zoneName}</span> • {visitTime}
                            </p>
                        </div>
                        <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Safety Rating */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                How safe did this area feel? <span className="text-red-500">*</span>
                            </label>
                            <div className="flex gap-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        onClick={() => setRating(star)}
                                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${rating >= star
                                            ? 'bg-yellow-100 text-yellow-500 scale-110 shadow-sm'
                                            : 'bg-slate-100 text-slate-300 dark:bg-slate-800 dark:text-slate-600 hover:bg-slate-200'
                                            }`}
                                    >
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Observations */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                What did you notice? <span className="text-xs text-slate-500">(Max 3)</span>
                            </label>
                            <div className="flex flex-wrap gap-2">
                                {OBSERVATIONS.map((obs) => (
                                    <button
                                        key={obs}
                                        type="button"
                                        onClick={() => toggleObservation(obs)}
                                        className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${selectedObservations.includes(obs)
                                            ? 'bg-blue-500 border-blue-500 text-white'
                                            : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-blue-400'
                                            }`}
                                    >
                                        {obs}
                                    </button>
                                ))}
                            </div>
                            <input
                                type="text"
                                placeholder="Other (max 50 chars)"
                                maxLength={50}
                                value={otherObservation}
                                onChange={(e) => setOtherObservation(e.target.value)}
                                className="mt-2 w-full px-3 py-2 border rounded-lg text-sm bg-slate-50 dark:bg-slate-800 dark:border-slate-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>

                        {/* Comfort Level */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                Would you feel comfortable passing through here alone again?
                            </label>
                            <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
                                {COMFORT_LEVELS.map((level) => (
                                    <button
                                        key={level}
                                        type="button"
                                        onClick={() => setComfortLevel(level)}
                                        className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${comfortLevel === level
                                            ? 'bg-white dark:bg-slate-700 shadow-sm text-slate-900 dark:text-white'
                                            : 'text-slate-500 dark:text-slate-400 hover:text-slate-700'
                                            }`}
                                    >
                                        {level}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Note */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                Note <span className="text-xs text-slate-500">(Optional)</span>
                            </label>
                            <textarea
                                rows="2"
                                maxLength={100}
                                placeholder="Any specific details? (Max 100 chars)"
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                                className="w-full px-3 py-2 border rounded-lg text-sm bg-slate-50 dark:bg-slate-800 dark:border-slate-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                            ></textarea>
                        </div>

                        {/* Photo Upload */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                Photo <span className="text-xs text-slate-500">(Place-only, no faces)</span>
                            </label>
                            <div className="flex items-center gap-4">
                                <label className="cursor-pointer bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                    Report Image
                                    <input type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
                                </label>
                                {photo && (
                                    <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-slate-200">
                                        <img src={photo} alt="Preview" className="w-full h-full object-cover" />
                                        <button
                                            type="button"
                                            onClick={() => setPhoto(null)}
                                            className="absolute top-0 right-0 bg-red-500 text-white p-0.5 rounded-bl"
                                        >
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={rating === 0}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl shadow-lg shadow-blue-500/30 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Submit Feedback
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
