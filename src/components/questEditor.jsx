import SubQuestEditor from "./SubQuestEditor";
import { emptySubQuest } from "../lib/defaultStructure";

export default function QuestEditor({ quest, onChange }) {
    const updateField = (field, value) => onChange({ ...quest, [field]: value });

    const updateSubQuests = (index, newVal) => {
        const updated = [...quest.subQuests];
        updated[index] = newVal;
        updateField("subQuests", updated);
    };

    return (
        <div className="p-4 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-4 text-white">Éditeur de quête</h1>

            <div className="grid gap-3">
                <input
                    className="input"
                    placeholder="QuestID"
                    value={quest.questID}
                    onChange={(e) => updateField("questID", e.target.value)}
                />

                <input
                    className="input"
                    placeholder="Nom de la quête"
                    value={quest.questName}
                    onChange={(e) => updateField("questName", e.target.value)}
                />
            </div>

            <h2 className="text-2xl font-bold mt-6 text-white">Sous-quêtes</h2>

            {quest.subQuests.map((sq, i) => (
                <SubQuestEditor
                    key={i}
                    subQuest={sq}
                    onChange={(newVal) => updateSubQuests(i, newVal)}
                    onRemove={() =>
                        updateField(
                            "subQuests",
                            quest.subQuests.filter((_, idx) => idx !== i)
                        )
                    }
                />
            ))}

            <button
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded mt-4 transition-all duration-200"
                onClick={() => {
                    const index = quest.subQuests.length + 1;
                    const newSubQuest = emptySubQuest(quest.questID || "Subquest", index);
                    updateField("subQuests", [...quest.subQuests, newSubQuest]);
                }}
            >
                + Ajouter une sous-quête
            </button>
        </div>
    );
}
