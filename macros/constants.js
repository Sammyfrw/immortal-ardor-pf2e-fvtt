// Dervish Class Feature IDs
const ZEALOUS_STRIKES_UUID = "Compendium.immortal-ardor.classes.Item.kyVzYnHM3QAqr0O8";

// Dervish Meditation Spell Effect IDs
const EFFECT_ZEPHYR_MEDITATION_UUID = "Compendium.immortal-ardor.classes.Item.5KFOBoXHsqbKQSm8";
const EFFECT_MOONBLINK_MEDITATION_UUID = "Compendium.immortal-ardor.classes.Item.H5u44a2JUR3VGyiD";
const EFFECT_FLAMEDANCE_MEDITATION_UUID = "Compendium.immortal-ardor.classes.Item.E0TUYubcShRv1QCm";
const EFFECT_DRAGONFLIGHT_MEDITATION_UUID = "Compendium.immortal-ardor.classes.Item.9FCi2gavNTTeUIYm";
const EFFECT_SPELLBOUND_MEDITATION_UUID = "Compendium.immortal-ardor.classes.Item.u7nwxGLCR0KtXy1x";
const EFFECT_SPRINGWATER_MEDITATION_UUID = "Compendium.immortal-ardor.classes.Item.HEWk9NsHFIIfgcq8"; 
const EFFECT_AXIOM_MEDITATION_UUID = "Compendium.immortal-ardor.classes.Item.OMdYN9zZJ5bDjKxV";
const EFFECT_ENTROPY_MEDITATION_UUID = "Compendium.immortal-ardor.classes.Item.Kt3l4l8GX8ZddpvQ";
const EFFECT_LIFECYCLE_MEDITATION_UUID = "Compendium.immortal-ardor.classes.Item.XTOLhIfDPSascIml";

const meditationEffectSourceIDs = new Set([
	EFFECT_ZEPHYR_MEDITATION_UUID,
	EFFECT_MOONBLINK_MEDITATION_UUID,
	EFFECT_FLAMEDANCE_MEDITATION_UUID,
	EFFECT_DRAGONFLIGHT_MEDITATION_UUID,
	EFFECT_SPELLBOUND_MEDITATION_UUID,
	EFFECT_SPRINGWATER_MEDITATION_UUID,
	EFFECT_AXIOM_MEDITATION_UUID,
	EFFECT_ENTROPY_MEDITATION_UUID,
	EFFECT_LIFECYCLE_MEDITATION_UUID
]);

const DERVISH_MAX_ZEAL = 5;

export {
	meditationEffectSourceIDs,
	DERVISH_MAX_ZEAL,
	ZEALOUS_STRIKES_UUID
};
