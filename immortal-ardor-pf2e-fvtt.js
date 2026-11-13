import { incrementZeal, useZenith } from "./macros/zealMacros.js";
import { drawTalekeeperDeck, drawDivinerDeck } from "./macros/cardplayMacros.js";

Hooks.on("init", async () => {
  game.modules.get("immortal-ardor").macros = {
    incrementZeal,
    useZenith,
    drawTalekeeperDeck,
    drawDivinerDeck
  };
});