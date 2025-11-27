export const REQUIREMENT_TYPES = [
    "bring_item",
    "craft_item",
    "break_block",
    "kill_entity",
    "quest"
];

export const REWARD_TYPES = [
    "give_item",
    "unlock_recipe",
    "unlock_effect"
];

export const QUEST_STATES = [
    "NOT_STARTED",
    "STARTED",
    "COMPLETED"
];

export const EMPTY_QUEST = {
    questID: "",
    questName: "",
    subQuests: []
};

export const EMPTY_SUBQUEST = {
    subQuestID: "",
    subQuestName: "",
    subQuestDialog: "",
    subQuestPNJ: "",
    bottomButtonStartText: "",
    bottomButtonEndText: "",
    requirements: [],
    rewards: []
};

export const EMPTY_REQUIREMENT = {
    type: "bring_item"
};

export const EMPTY_REWARD = {
    type: "give_item",
    quantity: 1
};
