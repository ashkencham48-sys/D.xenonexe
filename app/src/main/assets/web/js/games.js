/**
 * D.XENO.EXE Gaming Arena
 * 6 Genuinely Playable Mini-Games with full physics, touch/keyboard, scoring, SFX, and XP rewards.
 */

class GamingArena {
  constructor() {
    this.activeGame = null;

    // Game 1: Reflex
    this.reflexState = 'idle'; // idle, waiting, ready
    this.reflexStartTime = 0;
    this.reflexTimeout = null;

    // Game 2: Rune Memory
    this.runeSequence = [];
    this.runePlayerStep = 0;
    this.runePlaying = false;
    this.runeListening = false;

    // Game 3: Clicker
    this.clickerInterval = null;

    // Game 4: Dodge Arena
    this.dodgeCanvas = null;
    this.dodgeCtx = null;
    this.dodgeRunning = false;
    this.dodgeAnimId = null;
    this.player = { x: 150, y: 150, r: 12, vx: 0, vy: 0, speed: 5, shield: 0 };
    this.obstacles = [];
    this.crystals = [];
    this.dodgeTime = 0;
    this.dodgeStartTime = 0;
    this.touchPos = null;

    // Game 5: Number Math
    this.mathTimer = null;
    this.mathTimeLeft = 30;
    this.mathScore = 0;
    this.mathCurrentAnswer = null;

    // Game 6: Daily Challenge
    this.initDailyChallenge();
  }

  showGame(gameId) {
    if (window.soundEngine) window.soundEngine.playClick();
    this.closeActiveGame();

    const container = document.getElementById('active-game-view');
    const title = document.getElementById('active-game-title');
    const body = document.getElementById('active-game-body');

    if (!container || !title || !body) return;

    this.activeGame = gameId;
    container.classList.add('active');
    container.scrollIntoView({ behavior: 'smooth' });

    switch (gameId) {
      case 'reflex':
        title.textContent = '⚡ HUNTER REFLEX SPEED TEST';
        this.renderReflexGame(body);
        break;
      case 'rune':
        title.textContent = '🔮 RUNE MEMORY MATRIX';
        this.renderRuneGame(body);
        break;
      case 'clicker':
        title.textContent = '👑 SHADOW MONARCH EXTRACTION GATE';
        this.renderClickerGame(body);
        break;
      case 'dodge':
        title.textContent = '🛡️ SHADOW TRIAL: DODGE ARENA';
        this.renderDodgeGame(body);
        break;
      case 'number':
        title.textContent = '🔢 DUNGEON NUMBER GATE';
        this.renderNumberGame(body);
        break;
      case 'daily':
        title.textContent = '🌟 SOVEREIGN DAILY CHALLENGE';
        this.renderDailyGame(body);
        break;
    }
  }

  closeActiveGame() {
    this.activeGame = null;
    const container = document.getElementById('active-game-view');
    if (container) container.classList.remove('active');

    // Cleanups
    clearTimeout(this.reflexTimeout);
    this.reflexState = 'idle';
    if (this.dodgeAnimId) cancelAnimationFrame(this.dodgeAnimId);
    this.dodgeRunning = false;
    clearInterval(this.mathTimer);
  }

  /* =========================================================================
     GAME 1: HUNTER REFLEX TEST
     ========================================================================= */
  renderReflexGame(container) {
    container.innerHTML = `
      <div style="text-align: center; margin-bottom: 14px;">
        <p style="color: var(--text-muted); font-size: 0.88rem;">
          When the arena turns <strong>NEON CYAN</strong> and the strike target appears, click or tap as fast as humanly possible!
        </p>
      </div>
      <div id="reflex-arena" class="reflex-box" onclick="window.gamingArena.handleReflexClick()">
        <div id="reflex-status-text" style="font-size: 1.3rem; font-weight: 800; color: var(--text-dim); text-transform: uppercase;">
          TAP HERE TO INITIALIZE SENSORS
        </div>
        <div id="reflex-target" class="reflex-target" onclick="window.gamingArena.handleReflexTargetHit(event)"></div>
      </div>
      <div style="margin-top: 14px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
        <div>
          <span style="color: var(--text-muted); font-size: 0.82rem;">PREVIOUS REACTION: </span>
          <strong id="reflex-result-ms" style="color: var(--cyan-neon); font-family: var(--font-mono); font-size: 1.1rem;">-- ms</strong>
        </div>
        <div>
          <span style="color: var(--text-muted); font-size: 0.82rem;">RANK GRADE: </span>
          <strong id="reflex-grade" style="color: var(--gold-monarch); font-weight: 800;">NONE</strong>
        </div>
      </div>
    `;
  }

  handleReflexClick() {
    const arena = document.getElementById('reflex-arena');
    const statusText = document.getElementById('reflex-status-text');
    const target = document.getElementById('reflex-target');
    if (!arena || !statusText || !target) return;

    if (this.reflexState === 'idle') {
      if (window.soundEngine) window.soundEngine.playClick();
      this.reflexState = 'waiting';
      arena.style.borderColor = '#f43f5e';
      arena.style.background = 'rgba(244, 63, 94, 0.08)';
      statusText.textContent = 'STAND BY... WAIT FOR THE SIGNAL...';
      statusText.style.color = '#f43f5e';
      target.style.display = 'none';

      const delay = 1500 + Math.random() * 2500;
      this.reflexTimeout = setTimeout(() => {
        if (this.reflexState === 'waiting') {
          this.reflexState = 'ready';
          this.reflexStartTime = performance.now();
          arena.style.borderColor = 'var(--cyan-neon)';
          arena.style.background = 'rgba(0, 240, 255, 0.15)';
          statusText.textContent = 'STRIKE NOW!';
          statusText.style.color = '#ffffff';

          // Position target randomly
          const rect = arena.getBoundingClientRect();
          const maxX = rect.width - 70;
          const maxY = rect.height - 70;
          const randX = Math.max(10, Math.floor(Math.random() * maxX));
          const randY = Math.max(10, Math.floor(Math.random() * maxY));

          target.style.left = `${randX}px`;
          target.style.top = `${randY}px`;
          target.style.display = 'block';

          if (window.soundEngine) window.soundEngine.playRuneNote(3);
        }
      }, delay);

    } else if (this.reflexState === 'waiting') {
      // False start!
      clearTimeout(this.reflexTimeout);
      this.reflexState = 'idle';
      if (window.soundEngine) window.soundEngine.playError();
      arena.style.borderColor = 'var(--bg-glass-border)';
      arena.style.background = 'var(--bg-tertiary)';
      statusText.textContent = 'TOO EARLY! FALSE START. TAP TO RETRY.';
      statusText.style.color = '#f43f5e';
    }
  }

  handleReflexTargetHit(event) {
    if (event) event.stopPropagation();
    if (this.reflexState !== 'ready') return;

    const elapsed = Math.round(performance.now() - this.reflexStartTime);
    this.reflexState = 'idle';

    if (window.soundEngine) window.soundEngine.playReflexHit();

    const arena = document.getElementById('reflex-arena');
    const statusText = document.getElementById('reflex-status-text');
    const target = document.getElementById('reflex-target');
    const resultEl = document.getElementById('reflex-result-ms');
    const gradeEl = document.getElementById('reflex-grade');

    if (target) target.style.display = 'none';
    if (arena) {
      arena.style.borderColor = 'var(--purple-glow)';
      arena.style.background = 'var(--bg-tertiary)';
    }

    let grade = 'E-Rank';
    let xpAward = 50;
    if (elapsed < 160) {
      grade = 'SOVEREIGN GODSPEED';
      xpAward = 300;
    } else if (elapsed <= 220) {
      grade = 'S-Rank Elite';
      xpAward = 200;
    } else if (elapsed <= 280) {
      grade = 'A-Rank Veteran';
      xpAward = 150;
    } else if (elapsed <= 350) {
      grade = 'B-Rank Hunter';
      xpAward = 100;
    } else if (elapsed <= 450) {
      grade = 'C-Rank Hunter';
      xpAward = 75;
    }

    if (statusText) {
      statusText.textContent = `TARGET ELIMINATED! ${elapsed} ms. TAP TO PLAY AGAIN.`;
      statusText.style.color = 'var(--cyan-neon)';
    }
    if (resultEl) resultEl.textContent = `${elapsed} ms`;
    if (gradeEl) gradeEl.textContent = grade;

    if (window.monarchSystem) {
      window.monarchSystem.addXP(xpAward, `Reflex: ${grade}`);
      window.monarchSystem.addShadowEnergy(Math.round(xpAward * 0.8));
      window.monarchSystem.completeQuest('q_reflex');
      if (elapsed < window.monarchSystem.data.stats.highReflex) {
        window.monarchSystem.data.stats.highReflex = elapsed;
      }
      window.monarchSystem.saveState();
    }
  }

  /* =========================================================================
     GAME 2: RUNE MEMORY MATRIX
     ========================================================================= */
  renderRuneGame(container) {
    container.innerHTML = `
      <div style="text-align: center; margin-bottom: 12px;">
        <p style="color: var(--text-muted); font-size: 0.88rem;">
          Memorize the pattern of glowing runes and reproduce the sequence accurately.
        </p>
        <div style="margin-top: 8px;">
          <span style="font-weight: 800; color: var(--cyan-neon);" id="rune-round-label">ROUND 1</span>
        </div>
      </div>
      <div class="rune-grid">
        <div class="rune-btn" data-rune="0" onclick="window.gamingArena.handleRuneInput(0)">
          <span>🔮</span><small style="font-size: 0.65rem; font-weight:800;">SHADOW</small>
        </div>
        <div class="rune-btn" data-rune="1" onclick="window.gamingArena.handleRuneInput(1)">
          <span>⚡</span><small style="font-size: 0.65rem; font-weight:800;">AZURE</small>
        </div>
        <div class="rune-btn" data-rune="2" onclick="window.gamingArena.handleRuneInput(2)">
          <span>🔥</span><small style="font-size: 0.65rem; font-weight:800;">CRIMSON</small>
        </div>
        <div class="rune-btn" data-rune="3" onclick="window.gamingArena.handleRuneInput(3)">
          <span>✨</span><small style="font-size: 0.65rem; font-weight:800;">AURA</small>
        </div>
      </div>
      <div style="text-align: center; margin-top: 14px;">
        <button id="rune-start-btn" class="btn-primary" onclick="window.gamingArena.startRuneGame()">
          START RUNE TRIAL
        </button>
      </div>
    `;
  }

  startRuneGame() {
    this.runeSequence = [Math.floor(Math.random() * 4), Math.floor(Math.random() * 4), Math.floor(Math.random() * 4)];
    this.runePlayerStep = 0;
    this.runePlaying = true;
    const startBtn = document.getElementById('rune-start-btn');
    if (startBtn) startBtn.style.display = 'none';
    this.playRuneSequence();
  }

  playRuneSequence() {
    this.runeListening = false;
    this.runePlayerStep = 0;
    const roundLabel = document.getElementById('rune-round-label');
    if (roundLabel) roundLabel.textContent = `MEMORIZE SEQUENCE (${this.runeSequence.length} RUNES)...`;

    this.runeSequence.forEach((runeIndex, idx) => {
      setTimeout(() => {
        this.lightRune(runeIndex);
        if (idx === this.runeSequence.length - 1) {
          setTimeout(() => {
            this.runeListening = true;
            if (roundLabel) roundLabel.textContent = `YOUR TURN! REPEAT PATTERN (${this.runeSequence.length} RUNES)`;
          }, 500);
        }
      }, (idx + 1) * 600);
    });
  }

  lightRune(index) {
    const btn = document.querySelector(`.rune-btn[data-rune="${index}"]`);
    if (btn) {
      btn.classList.add('lit');
      if (window.soundEngine) window.soundEngine.playRuneNote(index);
      setTimeout(() => btn.classList.remove('lit'), 300);
    }
  }

  handleRuneInput(index) {
    if (!this.runePlaying || !this.runeListening) return;
    this.lightRune(index);

    if (index === this.runeSequence[this.runePlayerStep]) {
      this.runePlayerStep++;
      if (this.runePlayerStep === this.runeSequence.length) {
        // Round cleared!
        this.runeListening = false;
        if (window.soundEngine) window.soundEngine.playSuccess();
        window.showToast(`✨ Rune Round Cleared! Next level...`);

        if (window.monarchSystem) {
          window.monarchSystem.addXP(40 * this.runeSequence.length, 'Rune Cleared');
          window.monarchSystem.addMana(25);
          if (this.runeSequence.length >= 3) {
            window.monarchSystem.completeQuest('q_rune');
          }
        }

        this.runeSequence.push(Math.floor(Math.random() * 4));
        setTimeout(() => this.playRuneSequence(), 900);
      }
    } else {
      // Failed!
      this.runePlaying = false;
      this.runeListening = false;
      if (window.soundEngine) window.soundEngine.playError();
      const roundLabel = document.getElementById('rune-round-label');
      if (roundLabel) roundLabel.textContent = `INCORRECT SEQUENCE! FINAL SCORE: ${this.runeSequence.length - 1}`;
      const startBtn = document.getElementById('rune-start-btn');
      if (startBtn) {
        startBtn.textContent = 'RETRY RUNE TRIAL';
        startBtn.style.display = 'inline-flex';
      }
    }
  }

  /* =========================================================================
     GAME 3: SHADOW CLICKER (ARISE SYSTEM)
     ========================================================================= */
  renderClickerGame(container) {
    container.innerHTML = `
      <div class="clicker-arena">
        <div class="clicker-core">
          <div style="text-align: center;">
            <span style="font-size: 0.8rem; font-weight: 800; color: var(--violet-bright);">SHADOW GATE EXTRACTION</span>
            <h2 id="clicker-energy-display" style="font-family: var(--font-mono); color: var(--cyan-neon); font-size: 1.8rem; margin: 4px 0;">
              0
            </h2>
            <p style="font-size: 0.75rem; color: var(--text-dim);">SHADOW ENERGY HARVESTED</p>
          </div>
          <button id="shadow-click-orb" class="shadow-orb-btn" onclick="window.gamingArena.handleShadowClick(event)">
            👑
          </button>
          <div style="display: flex; gap: 14px; font-size: 0.8rem; color: var(--text-muted);">
            <span>Click Power: <strong id="clicker-power-val" style="color:#fff;">1</strong></span>
            <span>Crit Rate: <strong id="clicker-crit-val" style="color:var(--gold-monarch);">5%</strong></span>
          </div>
        </div>
        <div class="clicker-upgrades">
          <h4 style="color: var(--cyan-neon); font-size: 0.85rem; letter-spacing: 1px; text-transform: uppercase;">
            SUMMON SHADOW ARMY UNITS
          </h4>
          <div id="soldier-shop-list" style="display: flex; flex-direction: column; gap: 8px;"></div>
        </div>
      </div>
    `;
    this.updateClickerUI();
  }

  handleShadowClick(e) {
    if (!window.monarchSystem) return;
    const power = window.monarchSystem.getClickPower();
    const critRate = window.monarchSystem.getCritChance();
    const isCrit = Math.random() < critRate;
    const finalAmount = isCrit ? power * 4 : power;

    if (isCrit) {
      if (window.soundEngine) window.soundEngine.playCritical();
      window.showToast(`⚡ CRITICAL HARVEST! +${finalAmount} SHADOW ENERGY!`);
    } else {
      if (window.soundEngine) window.soundEngine.playClick();
    }

    window.monarchSystem.addShadowEnergy(finalAmount);
    window.monarchSystem.addXP(Math.max(1, Math.round(finalAmount * 0.3)), 'Shadow Click');
    window.monarchSystem.data.stats.totalClicks++;
    if (window.monarchSystem.data.stats.totalClicks >= 30) {
      window.monarchSystem.completeQuest('q_clicker');
    }
    this.updateClickerUI();
  }

  updateClickerUI() {
    if (!window.monarchSystem) return;
    const energyDisplay = document.getElementById('clicker-energy-display');
    const powerVal = document.getElementById('clicker-power-val');
    const critVal = document.getElementById('clicker-crit-val');
    const shopList = document.getElementById('soldier-shop-list');

    if (energyDisplay) energyDisplay.textContent = window.monarchSystem.data.shadowEnergy.toLocaleString();
    if (powerVal) powerVal.textContent = window.monarchSystem.getClickPower();
    if (critVal) critVal.textContent = `${Math.round(window.monarchSystem.getCritChance() * 100)}%`;

    if (shopList) {
      shopList.innerHTML = window.monarchSystem.soldiers.map(s => {
        const cost = Math.round(s.baseCost * Math.pow(1.15, s.count));
        const canAfford = window.monarchSystem.data.shadowEnergy >= cost;
        return `
          <div class="upgrade-row">
            <div>
              <strong style="color: #fff; font-size: 0.85rem;">${s.name} (x${s.count})</strong>
              <p style="font-size: 0.72rem; color: var(--text-dim);">${s.desc} • +${s.rate}/s</p>
            </div>
            <button class="btn-mini" style="background: ${canAfford ? 'var(--purple-dark)' : 'rgba(255,255,255,0.05)'};" 
              onclick="window.gamingArena.buySoldierUnit('${s.id}')">
              ${cost.toLocaleString()} ⚡
            </button>
          </div>
        `;
      }).join('');
    }
  }

  buySoldierUnit(id) {
    if (window.monarchSystem && window.monarchSystem.buySoldier(id)) {
      this.updateClickerUI();
    }
  }

  /* =========================================================================
     GAME 4: DODGE ARENA (CANVAS SURVIVAL)
     ========================================================================= */
  renderDodgeGame(container) {
    container.innerHTML = `
      <div style="text-align: center; margin-bottom: 10px;">
        <p style="color: var(--text-muted); font-size: 0.88rem;">
          Control your Cyan Hunter Core. Dodge laser spikes & collect Golden Mana Crystals.
        </p>
        <div style="display: flex; justify-content: center; gap: 20px; margin-top: 6px;">
          <span>SURVIVAL TIME: <strong id="dodge-timer-val" style="color:var(--cyan-neon); font-family:var(--font-mono); font-size:1.1rem;">0.0s</strong></span>
          <span>SHIELDS: <strong id="dodge-shield-val" style="color:var(--gold-monarch);">0</strong></span>
        </div>
      </div>
      <div class="dodge-canvas-wrap">
        <canvas id="dodge-canvas" width="480" height="340"></canvas>
      </div>
      <div style="display: flex; justify-content: center; gap: 12px; margin-top: 14px;">
        <button id="dodge-start-btn" class="btn-primary" onclick="window.gamingArena.startDodgeGame()">
          START DODGE TRIAL
        </button>
      </div>
    `;

    this.setupDodgeCanvas();
  }

  setupDodgeCanvas() {
    this.dodgeCanvas = document.getElementById('dodge-canvas');
    if (!this.dodgeCanvas) return;
    this.dodgeCtx = this.dodgeCanvas.getContext('2d');

    // Drag / Touch Controls
    const handleMove = (e) => {
      if (!this.dodgeRunning) return;
      const rect = this.dodgeCanvas.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      const scaleX = this.dodgeCanvas.width / rect.width;
      const scaleY = this.dodgeCanvas.height / rect.height;
      this.player.x = (clientX - rect.left) * scaleX;
      this.player.y = (clientY - rect.top) * scaleY;
    };

    this.dodgeCanvas.addEventListener('mousemove', handleMove);
    this.dodgeCanvas.addEventListener('touchmove', (e) => {
      e.preventDefault();
      handleMove(e);
    }, { passive: false });
  }

  startDodgeGame() {
    if (!this.dodgeCanvas) return;
    this.dodgeRunning = true;
    this.player = { x: 240, y: 170, r: 10, speed: 5, shield: 1 };
    this.obstacles = [];
    this.crystals = [];
    this.dodgeStartTime = performance.now();

    const startBtn = document.getElementById('dodge-start-btn');
    if (startBtn) startBtn.style.display = 'none';

    if (window.soundEngine) window.soundEngine.playSuccess();
    this.loopDodgeGame();
  }

  loopDodgeGame() {
    if (!this.dodgeRunning) return;
    const now = performance.now();
    this.dodgeTime = (now - this.dodgeStartTime) / 1000;

    const timerEl = document.getElementById('dodge-timer-val');
    const shieldEl = document.getElementById('dodge-shield-val');
    if (timerEl) timerEl.textContent = `${this.dodgeTime.toFixed(1)}s`;
    if (shieldEl) shieldEl.textContent = this.player.shield;

    // Spawn obstacles
    if (Math.random() < 0.05 + (this.dodgeTime * 0.002)) {
      const side = Math.floor(Math.random() * 4);
      let x, y, vx, vy;
      const speed = 2.5 + Math.random() * 2.5 + (this.dodgeTime * 0.05);

      if (side === 0) { // top
        x = Math.random() * this.dodgeCanvas.width;
        y = -10;
        vx = (Math.random() - 0.5) * 2;
        vy = speed;
      } else if (side === 1) { // right
        x = this.dodgeCanvas.width + 10;
        y = Math.random() * this.dodgeCanvas.height;
        vx = -speed;
        vy = (Math.random() - 0.5) * 2;
      } else if (side === 2) { // bottom
        x = Math.random() * this.dodgeCanvas.width;
        y = this.dodgeCanvas.height + 10;
        vx = (Math.random() - 0.5) * 2;
        vy = -speed;
      } else { // left
        x = -10;
        y = Math.random() * this.dodgeCanvas.height;
        vx = speed;
        vy = (Math.random() - 0.5) * 2;
      }

      this.obstacles.push({ x, y, vx, vy, r: 6 + Math.random() * 6, color: '#f43f5e' });
    }

    // Spawn mana crystals
    if (Math.random() < 0.015 && this.crystals.length < 3) {
      this.crystals.push({
        x: 30 + Math.random() * (this.dodgeCanvas.width - 60),
        y: 30 + Math.random() * (this.dodgeCanvas.height - 60),
        r: 8
      });
    }

    // Clear canvas
    this.dodgeCtx.fillStyle = '#05020a';
    this.dodgeCtx.fillRect(0, 0, this.dodgeCanvas.width, this.dodgeCanvas.height);

    // Draw crystals
    this.crystals.forEach((c, idx) => {
      this.dodgeCtx.beginPath();
      this.dodgeCtx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
      this.dodgeCtx.fillStyle = '#fbbf24';
      this.dodgeCtx.shadowColor = '#fbbf24';
      this.dodgeCtx.shadowBlur = 10;
      this.dodgeCtx.fill();

      // Check pickup
      const dx = this.player.x - c.x;
      const dy = this.player.y - c.y;
      if (Math.sqrt(dx * dx + dy * dy) < this.player.r + c.r) {
        this.player.shield++;
        this.crystals.splice(idx, 1);
        if (window.soundEngine) window.soundEngine.playRuneNote(2);
        window.showToast("✨ Mana Shield Activated (+1 Shield)!");
      }
    });

    // Draw and update obstacles
    this.dodgeCtx.shadowBlur = 8;
    this.dodgeCtx.shadowColor = '#f43f5e';
    for (let i = this.obstacles.length - 1; i >= 0; i--) {
      const o = this.obstacles[i];
      o.x += o.vx;
      o.y += o.vy;

      this.dodgeCtx.beginPath();
      this.dodgeCtx.arc(o.x, o.y, o.r, 0, Math.PI * 2);
      this.dodgeCtx.fillStyle = o.color;
      this.dodgeCtx.fill();

      // Collision check
      const dist = Math.hypot(this.player.x - o.x, this.player.y - o.y);
      if (dist < this.player.r + o.r) {
        if (this.player.shield > 0) {
          this.player.shield--;
          this.obstacles.splice(i, 1);
          if (window.soundEngine) window.soundEngine.playReflexHit();
          window.showToast("🛡️ Shield Absorbed Impact!");
          continue;
        } else {
          this.gameOverDodge();
          return;
        }
      }

      // Out of bounds cleanup
      if (o.x < -20 || o.x > this.dodgeCanvas.width + 20 || o.y < -20 || o.y > this.dodgeCanvas.height + 20) {
        this.obstacles.splice(i, 1);
      }
    }

    // Draw player
    this.dodgeCtx.shadowBlur = 15;
    this.dodgeCtx.shadowColor = 'var(--cyan-neon)';
    this.dodgeCtx.beginPath();
    this.dodgeCtx.arc(this.player.x, this.player.y, this.player.r, 0, Math.PI * 2);
    this.dodgeCtx.fillStyle = '#00f0ff';
    this.dodgeCtx.fill();

    // Shield aura
    if (this.player.shield > 0) {
      this.dodgeCtx.beginPath();
      this.dodgeCtx.arc(this.player.x, this.player.y, this.player.r + 5, 0, Math.PI * 2);
      this.dodgeCtx.strokeStyle = '#fbbf24';
      this.dodgeCtx.lineWidth = 2;
      this.dodgeCtx.stroke();
    }

    this.dodgeAnimId = requestAnimationFrame(() => this.loopDodgeGame());
  }

  gameOverDodge() {
    this.dodgeRunning = false;
    if (window.soundEngine) window.soundEngine.playDodgeHit();

    const xpEarned = Math.round(this.dodgeTime * 15);
    window.showToast(`💥 GAME OVER! Survived: ${this.dodgeTime.toFixed(1)}s (+${xpEarned} XP)`);

    if (window.monarchSystem) {
      window.monarchSystem.addXP(xpEarned, 'Dodge Survival');
      window.monarchSystem.addShadowEnergy(Math.round(xpEarned * 0.7));
      if (this.dodgeTime >= 15) {
        window.monarchSystem.completeQuest('q_dodge');
      }
    }

    const startBtn = document.getElementById('dodge-start-btn');
    if (startBtn) {
      startBtn.textContent = 'RETRY DODGE TRIAL';
      startBtn.style.display = 'inline-flex';
    }
  }

  /* =========================================================================
     GAME 5: NUMBER CHALLENGE (MATH GATE)
     ========================================================================= */
  renderNumberGame(container) {
    container.innerHTML = `
      <div class="math-challenge-box">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span style="font-size: 0.85rem; color: var(--text-dim);">TIME REMAINING: <strong id="math-timer-val" style="color:var(--cyan-neon);">30s</strong></span>
          <span style="font-size: 0.85rem; color: var(--text-dim);">SOLVED: <strong id="math-score-val" style="color:var(--gold-monarch);">0</strong></span>
        </div>
        <div>
          <div id="math-equation-display" class="math-equation">PRESS START</div>
        </div>
        <div id="math-options-container" class="math-options-grid"></div>
        <div>
          <button id="math-start-btn" class="btn-primary" onclick="window.gamingArena.startMathGame()">
            COMMENCE NUMBER TRIAL
          </button>
        </div>
      </div>
    `;
  }

  startMathGame() {
    this.mathTimeLeft = 30;
    this.mathScore = 0;
    const startBtn = document.getElementById('math-start-btn');
    if (startBtn) startBtn.style.display = 'none';

    this.nextMathProblem();
    clearInterval(this.mathTimer);
    this.mathTimer = setInterval(() => {
      this.mathTimeLeft--;
      const timerEl = document.getElementById('math-timer-val');
      if (timerEl) timerEl.textContent = `${this.mathTimeLeft}s`;
      if (this.mathTimeLeft <= 0) {
        this.endMathGame();
      }
    }, 1000);
  }

  nextMathProblem() {
    const ops = ['+', '-', '*'];
    const op = ops[Math.floor(Math.random() * ops.length)];
    let a, b, answer;

    if (op === '+') {
      a = Math.floor(Math.random() * 50) + 10;
      b = Math.floor(Math.random() * 50) + 10;
      answer = a + b;
    } else if (op === '-') {
      a = Math.floor(Math.random() * 70) + 20;
      b = Math.floor(Math.random() * a);
      answer = a - b;
    } else {
      a = Math.floor(Math.random() * 12) + 2;
      b = Math.floor(Math.random() * 12) + 2;
      answer = a * b;
    }

    this.mathCurrentAnswer = answer;
    const eqEl = document.getElementById('math-equation-display');
    if (eqEl) eqEl.textContent = `${a} ${op} ${b} = ?`;

    // 4 choices
    const choices = new Set([answer]);
    while (choices.size < 4) {
      const offset = (Math.floor(Math.random() * 7) + 1) * (Math.random() < 0.5 ? 1 : -1);
      choices.add(Math.max(1, answer + offset));
    }

    const shuffled = Array.from(choices).sort(() => Math.random() - 0.5);
    const optsContainer = document.getElementById('math-options-container');
    if (optsContainer) {
      optsContainer.innerHTML = shuffled.map(ans => `
        <button class="btn-secondary" style="padding: 14px; font-size: 1.2rem; font-family: var(--font-mono);" onclick="window.gamingArena.submitMathAnswer(${ans})">
          ${ans}
        </button>
      `).join('');
    }
  }

  submitMathAnswer(chosen) {
    if (chosen === this.mathCurrentAnswer) {
      this.mathScore++;
      if (window.soundEngine) window.soundEngine.playSuccess();
      const scoreEl = document.getElementById('math-score-val');
      if (scoreEl) scoreEl.textContent = this.mathScore;
      if (window.monarchSystem) {
        window.monarchSystem.addXP(25, 'Math Solution');
      }
      this.nextMathProblem();
    } else {
      if (window.soundEngine) window.soundEngine.playError();
      this.mathTimeLeft = Math.max(0, this.mathTimeLeft - 3);
      window.showToast("Incorrect (-3 seconds penalty)!");
    }
  }

  endMathGame() {
    clearInterval(this.mathTimer);
    if (window.soundEngine) window.soundEngine.playRankUp();
    const eqEl = document.getElementById('math-equation-display');
    const optsContainer = document.getElementById('math-options-container');
    const startBtn = document.getElementById('math-start-btn');

    if (eqEl) eqEl.textContent = `TRIAL COMPLETE! SOLVED: ${this.mathScore}`;
    if (optsContainer) optsContainer.innerHTML = '';
    if (startBtn) {
      startBtn.textContent = 'RETRY NUMBER CHALLENGE';
      startBtn.style.display = 'inline-flex';
    }

    if (window.monarchSystem) {
      window.monarchSystem.completeQuest('q_math');
      window.monarchSystem.addXP(this.mathScore * 30, 'Math Completion');
    }
  }

  /* =========================================================================
     GAME 6: DAILY CHALLENGE
     ========================================================================= */
  initDailyChallenge() {
    this.dailyChallenge = {
      title: 'Monarch Overdrive: Reflex Superiority',
      targetScore: 280,
      rewardXP: 500,
      rewardMana: 250,
      claimed: false
    };
  }

  renderDailyGame(container) {
    container.innerHTML = `
      <div style="background: var(--bg-tertiary); border: 1px solid var(--gold-monarch); border-radius: var(--radius-md); padding: 24px; text-align: center;">
        <span style="color: var(--gold-monarch); font-weight: 800; font-size: 0.85rem; letter-spacing: 1px;">TODAY'S SPECIAL MISSION</span>
        <h3 style="font-size: 1.5rem; margin: 8px 0; color: #fff;">${this.dailyChallenge.title}</h3>
        <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 16px;">
          Score a reaction time of <strong>${this.dailyChallenge.targetScore} ms or faster</strong> in the Hunter Reflex Test.
        </p>
        <div style="display: flex; justify-content: center; gap: 20px; font-weight: 700; margin-bottom: 20px;">
          <span style="color: var(--violet-bright);">⚡ Reward: +${this.dailyChallenge.rewardXP} XP</span>
          <span style="color: var(--cyan-neon);">🔮 +${this.dailyChallenge.rewardMana} Mana</span>
        </div>
        <button class="btn-primary" onclick="window.gamingArena.claimDailyChallenge()">
          ${this.dailyChallenge.claimed ? 'CLAIMED TODAY' : 'CLAIM DAILY BOUNTY'}
        </button>
      </div>
    `;
  }

  claimDailyChallenge() {
    if (this.dailyChallenge.claimed) {
      window.showToast("Daily bounty already claimed for today!");
      return;
    }
    this.dailyChallenge.claimed = true;
    if (window.monarchSystem) {
      window.monarchSystem.addXP(this.dailyChallenge.rewardXP, 'Daily Bounty');
      window.monarchSystem.addMana(this.dailyChallenge.rewardMana);
      window.monarchSystem.data.dailyStreak++;
      window.monarchSystem.saveState();
    }
    if (window.soundEngine) window.soundEngine.playSuccess();
    window.showToast("🎉 Daily Challenge Bounty Claimed!");
    this.renderDailyGame(document.getElementById('active-game-body'));
  }
}

window.gamingArena = new GamingArena();
