async function incrementZeal() {
  const MAX_ZEAL = 5;

  // get the selected actor and make sure there's only one selected
  const actors = canvas.tokens.controlled;
  if (actors.length != 1) {
    return ui.notifications.warn("Please select only one token.");
  }

  const selectedActor = actors[0]?.actor;

  // next, check if the actor has the Zeal resource.
  const zealResourceIndex = selectedActor?.rules.findIndex(rule => rule.slug === "zeal")
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

  if (totalZeal > MAX_ZEAL) {
    selectedActor.updateResource('zeal', MAX_ZEAL);
    await ChatMessage.create({
        speaker,
        content: `${name} gains ${addedZeal} Zeal, exceeding maximum of ${MAX_ZEAL}. Zeal set to ${MAX_ZEAL}.`,
    });
  } else if (totalZeal <= MAX_ZEAL) {
    selectedActor.updateResource('zeal', totalZeal);
    await ChatMessage.create({
        speaker,
        content: `${name} gains ${addedZeal} Zeal. Zeal set to ${totalZeal}.`,
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
        <input type="number" name="zeal" value="0">
    </div>
    </form>
    `;
}

async function useZenith() {
  // get the selected actor and make sure there's only one selected
  const actors = canvas.tokens.controlled;
  if (actors.length != 1) {
    return ui.notifications.warn("Please select only one token.");
  }

  const selectedActor = actors[0]?.actor;

  // next, check if the actor has the Zeal resource.
  const zealResourceIndex = selectedActor?.rules.findIndex(rule => rule.slug === "zeal")
  if (zealResourceIndex < 0) {
    return ui.notifications.warn("Selected actor does not have the Zeal resource.");
  }

  const actorCurrentZeal = selectedActor.rules[zealResourceIndex].value ?? 0;

  // Get actor data
  const token = selectedActor.getActiveTokens();
  const name = token?.name ?? selectedActor.name;
  const speaker = ChatMessage.getSpeaker({ actor: selectedActor });

  selectedActor.updateResource('zeal', 0);
  await ChatMessage.create({
      speaker,
      content: `${name} uses ${actorCurrentZeal} Zeal. Zeal set to 0.`,
  });
}

export {incrementZeal, useZenith}