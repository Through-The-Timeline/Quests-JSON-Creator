// src/components/SubQuestEditor.jsx
import React from "react";
import RequirementEditor from "./requirementEditor.jsx";
import RewardEditor from "./rewardEditor.jsx";
import { REQUIREMENT_TYPES, REWARD_TYPES } from "../lib/defaultStructure.js";

/**
 * Helper to create a clean empty requirement depending on type
 */
const createEmptyRequirement = (type = "bring_item") => {
    switch (type) {
        case "bring_item": return { type, item: "", quantity: 1 };
        case "craft_item": return { type, item: "", quantity: 1 };
        case "break_block": return { type, block: "", tool: "", quantity: 1 };
        case "kill_entity": return { type, entity: "", quantity: 1 };
        case "quest": return { type, questID: "", subQuestID: "", state: "STARTED" };
        default: return { type };
    }
};

const createEmptyReward = (type = "give_item") => {
    switch (type) {
        case "give_item": return { type, item: "", quantity: 1 };
        case "give_effect": return { type, effect: "", duration: 1, level: 0};
        default: return { type };
    }
};

export default function SubQuestEditor({
                                           subQuest,
                                           onChange,
                                           onRemove,
                                           allQuestIDs = []
                                       }) {
    const updateField = (field, value) => onChange({ ...subQuest, [field]: value });

    const updateRequirement = (index, newReq) => {
        const arr = [...(subQuest.requirements || [])];
        arr[index] = newReq;
        updateField("requirements", arr);
    };

    const removeRequirement = (index) => {
        updateField("requirements", (subQuest.requirements || []).filter((_, i) => i !== index));
    };

    const addRequirement = (type = "bring_item") => {
        updateField("requirements", [...(subQuest.requirements || []), createEmptyRequirement(type)]);
    };

    const updateReward = (index, newRw) => {
        const arr = [...(subQuest.rewards || [])];
        arr[index] = newRw;
        updateField("rewards", arr);
    };

    const removeReward = (index) => {
        updateField("rewards", (subQuest.rewards || []).filter((_, i) => i !== index));
    };

    const addReward = (type = "give_item") => {
        updateField("rewards", [...(subQuest.rewards || []), createEmptyReward(type)]);
    };

    return (
        <div className="rounded-2xl border border-white/10 bg-zinc-900/60 p-6 shadow-lg shadow-black/40 mb-6">
            <div className="flex justify-between items-start gap-4 mb-4">
                <div className="flex-1">
                    <label className="text-sm text-neutral-300">SubQuest ID</label>
                    <input
                        className="mt-1 w-full bg-zinc-900/80 border border-white/10 rounded-lg px-3 py-2 text-white"
                        value={subQuest.subQuestID || ""}
                        onChange={(e) => updateField("subQuestID", e.target.value)}
                    />
                </div>

                <div className="flex-shrink-0">
                    <button
                        onClick={onRemove}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                        title="Supprimer la sous-quête"
                    >
                        Supprimer
                    </button>
                </div>
            </div>

            <div className="grid gap-3">
                <input
                    className="bg-zinc-900/80 border border-white/10 rounded-lg px-3 py-2 text-white"
                    placeholder="Nom de la sous-quête"
                    value={subQuest.subQuestName || ""}
                    onChange={(e) => updateField("subQuestName", e.target.value)}
                />

                <textarea
                    className="bg-zinc-900/80 border border-white/10 rounded-lg px-3 py-2 text-white h-28"
                    placeholder="Dialogue"
                    value={subQuest.subQuestDialog || ""}
                    onChange={(e) => updateField("subQuestDialog", e.target.value)}
                />

                <input
                    className="bg-zinc-900/80 border border-white/10 rounded-lg px-3 py-2 text-white"
                    placeholder="PNJ"
                    value={subQuest.subQuestPNJ || ""}
                    onChange={(e) => updateField("subQuestPNJ", e.target.value)}
                />

                <div className="flex gap-2">
                    <input
                        className="bg-zinc-900/80 border border-white/10 rounded-lg px-3 py-2 text-white flex-1"
                        placeholder="Texte bouton start"
                        value={subQuest.bottomButtonStartText || ""}
                        onChange={(e) => updateField("bottomButtonStartText", e.target.value)}
                    />
                    <input
                        className="bg-zinc-900/80 border border-white/10 rounded-lg px-3 py-2 text-white flex-1"
                        placeholder="Texte bouton end"
                        value={subQuest.bottomButtonEndText || ""}
                        onChange={(e) => updateField("bottomButtonEndText", e.target.value)}
                    />
                </div>
            </div>

            <hr className="border-white/10 my-4" />

            <h4 className="font-semibold mb-3 text-neutral-200">Requirements</h4>
            <div className="space-y-3">
                {(subQuest.requirements || []).map((r, i) => (
                    <RequirementEditor
                        key={i}
                        requirement={r}
                        onChange={(newReq) => updateRequirement(i, newReq)}
                        onRemove={() => removeRequirement(i)}
                        allQuests={allQuestIDs}
                    />
                ))}
            </div>

            <div className="mt-3 flex gap-2">
                <select
                    className="bg-neutral-700 text-white px-2 py-1 rounded"
                    onChange={(e) => addRequirement(e.target.value)}
                    defaultValue=""
                >
                    <option value="" disabled>+ Ajouter requirement</option>
                    {REQUIREMENT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                </select>

                <button
                    onClick={() => addRequirement("bring_item")}
                    className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-white"
                >
                    Ajouter bring_item
                </button>
            </div>

            <hr className="border-white/10 my-4" />

            <h4 className="font-semibold mb-3 text-neutral-200">Rewards</h4>
            <div className="space-y-3">
                {(subQuest.rewards || []).map((rw, i) => (
                    <RewardEditor
                        key={i}
                        reward={rw}
                        onChange={(newRw) => updateReward(i, newRw)}
                        onRemove={() => removeReward(i)}
                    />
                ))}
            </div>

            <div className="mt-3 flex gap-2">
                <select
                    className="bg-neutral-700 text-white px-2 py-1 rounded"
                    onChange={(e) => addReward(e.target.value)}
                    defaultValue=""
                >
                    <option value="" disabled>+ Ajouter reward</option>
                    {REWARD_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                </select>

                <button
                    onClick={() => addReward("give_item")}
                    className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-white"
                >
                    Ajouter give_item
                </button>
            </div>
        </div>
    );
}
