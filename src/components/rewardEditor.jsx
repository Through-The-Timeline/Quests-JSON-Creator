import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import {REWARD_TYPES} from "@/lib/defaultStructure.js";

export default function RewardEditor({ reward, onChange, onRemove }) {
    const change = (field, value) => onChange({ ...reward, [field]: value });

    return (
        <div className="border p-2 rounded mt-2 bg-neutral-800">

            <select value={reward.type} onValueChange={(v) =>
                    change("type", v)}
                className="bg-neutral-700 text-white px-2 py-1 rounded"
            >
                {REWARD_TYPES.map((type) => (
                    <option key={type} value={type}>{type}</option>
                ))}
            </select>

            {(reward.type === "GIVE_ITEM" || reward.type === "UNLOCK_RECIPE") && (
                <input className="input mt-2"
                       placeholder="item or recipe"
                       value={reward.item || ""}
                       onChange={(e) => change("item", e.target.value)}/>
            )}

            {reward.type === "UNLOCK_EFFECT" && (
                <input className="input mt-2" placeholder="effect"
                       value={reward.effect || ""}
                       onChange={(e) => change("effect", e.target.value)}/>
            )}

            <input className="input mt-2" placeholder="quantity" type="number"
                   value={reward.quantity || 1}
                   onChange={(e) => change("quantity", Number(e.target.value))}/>

            <button className="bg-red-600 px-2 py-1 rounded text-white mt-2"
                    onClick={onRemove}>Supprimer
            </button>
        </div>
    );
}
