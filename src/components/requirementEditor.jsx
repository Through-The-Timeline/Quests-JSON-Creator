import {
    REQUIREMENT_TYPES,
    QUEST_STATES
} from "../lib/defaultStructure.js";

import AutoCompleteInput from "./autoCompleteInput.jsx";

export default function RequirementEditor({ requirement, onChange, onRemove, allQuests }) {

    const update = (field, value) =>
        onChange({ ...requirement, [field]: value });

    return (
        <div className="border border-neutral-700 rounded-lg p-3 bg-neutral-900 space-y-2">

            {/* Type */}
            <select
                className="bg-neutral-700 text-white px-2 py-1 rounded w-full"
                value={requirement.type}
                onChange={e => update("type", e.target.value)}
            >
                {REQUIREMENT_TYPES.map(t => (
                    <option key={t} value={t}>{t}</option>
                ))}
            </select>


            {/* Bring item / craft item */}
            {(requirement.type === "bring_item" ||
                requirement.type === "craft_item") && (
                <>
                    <AutoCompleteInput
                        category="item"
                        value={requirement.item}
                        onChange={v => update("item", v)}
                    />
                    <input
                        type="number"
                        className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white w-full"
                        value={requirement.quantity || 1}
                        onChange={e => update("quantity", Number(e.target.value))}
                    />
                </>
            )}


            {/* Break block */}
            {requirement.type === "break_block" && (
                <>
                    <AutoCompleteInput
                        category="block"
                        value={requirement.block}
                        onChange={v => update("block", v)}
                    />

                    <input
                        className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white w-full"
                        placeholder="tool (optional)"
                        value={requirement.tool || ""}
                        onChange={e => update("tool", e.target.value)}
                    />

                    <input
                        type="number"
                        className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white w-full"
                        value={requirement.quantity || 1}
                        onChange={e => update("quantity", Number(e.target.value))}
                    />
                </>
            )}


            {/* Kill entity */}
            {requirement.type === "kill_entity" && (
                <>
                    <AutoCompleteInput
                        category="entity"
                        value={requirement.entity}
                        onChange={v => update("entity", v)}
                    />

                    <input
                        type="number"
                        className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white w-full"
                        value={requirement.quantity || 1}
                        onChange={e => update("quantity", Number(e.target.value))}
                    />
                </>
            )}


            {/* Quest dependency */}
            {requirement.type === "quest" && (
                <>
                    <select
                        className="bg-neutral-700 text-white px-2 py-1 rounded w-full"
                        value={requirement.questID}
                        onChange={e => update("questID", e.target.value)}
                    >
                        <option value="">Sélectionne une quête</option>
                        {allQuests.map(q => (
                            <option key={q.questID} value={q.questID}>{q.questID}</option>
                        ))}
                    </select>

                    <input
                        className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white w-full"
                        placeholder="SubQuestID"
                        value={requirement.subQuestID || ""}
                        onChange={e => update("subQuestID", e.target.value)}
                    />

                    <select
                        className="bg-neutral-700 text-white px-2 py-1 rounded w-full"
                        value={requirement.state}
                        onChange={e => update("state", e.target.value)}
                    >
                        {QUEST_STATES.map(s => (
                            <option key={s} value={s}>{s}</option>
                        ))}
                    </select>
                </>
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
