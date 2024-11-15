export function getInfoText(identifier: string) {
  switch (identifier) {
    case "Starter":
      return "Inside each Starter Pack there are 5 Player Cards with 1 guaranteed for each of the 5 roles. The Player Cards drawn will be random and will be from either Warrior or Epic Tier. The collection of Players will be based on the specified season’s roster.";
    case "Mythic":
      return "Inside each Mythic Pack is 1 random Player Card from the said tier. The collection of Players will be based on the specified season’s roster.";
    case "Epic":
      return "Inside each Epic Pack is 1 random Player Card from the said tier. The collection of Players will be based on the specified season’s roster.";
    case "Warrior":
      return "Inside each Warrior Pack is 1 random Player Card from the said tier. The collection of Players will be based on the specified season’s roster.";
  }
}
