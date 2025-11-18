import { REQUIREMENT_TYPES, createEmptyRequirement } from "../lib/defaultStructure";

export default function RequirementEditor({ req, onChange, onRemove }) {
    const updateField = (field, value) => onChange({ ...req, [field]: value });

    return (
        <div className="flex gap-2 items-center mt-2 bg-neutral-800 p-2 rounded">
            {/* Select pour type */}
            <select
                value={req.type}
                onChange={(e) => {
                    onChange(createEmptyRequirement(e.target.value)); // remplace l’objet
                }}
                className="bg-neutral-700 text-white px-2 py-1 rounded"
            >
                {REQUIREMENT_TYPES.map((type) => (
                    <option key={type} value={type}>{type}</option>
                ))}
            </select>

            {/* Champ dynamique selon type */}
            {req.type === "KILL_ENTITY" && (
                <input
                    className="input w-40"
                    placeholder="Entité"
                    value={req.entity}
                    onChange={(e) => updateField("entity", e.target.value)}
                />
            )}
            {(req.type === "BRING_ITEM" || req.type === "CRAFT_ITEM") && (
                <input
                    className="input w-40"
                    placeholder="Item"
                    value={req.item}
                    onChange={(e) => updateField("item", e.target.value)}
                />
            )}
            {req.type === "BREAK_BLOCK" && (
                <input
                    className="input w-40"
                    placeholder="Block"
                    value={req.block}
                    onChange={(e) => updateField("block", e.target.value)}
                />
            )}

            {/* Quantity */}
            <input
                type="number"
                className="input w-20"
                value={req.quantity || 1}
                onChange={(e) => updateField("quantity", Number(e.target.value))}
            />

            {/* Bouton supprimer */}
            <button
                onClick={onRemove}
                className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded"
            >
                X
            </button>
        </div>
    );
}
