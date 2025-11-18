import { useState } from "react";
import { emptyQuest } from "./lib/defaultStructure";
import QuestEditor from "./components/questEditor";

export default function App() {
    const [quest, setQuest] = useState(emptyQuest);
    const [error, setError] = useState("");

    const exportJSON = () => {
        try {
            const blob = new Blob([JSON.stringify(quest, null, 2)], { type: "application/json" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `${quest.questID || "quest"}.json`;
            a.click();
        } catch (e) {
            setError("Erreur export JSON !");
            setTimeout(() => setError(""), 3000);
        }
    };

    const importJSON = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        file.text().then((txt) => {
            try {
                const parsed = JSON.parse(txt);
                setQuest(parsed);
                setError("");
            } catch {
                setError("JSON invalide !");
            }
        });
    };

    return (
        <div className="text-white bg-neutral-950 min-h-screen p-6">
            <div className="flex gap-4 mb-6">
                <button
                    className="bg-green-600 px-4 py-2 rounded hover:bg-green-700 transition-all duration-200"
                    onClick={exportJSON}
                >
                    Exporter JSON
                </button>

                <input
                    type="file"
                    accept="application/json"
                    onChange={importJSON}
                    className="file:mr-3 file:px-4 file:py-2 file:border-0 file:bg-blue-600 file:text-white file:rounded"
                />
            </div>

            {error && <p className="text-red-500 mb-4">{error}</p>}

            <QuestEditor quest={quest} onChange={setQuest} />
        </div>
    );
}
