export function getInfoText(identifier: string) {
    switch (identifier) {
        case "Starlight":
            return "Earn Battle Points every time you login to Playible. Basic Pass is available to everyone while Premium Pass is exclusive to subscribed users. Bonus Player Packs are also available to Premium Pass users which can be claimed upon reaching login milestones per month.";
        case "Starter":
            return "Inside each Starter Pack there are 5 Player Cards with 1 guaranteed for each of the 5 roles. The Player Cards drawn will be random and will be from either Warrior or Epic Tier. The collection of Players will be based on the specified season’s roster.";
        case "Mythic":
            return "Inside each Mythic Pack is 1 random Player Card from the said tier. The collection of Players will be based on the specified season’s roster.";
        case "Epic":
            return "Inside each Epic Pack is 1 random Player Card from the said tier. The collection of Players will be based on the specified season’s roster.";
        case "Warrior":
            return "Inside each Warrior Pack is 1 random Player Card from the said tier. The collection of Players will be based on the specified season’s roster.";
        case "ManaRefill":
            return "Mana corresponds to the amount of taps available per day. The higher your level, the more Mana you have. Each purchase will fill your Mana based on your level’s Mana Cap. Any excess Mana over your Mana Cap will remain usable.";
    }
}
