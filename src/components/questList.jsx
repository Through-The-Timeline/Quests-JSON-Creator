export default function QuestList({ quests, selected, onSelect }) {
    return (
        <div className="w-64 bg-neutral-900 border-r border-neutral-700 h-screen overflow-y-auto">
            <div className="p-3 text-lg font-bold text-white">
                Quêtes importées
            </div>

            {quests.map((q, i) => (
                <button
                    key={i}
                    className={`w-full text-left px-3 py-2 ${
                        selected === i ? "bg-neutral-700" : "bg-neutral-900"
                    } hover:bg-neutral-700 text-white`}
                    onClick={() => onSelect(i)}
                >
                    {q.fileName}
                </button>
            ))}
        </div>
    );
}
