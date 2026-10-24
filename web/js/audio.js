/**
 * D.XENO.EXE Synthesized Web Audio Engine
 * Procedurally generates high-tech anime and cyber game sound effects.
 */

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.volume = 0.5;
    this.initialized = false;
  }

  init() {
    if (this.initialized) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.initialized = true;
      }
    } catch (e) {
      console.warn("Web Audio not supported", e);
    }
  }

  ensureContext() {
    this.init();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  setMute(muted) {
    this.isMuted = muted;
  }

  setVolume(vol) {
    this.volume = Math.max(0, Math.min(1, vol));
  }

  playTone(freq, duration, type = 'sine', gainVal = 0.3) {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(gainVal * this.volume, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {}
  }

  playClick() {
    this.playTone(850, 0.05, 'triangle', 0.2);
  }

  playCritical() {
    this.playTone(1200, 0.08, 'sawtooth', 0.3);
    setTimeout(() => this.playTone(1600, 0.1, 'sine', 0.3), 30);
  }

  playReflexHit() {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(400, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1200, this.ctx.currentTime + 0.12);

      gain.gain.setValueAtTime(0.3 * this.volume, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.12);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.12);
    } catch(e) {}
  }

  playRuneNote(index) {
    const freqs = [261.63, 329.63, 392.00, 523.25]; // C4, E4, G4, C5
    this.playTone(freqs[index % freqs.length], 0.22, 'sine', 0.4);
  }

  playSuccess() {
    const notes = [440, 554.37, 659.25, 880];
    notes.forEach((freq, idx) => {
      setTimeout(() => this.playTone(freq, 0.18, 'triangle', 0.25), idx * 70);
    });
  }

  playLevelUp() {
    const chord = [329.63, 440, 554.37, 659.25, 880, 1108.7];
    chord.forEach((freq, idx) => {
      setTimeout(() => this.playTone(freq, 0.3, 'sine', 0.35), idx * 80);
    });
  }

  playRankUp() {
    // Grand monarch fanfare
    const notes = [220, 277.18, 329.63, 440, 554.37, 659.25, 880, 1318.5];
    notes.forEach((freq, idx) => {
      setTimeout(() => this.playTone(freq, 0.45, 'sawtooth', 0.3), idx * 90);
    });
  }

  playError() {
    this.playTone(180, 0.2, 'sawtooth', 0.3);
  }

  playDodgeHit() {
    this.playTone(90, 0.35, 'square', 0.4);
  }
}

window.soundEngine = new SoundEngine();
