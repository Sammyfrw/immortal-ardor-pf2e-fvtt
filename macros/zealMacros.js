import {
  meditationEffectSourceIDs,
  DERVISH_MAX_ZEAL
} from "./constants.js";

/***
 * Function to increment an actor's zeal value
 ***/
async function incrementZeal() {
  // get the selected actor and make sure there's only one selected
  const actors = canvas.tokens.controlled;
  if (actors.length != 1) {
    return ui.notifications.warn("Please select only one token.");
  }

  const selectedActor = actors[0]?.actor;

  // next, check if the actor has the Zeal resource.
  const zealResourceIndex = selectedActor?.rules.findIndex(rule => rule.slug === "zeal");
  if (zealResourceIndex < 0) {
    return ui.notifications.warn("Selected actor does not have the Zeal resource.");
  }

  const actorCurrentZeal = selectedActor.rules[zealResourceIndex].value ?? 0;
  const addedZeal = await showZealPopup(actorCurrentZeal);
  const totalZeal = actorCurrentZeal + addedZeal;

  // Get actor data
  const token = selectedActor.getActiveTokens();
  const name = token?.name ?? selectedActor.name;
  const speaker = ChatMessage.getSpeaker({ actor: selectedActor });

  if (totalZeal > DERVISH_MAX_ZEAL) {
    selectedActor.updateResource('zeal', DERVISH_MAX_ZEAL);
    await ChatMessage.create({
        speaker,
        content: `${name} gains ${addedZeal} Zeal, exceeding maximum of ${DERVISH_MAX_ZEAL}. Zeal set to ${DERVISH_MAX_ZEAL}.`,
    });
  } else if (totalZeal <= DERVISH_MAX_ZEAL) {
    selectedActor.updateResource('zeal', totalZeal);
    await ChatMessage.create({
        speaker,
        content: `<b>${name}</b> gains ${addedZeal} Zeal. Zeal set to ${totalZeal}.`,
    });
  }
} 

async function showZealPopup(actorCurrentZeal) {
  let zeal = await Dialog.wait({
    title: "Award Zeal",
    content: askZealPopupOption(actorCurrentZeal),
    buttons: {
      no: {
        icon: '<i class="fas fa-times"></i>',
        label: "Cancel",
      },
      yes: {
        icon: '<i class="fas fa-check"></i>',
        label: "Gain Zeal",
          callback: (html) => new FormDataExtended(html[0].querySelector("form")).object.zeal
      },
    },
    default: "no",
  });
  return zeal;
}

function askZealPopupOption(zeal) {
  const currentZeal = zeal ?? 0;
    return `
    <form>
    <div class="form-group">
        <label>Add Zeal (Current: ${currentZeal})</label>
        <input type="number" name="zeal" value="1">
    </div>
    </form>
    `;
}

/***
 * Function to use a Zenith, which depletes a creature's Zeal.
 ***/
async function useZenith() {
  // get the selected actor and make sure there's only one selected
  const actors = canvas.tokens.controlled;
  if (actors.length != 1) {
    return ui.notifications.warn("Please select only one token.");
  }

  const selectedActor = actors[0]?.actor;

  // next, check if the actor has the Zeal resource.
  const zealResourceIndex = selectedActor?.rules.findIndex(rule => rule.slug === "zeal");
  if (zealResourceIndex < 0) {
    return ui.notifications.warn("Selected actor does not have the Zeal resource.");
  }

  const actorCurrentZeal = selectedActor.rules[zealResourceIndex].value ?? 0;

  // check if the actor has a meditation spell
  const actorMeditationEffects = selectedActor.itemTypes.effect.filter(
    (effect) => effect.origin === selectedActor && meditationEffectSourceIDs.has(effect.sourceId)
  );
  const effects = selectedActor.itemTypes.effect;

  // Get actor data
  const token = selectedActor.getActiveTokens();
  const name = token?.name ?? selectedActor.name;
  const speaker = ChatMessage.getSpeaker({ actor: selectedActor });
  let messageContent = `<p><b>${name}</b> uses a Zenith action and spends ${actorCurrentZeal} Zeal. Zeal set to 0.</p>`;

  // if the actor has meditation spells, remove them and append to message.
  if (actorMeditationEffects.length > 0) {
    selectedActor.deleteEmbeddedDocuments(
      "Item",
      actorMeditationEffects.map((e) => e.id)
    );
    messageContent += "<p>Meditation spell effects fade.</p>";

    // if the actor has the Zealous Strikes class feature, they regain a focus point.
    const actorHasZealousStrikes = selectedActor.itemTypes.feat.filter(
      (feat) => feat.slug === "zealous-strikes");
    const focusResource = selectedActor.system.resources.focus;

    if (actorHasZealousStrikes && focusResource) {
      messageContent += ` <b>${name}</b> regains a focus point.`;
      selectedActor.updateResource('focus', focusResource.value + 1);
    }
  }

  selectedActor.updateResource('zeal', 0);
  await ChatMessage.create({
      speaker,
      content: messageContent,
  });
}

export {incrementZeal, useZenith};