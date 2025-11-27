// src/components/QuestEditor.jsx
import React from "react";
import SubQuestEditor from "./subQuestEditor.jsx";
import { EMPTY_SUBQUEST } from "../lib/defaultStructure.js";

/**
 * Generates a default subQuest object with ID "<questID>-<index>"
 * but allows editing after creation.
 */
const createSubQuestWithId = (questID, index) => {
    const base = { ...EMPTY_SUBQUEST };
    base.subQuestID = `${questID || "Subquest"}-${index}`;
    return base;
};

export default function QuestEditor({
                                        quest,
                                        onChange,
                                        allQuestFiles = [], // array of {fileName, content}
                                        onUpdateFileContent = null // optional callback to notify parent of edits
                                    }) {
    const updateField = (field, value) => onChange({ ...quest, [field]: value });

    const updateSubQuest = (index, newSubQuest) => {
        const arr = [...(quest.subQuests || [])];
        arr[index] = newSubQuest;
        updateField("subQuests", arr);
        if (onUpdateFileContent) onUpdateFileContent({ ...quest, subQuests: arr });
    };

    const removeSubQuest = (index) => {
        const arr = (quest.subQuests || []).filter((_, i) => i !== index);
        updateField("subQuests", arr);
        if (onUpdateFileContent) onUpdateFileContent({ ...quest, subQuests: arr });
    };

    const addSubQuest = () => {
        const index = (quest.subQuests || []).length + 1;
        const idBase = quest.questID ? quest.questID : "Subquest";
        const newSub = createSubQuestWithId(idBase, index);
        const arr = [...(quest.subQuests || []), newSub];
        updateField("subQuests", arr);
        if (onUpdateFileContent) onUpdateFileContent({ ...quest, subQuests: arr });
    };

    // prepare allQuestIDs to pass down for quest-type requirements
    const allQuestIDs = allQuestFiles.map(f => f.content?.questID).filter(Boolean);

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold text-white mb-4">Éditeur de quête</h1>

            <div className="grid gap-3 mb-6">
                <input
                    className="bg-zinc-900/80 border border-white/10 rounded-lg px-3 py-2 text-white"
                    placeholder="QuestID"
                    value={quest.questID || ""}
                    onChange={(e) => updateField("questID", e.target.value)}
                />

                <input
                    className="bg-zinc-900/80 border border-white/10 rounded-lg px-3 py-2 text-white"
                    placeholder="Nom de la quête"
                    value={quest.questName || ""}
                    onChange={(e) => updateField("questName", e.target.value)}
                />
            </div>

            <h2 className="text-2xl font-semibold text-white mb-4">Sous-quêtes</h2>

            {(quest.subQuests || []).map((sq, i) => (
                <SubQuestEditor
                    key={i}
                    subQuest={sq}
                    onChange={(nsq) => updateSubQuest(i, nsq)}
                    onRemove={() => removeSubQuest(i)}
                    allQuestIDs={allQuestIDs}
                />
            ))}

            <div className="flex gap-2 mt-4">
                <button
                    onClick={addSubQuest}
                    className="mt-2 bg-purple-600 hover:bg-purple-700 px-5 py-3 rounded text-white"
                >
                    + Ajouter une sous-quête
                </button>
            </div>
        </div>
    );
}
