import { useState } from "react";
import minecraftData from "../lib/minecraft_data.json";

export default function AutoCompleteInput({ value, onChange, category }) {
    const [show, setShow] = useState(false);

    const source = {
        item: minecraftData.items,
        block: minecraftData.blocks,
        entity: minecraftData.entities,
        effect: minecraftData.effects
    }[category] || [];

    const suggestions = source.filter(s =>
        s.toLowerCase().includes((value || "").toLowerCase())
    ).slice(0, 25);

    return (
        <div className="relative w-full">
            <input
                className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white w-full"
                value={value || ""}
                placeholder={`minecraft:...`}
                onChange={e => onChange(e.target.value)}
                onFocus={() => setShow(true)}
                onBlur={() => setTimeout(() => setShow(false), 150)}
            />

            {show && suggestions.length > 0 && (
                <div className="absolute top-full left-0 w-full bg-neutral-800 border border-neutral-600 rounded-lg max-h-64 overflow-auto z-50">
                    {suggestions.map((s, i) => (
                        <div
                            key={i}
                            className="px-3 py-1 hover:bg-neutral-700 cursor-pointer"
                            onClick={() => {
                                onChange(s);
                                setShow(false);
                            }}
                        >
                            {s}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
