import {QUEST_STATES} from "../lib/defaultStructure.js";

export default function DependencyEditor({ dep, onChange, onRemove }) {
    return (
        <div className="flex gap-2 items-center mt-2">
            <input
                className="border p-2 rounded bg-neutral-900"
                placeholder="questID"
                value={dep.questID}
                onChange={(e) => onChange({...dep, questID: e.target.value})}
            />

            <input
                className="border p-2 rounded bg-neutral-900"
                placeholder="subQuestID"
                value={dep.subQuestID}
                onChange={(e) => onChange({...dep, subQuestID: e.target.value})}
            />

            <select value={dep.subQuestState} onValueChange={(v) =>
                onChange({...dep, subQuestState: v})}
                    className="bg-neutral-700 text-white px-2 py-1 rounded"
            >
                {QUEST_STATES.map((type) => (
                    <option key={type} value={type}>{type}</option>
                ))}
            </select>

            <button onClick={onRemove} className="bg-red-600 px-2 py-1 rounded text-white">X</button>
        </div>
    );
}
