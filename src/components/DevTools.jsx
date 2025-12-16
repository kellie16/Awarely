import React from 'react';
import { MOCK_ZONES } from '../data/mockZones';

export default function DevTools({ onSimulateLocation, onReset }) {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <div className="fixed bottom-20 left-4 z-50 flex flex-col items-start gap-2">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="bg-slate-800 text-white p-2 rounded-full shadow-lg hover:bg-slate-700 transition-colors text-xs font-mono border border-slate-600"
                title="Developer Tools"
            >
                {isOpen ? 'Close' : 'Dev'}
            </button>

            {isOpen && (
                <div className="bg-slate-900/90 backdrop-blur-md p-3 rounded-lg border border-slate-700 shadow-xl flex flex-col gap-2 animate-slide-up">
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Zone Simulation</p>

                    <button
                        onClick={() => onSimulateLocation(MOCK_ZONES.find(z => z.id === 'zone_red_1').center)}
                        className="px-3 py-1.5 bg-red-500/20 text-red-300 border border-red-500/30 rounded hover:bg-red-500/30 text-xs text-left"
                    >
                        🔴 Simulate Danger
                    </button>
                    <button
                        onClick={() => onSimulateLocation(MOCK_ZONES.find(z => z.id === 'zone_yellow_1').center)}
                        className="px-3 py-1.5 bg-yellow-500/20 text-yellow-300 border border-yellow-500/30 rounded hover:bg-yellow-500/30 text-xs text-left"
                    >
                        🟡 Simulate Warning
                    </button>
                    <button
                        onClick={() => onSimulateLocation(MOCK_ZONES.find(z => z.id === 'zone_green_1').center)}
                        className="px-3 py-1.5 bg-green-500/20 text-green-300 border border-green-500/30 rounded hover:bg-green-500/30 text-xs text-left"
                    >
                        🟢 Simulate Safe
                    </button>

                    <div className="h-px bg-slate-700 my-1"></div>

                    <button
                        onClick={onReset}
                        className="px-3 py-1.5 bg-slate-700 text-slate-300 rounded hover:bg-slate-600 text-xs"
                    >
                        Reset Location
                    </button>
                </div>
            )}
        </div>
    );
}
