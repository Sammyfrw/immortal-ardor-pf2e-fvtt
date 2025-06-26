async function incrementZeal() {
  const MAX_ZEAL = 5;

  // get the selected actor and make sure there's only one selected
  const actors = canvas.tokens.controlled;
  if (actors.length != 1) {
    return ui.notifications.warn("Please select only one actor.");
  }

  const selectedActor = actors[0];

  // next, check if the actor has the Zeal resource.
  const zealResourceIndex = selectedActor.rules.findIndex(rule => rule.slug === "zeal")
  if (!zealResourceIndex) {
    return ui.notifications.warn("Selected actor does not have the Zeal resource.");
  }

  const actorCurrentZeal = selectedActor.rules[zealResourceIndex].value ?? 0;
  const addedZeal = showZealPopup(actorCurrentZeal);
  const totalZeal = actorCurrentZeal + addedZeal;

  // Get actor data
  const token = selectedActor.getActiveTokens;
  const name = token?.name ?? selectedActor.name;
  const speaker = ChatMessagePF2e.getSpeaker({ token, selectedActor });

  if (totalZeal >= MAX_ZEAL) {
    selectedActor.updateResource('zeal', MAX_ZEAL);
    await ChatMessagePF2e.create({
        speaker,
        content: `${name} gains ${addedZeal} Zeal, exceeding ${MAX_ZEAL}. Zeal set to ${MAX_ZEAL}.`,
    });
  } else {
    selectedActor.updateResource('zeal', totalZeal);
    await ChatMessagePF2e.create({
        speaker,
        content: `${name} gains ${addedZeal} Zeal. Zeal set to ${totalZeal}.`,
    });
  }
} 

function showZealPopup(actorCurrentZeal: int): int {
  new foundry.appv1.api.Dialog({
    title: "Award Zeal",
    content: askZealPopupOption(actorCurrentZeal),
    buttons: {
      no: {
        icon: fontAwesomeIcon("times").outerHTML,
        label: "Cancel",
      },
      yes: {
        icon: fontAwesomeIcon("hand").outerHTML,
        label: "Gain Zeal",
          callback: ($html, event?: JQuery.TriggeredEvent) => {
            const html = $html[0];
            const zeal = Number(html.querySelector<HTMLSelectElement>("[name=zeal]")?.value) ?? 0;
            return zeal;
          },
      },
    },
    default: "yes",
  }).render(true);
}

function askZealPopupOption(zeal: int): string {
  const currentZeal = zeal ?? 0;
    return `
    <form>
    <div class="form-group">
        <label>Gained Zeal</label>
        <input type="number" name="zeal" value="${currentZeal}">
    </div>
    </form>
    `;
}

export {incrementZeal}