import DependencyEditor from "./dependencyEditor";
import RequirementEditor from "./requirementEditor";
import RewardEditor from "./rewardEditor";
import {createEmptyRequirement, emptyDependency, emptyReward} from "../lib/defaultStructure";

export default function SubQuestEditor({ subQuest, onChange, onRemove }) {

    const updateField = (field, value) => onChange({ ...subQuest, [field]: value });

    const updateArrayField = (field, index, value) => {
        const updated = [...subQuest[field]];
        updated[index] = value;
        updateField(field, updated);
    };

    const removeArrayItem = (field, index) => {
        updateField(field, subQuest[field].filter((_, i) => i !== index));
    };

    return (
        <div
            className="bg-neutral-900 shadow-lg rounded-2xl p-6 mb-4 border border-neutral-700 transition-all duration-200 hover:scale-[1.01]">
            <div className="flex justify-between items-center mb-3">
                <h2 className="text-xl font-bold text-white">{subQuest.subQuestID}</h2>
                <button
                    onClick={onRemove}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded transition-all duration-200"
                >
                    Supprimer
                </button>
            </div>

            <div className="grid gap-3">
                <input
                    className="input"
                    placeholder="Nom de la sous-quête"
                    value={subQuest.subQuestName}
                    onChange={(e) => updateField("subQuestName", e.target.value)}
                />

                <textarea
                    className="input h-24"
                    placeholder="Dialogue"
                    value={subQuest.subQuestDialog}
                    onChange={(e) => updateField("subQuestDialog", e.target.value)}
                />

                <input
                    className="input"
                    placeholder="PNJ"
                    value={subQuest.subQuestPNJ}
                    onChange={(e) => updateField("subQuestPNJ", e.target.value)}
                />

                <input
                    className="input"
                    placeholder="Texte bouton start"
                    value={subQuest.bottomButtonStartText}
                    onChange={(e) => updateField("bottomButtonStartText", e.target.value)}
                />

                <input
                    className="input"
                    placeholder="Texte bouton end"
                    value={subQuest.bottomButtonEndText}
                    onChange={(e) => updateField("bottomButtonEndText", e.target.value)}
                />
            </div>

            {/* Dependencies */}
            <h3 className="text-lg font-semibold border-b border-neutral-700 pb-1 mt-6 mb-2">Dépendances</h3>
            {subQuest.dependencies.map((dep, i) => (
                <DependencyEditor
                    key={i}
                    dep={dep}
                    onChange={(d) => updateArrayField("dependencies", i, d)}
                    onRemove={() => removeArrayItem("dependencies", i)}
                />
            ))}
            <button
                onClick={() => updateField("dependencies", [...subQuest.dependencies, {...emptyDependency}])}
                className="bg-blue-600 hover:bg-blue-700 px-3 py-1 text-white rounded mt-2 transition-all duration-200"
            >
                + Ajouter dépendance
            </button>

            {/* Requirements */}
            <h3 className="text-lg font-semibold border-b border-neutral-700 pb-1 mt-6 mb-2">Requirements</h3>
            {subQuest.requirements.map((req, i) => (
                <RequirementEditor
                    key={i}
                    req={req}
                    onChange={(r) => updateArrayField("requirements", i, r)}
                    onRemove={() => removeArrayItem("requirements", i)}
                />
            ))}


            <button
                onClick={() =>
                    updateField("requirements", [
                        ...subQuest.requirements,
                        createEmptyRequirement("BRING_ITEM"), // type par défaut
                    ])
                }
                className="bg-blue-600 hover:bg-blue-700 px-3 py-1 text-white rounded mt-2 transition-all duration-200"
            >
                + Ajouter requirement
            </button>


            {/* Rewards */}
            <h3 className="text-lg font-semibold border-b border-neutral-700 pb-1 mt-6 mb-2">Rewards</h3>
            {subQuest.rewards.map((reward, i) => (
                <RewardEditor
                    key={i}
                    reward={reward}
                    onChange={(r) => updateArrayField("rewards", i, r)}
                    onRemove={() => removeArrayItem("rewards", i)}
                />
            ))}
            <button
                onClick={() => updateField("rewards", [...subQuest.rewards, {...emptyReward}])}
                className="bg-blue-600 hover:bg-blue-700 px-3 py-1 text-white rounded mt-2 transition-all duration-200"
            >
                + Ajouter reward
            </button>
        </div>
    );
}
