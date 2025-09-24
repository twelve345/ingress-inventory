/**
 * Configuration constants and mappings for the Ingress Inventory Viewer
 * Centralizes all magic values and type definitions
 */

// Item Type Classifications
const ITEM_TYPES = {
  DISPLAY_TYPES: {
    RESONATORS: 'Resonators',
    KEYS: 'Keys',
    MEDIA: 'Media',
    POWERUPS: 'Powerups',
    CAPSULES: 'Capsules',
    MODS: 'Mods',
    WEAPONS: 'Weapons',
    CUBES: 'Cubes'
  },

  // Raw resource types mapped to display categories
  MOD_TYPES: [
    'EXTRA_SHIELD', 'RES_SHIELD', 'HEATSINK', 'LINK_AMPLIFIER',
    'MULTIHACK', 'TRANSMUTER_ATTACK', 'TURRET', 'ULTRA_LINK_AMP', 'FORCE_AMP'
  ],

  WEAPON_TYPES: ['EMP_BURSTER', 'FLIP_CARD', 'ULTRA_STRIKE'],

  CUBE_TYPES: ['POWER_CUBE', 'BOOSTED_POWER_CUBE'],

  CAPSULE_TYPES: [
    'CAPSULE', 'KEY_CAPSULE', 'KINETIC_CAPSULE',
    'QUANTUM_CAPSULE', 'INTEREST_CAPSULE'
  ]
};

// Rarity System
const RARITY = {
  LABELS: {
    'COMMON': 'Common',
    'RARE': 'Rare',
    'VERY_RARE': 'Very Rare'
  },

  ABBREVIATIONS: {
    'VERY_RARE': 'VR',
    'RARE': 'R',
    'COMMON': 'C'
  },

  SORT_ORDER: {
    'VERY_RARE': 3,
    'RARE': 2,
    'COMMON': 1,
    '': 0
  }
};

// Sorting Configurations
const SORT_CONFIG = {
  // Preferred display order for type sections
  TYPE_ORDER: ['Keys', 'Cubes', 'Weapons', 'Resonators', 'Mods', 'Powerups', 'Capsules', 'Media'],

  // Weapon type ordering
  WEAPON_ORDER: {
    'EMP_BURSTER': 0,
    'ULTRA_STRIKE': 1,
    'FLIP_CARD': 2
  },

  // Mod type ordering for consistent display
  MOD_ORDER: {
    'RES_SHIELD': 0,
    'EXTRA_SHIELD': 0,
    'HEATSINK': 1,
    'MULTIHACK': 2,
    'LINK_AMPLIFIER': 3,
    'TRANSMUTER_ATTACK': 4,
    'TRANSMUTER_DEFENSE': 4,
    'TURRET': 5,
    'FORCE_AMP': 6
  }
};

// UI Configuration
const UI_CONFIG = {
  // File input settings
  ACCEPTED_FILE_TYPES: ['.json'],
  ACCEPTED_MIME_TYPES: ['application/json'],

  // Search debouncing
  SEARCH_DEBOUNCE_MS: 300,

  // Geolocation settings
  GEOLOCATION_OPTIONS: {
    enableHighAccuracy: true,
    maximumAge: 600000, // 10 minutes
    timeout: 10000 // 10 seconds
  },

  // Distance calculations
  EARTH_RADIUS_KM: 6371,
  KM_TO_MILES_FACTOR: 0.621371
};

// JSON Validation
const JSON_VALIDATION = {
  // Valid control characters for JSON (tab, newline, carriage return)
  VALID_CONTROL_CHARS: new Set([9, 10, 13]),

  // Minimum printable ASCII character
  MIN_PRINTABLE_CHAR: 32
};

// Image Asset Mappings
const ASSET_PATHS = {
  // Placeholder image
  NO_PHOTO: 'assets/images/no_photo.png',

  // Level-based item templates
  LEVEL_ITEMS: {
    'EMP_BURSTER': (level) => `assets/images/XMP_Burster_L${level}.webp`,
    'ULTRA_STRIKE': (level) => `assets/images/Ultra_Strike_L${level}.webp`,
    'POWER_CUBE': (level) => `assets/images/Power_Cube_L${level}.webp`,
    'EMITTER_A': (level) => `assets/images/Resonator_L${level}.webp`
  },

  // Rarity-based mod templates
  MOD_ITEMS: {
    'RES_SHIELD': (rarity) => `assets/images/Portal_Shield_${rarity}.webp`,
    'HEATSINK': (rarity) => `assets/images/Heat_Sink_${rarity}.webp`,
    'MULTIHACK': (rarity) => `assets/images/Multi-Hack_${rarity}.webp`,
    'LINK_AMPLIFIER': (rarity) => `assets/images/Link_Amp_${rarity}.webp`
  },

  // Special items with fixed paths
  SPECIAL_ITEMS: {
    'AEGIS_SHIELD': 'assets/images/Aegis_Shield.webp',
    'AXA_SHIELD': 'assets/images/AXA_Shield.webp',
    'ULTRA_LINK_AMP': 'assets/images/SoftBank_Ultra_Link.webp',
    'FORCE_AMP': 'assets/images/Force_Amp.webp',
    'TURRET': 'assets/images/Turret.webp',
    'TRANSMUTER_ATTACK': 'assets/images/ITO_EN_Transmuter_plus.webp',
    'TRANSMUTER_DEFENSE': 'assets/images/ITO_EN_Transmuter_minus.webp',
    'CAPSULE': 'assets/images/Capsule_Prime.webp',
    'KEY_CAPSULE': 'assets/images/Prime-White-Key_Locker.webp',
    'KINETIC_CAPSULE': 'assets/images/Prime-Kinetic_Capsule.webp',
    'KINETIC_CAPSULE_RARE': 'assets/images/Prime-Rare_Kinetic_Capsule.webp',
    'PORTAL_FRACKER': 'assets/images/Portal_Fracker.webp',
    'APEX': 'assets/images/Apex.webp',
    'ADA': 'assets/images/ADA_Refactor.webp',
    'JARVIS': 'assets/images/JARVIS_Virus.webp',
    'LAWSON_CUBE': 'assets/images/Lawson_Power_Cube.webp'
  },

  // Beacon mappings
  BEACONS: {
    'AEGISNOVA': 'Beacon-Aegis_Nova.webp',
    'VIALUX': 'Beacon-Via_Lux.webp',
    'VIANOIR': 'Beacon-Via_Noir.webp',
    'NEMESIS': 'Beacon-Nemesis.webp',
    'NIA': 'Beacon-Niantic.webp',
    'BN_BLM': 'Beacon-BLM.webp',
    'BN_MHN_LOGO': 'Beacon-MHN_Logo.webp',
    'BN_MHN_PALICO': 'Beacon-MHN_Palico.webp',
    'ENL': 'Beacon-Enlightened.webp',
    'FW_ENL': 'Firework_ENL.webp',
    'RES': 'Beacon-Resistance.webp',
    'FW_RES': 'Firework_RES.webp',
    'MEET': 'Beacon-Meetup.webp',
    'OBSIDIAN': 'Beacon-Obsidian.webp',
    'EXO5': 'Beacon-EXO5.webp',
    'PEACE': 'Beacon-Peace.webp',
    'REAWAKENS': 'Beacon-Reawakens.webp',
    'TOASTY': 'Beacon-Toast.webp',
    'LOOK': 'Beacon-Target.webp',
    'TARGET': 'Beacon-Target.webp'
  },

  // Battle Beacon variants
  BATTLE_BEACONS: {
    'RARE': 'assets/images/Battle_Beacon_Rare.webp',
    'VERY_RARE': 'assets/images/Battle_Beacon_Very_Rare.webp'
  }
};

// Mod Visual Configurations
const MOD_VISUALS = {
  // Diamond indicator configurations for mods
  DIAMOND_CONFIG: {
    AEGIS_AXA: { count: 4, color: 'pink' },
    VERY_RARE: { count: 3, color: 'pink' },
    RARE: { count: 2, color: 'purple' },
    COMMON: { count: 1, color: 'teal' }
  }
};

// Export all constants for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  // Node.js environment
  module.exports = {
    ITEM_TYPES,
    RARITY,
    SORT_CONFIG,
    UI_CONFIG,
    JSON_VALIDATION,
    ASSET_PATHS,
    MOD_VISUALS
  };
} else {
  // Browser environment - attach to window
  window.CONSTANTS = {
    ITEM_TYPES,
    RARITY,
    SORT_CONFIG,
    UI_CONFIG,
    JSON_VALIDATION,
    ASSET_PATHS,
    MOD_VISUALS
  };
}