/**
 * D.XENO.EXE Anime Character Universe & Encyclopedia
 * Full profiles, powers, weapon lore, animated radar stats, comparison tool & favorites.
 */

const ANIME_CHARACTERS = [
  {
    id: 'jinwoo',
    name: 'Sung Jin-Woo',
    series: 'Solo Leveling',
    category: 'Solo Leveling',
    title: 'The Shadow Monarch / Sovereign of the Dead',
    rank: 'Sovereign',
    accentColor: '#a855f7',
    iconSymbol: '⚔️',
    gradient: 'linear-gradient(135deg, #3b0764, #7e22ce, #00f0ff)',
    summary: 'The weakest E-Rank hunter who awakened the mysterious System and ascended to become the absolute Ruler of Shadows.',
    stats: { attack: 99, defense: 95, speed: 98, mana: 100, shadowPower: 100 },
    bio: 'Originally dubbed "Humanity\'s Weakest Hunter," Sung Jin-Woo survived the terrifying Double Dungeon trial by deciphering the Commandments of the Cartenon Temple. Selected as the player for the System, he leveled up indefinitely until inheriting the mantle of Ashborn, the original Shadow Monarch.',
    personality: 'Calm, calculated, ruthlessly efficient against lethal adversaries, yet intensely devoted to protecting his family, his comrades, and humanity.',
    powers: [
      { name: 'Shadow Extraction (Arise)', desc: 'Extracts mana-imbued shadows from fallen enemies to form an immortal loyal army.' },
      { name: 'Ruler\'s Authority', desc: 'A telekinetic force of absolute command that manipulates physical objects and enemies at will.' },
      { name: 'Domain of the Monarch', desc: 'Expands a field of pure shadow beneath allies, granting a massive 50% power amplification.' },
      { name: 'Shadow Exchange', desc: 'Instantaneous teleportation between any deployed shadow soldier regardless of distance.' }
    ],
    weapons: ['Kamish\'s Wrath (Twin Shortswords)', 'Demon King\'s Longsword', 'Rasaka\'s Poison Fang', 'Knight Killer'],
    story: 'After defying death in the subterranean altar, Jin-Woo trained relentlessly through penalty zones and instant dungeons. He repelled the Monarch invasions, united hunters across Earth, and reversed time with the Cup of Reincarnation to wage a solo war across dimensional rifts.',
    achievements: ['Soloed Jeju Island S-Rank Ant Calamity', 'Defeated the Monarch of Destruction Antares', 'Commanded an immortal legion of over 10,000,000 shadows'],
    strengths: ['Infinite stamina and instant shadow regeneration', 'Mastery over spatial teleportation', 'Undetectable stealth and sensory awareness'],
    weaknesses: ['Vulnerable when mana pool is completely suppressed by higher divine forces'],
    trivia: 'He drinks ordinary black coffee without sugar while analyzing dungeon clearance logistics.'
  },
  {
    id: 'luffy',
    name: 'Monkey D. Luffy',
    series: 'One Piece',
    category: 'Shonen Legends',
    title: 'Emperor of the Sea / Sun God Nika',
    rank: 'Emperor',
    accentColor: '#f59e0b',
    iconSymbol: '🍖',
    gradient: 'linear-gradient(135deg, #78350f, #d97706, #fef08a)',
    summary: 'Captain of the Straw Hat Pirates, wielding the legendary Mythical Zoan Hito Hito no Mi, Model: Nika with limitless freedom.',
    stats: { attack: 98, defense: 96, speed: 94, mana: 88, shadowPower: 70 },
    bio: 'Born in Foosha Village, Luffy set sail to find Gol D. Roger\'s legendary treasure and claim the title of Pirate King. Through relentless tenacity, he awakened his devil fruit into the Drums of Liberation.',
    personality: 'Carefree, courageous, fiercely loyal to friends, driven by an unyielding desire for complete freedom.',
    powers: [
      { name: 'Gear 5 (Sun God Nika)', desc: 'Transforms his rubber body with cartoon-like physics, turning the environment and foes elastic.' },
      { name: 'Advanced Conqueror\'s Haki', desc: 'Infuses his blows with supreme spiritual conqueror will, striking without physical contact.' },
      { name: 'Future Sight Observation Haki', desc: 'Perceives several seconds into the immediate future to evade fatal ambushes.' }
    ],
    weapons: ['Fists of the Sun God', 'Giant Gomu Gomu Gatling', 'Straw Hat of Shanks'],
    story: 'From the East Blue to the Grand Line and the New World, Luffy brought down Warlords of the Sea and toppled Emperors Kaido and Big Mom at the Raid on Onigashima.',
    achievements: ['Defeated Kaido, the Strongest Creature Alive', 'Earned a 3,000,000,000 Berry bounty', 'Liberated Wano Country, Dressrosa, and Alabasta'],
    strengths: ['Immunity to blunt trauma and lightning', 'Unbreakable indomitable will', 'Befriends allies wherever he journeys'],
    weaknesses: ['Submersion in seawater completely drains strength; vulnerable to slashing attacks'],
    trivia: 'Can consume an entire banquet of roasted meat in under two minutes while asleep.'
  },
  {
    id: 'guts',
    name: 'Guts',
    series: 'Berserk',
    category: 'Dark Fantasy',
    title: 'The Black Swordsman / The Struggler',
    rank: 'S-Rank Elite',
    accentColor: '#e11d48',
    iconSymbol: '🗡️',
    gradient: 'linear-gradient(135deg, #4c0519, #9f1239, #020617)',
    summary: 'A solitary mercenary branded for sacrifice who defies fate and gods with sheer human willpower and his colossal Dragon Slayer sword.',
    stats: { attack: 96, defense: 94, speed: 89, mana: 72, shadowPower: 86 },
    bio: 'Born from a corpse beneath a hanging tree, Guts grew up on blood-soaked battlefields. After the catastrophic Eclipse where his commander Griffith sacrificed the Band of the Hawk, Guts embarked on a solitary crusade against the God Hand.',
    personality: 'Stoic, battle-hardened, pragmatic, possessing an indomitable soul that refuses to yield to despair or supernatural deities.',
    powers: [
      { name: 'Berserker Armor Resonance', desc: 'Ancient cursed armor that removes human pain inhibitors, reinforcing bones with iron spikes.' },
      { name: 'Indomitable Human Will', desc: 'Survives lethal supernatural curses purely through relentless physical tenacity.' },
      { name: 'Prosthetic Cannon Fist', desc: 'Concealed explosive cannon built into his mechanical left arm for point-blank decimation.' }
    ],
    weapons: ['Dragon Slayer (Colossal Iron Slab)', 'Arm Cannon', 'Repeating Crossbow', 'Throwing Knives'],
    story: 'Wandering through the darkest shadows of Midland, Guts hunts apostles while shielding the traumatized Casca from demonic wraiths drawn to their Brands of Sacrifice.',
    achievements: ['Slew 100 soldiers in a single night', 'Cleaved massive demonic Apostles in two', 'Survived the Eclipse event intact'],
    strengths: ['Unmatched raw physical durability', 'Battle sense honed through thousands of skirmishes'],
    weaknesses: ['Berserker armor causes severe internal hemorrhaging and blindness if unsuppressed'],
    trivia: 'His Dragon Slayer sword has slain so many demonic beings that it permanently exists simultaneously in physical and astral planes.'
  },
  {
    id: 'gojo',
    name: 'Satoru Gojo',
    series: 'Jujutsu Kaisen',
    category: 'Supernatural',
    title: 'The Honored One / Special Grade Sorcerer',
    rank: 'Sovereign',
    accentColor: '#00f0ff',
    iconSymbol: '👁️',
    gradient: 'linear-gradient(135deg, #082f49, #0284c7, #38bdf8)',
    summary: 'The undisputed strongest modern jujutsu sorcerer, possessing the hereditary Six Eyes and the Limitless spatial manipulation cursed technique.',
    stats: { attack: 99, defense: 100, speed: 99, mana: 99, shadowPower: 92 },
    bio: 'Born into the Gojo Clan, Satoru altered the cosmic balance of the entire jujutsu world at birth. As a teacher at Tokyo Jujutsu High, he nurtures new generations to overthrow corrupt conservative leadership.',
    personality: 'Playful, confident, borderline arrogant yet fiercely protective of his students and youthful innocence.',
    powers: [
      { name: 'Infinity (Neutral Limitless)', desc: 'Creates an infinite paradox barrier where oncoming attacks slow down asymptotically and never reach him.' },
      { name: 'Hollow Technique: Purple', desc: 'Merges Red (Convergence) and Blue (Divergence) into an imaginary mass that erases matter in its trajectory.' },
      { name: 'Domain Expansion: Unlimited Void', desc: 'Traps targets within the center of infinite sensory data, completely paralyzing brain cognition.' }
    ],
    weapons: ['Six Eyes Perception', 'Inverted Spear of Heaven (formerly)', 'Black Flash Mastery'],
    story: 'Gojo neutralized countless disaster curses, sealed the Shibuya disaster epicenter, and clashed in an earth-shattering showdown against the King of Curses Sukuna.',
    achievements: ['Bore the title of The Strongest Sorcerer for decades', 'Mastered Reverse Cursed Technique while at the brink of death'],
    strengths: ['Untouchable absolute defensive barrier', 'Near-zero cursed energy consumption thanks to Six Eyes'],
    weaknesses: ['Over-reliance on Infinity when facing dimensional or concept-slashing techniques'],
    trivia: 'He developed a notorious sweet tooth to keep his brain continuously nourished with glucose while Six Eyes operates 24/7.'
  },
  {
    id: 'naruto',
    name: 'Naruto Uzumaki',
    series: 'Naruto Shippuden',
    category: 'Shonen Legends',
    title: 'The Seventh Hokage / Hero of the Hidden Leaf',
    rank: 'National Level',
    accentColor: '#f97316',
    iconSymbol: '🌀',
    gradient: 'linear-gradient(135deg, #7c2d12, #ea580c, #fed7aa)',
    summary: 'The formerly ostracized boy who mastered the Nine-Tails Kurama and Sage Jutsu to become the savior of the shinobi world.',
    stats: { attack: 97, defense: 95, speed: 96, mana: 98, shadowPower: 85 },
    bio: 'Orphaned on the night of the Nine-Tails attack, Naruto endured years of loneliness before earning bonds through perseverance, overcoming Pain, Madara, and Kaguya.',
    personality: 'Optimistic, empathetic, determined, steadfast believer in peace through understanding and brotherly bonds.',
    powers: [
      { name: 'Six Paths Sage Mode', desc: 'Harmonizes natural energy with chakra of all tailed beasts, granting flight and Truth-Seeking Orbs.' },
      { name: 'Rasenshuriken (All Elements)', desc: 'Wind-release rotation blades that sever chakra circulatory networks at the cellular level.' },
      { name: 'Kurama Chakra Avatar', desc: 'Colossal golden fox chakra cloak capable of shielding entire armies and firing Tailed Beast Bombs.' }
    ],
    weapons: ['Truth-Seeking Orbs', 'Toad Summoning Scrolls', 'Flying Thunder God Kunai (inherited)'],
    story: 'From Genin failure to Seventh Hokage, Naruto united all five Great Shinobi Nations in the Fourth Great Ninja War.',
    achievements: ['Defeated Pain and saved Konohagakure', 'Befriended all Nine Tailed Beasts', 'Achieved boyhood dream of becoming Hokage'],
    strengths: ['Immense chakra reserves', 'Extreme regenerative vitality', 'Talk no Jutsu (psychological resonance)'],
    weaknesses: ['Susceptible to visual genjutsu when not actively synchronized with a tailed beast partner'],
    trivia: 'Ramen Ichiraku granted him a lifetime free-meal coupon in recognition of saving the village.'
  },
  {
    id: 'levi',
    name: 'Levi Ackerman',
    series: 'Attack on Titan',
    category: 'Dark Fantasy',
    title: 'Humanity\'s Strongest Soldier',
    rank: 'A-Rank Hunter',
    accentColor: '#10b981',
    iconSymbol: '⚔️',
    gradient: 'linear-gradient(135deg, #064e3b, #059669, #a7f3d0)',
    summary: 'Special Operations Squad captain in the Scout Regiment renowned for peerless combat speed, acrobatic precision, and tactical genius.',
    stats: { attack: 94, defense: 87, speed: 99, mana: 60, shadowPower: 75 },
    bio: 'Born in the underground slums of Wall Sheena, Levi awakened the innate battle memories of the Ackerman bloodline before joining Erwin Smith in the Scout Regiment.',
    personality: 'Uncompromising, blunt, fastidious about cleanliness, harboring a deep unspoken tenderness for fallen comrades.',
    powers: [
      { name: 'Ackerman Awakening', desc: 'Taps into centuries of combat muscle memory and superhuman physical acceleration.' },
      { name: 'Spinning Blade Cyclone', desc: 'Blinding omnidirectional blade rotation that shreds Titan napes and limbs in seconds.' },
      { name: 'Tactical ODM Mastery', desc: 'Supreme aerial kinetic navigation using high-pressure gas thrusters and anchor cables.' }
    ],
    weapons: ['Snap-Blade Utility Swords', 'Omni-Directional Mobility Gear', 'Thunder Spears'],
    story: 'Levi decimated dozens of Titans across the Shiganshina, Stohess, and Marley districts, fulfilling his solemn oath to Erwin by neutralizing the Beast Titan.',
    achievements: ['Singlehandedly subdued the Beast Titan twice', 'Surrendered personal vengeance to preserve humanity'],
    strengths: ['Incredible reaction time and directional agility', 'Immunity to Founding Titan memory wipe'],
    weaknesses: ['Ordinary human durability against point-blank explosive shrapnel'],
    trivia: 'Holds his tea teacup strictly by the rim rather than the handle due to a childhood cup-breaking accident.'
  },
  {
    id: 'tanjiro',
    name: 'Tanjiro Kamado',
    series: 'Demon Slayer',
    category: 'Supernatural',
    title: 'Wielder of Sun Breathing / Demon Slayer',
    rank: 'A-Rank Hunter',
    accentColor: '#dc2626',
    iconSymbol: '🔥',
    gradient: 'linear-gradient(135deg, #450a0a, #b91c1c, #fca5a5)',
    summary: 'A kind-hearted boy with an extraordinary sense of smell who mastered Hinokami Kagura to restore his demon sister Nezuko to human form.',
    stats: { attack: 92, defense: 90, speed: 93, mana: 80, shadowPower: 78 },
    bio: 'After his family was slaughtered by Muzan Kibutsuji, Tanjiro joined the Demon Slayer Corps. Guided by memory of his father\'s ceremonial dance, he awakened Sun Breathing.',
    personality: 'Infinitely compassionate, disciplined, honest, showing deep sorrow even for defeated demonic adversaries.',
    powers: [
      { name: 'Sun Breathing (Hinokami Kagura)', desc: 'The ancestral root of all breathing styles, delivering blazing solar cuts that inhibit demon regeneration.' },
      { name: 'Transparent World', desc: 'Perceives muscle contractions, blood flow, and joint movements inside adversaries in real-time.' },
      { name: 'Demon Slayer Mark', desc: 'Elevates physical strength, body temperature to 39°C, and heart rate past 200 BPM.' }
    ],
    weapons: ['Black Nichirin Sword', 'Hanafuda Earrings', 'Wooden Nezuko Backpack Box'],
    story: 'Fought through Mount Natagumo, the Mugen Train, and the Entertainment District before decapitating Upper Rank demons in the Infinity Castle.',
    achievements: ['Mastered Sun Breathing forms 1 through 13', 'Helped defeat Demon King Muzan Kibutsuji', 'Restored Nezuko to human life'],
    strengths: ['Can sense emotional scents and malicious intent via olfactory nerves', 'Unbreakable forehead hardness'],
    weaknesses: ['Prolonged Sun Breathing without stamina recovery causes severe lung hemorrhaging'],
    trivia: 'His rock-hard forehead has knocked out fully trained Demon Slayers and wild boars.'
  },
  {
    id: 'ichigo',
    name: 'Ichigo Kurosaki',
    series: 'Bleach',
    category: 'Supernatural',
    title: 'Substitute Soul Reaper / Quincy-Hollow Hybrid',
    rank: 'National Level',
    accentColor: '#6366f1',
    iconSymbol: '🌙',
    gradient: 'linear-gradient(135deg, #1e1b4b, #4338ca, #c7d2fe)',
    summary: 'A high schooler who absorbed Soul Reaper powers to protect his friends, harboring Soul Reaper, Hollow, and Quincy ancestry.',
    stats: { attack: 97, defense: 93, speed: 97, mana: 94, shadowPower: 90 },
    bio: 'Obtaining Rukia Kuchiki\'s powers, Ichigo unlocked the true manifestation of Zangetsu, unifying his inner Hollow and Old Man Zangetsu in the Thousand-Year Blood War.',
    personality: 'Protective, cynical on the surface, determined, fiercely loyal to friends and family.',
    powers: [
      { name: 'Getsuga Tensho & Jujisho', desc: 'Concentrates spirit energy around blade edges and unleashes colossal crescent-moon shockwaves.' },
      { name: 'Bankai: Tensa Zangetsu', desc: 'Condenses all spiritual pressure into speed and piercing force for supersonic swordplay.' },
      { name: 'Horn of Salvation (Hollow Merged)', desc: 'Fuses Hollow and Quincy power into overwhelming spiritual reishi.' }
    ],
    weapons: ['True Twin Zangetsu', 'Soul Reaper Shihakusho', 'Substitute Shinigami Badge'],
    story: 'Invaded the Soul Society, Hueco Mundo, and the Soul King Palace to defeat Sosuke Aizen and Yhwach.',
    achievements: ['Defeated transcendent Aizen with Final Getsuga Tensho', 'Slew the Quincy progenitor Yhwach'],
    strengths: ['Astronomical spiritual pressure (Reiryoku)', 'Instinctive swordsmanship adaptations'],
    weaknesses: ['Can be reckless when loved ones are placed in immediate peril'],
    trivia: 'He is an expert Shakespeare reader and maintained high academic ranks despite fighting hollows daily.'
  }
];

class CharacterManager {
  constructor() {
    this.characters = ANIME_CHARACTERS;
    this.favKey = 'dxeno_fav_characters_v1';
    this.favorites = this.loadFavorites();
    this.selectedCompare = [];
  }

  loadFavorites() {
    try {
      const saved = localStorage.getItem(this.favKey);
      return saved ? JSON.parse(saved) : ['jinwoo'];
    } catch(e) {
      return ['jinwoo'];
    }
  }

  saveFavorites() {
    try {
      localStorage.setItem(this.favKey, JSON.stringify(this.favorites));
    } catch(e) {}
  }

  toggleFavorite(id, event) {
    if (event) event.stopPropagation();
    const idx = this.favorites.indexOf(id);
    if (idx > -1) {
      this.favorites.splice(idx, 1);
      window.showToast("Removed from favorites");
    } else {
      this.favorites.push(id);
      window.showToast("Added to favorites ❤️");
      if (window.soundEngine) window.soundEngine.playSuccess();
    }
    this.saveFavorites();
    this.renderGrid();
  }

  getCharacterSVG(char) {
    // Generate clean responsive cyberpunk anime badge
    return `
      <svg viewBox="0 0 400 250" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="bg_${char.id}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="${char.accentColor}" stop-opacity="0.35" />
            <stop offset="100%" stop-color="#05020a" stop-opacity="0.95" />
          </linearGradient>
        </defs>
        <rect width="400" height="250" fill="#090514" />
        <rect width="400" height="250" fill="url(#bg_${char.id})" />
        <circle cx="200" cy="115" r="75" fill="none" stroke="${char.accentColor}" stroke-width="2" stroke-dasharray="6,4" opacity="0.6"/>
        <circle cx="200" cy="115" r="60" fill="${char.accentColor}" fill-opacity="0.15" />
        <text x="200" y="130" font-size="52" text-anchor="middle">${char.iconSymbol}</text>
        <text x="200" y="210" font-family="system-ui, sans-serif" font-weight="900" font-size="19" fill="#ffffff" text-anchor="middle" letter-spacing="2">${char.name.toUpperCase()}</text>
        <text x="200" y="230" font-family="system-ui, sans-serif" font-weight="700" font-size="12" fill="${char.accentColor}" text-anchor="middle" letter-spacing="1">${char.series.toUpperCase()}</text>
      </svg>
    `;
  }

  renderGrid(filter = 'all', searchQuery = '') {
    const container = document.getElementById('character-grid-container');
    if (!container) return;

    let list = this.characters;
    if (filter === 'favorites') {
      list = list.filter(c => this.favorites.includes(c.id));
    } else if (filter !== 'all') {
      list = list.filter(c => c.category === filter);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(c => 
        c.name.toLowerCase().includes(q) || 
        c.series.toLowerCase().includes(q) || 
        c.title.toLowerCase().includes(q)
      );
    }

    if (list.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--text-muted);">
          <p style="font-size: 1.2rem; font-weight: 700;">No anime characters found matching criteria.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = list.map(c => {
      const isFav = this.favorites.includes(c.id);
      return `
        <div class="character-card" onclick="window.characterManager.openDetail('${c.id}')">
          <div class="character-thumb-wrap">
            ${this.getCharacterSVG(c)}
            <span class="char-badge-rank">${c.rank}</span>
            <button class="favorite-toggle ${isFav ? 'is-fav' : ''}" onclick="window.characterManager.toggleFavorite('${c.id}', event)" title="Favorite">
              ${isFav ? '❤️' : '🤍'}
            </button>
          </div>
          <div class="character-card-body">
            <span class="char-series">${c.series}</span>
            <h3 class="char-name">${c.name}</h3>
            <p class="char-summary">${c.summary}</p>
            <div class="char-stats-preview">
              <span class="stat-chip">⚡ PWR: ${c.stats.attack}</span>
              <span class="stat-chip">🌀 SHADOW: ${c.stats.shadowPower}</span>
            </div>
            <div class="card-actions" style="margin-top: 8px;">
              <button class="btn-mini" style="flex:1;">VIEW LORE</button>
              <button class="btn-mini" onclick="window.characterManager.addToCompare('${c.id}', event)">COMPARE +</button>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  openDetail(charId) {
    const c = this.characters.find(item => item.id === charId);
    if (!c) return;

    if (window.soundEngine) window.soundEngine.playClick();
    if (window.monarchSystem) {
      window.monarchSystem.completeQuest('q_char');
      window.monarchSystem.data.stats.charactersViewed++;
      window.monarchSystem.saveState();
    }

    const modalTitle = document.getElementById('char-modal-title');
    const modalContent = document.getElementById('char-modal-content');

    if (modalTitle) modalTitle.textContent = `${c.name} — Character Encyclopedia`;
    if (modalContent) {
      modalContent.innerHTML = `
        <div class="detail-banner" style="background: ${c.gradient}">
          ${this.getCharacterSVG(c)}
        </div>
        <div>
          <span style="color: ${c.accentColor}; font-size: 0.85rem; font-weight: 800; letter-spacing: 1px;">${c.series.toUpperCase()} • ${c.rank}</span>
          <h2 style="font-size: 1.8rem; font-weight: 900; margin: 4px 0;">${c.name}</h2>
          <p style="color: var(--text-dim); font-size: 0.9rem; font-weight: 700; margin-bottom: 12px;">"${c.title}"</p>
          <p style="color: var(--text-main); font-size: 0.92rem; line-height: 1.6;">${c.bio}</p>
        </div>

        <!-- Power Statistics Radar -->
        <div class="power-bars-grid">
          <h4 style="color: var(--cyan-neon); font-size: 0.9rem; letter-spacing: 1px; text-transform: uppercase;">COMBAT ATTRIBUTES & POWER STATS</h4>
          <div class="power-row">
            <span style="width: 100px;">ATTACK</span>
            <div class="bar-track"><div class="bar-fill" style="width: ${c.stats.attack}%"></div></div>
            <span style="font-family: var(--font-mono); font-weight: 800;">${c.stats.attack}</span>
          </div>
          <div class="power-row">
            <span style="width: 100px;">DEFENSE</span>
            <div class="bar-track"><div class="bar-fill" style="width: ${c.stats.defense}%"></div></div>
            <span style="font-family: var(--font-mono); font-weight: 800;">${c.stats.defense}</span>
          </div>
          <div class="power-row">
            <span style="width: 100px;">SPEED</span>
            <div class="bar-track"><div class="bar-fill" style="width: ${c.stats.speed}%"></div></div>
            <span style="font-family: var(--font-mono); font-weight: 800;">${c.stats.speed}</span>
          </div>
          <div class="power-row">
            <span style="width: 100px;">MANA / SPIRIT</span>
            <div class="bar-track"><div class="bar-fill" style="width: ${c.stats.mana}%"></div></div>
            <span style="font-family: var(--font-mono); font-weight: 800;">${c.stats.mana}</span>
          </div>
          <div class="power-row">
            <span style="width: 100px;">SHADOW RESONANCE</span>
            <div class="bar-track"><div class="bar-fill" style="width: ${c.stats.shadowPower}%"></div></div>
            <span style="font-family: var(--font-mono); font-weight: 800;">${c.stats.shadowPower}</span>
          </div>
        </div>

        <!-- Powers & Abilities -->
        <div>
          <h4 style="color: var(--purple-glow); font-size: 0.95rem; margin-bottom: 8px; text-transform: uppercase;">Signature Powers & Abilities</h4>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            ${c.powers.map(p => `
              <div style="background: var(--bg-tertiary); padding: 10px 14px; border-radius: var(--radius-sm); border-left: 3px solid ${c.accentColor};">
                <strong style="color: #fff; font-size: 0.88rem;">${p.name}:</strong>
                <span style="color: var(--text-muted); font-size: 0.84rem;"> ${p.desc}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Weapons & Gear -->
        <div>
          <h4 style="color: var(--cyan-neon); font-size: 0.95rem; margin-bottom: 8px; text-transform: uppercase;">Iconic Weapons & Gear</h4>
          <div style="display: flex; flex-wrap: wrap; gap: 8px;">
            ${c.weapons.map(w => `<span class="system-tag" style="border-color: ${c.accentColor}; color: #fff;">⚔️ ${w}</span>`).join('')}
          </div>
        </div>

        <!-- Story & Achievements -->
        <div style="background: rgba(0,0,0,0.3); padding: 14px; border-radius: var(--radius-md); border: 1px solid var(--bg-glass-border);">
          <h4 style="color: var(--gold-monarch); font-size: 0.92rem; margin-bottom: 6px;">Major Achievements</h4>
          <ul style="padding-left: 18px; color: var(--text-muted); font-size: 0.85rem; line-height: 1.5;">
            ${c.achievements.map(a => `<li>${a}</li>`).join('')}
          </ul>
        </div>

        <!-- Strengths, Weaknesses, Trivia -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
          <div style="background: var(--bg-tertiary); padding: 12px; border-radius: var(--radius-sm);">
            <strong style="color: #34d399; font-size: 0.82rem; text-transform: uppercase;">Strengths</strong>
            <p style="color: var(--text-muted); font-size: 0.8rem; margin-top: 4px;">${c.strengths.join(' • ')}</p>
          </div>
          <div style="background: var(--bg-tertiary); padding: 12px; border-radius: var(--radius-sm);">
            <strong style="color: #f87171; font-size: 0.82rem; text-transform: uppercase;">Weaknesses</strong>
            <p style="color: var(--text-muted); font-size: 0.8rem; margin-top: 4px;">${c.weaknesses.join(' • ')}</p>
          </div>
        </div>

        <div style="background: rgba(168, 85, 247, 0.1); border: 1px dashed var(--purple-glow); padding: 12px; border-radius: var(--radius-sm);">
          <strong style="color: var(--violet-bright); font-size: 0.82rem;">💡 Lore Trivia:</strong>
          <span style="color: var(--text-muted); font-size: 0.82rem;"> ${c.trivia}</span>
        </div>
      `;
    }

    const modal = document.getElementById('character-detail-modal');
    if (modal) modal.classList.add('active');
  }

  addToCompare(id, event) {
    if (event) event.stopPropagation();
    const c = this.characters.find(i => i.id === id);
    if (!c) return;

    if (this.selectedCompare.includes(id)) {
      this.selectedCompare = this.selectedCompare.filter(i => i !== id);
      window.showToast(`Removed ${c.name} from comparison.`);
    } else {
      if (this.selectedCompare.length >= 2) {
        this.selectedCompare.shift(); // keep max 2
      }
      this.selectedCompare.push(id);
      window.showToast(`Added ${c.name} to comparison (${this.selectedCompare.length}/2).`);
    }

    if (this.selectedCompare.length === 2) {
      this.openComparisonModal();
    }
  }

  openComparisonModal() {
    if (this.selectedCompare.length < 2) {
      window.showToast("Select at least 2 characters to compare!");
      return;
    }
    const c1 = this.characters.find(i => i.id === this.selectedCompare[0]);
    const c2 = this.characters.find(i => i.id === this.selectedCompare[1]);
    if (!c1 || !c2) return;

    const modalContent = document.getElementById('compare-modal-content');
    if (modalContent) {
      modalContent.innerHTML = `
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; text-align: center;">
          <div style="background: var(--bg-tertiary); padding: 16px; border-radius: var(--radius-md); border: 1px solid ${c1.accentColor};">
            <h3 style="color: ${c1.accentColor};">${c1.name}</h3>
            <span style="font-size: 0.75rem; color: var(--text-dim);">${c1.series}</span>
            <div style="margin-top: 14px; text-align: left; font-size: 0.82rem;">
              <p>⚔️ Attack: <strong>${c1.stats.attack}</strong></p>
              <p>🛡️ Defense: <strong>${c1.stats.defense}</strong></p>
              <p>⚡ Speed: <strong>${c1.stats.speed}</strong></p>
              <p>🔮 Mana: <strong>${c1.stats.mana}</strong></p>
              <p>🌀 Shadow: <strong>${c1.stats.shadowPower}</strong></p>
            </div>
          </div>
          <div style="background: var(--bg-tertiary); padding: 16px; border-radius: var(--radius-md); border: 1px solid ${c2.accentColor};">
            <h3 style="color: ${c2.accentColor};">${c2.name}</h3>
            <span style="font-size: 0.75rem; color: var(--text-dim);">${c2.series}</span>
            <div style="margin-top: 14px; text-align: left; font-size: 0.82rem;">
              <p>⚔️ Attack: <strong>${c2.stats.attack}</strong></p>
              <p>🛡️ Defense: <strong>${c2.stats.defense}</strong></p>
              <p>⚡ Speed: <strong>${c2.stats.speed}</strong></p>
              <p>🔮 Mana: <strong>${c2.stats.mana}</strong></p>
              <p>🌀 Shadow: <strong>${c2.stats.shadowPower}</strong></p>
            </div>
          </div>
        </div>
        <div style="text-align: center; margin-top: 16px;">
          <button class="btn-primary" onclick="window.characterManager.simulateBattle('${c1.id}', '${c2.id}')">
            🔥 SIMULATE SYSTEM BATTLE
          </button>
        </div>
        <div id="battle-result-box" style="margin-top: 16px; text-align: center; font-weight: 800; font-size: 1rem; color: var(--cyan-neon);"></div>
      `;
    }
    const modal = document.getElementById('comparison-modal');
    if (modal) modal.classList.add('active');
  }

  simulateBattle(id1, id2) {
    const c1 = this.characters.find(i => i.id === id1);
    const c2 = this.characters.find(i => i.id === id2);
    if (!c1 || !c2) return;

    if (window.soundEngine) window.soundEngine.playReflexHit();
    const pwr1 = (c1.stats.attack * 1.5) + (c1.stats.speed * 1.2) + (c1.stats.shadowPower * 1.1);
    const pwr2 = (c2.stats.attack * 1.5) + (c2.stats.speed * 1.2) + (c2.stats.shadowPower * 1.1);

    const winner = pwr1 >= pwr2 ? c1 : c2;
    const box = document.getElementById('battle-result-box');
    if (box) {
      box.innerHTML = `
        <div style="padding: 12px; background: rgba(0,240,255,0.1); border: 1px solid var(--cyan-neon); border-radius: var(--radius-md);">
          🏆 SIMULATION VICTOR: <span style="color: #fff; font-size: 1.2rem;">${winner.name}</span><br>
          <span style="font-size: 0.82rem; color: var(--text-muted); font-weight: normal;">Combat superiority calculated via speed scaling, damage output, and shadow domain interference.</span>
        </div>
      `;
    }
    if (window.soundEngine) window.soundEngine.playSuccess();
  }

  generateRandomCharacter() {
    const random = this.characters[Math.floor(Math.random() * this.characters.length)];
    this.openDetail(random.id);
    window.showToast(`✨ Summoned: ${random.name}!`);
  }
}

window.characterManager = new CharacterManager();
