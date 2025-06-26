async function incrementZeal() {
  // get the selected actor and make sure there's only one selected
  const actors = canvas.tokens.controlled;
  if (actors.length != 1) {
    return ui.notifications.warn("Please select only one actor.");
  }

  selectedActor = actors[0];

  // next, check if the actor has the Zeal resource.
  const zealResourceIndex = selectedActor.rules.findIndex(rule => rule.slug === "zeal")
  if (!zealResourceIndex) {
    return ui.notifications.warn("Selected actor does not have the Zeal resource.");
  }

  const actorZeal = selectedActor.rules[zealResourceIndex].value ?? 0;
  const newZeal = showZealPopup(actorZeal);

  selectedActor.updateResource('zeal', newZeal);
}

function showZealPopup(actorZeal: int): int {
  new foundry.appv1.api.Dialog({
    title: "Award Zeal",
    content: askZealPopupOption(actorZeal),
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
        <label>New Zeal Amount</label>
        <input type="number" name="zeal" value="${currentZeal}">
    </div>
    </form>
    `;
}

export {incrementZeal}