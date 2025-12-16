import React, { useState } from 'react';

export default function Onboarding({ onComplete }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleGetStarted = () => {
        setLoading(true);
        setError(null);

        // Request Notification Permission (Non-blocking)
        if ("Notification" in window) {
            Notification.requestPermission().catch(e => console.log("Notification permission ignored"));
        }

        // Check if geolocation is supported
        if (!navigator.geolocation) {
            setError('Geolocation is not supported by your browser');
            setLoading(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                // success
                onComplete(position.coords);
                setLoading(false);
            },
            (err) => {
                // error
                console.error("Geolocation error:", err);
                setError('Unable to retrieve your location. Please allow access.');
                setLoading(false);
            },
            {
                enableHighAccuracy: false, // Changed to false for better stability on desktops/localhost
                timeout: 15000,           // Increased timeout
                maximumAge: 0
            }
        );
    };

    return (
        <div className="h-screen w-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 text-white p-6 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-500/20 rounded-full blur-[100px] animate-blob" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-purple-500/20 rounded-full blur-[100px] animate-blob animation-delay-2000" />

            <div className="max-w-md w-full backdrop-blur-xl bg-white/10 p-8 rounded-3xl border border-white/20 shadow-2xl flex flex-col items-center text-center relative z-10 transition-all duration-300 hover:shadow-blue-500/10">
                <div className="w-24 h-24 mb-6 relative group">
                    <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-20 group-hover:opacity-30 transition-opacity"></div>
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 to-cyan-400 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/30 transform group-hover:scale-105 transition-transform duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </div>
                </div>

                <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">Awarely</h1>
                <p className="text-slate-300 mb-8 leading-relaxed">
                    Stay safe with real-time zone alerts. We need your location to show you what's happening nearby.
                </p>

                {error && (
                    <div className="bg-red-500/20 border border-red-500/50 text-red-100 px-4 py-3 rounded-lg mb-6 text-sm w-full flex items-center gap-2 animate-shake">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                        {error}
                    </div>
                )}

                <button
                    onClick={handleGetStarted}
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-4 rounded-xl shadow-lg shadow-blue-500/30 transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {loading ? (
                        <>
                            <span className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                            Finding you...
                        </>
                    ) : (
                        <>
                            Enable Location
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </>
                    )}
                </button>

                <p className="mt-6 text-xs text-slate-500">
                    Awarely uses your location only to check area safety. No continuous tracking.
                </p>
            </div>
        </div>
    );
}
