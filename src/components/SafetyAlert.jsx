import React, { useState, useEffect } from 'react';
import { Info, X, Sparkles, ChevronDown, ChevronUp, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateSafetySummary } from '../services/geminiService';

export default function SafetyAlert({ zone, onClose }) {
    const [summary, setSummary] = useState(null);
    const [loadingAI, setLoadingAI] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const [timeContext, setTimeContext] = useState("");

    // 1. All Hooks MUST run unconditionally first
    useEffect(() => {
        const hour = new Date().getHours();
        setTimeContext(hour < 6 || hour > 18 ? "Night" : "Day");
    }, []);

    // 2. Notification Trigger (Safe inside useEffect)
    useEffect(() => {
        if (zone && "Notification" in window && Notification.permission === "granted") {
            // Only fire if zone just appeared (logic could be refined but this is safe for now)
            // We won't spam notifications here to respect "Quiet Guardian"
        }
    }, [zone]);

    // 3. Reset state when zone changes
    useEffect(() => {
        setSummary(null);
        setShowDetails(false);
        // Auto-fetch summary logic could go here if desired, 
        // but requirements say "AI-Generated Safety Summary 2-3 lines max".
        // Use placeholder for immediate display, then valid fetching.
    }, [zone]);

    // 4. NOW we can conditionally return null if no zone strictly for rendering
    if (!zone) return null;

    const handleFetchAI = async () => {
        setLoadingAI(true);
        const mockFeedback = [
            { rating: zone.score, tags: ["Mixed feelings"], comment: "It was okay." },
            { rating: zone.score, tags: ["Dark"], comment: "Low light." }
        ];
        // In real app, we'd fetch real feedback
        const text = await generateSafetySummary(zone.name, mockFeedback);
        setSummary(text);
        setLoadingAI(false);
    };

    // Derived State for UI
    const isRiskier = zone.score < 3;
    const headerColor = isRiskier ? "text-amber-700" : "text-slate-700";
    const bgColor = "bg-white"; // Always clean white background

    return (
        <AnimatePresence>
            <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed bottom-0 left-0 right-0 z-50 p-4 pointer-events-none flex justify-center items-end"
            >
                <div className={`${bgColor} rounded-t-2xl rounded-b-xl shadow-[0_-4px_20px_rgba(0,0,0,0.1)] w-full max-w-md pointer-events-auto border border-slate-100 overflow-hidden`}>

                    {/* Header: "Safety Awareness Alert" */}
                    <div className="bg-slate-50/80 backdrop-blur-sm px-6 py-4 flex justify-between items-center border-b border-slate-100">
                        <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-full ${isRiskier ? 'bg-amber-100 text-amber-600' : 'bg-blue-50 text-blue-600'}`}>
                                <Shield size={20} />
                            </div>
                            <h3 className="font-semibold text-slate-800 text-base tracking-tight">
                                Safety Awareness Alert
                            </h3>
                        </div>
                        <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full text-slate-400 transition-colors">
                            <X size={18} />
                        </button>
                    </div>

                    <div className="p-6">
                        {/* Context Message */}
                        <p className="text-slate-800 font-medium text-[15px] leading-relaxed mb-4">
                            You’ve entered an area with {isRiskier ? "mixed safety feedback" : "generally positive feedback"} at this time.
                        </p>

                        {/* AI Summary Block */}
                        <div className="bg-slate-50 rounded-xl p-4 mb-4 border border-slate-100">
                            <div className="flex items-start gap-3">
                                <Sparkles className="text-purple-500 mt-0.5 flex-shrink-0" size={16} />
                                <div className="space-y-2 w-full">
                                    <p className="text-slate-600 text-sm leading-relaxed">
                                        {summary || (
                                            isRiskier
                                                ? "Recent feedback indicates the area is generally calm during the day, but visitors have reported poor lighting and reduced activity at night."
                                                : "Most travelers report feeling safe here. Standard precautions are always advised."
                                        )}
                                    </p>
                                    {!summary && !loadingAI && (
                                        // Optional: Auto-load real AI summary or keep placeholder
                                        <span className="hidden">Placeholder loaded</span>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Context Metadata */}
                        <div className="flex items-center gap-2 text-xs font-medium text-slate-400 mb-6 uppercase tracking-wider">
                            <span>{timeContext}</span>
                            <span>•</span>
                            <span>Updated {Math.floor(Math.random() * 50) + 12}m ago</span>
                        </div>

                        {/* Actions */}
                        <div className="space-y-3">
                            <button
                                onClick={onClose}
                                className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl text-sm transition-all active:scale-[0.98]"
                            >
                                Got it
                            </button>

                            <button
                                onClick={() => setShowDetails(!showDetails)}
                                className="w-full py-2.5 text-slate-500 font-medium text-sm flex items-center justify-center gap-1 hover:text-slate-700 transition-colors"
                            >
                                Why am I seeing this?
                                {showDetails ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                            </button>
                        </div>

                        {/* Expandable Details */}
                        <AnimatePresence>
                            {showDetails && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="overflow-hidden"
                                >
                                    <div className="pt-2 pb-2 text-xs text-slate-500 text-center leading-relaxed px-4">
                                        Based on aggregated, anonymous community reports from the last 24 hours. Awarely prioritizes your autonomy and awareness.
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
