import { incrementZeal, useZenith } from "./macros/zealMacros.js";

Hooks.on("init", async () => {
  game.modules.get("immortal-ardor").macros = {
    incrementZeal,
    useZenith
  };
  console.log('hook is being called');
});
