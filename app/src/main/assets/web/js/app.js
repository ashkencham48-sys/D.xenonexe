/**
 * D.XENO.EXE Main Controller
 * Navigation, 3D Hero Photo Tilt, Particle Engine, Motivation, Achievements, Audio UI & Settings.
 */

// Global Toast Function
window.showToast = function(msg) {
  const toast = document.getElementById('system-toast');
  const toastText = document.getElementById('toast-message');
  if (!toast || !toastText) return;
  toastText.textContent = msg;
  toast.classList.add('visible');
  clearTimeout(window._toastTimeout);
  window._toastTimeout = setTimeout(() => {
    toast.classList.remove('visible');
  }, 2800);
};

// Motivation Quotes Bank
const MOTIVATION_QUOTES = [
  { quote: "I will protect my family, even if it means turning every single enemy in this universe into a shadow.", author: "Sung Jin-Woo (Solo Leveling)" },
  { quote: "If you don't take risks, you can't create a future.", author: "Monkey D. Luffy (One Piece)" },
  { quote: "Even if you force back what was lost, it still won't be the way it was. But you keep struggling forward anyway.", author: "Guts (Berserk)" },
  { quote: "Throughout heaven and earth, I alone am the honored one.", author: "Satoru Gojo (Jujutsu Kaisen)" },
  { quote: "Hard work is worthless for those that don't believe in themselves.", author: "Naruto Uzumaki (Naruto Shippuden)" },
  { quote: "If you win, you live. If you lose, you die. If you don't fight, you can't win!", author: "Eren Yeager (Attack on Titan)" },
  { quote: "No matter how many people you may lose, you have no choice but to go on living. No matter how devastating the blows may be.", author: "Tanjiro Kamado (Demon Slayer)" },
  { quote: "A lesson without pain is meaningless. For you cannot gain something without sacrificing something else in return.", author: "Edward Elric (Fullmetal Alchemist)" }
];

// Achievements Bank
const ACHIEVEMENTS_DATA = [
  { id: 'first_awaken', title: 'First Awakening', desc: 'Step into the D.XENO.EXE Shadow Universe', icon: '🌌' },
  { id: 'reflex_king', title: 'Lightning Reflex', desc: 'Score under 220ms in the Hunter Reflex Test', icon: '⚡' },
  { id: 'memory_adept', title: 'Runic Sorcerer', desc: 'Clear 4 sequences in Rune Memory', icon: '🔮' },
  { id: 'shadow_army', title: 'Arise Commander', desc: 'Summon your first 3 Shadow Soldiers', icon: '👑' },
  { id: 'dodge_survivor', title: 'Untouchable Shadow', desc: 'Survive over 20 seconds in Dodge Arena', icon: '🛡️' },
  { id: 'number_gate', title: 'Dungeon Mathematician', desc: 'Solve 5 problems in Number Challenge', icon: '🔢' },
  { id: 'b_rank', title: 'B-Rank Ascension', desc: 'Reach Hunter Level 22 or higher', icon: '🏅' },
  { id: 'sovereign_monarch', title: 'Shadow Monarch', desc: 'Ascend to Level 90+ and claim the throne', icon: '🔥' }
];

class AppController {
  constructor() {
    this.currentSection = 'home';
    this.animationIntensity = 'high';
  }

  init() {
    this.initNavigation();
    this.init3DCardTilt();
    this.initParticleCanvas();
    this.initQuotes();
    this.initAchievements();
    this.initSettings();
    this.renderMonarchQuests();
    this.renderMonarchUpgrades();

    // First Awakening quest / sound
    setTimeout(() => {
      if (window.monarchSystem) {
        window.monarchSystem.completeQuest('q_profile');
      }
    }, 1500);
  }

  /* -------------------------------------------------------------------------
     3D CARD TILT FOR USER PHOTOGRAPH
     Preserves natural photograph, overlays ONLY "D.XENO.EXE" text badge!
     ------------------------------------------------------------------------- */
  init3DCardTilt() {
    const card = document.getElementById('hero-photo-card');
    const glare = document.getElementById('photo-glare-effect');
    if (!card) return;

    let bounds;

    const onEnter = () => {
      bounds = card.getBoundingClientRect();
    };

    const onMove = (e) => {
      if (!bounds) bounds = card.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;

      const mouseX = clientX - bounds.left;
      const mouseY = clientY - bounds.top;

      const xPct = (mouseX / bounds.width) - 0.5;
      const yPct = (mouseY / bounds.height) - 0.5;

      const rotateY = xPct * 26; // -13deg to +13deg
      const rotateX = -yPct * 26; // -13deg to +13deg

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;

      if (glare) {
        const angle = Math.atan2(yPct, xPct) * (180 / Math.PI) + 90;
        glare.style.background = `linear-gradient(${angle}deg, rgba(255,255,255,0.3) 0%, rgba(0,240,255,0.15) 40%, transparent 80%)`;
        glare.style.opacity = '0.7';
      }
    };

    const onLeave = () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      if (glare) glare.style.opacity = '0.4';
    };

    card.addEventListener('mouseenter', onEnter);
    card.addEventListener('mousemove', onMove);
    card.addEventListener('mouseleave', onLeave);

    card.addEventListener('touchstart', onEnter, { passive: true });
    card.addEventListener('touchmove', onMove, { passive: true });
    card.addEventListener('touchend', onLeave);
  }

  /* -------------------------------------------------------------------------
     NAVIGATION
     ------------------------------------------------------------------------- */
  initNavigation() {
    const links = document.querySelectorAll('.nav-link');
    links.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = link.getAttribute('data-target');
        this.navigateTo(target);
      });
    });
  }

  navigateTo(sectionId) {
    if (this.currentSection === sectionId) return;
    this.currentSection = sectionId;

    if (window.soundEngine) window.soundEngine.playClick();

    // Update active nav-link
    document.querySelectorAll('.nav-link').forEach(l => {
      if (l.getAttribute('data-target') === sectionId) {
        l.classList.add('active');
        l.scrollIntoView({ behavior: 'smooth', inline: 'center' });
      } else {
        l.classList.remove('active');
      }
    });

    // Update active page section
    document.querySelectorAll('.page-section').forEach(sec => {
      sec.classList.remove('active');
    });
    const targetSection = document.getElementById(`section-${sectionId}`);
    if (targetSection) {
      targetSection.classList.add('active');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    if (sectionId === 'universe') {
      window.characterManager.renderGrid();
    } else if (sectionId === 'monarch') {
      this.renderMonarchQuests();
      this.renderMonarchUpgrades();
    } else if (sectionId === 'achievements') {
      this.renderAchievements();
    }
  }

  /* -------------------------------------------------------------------------
     PARTICLE CANVAS BACKGROUND
     ------------------------------------------------------------------------- */
  initParticleCanvas() {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    });

    const particles = [];
    const count = 45;
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 2 + 0.8,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -Math.random() * 0.6 - 0.2, // drifting upwards like shadow wisps
        color: Math.random() < 0.5 ? '#a855f7' : '#00f0ff',
        alpha: Math.random() * 0.5 + 0.2
      });
    }

    const render = () => {
      if (this.animationIntensity === 'low') {
        ctx.clearRect(0, 0, w, h);
        return;
      }
      ctx.clearRect(0, 0, w, h);

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.y < 0) p.y = h;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.shadowBlur = 6;
        ctx.shadowColor = p.color;
        ctx.fill();
      });

      requestAnimationFrame(render);
    };

    render();
  }

  /* -------------------------------------------------------------------------
     MOTIVATION SECTION
     ------------------------------------------------------------------------- */
  initQuotes() {
    this.randomQuote();
  }

  randomQuote() {
    const q = MOTIVATION_QUOTES[Math.floor(Math.random() * MOTIVATION_QUOTES.length)];
    const textEl = document.getElementById('motivation-quote-text');
    const authorEl = document.getElementById('motivation-quote-author');
    if (textEl) textEl.textContent = `"${q.quote}"`;
    if (authorEl) authorEl.textContent = `— ${q.author}`;
    if (window.soundEngine) window.soundEngine.playSuccess();
  }

  /* -------------------------------------------------------------------------
     ACHIEVEMENTS SYSTEM
     ------------------------------------------------------------------------- */
  initAchievements() {
    this.renderAchievements();
  }

  renderAchievements() {
    const container = document.getElementById('achievements-list-container');
    if (!container || !window.monarchSystem) return;

    const stats = window.monarchSystem.data.stats;
    const level = window.monarchSystem.data.level;

    container.innerHTML = ACHIEVEMENTS_DATA.map(a => {
      let unlocked = false;
      if (a.id === 'first_awaken') unlocked = true;
      if (a.id === 'reflex_king' && stats.highReflex <= 220) unlocked = true;
      if (a.id === 'memory_adept' && stats.highRune >= 4) unlocked = true;
      if (a.id === 'shadow_army' && (window.monarchSystem.soldiers[0].count + window.monarchSystem.soldiers[1].count) >= 3) unlocked = true;
      if (a.id === 'dodge_survivor' && stats.highDodge >= 20) unlocked = true;
      if (a.id === 'number_gate' && stats.highMath >= 5) unlocked = true;
      if (a.id === 'b_rank' && level >= 22) unlocked = true;
      if (a.id === 'sovereign_monarch' && level >= 90) unlocked = true;

      return `
        <div class="achievement-card ${unlocked ? 'unlocked' : ''}">
          <div class="achieve-icon">${a.icon}</div>
          <div style="flex:1;">
            <strong style="color: #fff; font-size: 0.9rem;">${a.title}</strong>
            <p style="color: var(--text-dim); font-size: 0.78rem;">${a.desc}</p>
            <span style="font-size: 0.7rem; font-weight: 800; color: ${unlocked ? 'var(--gold-monarch)' : 'var(--text-dim)'};">
              ${unlocked ? '✓ UNLOCKED' : 'LOCKED'}
            </span>
          </div>
        </div>
      `;
    }).join('');
  }

  /* -------------------------------------------------------------------------
     SHADOW MONARCH QUESTS & UPGRADES RENDERERS
     ------------------------------------------------------------------------- */
  renderMonarchQuests() {
    const container = document.getElementById('monarch-quests-container');
    if (!container || !window.monarchSystem) return;

    container.innerHTML = window.monarchSystem.quests.map(q => `
      <div class="quest-item ${q.done ? 'completed' : ''}">
        <div>
          <strong style="color: #fff; font-size: 0.88rem;">${q.title}</strong>
          <p style="font-size: 0.76rem; color: var(--text-muted);">${q.desc}</p>
          <small style="color: var(--cyan-neon); font-size: 0.72rem; font-weight: 700;">
            +${q.xp} XP • +${q.mana} Mana • +${q.energy} Energy
          </small>
        </div>
        <button class="btn-mini" style="background: ${q.done ? 'var(--cyan-neon)' : 'rgba(255,255,255,0.08)'}; color: ${q.done ? '#000' : '#fff'};"
          ${q.done ? 'disabled' : ''} onclick="window.monarchSystem.completeQuest('${q.id}')">
          ${q.done ? 'COMPLETED' : 'CLAIM'}
        </button>
      </div>
    `).join('');
  }

  renderMonarchUpgrades() {
    const container = document.getElementById('monarch-upgrades-container');
    if (!container || !window.monarchSystem) return;

    container.innerHTML = window.monarchSystem.shopUpgrades.map(u => {
      const cost = Math.round(u.baseCost * Math.pow(1.28, u.level));
      const canAfford = window.monarchSystem.data.shadowEnergy >= cost;
      const isMax = u.level >= u.max;

      return `
        <div class="upgrade-row">
          <div>
            <strong style="color: #fff; font-size: 0.88rem;">${u.name} (Lv ${u.level}/${u.max})</strong>
            <p style="font-size: 0.74rem; color: var(--text-dim);">${u.desc}</p>
          </div>
          <button class="btn-mini" style="background: ${isMax ? 'var(--gold-monarch)' : (canAfford ? 'var(--purple-dark)' : 'rgba(255,255,255,0.05)')}; color: ${isMax ? '#000' : '#fff'};"
            ${isMax ? 'disabled' : ''} onclick="window.monarchSystem.buyShopUpgrade('${u.id}'); window.appController.renderMonarchUpgrades();">
            ${isMax ? 'MAX' : `${cost.toLocaleString()} ⚡`}
          </button>
        </div>
      `;
    }).join('');
  }

  /* -------------------------------------------------------------------------
     SETTINGS & SYSTEM CONTROLS
     ------------------------------------------------------------------------- */
  initSettings() {
    // Sound volume
    const volSlider = document.getElementById('volume-slider');
    if (volSlider) {
      volSlider.addEventListener('input', (e) => {
        if (window.soundEngine) window.soundEngine.setVolume(parseFloat(e.target.value));
      });
    }

    // Sound toggle
    const muteToggle = document.getElementById('mute-toggle-btn');
    if (muteToggle) {
      muteToggle.addEventListener('click', () => {
        if (!window.soundEngine) return;
        window.soundEngine.setMute(!window.soundEngine.isMuted);
        muteToggle.textContent = window.soundEngine.isMuted ? '🔇 MUTED' : '🔊 ACTIVE';
        window.showToast(window.soundEngine.isMuted ? 'Sound Muted' : 'Sound Enabled');
      });
    }

    // Theme Selector
    const themeSelect = document.getElementById('theme-select');
    if (themeSelect) {
      themeSelect.addEventListener('change', (e) => {
        document.body.setAttribute('data-theme', e.target.value);
        window.showToast(`Theme Switched: ${e.target.value.toUpperCase()}`);
      });
    }

    // Animation Intensity
    const animSelect = document.getElementById('anim-select');
    if (animSelect) {
      animSelect.addEventListener('change', (e) => {
        this.animationIntensity = e.target.value;
        window.showToast(`Animation Intensity: ${e.target.value.toUpperCase()}`);
      });
    }
  }

  confirmReset() {
    const modal = document.getElementById('reset-confirm-modal');
    if (modal) modal.classList.add('active');
  }

  executeReset() {
    if (window.monarchSystem) {
      window.monarchSystem.resetAllProgress();
      this.renderMonarchQuests();
      this.renderMonarchUpgrades();
      this.renderAchievements();
    }
    const modal = document.getElementById('reset-confirm-modal');
    if (modal) modal.classList.remove('active');
  }

  closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.remove('active');
  }
}

window.appController = new AppController();
window.addEventListener('DOMContentLoaded', () => {
  window.appController.init();
});
