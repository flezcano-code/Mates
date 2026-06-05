/**
 * AudioManager - Sistema completo estilo Pokémon Black & White
 * Usa XHR (funciona en file://) con fallback HTML5.
 * Dos canales de música: background (battle/gym) + overlay (minijuego).
 */
class AudioManager {
  constructor() {
    // WebAudio
    this.ctx = null;
    this.masterGain = null;
    this.musicGain  = null;  // canal música principal (pasa por filtro)
    this.sfxGain    = null;
    this.criesGain  = null;
    this.musicFilter = null;
    this.buffers = new Map();

    // Música background
    this.currentMusicSource   = null;
    this.currentMusicGainNode = null;
    this.currentMusicName     = null;
    // Música overlay (minijuego)
    this.overlayMusicSource   = null;
    this.overlayMusicGainNode = null;
    this.overlaySession = 0;
    // HTML5 fallbacks
    this.currentMusicFallback = null;
    this.overlayMusicFallback = null;
    this.currentBattleMusicType = null;
    this.duckContexts = new Map();
    this.bgFadeTimer = null;
    this.skillDuckTimer = null;
    // Vida baja
    this.lowHealthSource = null;
    this.lowHealthActive = false;

    this.isUnlocked  = false;
    this.useWebAudio = false;

    // Volúmenes (se actualizan con sliders)
    this.MUSIC_VOL  = parseFloat(localStorage.getItem('vol_music')  ?? '0.45');
    this.SFX_VOL    = parseFloat(localStorage.getItem('vol_sfx')    ?? '1.0');
    this.CRIES_VOL  = parseFloat(localStorage.getItem('vol_cries')  ?? '0.8');

    this.FADE_SHORT = 0.5;
    this.FADE_LONG  = 1.2;

    this.musicExt  = '.ogg';
    this.sfxExt    = '.ogg';
    this.cryExt    = '.ogg';
    this.baseOST   = 'OST/';
    this.baseSFX   = 'sfx/';
    this.baseCries = 'cries/';

    // ── Cries: nombre exacto del archivo (sin extensión) ──────────────
    this.cryMap = {
      'Bulbasaur':  '001 - Kanto - Bulbasaur',
      'Ivysaur':    '002 - Kanto - Ivysaur',
      'Venusaur':   '003 - Kanto - Venusaur',
      'Charmander': '004 - Kanto - Charmander',
      'Charmeleon': '005 - Kanto - Charmeleon',
      'Charizard':  '006 - Kanto - Charizard',
      'Squirtle':   '007 - Kanto - Squirtle',
      'Wartortle':  '008 - Kanto - Wartortle',
      'Blastoise':  '009 - Kanto - Blastoise',
      'Pichu':      '025 - Kanto - Pikachu',
      'Pikachu':    '025 - Kanto - Pikachu',
      'Raichu':     '026 - Kanto - Raichu',
      'Chikorita':  '152 - Johto - Chickorita',
      'Bayleef':    '153 - Johto - Bayleef',
      'Meganium':   '154 - Johto - Meganium',
      'Cyndaquil':  '155 - Johto - Cyndaquil',
      'Quilava':    '156 - Johto - Quilava',
      'Typhlosion': '157 - Johto - Typhlosion',
      'Totodile':   '158 - Johto - Totodile',
      'Croconaw':   '159 - Johto - Croconaw',
      'Feraligatr': '160 - Johto - Feraligatr',
      'Treecko':    '252 - Hoenn - Treecko',
      'Grovyle':    '253 - Hoenn - Grovyle',
      'Sceptile':   '254 - Hoenn - Sceptile',
      'Torchic':    '255 - Hoenn - Torchic',
      'Combusken':  '256 - Hoenn - Combusken',
      'Blaziken':   '257 - Hoenn - Blaziken',
      'Mudkip':     '258 - Hoenn - Mudkip',
      'Marshtomp':  '259 - Hoenn - Marshtomp',
      'Swampert':   '260 - Hoenn - Swampert'
    };

    // ── Habilidades por Pokémon ───────────────────────────────────────
    this.skillMap = {
      'Bulbasaur':  ['Leaf Blade'],
      'Ivysaur':    ['Poison Powder'],
      'Venusaur':   ['Solar Beam part 1', 'Solar Beam part 2'],
      'Charmander': ['Ember'],
      'Charmeleon': ['Flamethrower'],
      'Charizard':  ['Blast Burn'],
      'Squirtle':   ['Water Gun'],
      'Wartortle':  ['Bubble Beam'],
      'Blastoise':  ['Hydro Pump'],
      'Pichu':      ['Thunder Shock'],
      'Pikachu':    ['Thunderbolt'],
      'Raichu':     ['Thunder'],
      'Chikorita':  ['Vine Whip'],
      'Bayleef':    ['Magical Leaf'],
      'Meganium':   ['Frenzy Plant'],
      'Cyndaquil':  ['Flame Wheel'],
      'Quilava':    ['Eruption'],
      'Typhlosion': ['Overheat'],
      'Totodile':   ['Bite'],
      'Croconaw':   ['Crunch'],
      'Feraligatr': ['Water Pulse'],
      'Treecko':    ['Absorb part 1'],
      'Grovyle':    ['Leaf Blade'],
      'Sceptile':   ['Leaf Storm'],
      'Torchic':    ['Flame Charge'],
      'Combusken':  ['Sky Uppercut'],
      'Blaziken':   ['Blaze Kick'],
      'Mudkip':     ['Mud-Slap'],
      'Marshtomp':  ['Mud Shot'],
      'Swampert':   ['Earthquake']
    };
  }

  // ══════════════════════════════════════════
  // INICIALIZACIÓN
  // ══════════════════════════════════════════

  unlockAudio() {
    if (this.isUnlocked) return;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (AC) {
      try {
        this.ctx = new AC();
        this._buildGraph();
        this.useWebAudio = true;
        // Buffer silencioso para desbloquear el contexto
        const buf = this.ctx.createBuffer(1, 1, 22050);
        const src = this.ctx.createBufferSource();
        src.buffer = buf;
        src.connect(this.ctx.destination);
        src.start(0);
      } catch(e) {
        this.useWebAudio = false;
        console.warn('[Audio] WebAudio failed, using HTML5 fallback:', e);
      }
    }
    this.isUnlocked = true;
    console.log('[Audio] Unlocked. WebAudio:', this.useWebAudio);
  }

  _buildGraph() {
    if (!this.ctx) return;

    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.value = 1;
    this.masterGain.connect(this.ctx.destination);

    // Filtro lowpass para mood (solo afecta música)
    this.musicFilter = this.ctx.createBiquadFilter();
    this.musicFilter.type = 'lowpass';
    this.musicFilter.frequency.value = 20000;
    this.musicFilter.Q.value = 0.8;
    this.musicFilter.connect(this.masterGain);

    this.musicGain = this.ctx.createGain();
    this.musicGain.gain.value = 1; // el volumen individual lo pone el gainNode de cada pista
    this.musicGain.connect(this.musicFilter);

    this.sfxGain = this.ctx.createGain();
    this.sfxGain.gain.value = this.SFX_VOL;
    this.sfxGain.connect(this.masterGain);

    this.criesGain = this.ctx.createGain();
    this.criesGain.gain.value = this.CRIES_VOL;
    this.criesGain.connect(this.masterGain);
  }

  // ══════════════════════════════════════════
  // CARGA DE BUFFERS (XHR — funciona en file://)
  // ══════════════════════════════════════════

  _loadXHR(url) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', url, true);
      xhr.responseType = 'arraybuffer';
      xhr.onload = () => {
        if (xhr.status === 0 || xhr.status === 200) resolve(xhr.response);
        else reject(new Error('XHR ' + xhr.status));
      };
      xhr.onerror = () => reject(new Error('XHR error: ' + url));
      xhr.send();
    });
  }

  async loadBuffer(url) {
    if (this.buffers.has(url)) return this.buffers.get(url);
    if (!this.useWebAudio) return null;
    try {
      const ab = await this._loadXHR(url);
      const buffer = await this.ctx.decodeAudioData(ab);
      this.buffers.set(url, buffer);
      console.log('[Audio] Loaded:', url);
      return buffer;
    } catch(e) {
      console.warn('[Audio] Failed to load:', url);
      return null;
    }
  }

  async preloadAll(ostFiles, sfxFiles, cryFiles) {
    if (!this.useWebAudio) {
      console.log('[Audio] Preload skipped (HTML5 mode)');
      return;
    }
    const load = (base, name, ext) => this.loadBuffer(base + name + ext).catch(() => {});
    const all = [
      ...ostFiles.map(n => load(this.baseOST, n, this.musicExt)),
      ...sfxFiles.map(n => load(this.baseSFX, n, this.sfxExt)),
      ...cryFiles.map(n => load(this.baseCries, n, this.cryExt))
    ];
    await Promise.allSettled(all);
    console.log('[Audio] Preload complete');
  }

  // ══════════════════════════════════════════
  // MOOD (filtro low-pass)
  // ══════════════════════════════════════════

  setMood(mood) {
    if (!this.useWebAudio || !this.musicFilter) return;
    const now = this.ctx.currentTime;
    const target = mood === 'chill' ? 2500 : 20000;
    this.musicFilter.frequency.cancelScheduledValues(now);
    this.musicFilter.frequency.setValueAtTime(
      Math.max(1, this.musicFilter.frequency.value), now
    );
    this.musicFilter.frequency.exponentialRampToValueAtTime(
      Math.max(1, target), now + 1.2
    );
  }

  // ══════════════════════════════════════════
  // MÚSICA BACKGROUND (canal principal)
  // ══════════════════════════════════════════

  async playOST(name, loop = true, fadeSecs = null) {
    if (!this.isUnlocked) return;
    const fade = fadeSecs !== null ? fadeSecs : this.FADE_LONG;
    const url  = this.baseOST + name + this.musicExt;

    // No reiniciar si ya suena la misma pista
    if (this.currentMusicName === name) {
      console.log('[MUSIC] Already playing:', name);
      return;
    }
    this.currentMusicName = name;
    console.log('[MUSIC] Playing:', name);

    if (this.useWebAudio) {
      if (this.ctx.state === 'suspended') await this.ctx.resume();
      const buffer = await this.loadBuffer(url);
      if (buffer) {
        this._playBGWebAudio(buffer, loop, fade);
        return;
      }
    }
    this._playBGHTML5(url, loop, fade);
  }

  _playBGWebAudio(buffer, loop, fade) {
    const now = this.ctx.currentTime;

    // Fade out pista anterior
    if (this.currentMusicSource && this.currentMusicGainNode) {
      const oldSrc = this.currentMusicSource;
      const oldGn  = this.currentMusicGainNode;
      const curVal = oldGn.gain.value;
      oldGn.gain.cancelScheduledValues(now);
      oldGn.gain.setValueAtTime(curVal, now);
      oldGn.gain.linearRampToValueAtTime(0, now + fade);
      setTimeout(() => { try { oldSrc.stop(); oldSrc.disconnect(); } catch(e) {} }, fade * 1000 + 50);
    }
    if (this.currentMusicFallback) {
      this.currentMusicFallback.pause();
      this.currentMusicFallback = null;
    }

    const src = this.ctx.createBufferSource();
    src.buffer = buffer;
    src.loop   = loop;

    const gn = this.ctx.createGain();
    gn.gain.setValueAtTime(0, now);
    gn.gain.linearRampToValueAtTime(this._getDuckedMusicVolume(), now + fade);

    src.connect(gn);
    gn.connect(this.musicGain);
    src.start(0);

    this.currentMusicSource   = src;
    this.currentMusicGainNode = gn;
  }

  _playBGHTML5(url, loop, fade) {
    if (this.currentMusicFallback) {
      const old = this.currentMusicFallback;
      const step = old.volume / (fade * 20);
      const iv = setInterval(() => {
        old.volume = Math.max(0, old.volume - step);
        if (old.volume <= 0) { clearInterval(iv); old.pause(); }
      }, 50);
    }

    const audio = new Audio(url);
    audio.loop   = loop;
    audio.volume = 0;
    audio.play().catch(() => {});
    this.currentMusicFallback = audio;

    let vol = 0;
    const target = this._getDuckedMusicVolume();
    const step = target / (fade * 20);
    const iv = setInterval(() => {
      vol = Math.min(target, vol + step);
      audio.volume = vol;
      if (vol >= target) clearInterval(iv);
    }, 50);
  }

  stopOST(fadeSecs = null) {
    const fade = fadeSecs !== null ? fadeSecs : this.FADE_SHORT;
    this.currentMusicName = null;
    if (this.useWebAudio && this.currentMusicSource && this.currentMusicGainNode) {
      const now = this.ctx.currentTime;
      const gn  = this.currentMusicGainNode;
      const src = this.currentMusicSource;
      gn.gain.cancelScheduledValues(now);
      gn.gain.setValueAtTime(gn.gain.value, now);
      gn.gain.linearRampToValueAtTime(0, now + fade);
      setTimeout(() => { try { src.stop(); src.disconnect(); } catch(e) {} }, fade * 1000 + 50);
      this.currentMusicSource   = null;
      this.currentMusicGainNode = null;
    }
    if (this.currentMusicFallback) {
      const old = this.currentMusicFallback;
      const step = old.volume / (fade * 20);
      const iv = setInterval(() => {
        old.volume = Math.max(0, old.volume - step);
        if (old.volume <= 0) { clearInterval(iv); old.pause(); }
      }, 50);
      this.currentMusicFallback = null;
    }
  }

  // ══════════════════════════════════════════
  // MÚSICA OVERLAY (minijuego encima del bg)
  // ══════════════════════════════════════════

  async playOverlayMusic(name, fadeSecs = 0.5) {
    if (!this.isUnlocked) return;
    const session = ++this.overlaySession;
    console.log('[MINIGAME MUSIC START]', name);
    const url = this.baseOST + name + this.musicExt;

    this._duckBG('minigame', 0.35, fadeSecs);

    if (this.useWebAudio) {
      if (this.ctx.state === 'suspended') await this.ctx.resume();
      const buffer = await this.loadBuffer(url);
      if (session !== this.overlaySession) return;
      if (buffer) {
        const now = this.ctx.currentTime;

        this._stopOverlayWebAudioImmediate();

        const src = this.ctx.createBufferSource();
        src.buffer = buffer;
        src.loop   = true;

        const gn = this.ctx.createGain();
        gn.gain.setValueAtTime(0, now);
        gn.gain.linearRampToValueAtTime(this.MUSIC_VOL, now + fadeSecs);

        src.connect(gn);
        gn.connect(this.masterGain); // overlay va directo al master (sin filtro)
        src.start(0);

        this.overlayMusicSource   = src;
        this.overlayMusicGainNode = gn;
        return;
      }
    }

    if (session !== this.overlaySession) return;

    // HTML5 fallback overlay
    this._stopOverlayHtml5Immediate();
    const audio = new Audio(url);
    audio.loop   = true;
    audio.volume = this.MUSIC_VOL;
    audio.play().catch(e => console.warn('[Overlay HTML5]', e));
    this.overlayMusicFallback = audio;
  }

  stopMiniGameMusic(fadeSecs = 0.2) {
    this.stopOverlayMusic(fadeSecs);
  }

  _stopOverlayWebAudioImmediate() {
    if (this.overlayMusicSource) {
      try { this.overlayMusicSource.stop(); this.overlayMusicSource.disconnect(); } catch (e) {}
      this.overlayMusicSource = null;
    }
    if (this.overlayMusicGainNode) {
      try { this.overlayMusicGainNode.disconnect(); } catch (e) {}
      this.overlayMusicGainNode = null;
    }
  }

  _stopOverlayHtml5Immediate() {
    if (!this.overlayMusicFallback) return;
    const old = this.overlayMusicFallback;
    this.overlayMusicFallback = null;
    try {
      old.pause();
      old.currentTime = 0;
    } catch (e) {}
  }

  stopOverlayMusic(fadeSecs = 0.5) {
    this.overlaySession++;
    console.log('[MINIGAME MUSIC STOP]');
    this._unduckBG('minigame', fadeSecs);
    console.log('[GYM MUSIC RESUME]');

    if (this.useWebAudio && this.overlayMusicGainNode && this.overlayMusicSource) {
      const now = this.ctx.currentTime;
      const og = this.overlayMusicGainNode;
      const os = this.overlayMusicSource;
      og.gain.cancelScheduledValues(now);
      og.gain.setValueAtTime(og.gain.value, now);
      og.gain.linearRampToValueAtTime(0, now + fadeSecs);
      const src = os;
      const gn = og;
      setTimeout(() => {
        try { src.stop(); src.disconnect(); } catch (e) {}
        try { gn.disconnect(); } catch (e) {}
      }, fadeSecs * 1000 + 60);
      this.overlayMusicGainNode = null;
      this.overlayMusicSource = null;
    } else {
      this._stopOverlayWebAudioImmediate();
    }

    this._stopOverlayHtml5Immediate();
  }

  _getDuckedMusicVolume() {
    let factor = 1;
    for (const value of this.duckContexts.values()) {
      factor = Math.min(factor, value);
    }
    return this.MUSIC_VOL * factor;
  }

  _setBGVolume(targetVol, fadeSecs = 0.25) {
    if (this.useWebAudio && this.currentMusicGainNode) {
      const now = this.ctx.currentTime;
      const gn  = this.currentMusicGainNode;
      gn.gain.cancelScheduledValues(now);
      gn.gain.setValueAtTime(gn.gain.value, now);
      gn.gain.linearRampToValueAtTime(targetVol, now + fadeSecs);
    } else if (this.currentMusicFallback) {
      if (this.bgFadeTimer) clearInterval(this.bgFadeTimer);
      const audio = this.currentMusicFallback;
      const start = audio.volume || 0;
      const steps = Math.max(1, Math.round(fadeSecs * 20));
      let n = 0;
      this.bgFadeTimer = setInterval(() => {
        n++;
        audio.volume = Math.max(0, Math.min(this.MUSIC_VOL, start + (targetVol - start) * (n / steps)));
        if (n >= steps) {
          clearInterval(this.bgFadeTimer);
          this.bgFadeTimer = null;
          audio.volume = targetVol;
        }
      }, 50);
    }
  }

  _duckBG(context, factor, fadeSecs) {
    this.duckContexts.set(context || 'default', Math.max(0, Math.min(1, factor)));
    this._setBGVolume(this._getDuckedMusicVolume(), fadeSecs);
  }

  _unduckBG(context, fadeSecs) {
    this.duckContexts.delete(context || 'default');
    this._setBGVolume(this._getDuckedMusicVolume(), fadeSecs);
  }

  // ══════════════════════════════════════════
  // SFX y CRIES
  // ══════════════════════════════════════════

  async _playRaw(url, loop = false, gainNode = null, maxDurationSecs = null) {
    if (!this.isUnlocked) return null;
    if (this.useWebAudio) {
      if (this.ctx.state === 'suspended') await this.ctx.resume();
      const buffer = await this.loadBuffer(url);
      if (buffer) {
        const src = this.ctx.createBufferSource();
        src.buffer = buffer;
        src.loop   = loop;
        const target = gainNode || this.sfxGain;
        src.connect(target);
        src.start(0);
        if (maxDurationSecs) {
          setTimeout(() => { try { src.stop(); } catch(e) {} }, maxDurationSecs * 1000);
        }
        return src;
      }
    }
    // HTML5 fallback
    const audio = new Audio(url);
    audio.loop   = loop;
    audio.volume = gainNode === this.criesGain ? this.CRIES_VOL : this.SFX_VOL;
    audio.play().catch(() => {});
    if (maxDurationSecs) {
      setTimeout(() => { audio.pause(); audio.currentTime = 0; }, maxDurationSecs * 1000);
    }
    return audio;
  }

  playSFX(name) {
    console.log('[SFX]', name);
    return this._playRaw(this.baseSFX + name + this.sfxExt, false, this.sfxGain);
  }

  playCry(pokemonName) {
    console.log('[CRY REQUEST]', pokemonName);
    if (!pokemonName) return;
    const key = Object.keys(this.cryMap).find(k => k.toLowerCase() === pokemonName.toLowerCase());
    const file = this.cryMap[key];
    if (!file) {
      console.warn('[CRY FAILED] No mapping for:', pokemonName, '- known:', Object.keys(this.cryMap).join(', '));
      return;
    }
    const url = this.baseCries + file + this.cryExt;
    console.log('[CRY FILE]', url);
    const result = this._playRaw(url, false, this.criesGain);
    console.log('[CRY PLAY]');
    return result;
  }

  // Cry con ducking momentáneo de la música de fondo
  playCryWithDucking(pokemonName) {
    if (!this.isUnlocked) return;
    if (this.useWebAudio && this.currentMusicGainNode) {
      const now = this.ctx.currentTime;
      const gn  = this.currentMusicGainNode;
      gn.gain.cancelScheduledValues(now);
      gn.gain.setValueAtTime(gn.gain.value, now);
      gn.gain.linearRampToValueAtTime(this.MUSIC_VOL * 0.4, now + 0.1);  // bajar rápido
      this.playCry(pokemonName);
      gn.gain.linearRampToValueAtTime(this.MUSIC_VOL, now + 1.5);         // restaurar en 1.5s
    } else {
      this.playCry(pokemonName);
    }
  }

  // ══════════════════════════════════════════
  // HELPERS OST
  // ══════════════════════════════════════════

  playMenuMusic() {
    console.log('[MUSIC] menu');
    this.currentBattleMusicType = null;
    this.playOST('Karakusa Town');
    this.setMood('chill');
  }

  playGameOverMusic() {
    console.log('[MUSIC] game over');
    this.currentMusicName = null; // permitir reiniciar
    this.currentBattleMusicType = null;
    this.stopOverlayMusic(0.1);
    this.stopLowHealthLoop();
    this.playOST('A New Adventure!', false);
    this.setMood('chill');
  }

  playBattleMusic(type) {
    const tracks = {
      'trainer':    ['Battle! Trainer', 'Battle! Strong Wild Pokemon', 'Battle! Battle Subway Trainer'],
      'gym':        'Battle! Gym Leader',
      'cynthia':    'Battle! Cynthia',
      'elite_four': 'Battle! Elite Four'
    };
    const labels = { elite_four: '[MUSIC] elite', gym: '[MUSIC] gym', trainer: '[MUSIC] battle', cynthia: '[MUSIC] cynthia' };
    console.log(labels[type] || '[MUSIC] battle');

    if (this.currentBattleMusicType === type && this.currentMusicName) {
      console.log('[MUSIC] Battle track continues:', this.currentMusicName);
      this.setMood('epic');
      return;
    }
    this.currentBattleMusicType = type;
    if (type === 'trainer') {
      const arr = tracks.trainer;
      this.playOST(arr[Math.floor(Math.random() * arr.length)], true, this.FADE_SHORT);
    } else if (tracks[type]) {
      this.playOST(tracks[type], true, this.FADE_SHORT);
    }
    this.setMood('epic');
  }

  playMinigameMusic(type) {
    console.log('[MUSIC] minigame:', type);
    this.stopOverlayMusic(0.12);
    const map = {
      'fishing':        '4-02. Undersea Ruins(fishing1)',
      'memory_normal':  'Electric Rock Cave(minijuegos)',
      'memory':         'Electric Rock Cave(minijuegos)',
      'reverse':        'Electric Rock Cave(minijuegos)',
      'memory_classic': 'Global Terminal(memorice)',
      'maze':           'Ns Castle(laberinto)',
      'timing':         'Spin Trade(fishing)'
    };
    if (map[type]) {
      this.playOverlayMusic(map[type], 0.5);
    }
  }

  playVictoryMusic(type) {
    console.log('[MUSIC] victory:', type);
    this.currentMusicName = null;
    this.currentBattleMusicType = null;
    const map = {
      'trainer': 'Victory Against Trainer!',
      'gym':     'Victory Against Gym Leader!'
    };
    if (map[type]) this.playOST(map[type], false, this.FADE_SHORT);
    this.setMood('chill');
  }

  // ══════════════════════════════════════════
  // HELPERS SFX
  // ══════════════════════════════════════════

  playHit()     { this.playSFX(['Tackle','Scratch','Pound','Body Slam'][Math.floor(Math.random()*4)]); }
  playMiss()    { this.playSFX(['Take Down','Double-Edge'][Math.floor(Math.random()*2)]); }
  playPokeball(){ this.playSFX('In-Battle Recall Switch Pokeball'); }
  playFainted() { this.playSFX('In-Battle Recall Switch Fainted'); }
  playHeal()    { this.playSFX('In-Battle Heal HP Restore'); this.stopLowHealthLoop(); }
  playItemReceived() { this.playSFX('Received an Item!'); }
  playLevelUp() { this._playRaw(this.baseSFX + 'Level Up!' + this.sfxExt, false, this.sfxGain, 1.5); }
  playEvolution() { this._playRaw(this.baseSFX + 'Evolution' + this.sfxExt, false, this.sfxGain, 2.0); }

  async playLowHealthLoop() {
    if (this.lowHealthActive) return;
    this.lowHealthActive = true;
    this.lowHealthSource = await this._playRaw(
      this.baseSFX + 'In-Battle Health Low Loop' + this.sfxExt, true, this.sfxGain
    );
  }

  stopLowHealthLoop() {
    this.lowHealthActive = false;
    if (this.lowHealthSource) {
      try {
        if (typeof this.lowHealthSource.stop === 'function') {
          this.lowHealthSource.stop(); this.lowHealthSource.disconnect();
        } else {
          this.lowHealthSource.pause(); this.lowHealthSource.currentTime = 0;
        }
      } catch(e) {}
      this.lowHealthSource = null;
    }
  }

  playSkill(pokemonName) {
    if (!pokemonName) return;
    const key = Object.keys(this.skillMap).find(k => k.toLowerCase() === pokemonName.toLowerCase());
    const seq = this.skillMap[key];
    if (!seq) return;
    seq.forEach((sfx, i) => setTimeout(() => this.playSFX(sfx), i * 900));
  }

  playMoveSFX(moveName) {
    const move = (moveName || '').toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
    const map = {
      'hoja afilada': ['Leaf Blade'],
      'polvo veneno': ['Poison Powder'],
      'rayo solar': ['Solar Beam part 1', 'Solar Beam part 2'],
      'ascuas': ['Ember'],
      'lanzallamas': ['Flamethrower'],
      'anillo igneo': ['Blast Burn'],
      'pistola agua': ['Water Gun'],
      'rayo burbuja': ['Bubble Beam'],
      'hidrobomba': ['Hydro Pump'],
      'impactrueno': ['Thunder Shock'],
      'rayo': ['Thunderbolt'],
      'trueno': ['Thunder'],
      'latigo cepa': ['Vine Whip'],
      'hoja magica': ['Magical Leaf'],
      'planta feroz': ['Frenzy Plant'],
      'rueda fuego': ['Flame Wheel'],
      'estallido': ['Eruption'],
      'sofoco': ['Overheat'],
      'morder': ['Bite'],
      'triturar': ['Crunch'],
      'hidropulso': ['Water Pulse'],
      'absorber': ['Absorb part 1', 'Absorb part 2'],
      'hoja aguda': ['Leaf Blade'],
      'tormenta de hojas': ['Leaf Storm'],
      'nitrocarga': ['Flame Charge'],
      'gancho alto': ['Sky Uppercut'],
      'patada ignea': ['Blaze Kick'],
      'bofeton lodo': ['Mud-Slap'],
      'disparo lodo': ['Mud Shot'],
      'terremoto': ['Earthquake']
    };
    const seq = map[move];
    if (!seq) return null;
    seq.forEach((sfx, i) => setTimeout(() => this.playSFX(sfx), i * 720));
    return seq;
  }

  beginSkillDucking(durationMs = 1800) {
    if (!this.isUnlocked) return;
    this._duckBG('skill', 0.52, 0.16);
    clearTimeout(this.skillDuckTimer);
    this.skillDuckTimer = setTimeout(() => {
      this._unduckBG('skill', 0.45);
      this.skillDuckTimer = null;
    }, Math.max(450, durationMs));
  }

  // ══════════════════════════════════════════
  // CONTROL DE VOLUMEN (sliders)
  // ══════════════════════════════════════════

  setMusicVolume(v) {
    this.MUSIC_VOL = v;
    localStorage.setItem('vol_music', v);
    const target = this._getDuckedMusicVolume();
    if (this.useWebAudio && this.currentMusicGainNode) {
      this.currentMusicGainNode.gain.setValueAtTime(target, this.ctx.currentTime);
    } else if (this.currentMusicFallback) {
      this.currentMusicFallback.volume = target;
    }
  }

  setSFXVolume(v) {
    this.SFX_VOL = v;
    localStorage.setItem('vol_sfx', v);
    if (this.useWebAudio && this.sfxGain) this.sfxGain.gain.setValueAtTime(v, this.ctx.currentTime);
  }

  setCriesVolume(v) {
    this.CRIES_VOL = v;
    localStorage.setItem('vol_cries', v);
    if (this.useWebAudio && this.criesGain) this.criesGain.gain.setValueAtTime(v, this.ctx.currentTime);
  }

  // ══════════════════════════════════════════
  // UTILIDADES
  // ══════════════════════════════════════════

  getCurrentPokemonName() {
    const sp = document.getElementById('playerSprite');
    if (!sp) return null;
    const src = sp.src.split('/').pop().toLowerCase().replace(/\.\w+$/, '');
    for (const name of Object.keys(this.cryMap)) {
      if (src.includes(name.toLowerCase())) return name;
    }
    return null;
  }

  getEnemyPokemonName() {
    const sp = document.getElementById('enemySprite');
    if (!sp) return null;
    const src = sp.src.split('/').pop().toLowerCase().replace(/\.\w+$/, '');
    for (const name of Object.keys(this.cryMap)) {
      if (src.includes(name.toLowerCase())) return name;
    }
    return null;
  }
}

window.AudioManager = AudioManager;
