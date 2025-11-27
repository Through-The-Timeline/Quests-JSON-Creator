// src/components/FileExplorer.jsx
import React from "react";

/**
 * Component to import a folder of JSON files and show a sidebar list.
 * Props:
 *  - questFiles: array of {fileName, content}
 *  - onLoad: (files) => void
 *  - selectedIndex
 *  - onSelectIndex
 */
export default function FileExplorer({ questFiles = [], onLoad, selectedIndex, onSelectIndex }) {

    const handleDirectoryImport = async (e) => {
        const files = Array.from(e.target.files).filter(f => f.name.endsWith(".json"));
        const results = [];
        for (const f of files) {
            try {
                const txt = await f.text();
                const content = JSON.parse(txt);
                results.push({ fileName: f.name, content });
            } catch (err) {
                console.warn("Invalid JSON file skipped:", f.name);
            }
        }
        onLoad(results);
    };

    return (
        <div className="flex">
            <aside className="w-72 bg-neutral-900 border-r border-neutral-700 h-screen overflow-y-auto">
                <div className="p-3">
                    <label className="text-white block mb-2">Importer dossier de quêtes</label>
                    <input
                        type="file"
                        webkitdirectory="true"
                        directory="true"
                        onChange={handleDirectoryImport}
                        className="text-sm"
                    />
                </div>

                <div className="mt-4">
                    <div className="px-3 pb-2 text-sm text-neutral-400">Quêtes importées</div>
                    {questFiles.map((q, i) => (
                        <button
                            key={i}
                            onClick={() => onSelectIndex(i)}
                            className={`w-full text-left px-3 py-2 hover:bg-neutral-800 flex gap-2 items-center ${
                                selectedIndex === i ? "bg-neutral-700" : "bg-neutral-900"
                            }`}
                        >
                            <div className="flex-1">
                                <div className="text-white truncate">{q.fileName}</div>
                                <div className="text-xs text-neutral-400 truncate">{q.content.questID || "no-id"}</div>
                            </div>
                        </button>
                    ))}
                </div>
            </aside>
        </div>
    );
}
