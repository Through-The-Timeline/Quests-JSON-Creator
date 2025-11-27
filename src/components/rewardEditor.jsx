import { REWARD_TYPES } from "../lib/defaultStructure.js";

export default function RewardEditor({ reward, onChange, onRemove }) {
    const update = (field, val) =>
        onChange({ ...reward, [field]: val });

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

            {(reward.type === "give_item" ||
                reward.type === "unlock_recipe") && (
                <input
                    className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white w-full"
                    placeholder="item / recipe"
                    value={reward.item || ""}
                    onChange={e => update("item", e.target.value)}
                />
            )}

            {reward.type === "unlock_effect" && (
                <input
                    className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white w-full"
                    placeholder="effect"
                    value={reward.effect || ""}
                    onChange={e => update("effect", e.target.value)}
                />
            )}

            <input
                type="number"
                className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white w-full"
                value={reward.quantity || 1}
                onChange={e => update("quantity", Number(e.target.value))}
            />

            <button
                className="bg-red-600 px-3 py-1 rounded text-white"
                onClick={onRemove}
            >
                Supprimer
            </button>
        </div>
    );
}
