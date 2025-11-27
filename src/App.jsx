// src/App.jsx
import React, { useState } from "react";
import FileExplorer from "./components/fileExplorer.jsx";
import QuestEditor from "./components/questEditor.jsx";
import { EMPTY_QUEST } from "./lib/defaultStructure.js";

export default function App() {
    const [questFiles, setQuestFiles] = useState([]); // {fileName, content}
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [error, setError] = useState("");

    const handleLoadFiles = (files) => {
        setQuestFiles(files);
        setSelectedIndex(files.length ? 0 : null);
    };

    const handleUpdateFileContent = (index, updatedContent) => {
        const copy = [...questFiles];
        copy[index] = { ...copy[index], content: updatedContent };
        setQuestFiles(copy);
    };

    const fileSaveToDisk = (fileObj) => {
        // download single JSON file (client-side)
        const blob = new Blob([JSON.stringify(fileObj.content, null, 2)], { type: "application/json" });
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = fileObj.fileName || `${fileObj.content.questID || "quest"}.json`;
        a.click();
    };

    const exportAll = () => {
        // download all files individually
        questFiles.forEach(f => fileSaveToDisk(f));
    };

    return (
        <div className="min-h-screen bg-neutral-950 text-white">
            <div className="flex">
                <FileExplorer
                    questFiles={questFiles}
                    onLoad={handleLoadFiles}
                    selectedIndex={selectedIndex}
                    onSelectIndex={setSelectedIndex}
                />

                <main className="flex-1 p-6">
                    <div className="flex gap-4 mb-4">
                        <button
                            onClick={() => {
                                if (selectedIndex == null) {
                                    setError("Aucune quête sélectionnée");
                                    setTimeout(() => setError(""), 3000);
                                    return;
                                }
                                fileSaveToDisk(questFiles[selectedIndex]);
                            }}
                            className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
                        >
                            Enregistrer la quête sélectionnée
                        </button>

                        <button
                            onClick={() => exportAll()}
                            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
                        >
                            Exporter toutes les quêtes
                        </button>

                        <button
                            onClick={() => {
                                // create a new empty quest in the list
                                const newQuest = { fileName: `new-quest-${Date.now()}.json`, content: { ...EMPTY_QUEST } };
                                setQuestFiles(prev => [...prev, newQuest]);
                                setSelectedIndex(questFiles.length);
                            }}
                            className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded"
                        >
                            Nouvelle quête
                        </button>
                    </div>

                    {error && <div className="text-red-400 mb-4">{error}</div>}

                    {selectedIndex !== null && selectedIndex >= 0 && questFiles[selectedIndex] ? (
                        <QuestEditor
                            quest={questFiles[selectedIndex].content}
                            onChange={(updated) => handleUpdateFileContent(selectedIndex, updated)}
                            allQuestFiles={questFiles}
                            onUpdateFileContent={(updated) => handleUpdateFileContent(selectedIndex, updated)}
                        />
                    ) : (
                        <div className="text-neutral-400">Aucune quête ouverte. Importez un dossier ou créez une nouvelle quête.</div>
                    )}
                </main>
            </div>
        </div>
    );
}
