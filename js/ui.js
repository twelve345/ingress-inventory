/**
 * UI rendering and DOM manipulation module for the Ingress Inventory Viewer
 * Handles all user interface updates, card generation, and state transitions
 */

/**
 * Shows the upload interface and hides inventory elements
 */
function showUploadInterface() {
  const uploadContainer = document.getElementById('uploadContainer');
  const titlePill = document.getElementById('totalPill');

  uploadContainer.style.display = 'flex';

  // Hide all inventory elements
  document.querySelectorAll('.inventory-hidden').forEach(el => {
    el.classList.add('inventory-hidden');
  });

  // Hide the total pill when no data
  if (titlePill) titlePill.style.display = 'none';
}

/**
 * Shows the inventory interface and hides upload elements
 */
function showInventoryInterface() {
  const uploadContainer = document.getElementById('uploadContainer');
  const titlePill = document.getElementById('totalPill');

  uploadContainer.style.display = 'none';

  // Show all inventory elements
  document.querySelectorAll('.inventory-hidden').forEach(el => {
    el.classList.remove('inventory-hidden');
  });

  // Show the total pill when data is loaded
  if (titlePill) titlePill.style.display = 'inline-flex';
}

/**
 * Updates the total count pill in the header
 * @param {number} count - Total item count to display
 */
function updateTotalCount(count) {
  const titlePill = document.getElementById('totalPill');
  if (titlePill) {
    titlePill.textContent = String(count);
  }
}

/**
 * Updates the summary text display
 * @param {string} text - Text to display in summary
 */
function updateSummary(text) {
  const summaryEl = document.getElementById('summary');
  if (summaryEl) {
    summaryEl.textContent = text;
  }
}

/**
 * Populates the rarity filter dropdown with available options
 * @param {Set} rarities - Set of available rarity values
 */
function populateRarityFilter(rarities) {
  const filterRarity = document.getElementById('filterRarity');
  if (!filterRarity) return;

  // Clear existing options and add default
  filterRarity.innerHTML = '<option value="">All rarities</option>';

  // Filter out VERY_COMMON and sort remaining
  const sortedRarities = [...rarities]
    .filter(r => r !== 'VERY_COMMON')
    .sort();

  sortedRarities.forEach(rarity => {
    const option = document.createElement('option');
    option.value = rarity;
    option.textContent = CONSTANTS.RARITY.LABELS[rarity] || rarity;
    filterRarity.appendChild(option);
  });
}

/**
 * Gets the current filter state from UI controls
 * @returns {Object} Current filter configuration
 */
function getCurrentFilters() {
  const filterRarity = document.getElementById('filterRarity');
  const hideCapsuledInput = document.getElementById('hideCapsuled');

  return {
    rarity: filterRarity ? filterRarity.value : '',
    hideCapsuled: hideCapsuledInput ? hideCapsuledInput.checked : false
  };
}

/**
 * Creates sort button for keys section
 * @param {string} labelActive - Function returning active label
 * @param {string} labelInactive - Inactive label
 * @param {boolean} isActive - Whether button is currently active
 * @param {Function} onToggle - Click handler
 * @returns {HTMLElement} Button element
 */
function createSortButton(labelActive, labelInactive, isActive, onToggle) {
  const button = document.createElement('button');
  button.className = 'sort-btn' + (isActive ? ' active' : '');
  button.textContent = isActive ? labelActive() : labelInactive;
  button.addEventListener('click', onToggle);
  return button;
}

/**
 * Creates keys search input with event handlers
 * @param {string} currentQuery - Current search query
 * @param {Function} onSearch - Search handler function
 * @returns {HTMLElement} Search input element
 */
function createKeySearchInput(currentQuery, onSearch) {
  const searchInput = document.createElement('input');
  searchInput.type = 'text';
  searchInput.id = 'keySearch';
  searchInput.className = 'key-search';
  searchInput.placeholder = 'Search keys...';
  searchInput.value = currentQuery;

  // Use debounced search handler
  const debouncedSearch = UTILS.debounce(onSearch, CONSTANTS.UI_CONFIG.SEARCH_DEBOUNCE_MS);
  searchInput.addEventListener('input', debouncedSearch);

  return searchInput;
}

/**
 * Creates count pill overlay for items
 * @param {number} count - Number to display
 * @returns {HTMLElement} Count pill element
 */
function createCountPill(count) {
  const pill = document.createElement('span');
  pill.className = 'count-pill';
  pill.textContent = String(count);
  return pill;
}

/**
 * Creates capsule storage indicator icon
 * @returns {HTMLElement} Capsule icon element
 */
function createCapsuleIcon() {
  const icon = document.createElement('div');
  icon.className = 'capsule-icon';
  icon.textContent = '📦';
  return icon;
}

/**
 * Creates diamond indicators for mod rarity
 * @param {Object} config - Diamond configuration {count, color}
 * @returns {HTMLElement} Diamond strip element
 */
function createDiamondStrip(config) {
  const strip = document.createElement('div');
  strip.className = 'diamond-strip';

  for (let i = 0; i < config.count; i++) {
    const diamond = document.createElement('span');
    diamond.className = `diamond ${config.color}`;
    strip.appendChild(diamond);
  }

  return strip;
}

/**
 * Creates title pill overlay for compact items
 * @param {string} text - Title text to display
 * @param {boolean} isMedia - Whether this is for media items (centered)
 * @returns {HTMLElement} Title pill element
 */
function createTitlePill(text, isMedia = false) {
  const pill = document.createElement('span');
  pill.className = isMedia ? 'img-title-pill media' : 'img-title-pill';
  pill.textContent = text;
  return pill;
}

/**
 * Finds appropriate image URL for an item
 * @param {Object} meta - Item metadata
 * @returns {string|null} Image URL or null if none found
 */
function findImage(meta) {
  const { ASSET_PATHS } = CONSTANTS;

  // Prefer explicit/remote images first
  if (meta.imageByUrl?.imageUrl) {
    return meta.imageByUrl.imageUrl.replace(/^http:/, 'https:');
  }

  if (meta.portalCoupler?.portalImageUrl) {
    return meta.portalCoupler.portalImageUrl.replace(/^http:/, 'https:');
  }

  if (meta.storyItem?.primaryUrl?.match(/\.(png|jpg|jpeg|gif)$/i)) {
    return meta.storyItem.primaryUrl;
  }

  // Helper for rarity filenames
  const rarityName = (rarity) => {
    const rarityMap = {
      'COMMON': 'Common',
      'RARE': 'Rare',
      'VERY_RARE': 'Very_Rare'
    };
    return rarityMap[rarity] || null;
  };

  // Level-based items
  if (meta.resourceWithLevels?.resourceType) {
    const type = meta.resourceWithLevels.resourceType;
    const level = meta.resourceWithLevels.level;

    if (ASSET_PATHS.LEVEL_ITEMS[type] && level) {
      return ASSET_PATHS.LEVEL_ITEMS[type](level);
    }
  }

  // Mod items
  if (meta.modResource?.resourceType) {
    const type = meta.modResource.resourceType;
    const rarity = rarityName(meta.modResource.rarity);

    // Handle special shields
    if (type === 'EXTRA_SHIELD') {
      const name = (meta.modResource.displayName || '').toLowerCase();
      if (name.includes('aegis')) return ASSET_PATHS.SPECIAL_ITEMS.AEGIS_SHIELD;
      if (name.includes('axa')) return ASSET_PATHS.SPECIAL_ITEMS.AXA_SHIELD;
      return 'assets/images/Portal_Shield_Very_Rare.webp'; // Fallback
    }

    // Handle rarity-based mods
    if (ASSET_PATHS.MOD_ITEMS[type] && rarity) {
      return ASSET_PATHS.MOD_ITEMS[type](rarity);
    }

    // Handle special items
    const specialKey = type.replace('_', '_').toUpperCase();
    if (ASSET_PATHS.SPECIAL_ITEMS[specialKey]) {
      return ASSET_PATHS.SPECIAL_ITEMS[specialKey];
    }
  }

  // Capsules
  if (meta.resource?.resourceType) {
    const type = meta.resource.resourceType;
    const rarity = meta.resource.resourceRarity || '';

    if (type === 'CAPSULE') return ASSET_PATHS.SPECIAL_ITEMS.CAPSULE;
    if (type === 'KEY_CAPSULE') return ASSET_PATHS.SPECIAL_ITEMS.KEY_CAPSULE;

    if (type === 'KINETIC_CAPSULE') {
      return rarity === 'RARE' ?
             ASSET_PATHS.SPECIAL_ITEMS.KINETIC_CAPSULE_RARE :
             ASSET_PATHS.SPECIAL_ITEMS.KINETIC_CAPSULE;
    }
  }

  // Portal Powerups
  if (meta.resource?.resourceType === 'PORTAL_POWERUP') {
    const designation = meta.timedPowerupResource?.designation;

    if (designation === 'FRACK') return ASSET_PATHS.SPECIAL_ITEMS.PORTAL_FRACKER;

    // Handle beacons
    if (ASSET_PATHS.BEACONS[designation]) {
      return `assets/images/${ASSET_PATHS.BEACONS[designation]}`;
    }

    // Battle Beacon
    if (designation === 'BB_BATTLE') {
      const rarity = meta.resource?.resourceRarity || '';
      return ASSET_PATHS.BATTLE_BEACONS[rarity] || ASSET_PATHS.BATTLE_BEACONS.VERY_RARE;
    }
  }

  // Player Powerups
  if (meta.resource?.resourceType === 'PLAYER_POWERUP') {
    const powerupEnum = meta.playerPowerupResource?.playerPowerupEnum;
    if (powerupEnum === 'APEX') return ASSET_PATHS.SPECIAL_ITEMS.APEX;
  }

  // Flip Cards
  if (meta.resource?.resourceType === 'FLIP_CARD') {
    const flipType = meta.flipCard?.flipCardType;
    if (flipType === 'ADA') return ASSET_PATHS.SPECIAL_ITEMS.ADA;
    if (flipType === 'JARVIS') return ASSET_PATHS.SPECIAL_ITEMS.JARVIS;
  }

  // Boosted Power Cube
  if (meta.resource?.resourceType === 'BOOSTED_POWER_CUBE') {
    return ASSET_PATHS.SPECIAL_ITEMS.LAWSON_CUBE;
  }

  return null;
}

/**
 * Creates thumbnail element for an item
 * @param {Object} meta - Item metadata
 * @param {string} itemId - Item ID for fallback display
 * @returns {HTMLElement} Thumbnail div element
 */
function createThumbnail(meta, itemId) {
  const thumb = document.createElement('div');
  thumb.className = 'thumb';

  const imgUrl = findImage(meta);

  if (imgUrl) {
    const img = document.createElement('img');
    img.src = imgUrl;
    img.alt = itemId;
    thumb.appendChild(img);
  } else {
    // Use placeholder for keys, fallback text for others
    const isKey = !!(meta.portalCoupler?.portalTitle);

    if (isKey) {
      const img = document.createElement('img');
      img.src = CONSTANTS.ASSET_PATHS.NO_PHOTO;
      img.alt = 'No photo available';
      thumb.appendChild(img);
    } else {
      thumb.textContent = itemId.slice(0, 6);
      thumb.style.color = 'var(--muted)';
      thumb.style.fontSize = '13px';
    }
  }

  return thumb;
}

/**
 * Creates metadata section for full-size item cards
 * @param {string} title - Item title
 * @param {Object} meta - Item metadata
 * @param {Array} items - All items in this group
 * @param {string} displayType - Type category
 * @param {Object} userLocation - User's location for distance calc
 * @returns {HTMLElement} Metadata div element
 */
function createMetadata(title, meta, items, displayType, userLocation) {
  const metaDiv = document.createElement('div');
  metaDiv.className = 'meta';

  const titleEl = document.createElement('h3');
  titleEl.textContent = title;
  metaDiv.appendChild(titleEl);

  const small = document.createElement('div');
  small.className = 'small';

  const infoItems = [];

  // Add portal address for keys
  if (meta.portalCoupler?.portalAddress) {
    infoItems.push(meta.portalCoupler.portalAddress);
  }

  let infoHtml = infoItems.filter(Boolean).join(' · ');

  // Add acquisition timestamp for keys
  if (displayType === 'Keys') {
    try {
      const lastTs = Array.isArray(items) ?
                    items.reduce((max, item) => Math.max(max, Number(item.ts) || 0), 0) : 0;

      if (lastTs > 0) {
        infoHtml += (infoHtml ? '<br>' : '') + `Last Acquired: ${UTILS.formatLocalTs(lastTs)}`;
      }
    } catch (error) {
      // Timestamp formatting failed - skip display
    }
  }

  // Add distance information for keys
  if (displayType === 'Keys' && userLocation && meta.portalCoupler?.portalLocation) {
    const location = UTILS.decodePortalLocation(meta.portalCoupler.portalLocation);
    if (location) {
      const km = UTILS.haversineKm(
        userLocation.lat,
        userLocation.lon,
        location.lat,
        location.lon
      );
      const miles = UTILS.kmToMiles(km);
      infoHtml += (infoHtml ? '<br>' : '') +
                  `Distance: ${km.toFixed(2)}km / ${miles.toFixed(2)} miles`;
    }
  }

  small.innerHTML = infoHtml;
  metaDiv.appendChild(small);

  // Add tags container (currently unused but preserved for future use)
  const tags = document.createElement('div');
  tags.className = 'tags';
  metaDiv.appendChild(tags);

  return metaDiv;
}

/**
 * Creates a single item card
 * @param {Object} params - Card parameters
 * @returns {HTMLElement} Card article element
 */
function createItemCard({
  groupKey,
  groupValue,
  hideCapsuled,
  displayType,
  userLocation
}) {
  const { items, gmeta } = groupValue;

  // Sort by timestamp and select representative item
  const preferred = hideCapsuled ?
                   items.filter(item => !UTILS.isCapsuled(item.meta)) :
                   items;

  const repList = preferred.length ? preferred : items;
  repList.sort((a, b) => Number(b.ts) - Number(a.ts));
  const representative = repList[0];

  const { id, ts, meta } = representative;

  // Create card element
  const card = document.createElement('article');
  card.className = 'card';

  // Determine card type for styling
  const isPowerup = gmeta.displayType === 'Powerups';
  const isCapsules = gmeta.displayType === 'Capsules';
  const isOverlayType = ['Resonators', 'Weapons', 'Cubes'].includes(gmeta.displayType);
  const isMod = gmeta.displayType === 'Mods';
  const isMedia = gmeta.displayType === 'Media';

  const isCompact = isPowerup || isCapsules || isOverlayType || isMod || isMedia;
  if (isCompact) card.classList.add('compact');

  // Create thumbnail
  const thumb = createThumbnail(meta, id);

  // Add overlays and indicators
  if (meta._storedIn) {
    thumb.appendChild(createCapsuleIcon());
  }

  if (items.length > 1) {
    thumb.appendChild(createCountPill(items.length));
  }

  // Add type-specific overlays
  if (isOverlayType) {
    const label = (groupKey.split('|')[0] || '').replace(/^L/, '');
    thumb.appendChild(createTitlePill(label));
  }

  if (isMedia) {
    const mediaTitle = groupKey.split('|')[0] || '';
    thumb.appendChild(createTitlePill(mediaTitle, true));
  }

  if (isMod) {
    const diamondConfig = UTILS.getModDiamondConfig(meta);
    if (diamondConfig) {
      thumb.appendChild(createDiamondStrip(diamondConfig));
    }
  }

  card.appendChild(thumb);

  // Add metadata section for full-size cards
  if (!isCompact) {
    const metaDiv = createMetadata(
      groupKey.split('|')[0],
      meta,
      items,
      displayType,
      userLocation
    );
    card.appendChild(metaDiv);
  }

  return card;
}

/**
 * Renders the complete inventory display
 * @param {Map} typeBuckets - Grouped inventory data
 * @param {Object} options - Rendering options
 */
function renderInventory(typeBuckets, options = {}) {
  const {
    filters = {},
    sortConfig = {},
    userLocation = null,
    keySearchQuery = ''
  } = options;

  const itemsEl = document.getElementById('items');
  if (!itemsEl) return;

  // Clear existing content
  itemsEl.innerHTML = '';

  const typeOrder = CONSTANTS.SORT_CONFIG.TYPE_ORDER;

  for (const displayType of typeOrder) {
    if (!typeBuckets.has(displayType)) continue;

    const grouped = typeBuckets.get(displayType);
    let entries = Array.from(grouped.entries());

    // Sort entries based on type-specific rules
    entries = DATA.sortTypeGroups(entries, displayType, sortConfig, userLocation);

    // Apply hide capsuled filter
    const displayedEntries = entries.filter(([key, groupValue]) => {
      return !filters.hideCapsuled ||
             groupValue.items.some(item => !UTILS.isCapsuled(item.meta));
    });

    if (displayedEntries.length === 0) continue;

    // Create section
    const section = document.createElement('section');
    section.className = `type-section type-${displayType.toLowerCase()}`;

    // Create section header
    const header = document.createElement('h2');
    const sectionCount = entries.reduce((sum, entry) => sum + entry[1].items.length, 0);
    header.textContent = displayType;

    // Add count pill to header
    const pill = document.createElement('span');
    pill.textContent = String(sectionCount);
    pill.style.cssText = 'background: var(--accent); color: white; padding: 2px 6px; border-radius: 999px; font-size: 11px; margin-left: 8px;';
    header.appendChild(pill);

    // Add sort buttons for keys
    if (displayType === 'Keys') {
      addKeySortButtons(header, sortConfig);
    }

    section.appendChild(header);

    // Add search input for keys
    if (displayType === 'Keys') {
      const searchInput = createKeySearchInput(keySearchQuery, (event) => {
        // Search handler will be connected in app.js
        const searchEvent = new CustomEvent('keySearch', {
          detail: { query: event.target.value }
        });
        document.dispatchEvent(searchEvent);
      });
      section.appendChild(searchInput);

      // Focus and restore selection if needed
      if (options.keySearchShouldRefocus) {
        setTimeout(() => {
          const keySearch = document.getElementById('keySearch');
          if (keySearch) {
            keySearch.focus();
            if (options.keySearchSelection?.length === 2) {
              try {
                keySearch.setSelectionRange(
                  options.keySearchSelection[0],
                  options.keySearchSelection[1]
                );
              } catch (error) {
                // Selection restore failed - continue without it
              }
            }
          }
        }, 0);
      }
    }

    // Render cards
    let cardsAdded = 0;
    for (const [groupKey, groupValue] of displayedEntries) {
      // Apply key search filter
      if (displayType === 'Keys' && keySearchQuery) {
        // Create temporary card to check text content
        const tempCard = createItemCard({
          groupKey,
          groupValue,
          hideCapsuled: filters.hideCapsuled,
          displayType,
          userLocation
        });

        const matches = tempCard.textContent.toLowerCase().includes(keySearchQuery.toLowerCase());
        if (!matches) continue;
      }

      const card = createItemCard({
        groupKey,
        groupValue,
        hideCapsuled: filters.hideCapsuled,
        displayType,
        userLocation
      });

      section.appendChild(card);
      cardsAdded++;
    }

    if (cardsAdded > 0) {
      itemsEl.appendChild(section);
    }
  }
}

/**
 * Adds sort buttons to keys section header
 * @param {HTMLElement} header - Header element to add buttons to
 * @param {Object} sortConfig - Current sort configuration
 */
function addKeySortButtons(header, sortConfig) {
  const { mode = 'alpha', directions = {} } = sortConfig;

  // Alpha sort button
  const alphaBtn = createSortButton(
    () => directions.alpha === 'desc' ? 'Z-A' : 'A-Z',
    'Alphabetical',
    mode === 'alpha',
    () => {
      const newDirection = mode === 'alpha' ?
                           (directions.alpha === 'asc' ? 'desc' : 'asc') : 'asc';
      const event = new CustomEvent('sortChange', {
        detail: { mode: 'alpha', direction: newDirection }
      });
      document.dispatchEvent(event);
    }
  );
  header.appendChild(alphaBtn);

  // Count sort button
  const countBtn = createSortButton(
    () => directions.count === 'desc' ? 'Most→Least' : 'Least→Most',
    'Count',
    mode === 'count',
    () => {
      const newDirection = mode === 'count' ?
                           (directions.count === 'asc' ? 'desc' : 'asc') : 'asc';
      const event = new CustomEvent('sortChange', {
        detail: { mode: 'count', direction: newDirection }
      });
      document.dispatchEvent(event);
    }
  );
  header.appendChild(countBtn);

  // Time sort button
  const timeBtn = createSortButton(
    () => directions.time === 'desc' ? 'Youngest→Oldest' : 'Oldest→Youngest',
    'Acquired',
    mode === 'time',
    () => {
      const newDirection = mode === 'time' ?
                           (directions.time === 'asc' ? 'desc' : 'asc') : 'asc';
      const event = new CustomEvent('sortChange', {
        detail: { mode: 'time', direction: newDirection }
      });
      document.dispatchEvent(event);
    }
  );
  header.appendChild(timeBtn);

  // Distance sort button
  const distBtn = createSortButton(
    () => directions.distance === 'desc' ? 'Farthest→Closest' : 'Closest→Farthest',
    'Distance',
    mode === 'distance',
    () => {
      const newDirection = mode === 'distance' ?
                           (directions.distance === 'asc' ? 'desc' : 'asc') : 'asc';
      const event = new CustomEvent('sortChange', {
        detail: { mode: 'distance', direction: newDirection }
      });
      document.dispatchEvent(event);
    }
  );
  header.appendChild(distBtn);
}

// Export all UI functions
if (typeof module !== 'undefined' && module.exports) {
  // Node.js environment
  module.exports = {
    showUploadInterface,
    showInventoryInterface,
    updateTotalCount,
    updateSummary,
    populateRarityFilter,
    getCurrentFilters,
    renderInventory,
    createItemCard
  };
} else {
  // Browser environment - attach to window
  window.UI = {
    showUploadInterface,
    showInventoryInterface,
    updateTotalCount,
    updateSummary,
    populateRarityFilter,
    getCurrentFilters,
    renderInventory,
    createItemCard
  };
}