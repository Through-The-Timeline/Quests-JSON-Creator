export const REQUIREMENT_TYPES = [
    "bring_item",
    "craft_item",
    "break_block",
    "kill_entity",
    "quest"
];

export const REWARD_TYPES = [
    "give_item",
    "give_effect",
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

