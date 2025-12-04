import {REWARD_TYPES} from "../lib/defaultStructure.js";
import AutoCompleteInput from "./autoCompleteInput.jsx";

export default function RewardEditor({reward, onChange, onRemove}) {
    const update = (field, val) =>
        onChange({...reward, [field]: val});

    return (
        <div className="border border-neutral-700 rounded-lg p-3 bg-neutral-900 space-y-2">

            <select
                className="bg-neutral-700 text-white px-2 py-1 rounded w-full"
                value={reward.type}
                onChange={e => update("type", e.target.value)}
            >
                {REWARD_TYPES.map(t => (
                    <option key={t} value={t}>{t}</option>
                ))}
            </select>

            {reward.type === "give_item"  && (
                <>
                    <input
                        className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white w-full"
                        placeholder="Item"
                        value={reward.item || ""}
                        onChange={e => update("item", e.target.value)}
                    />

                    <input
                        type="number"
                        className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white w-full"
                        placeholder="Quantity"
                        value={reward.quantity || ""}
                        onChange={e => update("quantity", Number(e.target.value))}
                    />
                </>
            )}

            {reward.type === "give_effect" && (
                <>
                    <AutoCompleteInput
                        category="effect"
                        value={reward.effect}
                        onChange={v => update("effect", v)}
                    />

                    <label className="text-sm text-neutral-300">Durée (secondes)</label>
                    <input
                        type="number"
                        className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white w-full"
                        placeholder="duration (sec)"
                        value={reward.duration ?? ""}
                        onChange={e => update("duration", Number(e.target.value))}
                    />

                    <label className="text-sm text-neutral-300">Level</label>
                    <input
                        type="number"
                        className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white w-full"
                        placeholder="level"
                        value={reward.level ?? ""}
                        onChange={e => update("level", Number(e.target.value))}
                    />
                </>
            )}

            {reward.type === "unlock_effect" && (
                <input
                    className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white w-full"
                    placeholder="effect"
                    value={reward.effect || ""}
                    onChange={e => update("effect", e.target.value)}
                />
            )}
            <button
                className="bg-red-600 px-3 py-1 rounded text-white"
                onClick={onRemove}
            >
                Supprimer
            </button>
        </div>
    );
}
