import React from 'react';

export default function Layout({ children }) {
    return (
        <div className="flex justify-center min-h-screen bg-slate-100">
            <div className="w-full max-w-md bg-white shadow-2xl overflow-hidden relative min-h-screen">
                {children}
            </div>
        </div>
    );
}
