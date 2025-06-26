import { incrementZeal } from "./scripts/zealMacros.ts";

Hooks.on("init", ()=>{
  game.modules.get("immortal-ardor").macros = {
    incrementZeal,
  }
});
