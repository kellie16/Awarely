import React from 'react';
import { User, LogOut, Shield, Award, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function UserDashboard({ user, onClose, onLogout }) {
    if (!user) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header Background */}
                    <div className="h-32 bg-gradient-to-br from-blue-500 to-indigo-600 relative">
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/30 text-white rounded-full transition-colors"
                        >
                            <X size={18} />
                        </button>
                    </div>

                    {/* Profile Info */}
                    <div className="px-6 pb-6 relative">
                        {/* Avatar */}
                        <div className="absolute -top-12 left-6">
                            <div className="w-24 h-24 rounded-full border-4 border-white bg-slate-100 flex items-center justify-center shadow-lg overflow-hidden">
                                {user.photoURL ? (
                                    <img src={user.photoURL} alt="Profile" className="w-full h-full object-cover" />
                                ) : (
                                    <User size={40} className="text-slate-400" />
                                )}
                            </div>
                        </div>

                        <div className="pt-14 mb-6">
                            <h2 className="text-xl font-bold text-slate-800">{user.displayName || "Explorer"}</h2>
                            <p className="text-sm text-slate-500">{user.email}</p>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 gap-3 mb-6">
                            <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl">
                                <div className="flex items-center gap-2 text-green-600 mb-1">
                                    <Shield size={16} />
                                    <span className="text-xs font-bold uppercase">Safety Score</span>
                                </div>
                                <p className="text-2xl font-bold text-slate-800">98%</p>
                            </div>
                            <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl">
                                <div className="flex items-center gap-2 text-amber-500 mb-1">
                                    <Award size={16} />
                                    <span className="text-xs font-bold uppercase">Contributions</span>
                                </div>
                                <p className="text-2xl font-bold text-slate-800">12</p>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="space-y-3">
                            <button className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-sm transition-colors flex items-center justify-center gap-2">
                                Edit Safety Preferences
                            </button>
                            <button
                                onClick={onLogout}
                                className="w-full py-3 bg-red-50 hover:bg-red-100 text-red-600 font-semibold rounded-xl text-sm transition-colors flex items-center justify-center gap-2"
                            >
                                <LogOut size={16} />
                                Sign Out
                            </button>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
