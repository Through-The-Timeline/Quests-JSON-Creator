export const QUEST_STATES = ["STARTED", "COMPLETED", "NOT_STARTED"];

export const REQUIREMENT_TYPES = [
    "KILL_ENTITY",
    "BRING_ITEM",
    "CRAFT_ITEM",
    "BREAK_BLOCK",
    "CUSTOM"
];

export const REWARD_TYPES = [
    "GIVE_ITEM",
    "UNLOCK_RECIPE",
    "UNLOCK_EFFECT"
];

export const emptyDependency = {
    questID: "",
    subQuestID: "",
    subQuestState: "",
};

export const emptyRequirement = {
    type: "BRING_ITEM",
    item: "",
    block: "",
    entity: "",
    quantity: 1,
};

export const emptyReward = {
    type: "GIVE_ITEM",
    item: "",
    quantity: 1,
};

export const emptySubQuest = (questID, index) => ({
    subQuestID: `${questID}-${index}`,
    subQuestName: "",
    subQuestDialog: "",
    subQuestPNJ: "",
    bottomButtonStartText: "",
    bottomButtonEndText: "",
    dependencies: [ { ...emptyDependency } ],
    requirements: [],
    rewards: [],
});

export const emptyQuest = {
    questID: "",
    questName: "",
    subQuests: [],
};

export const createEmptyRequirement = (type = "BRING_ITEM") => {
    const base = { type, quantity: 1 };

    switch (type) {
        case "KILL_ENTITY":
            return { ...base, entity: "" };
        case "BRING_ITEM":
            return { ...base, item: "" };
        case "CRAFT_ITEM":
            return { ...base, item: "" };
        case "BREAK_BLOCK":
            return { ...base, block: "" };
        case "CUSTOM":
            return { ...base };
        default:
            return { ...base };
    }
};

