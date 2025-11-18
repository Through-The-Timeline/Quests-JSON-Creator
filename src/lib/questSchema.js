import { z } from "zod";

export const dependencySchema = z.object({
    questID: z.string(),
    subQuestID: z.string(),
    subQuestState: z.enum(["STARTED", "COMPLETED", "NOT_STARTED"]),
});

export const requirementSchema = z.object({
    type: z.enum(["KILL_ENTITY", "BRING_ITEM", "CRAFT_ITEM", "BREAK_BLOCK", "CUSTOM"]),
    entity: z.string().optional(),
    item: z.string().optional(),
    block: z.string().optional(),
    quantity: z.number().optional(),
});

export const rewardSchema = z.object({
    type: z.enum(["GIVE_ITEM", "UNLOCK_RECIPE", "UNLOCK_EFFECT"]),
    item: z.string().optional(),
    quantity: z.number().optional(),
    recipe: z.string().optional(),
    effect: z.string().optional(),
});

export const subQuestSchema = z.object({
    subQuestID: z.string(),
    subQuestName: z.string(),
    subQuestDialog: z.string(),
    subQuestPNJ: z.string(),
    bottomButtonStartText: z.string(),
    bottomButtonEndText: z.string(),
    dependencies: z.array(dependencySchema),
    requirements: z.array(requirementSchema),
    rewards: z.array(rewardSchema),
});

export const questSchema = z.object({
    questID: z.string(),
    questName: z.string(),
    pnj: z.object({
        name: z.string(),
        id: z.string(),
        attributes: z.array(z.string()),
    }),
    subQuests: z.array(subQuestSchema),
});
