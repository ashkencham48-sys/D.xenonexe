/**
 * D.XENO.EXE — SHADOW MONARCH PROGRESSION SYSTEM
 * Handles XP, Levels, Hunter Ranks, Mana, Shadow Energy, Quests & Upgrades.
 */

class MonarchSystem {
  constructor() {
    this.STORAGE_KEY = 'dxeno_monarch_state_v1';
    this.data = this.loadState();
    this.soldiers = [
      { id: 'infantry', name: 'Shadow Infantry', baseCost: 50, rate: 2, count: 0, desc: 'Basic reanimated shadow foot soldier.' },
      { id: 'magician', name: 'Shadow Magician', baseCost: 200, rate: 10, count: 0, desc: 'Casts dark shadow orbs to generate energy.' },
      { id: 'igris', name: 'Igris The Bloodred', baseCost: 1000, rate: 60, count: 0, desc: 'Elite knight commander wielding longsword.' },
      { id: 'tank', name: 'Tank (Shadow Bear)', baseCost: 4000, rate: 250, count: 0, desc: 'Monstrous ice bear imbued with shadow mana.' },
      { id: 'iron', name: 'Iron The Juggernaut', baseCost: 15000, rate: 900, count: 0, desc: 'Colossal knight with battle axe & shield.' },
      { id: 'beru', name: 'Beru The Ant King', baseCost: 60000, rate: 3500, count: 0, desc: 'Predatory shadow general of extreme lethality.' },
      { id: 'bellion', name: 'Grand Marshal Bellion', baseCost: 250000, rate: 15000, count: 0, desc: 'The original Sovereign marshal born of the World Tree.' }
    ];

    this.shopUpgrades = [
      { id: 'click_power', name: 'Shadow Strike Power', baseCost: 40, level: 0, max: 25, desc: '+3 Energy per manual click' },
      { id: 'crit_chance', name: 'Ruler Authority (Crit)', baseCost: 100, level: 0, max: 20, desc: '+2% Critical extraction chance' },
      { id: 'mana_regen', name: 'Black Heart Resonance', baseCost: 150, level: 0, max: 30, desc: '+1 Mana regenerated per second' },
      { id: 'xp_boost', name: 'Sovereign Aura (XP)', baseCost: 300, level: 0, max: 15, desc: '+10% Bonus XP earned from all activities' }
    ];

    this.quests = [
      { id: 'q_profile', title: 'System Awakening', desc: 'Inspect your 3D Hero Profile card', xp: 100, mana: 50, energy: 50, done: false },
      { id: 'q_reflex', title: 'Hunter Reflex', desc: 'Achieve any reaction score in Reflex Test', xp: 150, mana: 80, energy: 100, done: false },
      { id: 'q_rune', title: 'Runic Synchronization', desc: 'Complete 3 rounds in Rune Memory', xp: 200, mana: 100, energy: 120, done: false },
      { id: 'q_clicker', title: 'Shadow Extraction', desc: 'Click the Shadow Gate 30 times', xp: 180, mana: 90, energy: 200, done: false },
      { id: 'q_dodge', title: 'Shadow Trial Survival', desc: 'Survive at least 15 seconds in Dodge Arena', xp: 250, mana: 120, energy: 250, done: false },
      { id: 'q_math', title: 'Dungeon Decryption', desc: 'Solve 3 math problems in Number Challenge', xp: 160, mana: 70, energy: 80, done: false },
      { id: 'q_char', title: 'Cosmic Lorekeeper', desc: 'Open and inspect 3 anime characters', xp: 150, mana: 60, energy: 100, done: false }
    ];

    this.mergeSoldiersAndUpgrades();
    this.startAutoGenerators();
  }

  loadState() {
    const saved = localStorage.getItem(this.STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse save state", e);
      }
    }
    return {
      playerName: "D.XENO.EXE",
      xp: 0,
      level: 1,
      rank: "E-Rank Hunter",
      mana: 100,
      maxMana: 100,
      shadowEnergy: 0,
      gold: 50,
      dailyStreak: 1,
      lastLoginDate: new Date().toDateString(),
      soldierCounts: {},
      upgradeLevels: {},
      completedQuests: {},
      stats: {
        totalClicks: 0,
        gamesPlayed: 0,
        highReflex: 999,
        highRune: 0,
        highDodge: 0,
        highMath: 0,
        charactersViewed: 0
      }
    };
  }

  saveState() {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.data));
    } catch (e) {
      console.error("Failed to save state", e);
    }
    this.updateHUD();
  }

  mergeSoldiersAndUpgrades() {
    this.soldiers.forEach(s => {
      s.count = this.data.soldierCounts[s.id] || 0;
    });
    this.shopUpgrades.forEach(u => {
      u.level = this.data.upgradeLevels[u.id] || 0;
    });
    this.quests.forEach(q => {
      q.done = !!this.data.completedQuests[q.id];
    });
  }

  getRankForLevel(level) {
    if (level >= 100) return "Sovereign D.XENO";
    if (level >= 90) return "Shadow Monarch";
    if (level >= 70) return "National Level Hunter";
    if (level >= 50) return "S-Rank Hunter";
    if (level >= 35) return "A-Rank Hunter";
    if (level >= 22) return "B-Rank Hunter";
    if (level >= 12) return "C-Rank Hunter";
    if (level >= 6) return "D-Rank Hunter";
    return "E-Rank Hunter";
  }

  getXpForNextLevel(level) {
    return Math.floor(40 * Math.pow(level, 1.8));
  }

  getCurrentLevelProgress() {
    const curLevel = this.data.level;
    const prevXP = curLevel === 1 ? 0 : this.getXpForNextLevel(curLevel - 1);
    const nextXP = this.getXpForNextLevel(curLevel);
    const xpInLevel = Math.max(0, this.data.xp - prevXP);
    const needed = Math.max(1, nextXP - prevXP);
    const pct = Math.min(100, Math.max(0, (xpInLevel / needed) * 100));
    return { pct, current: xpInLevel, needed };
  }

  addXP(amount, reason = "") {
    const boostLevel = this.data.upgradeLevels['xp_boost'] || 0;
    const finalAmount = Math.round(amount * (1 + boostLevel * 0.1));
    this.data.xp += finalAmount;

    let leveledUp = false;
    let oldRank = this.data.rank;

    while (this.data.xp >= this.getXpForNextLevel(this.data.level)) {
      this.data.level++;
      this.data.maxMana = 100 + (this.data.level * 15);
      this.data.mana = this.data.maxMana;
      this.data.gold += this.data.level * 25;
      leveledUp = true;
    }

    this.data.rank = this.getRankForLevel(this.data.level);

    if (leveledUp) {
      if (window.soundEngine) window.soundEngine.playLevelUp();
      if (this.data.rank !== oldRank) {
        if (window.soundEngine) window.soundEngine.playRankUp();
        window.showToast(`🔥 RANK UP! You are now ${this.data.rank}!`);
      } else {
        window.showToast(`✨ LEVEL UP! You reached Level ${this.data.level}!`);
      }
    } else if (reason) {
      window.showToast(`+${finalAmount} XP earned (${reason})`);
    }

    this.saveState();
  }

  addShadowEnergy(amount) {
    this.data.shadowEnergy += amount;
    this.saveState();
  }

  addMana(amount) {
    this.data.mana = Math.min(this.data.maxMana, this.data.mana + amount);
    this.saveState();
  }

  getClickPower() {
    const upLevel = this.data.upgradeLevels['click_power'] || 0;
    return 1 + (upLevel * 3);
  }

  getCritChance() {
    const upLevel = this.data.upgradeLevels['crit_chance'] || 0;
    return 0.05 + (upLevel * 0.02);
  }

  buySoldier(soldierId) {
    const soldier = this.soldiers.find(s => s.id === soldierId);
    if (!soldier) return false;
    const cost = Math.round(soldier.baseCost * Math.pow(1.15, soldier.count));
    if (this.data.shadowEnergy >= cost) {
      this.data.shadowEnergy -= cost;
      soldier.count++;
      this.data.soldierCounts[soldierId] = soldier.count;
      this.addXP(Math.round(cost * 0.05), `Summoned ${soldier.name}`);
      if (window.soundEngine) window.soundEngine.playSuccess();
      window.showToast(`Summoned ${soldier.name}!`);
      this.saveState();
      return true;
    } else {
      if (window.soundEngine) window.soundEngine.playError();
      window.showToast(`Insufficient Shadow Energy! Need ${cost}.`);
      return false;
    }
  }

  buyShopUpgrade(upgradeId) {
    const up = this.shopUpgrades.find(u => u.id === upgradeId);
    if (!up) return false;
    if (up.level >= up.max) {
      window.showToast("Upgrade already at MAX level!");
      return false;
    }
    const cost = Math.round(up.baseCost * Math.pow(1.28, up.level));
    if (this.data.shadowEnergy >= cost) {
      this.data.shadowEnergy -= cost;
      up.level++;
      this.data.upgradeLevels[upgradeId] = up.level;
      this.addXP(Math.round(cost * 0.1), `Upgraded ${up.name}`);
      if (window.soundEngine) window.soundEngine.playSuccess();
      window.showToast(`Upgraded ${up.name} to Lv ${up.level}!`);
      this.saveState();
      return true;
    } else {
      if (window.soundEngine) window.soundEngine.playError();
      window.showToast(`Insufficient Shadow Energy! Need ${cost}.`);
      return false;
    }
  }

  completeQuest(questId) {
    const q = this.quests.find(item => item.id === questId);
    if (!q || q.done) return;
    q.done = true;
    this.data.completedQuests[questId] = true;
    this.addXP(q.xp, `Quest: ${q.title}`);
    this.addMana(q.mana);
    this.addShadowEnergy(q.energy);
    if (window.soundEngine) window.soundEngine.playSuccess();
    window.showToast(`🏆 Quest Complete: ${q.title}!`);
    this.saveState();
  }

  startAutoGenerators() {
    setInterval(() => {
      // 1. Soldiers passive energy
      let passiveRate = 0;
      this.soldiers.forEach(s => {
        passiveRate += s.count * s.rate;
      });
      if (passiveRate > 0) {
        this.data.shadowEnergy += Math.round(passiveRate / 2);
      }

      // 2. Mana regen
      const manaLevel = this.data.upgradeLevels['mana_regen'] || 0;
      const baseRegen = 1 + manaLevel;
      if (this.data.mana < this.data.maxMana) {
        this.data.mana = Math.min(this.data.maxMana, this.data.mana + baseRegen);
      }

      this.updateHUD();
    }, 1000);
  }

  resetAllProgress() {
    localStorage.removeItem(this.STORAGE_KEY);
    this.data = this.loadState();
    this.soldiers.forEach(s => s.count = 0);
    this.shopUpgrades.forEach(u => u.level = 0);
    this.quests.forEach(q => q.done = false);
    this.saveState();
    window.showToast("System Reset Complete! Progress refreshed.");
  }

  updateHUD() {
    const lvlEl = document.getElementById('hud-level-val');
    const rankEl = document.getElementById('hud-rank-val');
    const xpEl = document.getElementById('hud-xp-val');
    const energyEl = document.getElementById('hud-energy-val');
    const manaEl = document.getElementById('hud-mana-val');

    if (lvlEl) lvlEl.textContent = `Lv.${this.data.level}`;
    if (rankEl) rankEl.textContent = this.data.rank;
    if (energyEl) energyEl.textContent = this.data.shadowEnergy.toLocaleString();
    if (manaEl) manaEl.textContent = `${this.data.mana}/${this.data.maxMana}`;

    const prog = this.getCurrentLevelProgress();
    if (xpEl) xpEl.textContent = `${prog.current}/${prog.needed} XP`;

    const xpBarInner = document.getElementById('monarch-xp-fill');
    if (xpBarInner) xpBarInner.style.width = `${prog.pct}%`;

    const monarchRankBadge = document.getElementById('monarch-rank-badge');
    if (monarchRankBadge) monarchRankBadge.textContent = this.data.rank;

    const monarchLvlBadge = document.getElementById('monarch-level-badge');
    if (monarchLvlBadge) monarchLvlBadge.textContent = `LEVEL ${this.data.level}`;
  }
}

window.monarchSystem = new MonarchSystem();
