import {
  TALEKEEPER_DECK_UUID,
  DIVINER_DECK_UUID
} from "./constants.js";

/***
 * Function to roll on the talekeeper deck table
 ***/
export const drawTalekeeperDeck = async() => {
  const table = await fromUuid(TALEKEEPER_DECK_UUID);
  await table.draw();
};

/***
 * Function to roll on the diviner deck table
 ***/
export const drawDivinerDeck = async() => {
  const table = await fromUuid(DIVINER_DECK_UUID);
  await table.draw();
};