// Web Audio API Sound Synthesizer for Kids Game

class SoundManager {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private isSpeechEnabled: boolean = true;
  private isBgmPlaying: boolean = false;
  private bgmInterval: number | null = null;

  constructor() {
    // AudioContext created on first user gesture
  }

  private initCtx() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        this.ctx = new AudioContextClass();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.isMuted && this.isBgmPlaying) {
      this.stopBgm();
    }
    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public toggleSpeech(): boolean {
    this.isSpeechEnabled = !this.isSpeechEnabled;
    return this.isSpeechEnabled;
  }

  public getSpeechEnabled(): boolean {
    return this.isSpeechEnabled;
  }

  public speak(text: string) {
    if (this.isMuted || !this.isSpeechEnabled || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.pitch = 1.3; // Cute kid pitch
      utterance.rate = 1.0;
      utterance.volume = 0.8;
      window.speechSynthesis.speak(utterance);
    } catch {
      // Ignore speech synthesis errors
    }
  }

  // Generic Munching / Chewing sound
  public playMunch() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    
    // Play 3 rapid crunch bursts
    for (let i = 0; i < 3; i++) {
      const startTime = now + i * 0.12;
      
      // Noise buffer for crunch
      const bufferSize = this.ctx.sampleRate * 0.08;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let j = 0; j < bufferSize; j++) {
        output[j] = (Math.random() * 2 - 1) * Math.exp(-j / (bufferSize * 0.3));
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1200 - i * 150, startTime);
      filter.Q.value = 3;

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.3, startTime);
      gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.08);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start(startTime);
      noise.stop(startTime + 0.08);

      // Low pop tone
      const osc = this.ctx.createOscillator();
      const oscGain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(300 - i * 30, startTime);
      osc.frequency.exponentialRampToValueAtTime(100, startTime + 0.06);

      oscGain.gain.setValueAtTime(0.2, startTime);
      oscGain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.06);

      osc.connect(oscGain);
      oscGain.connect(this.ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.06);
    }
  }

  // Animal-specific Chewing and Munching Sounds (Perfect for 2 year olds!)
  public playChewSoundForAnimal(soundType: string) {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;

    // First: play 4-5 rhythmic munch crunch bursts
    for (let i = 0; i < 5; i++) {
      const startTime = now + i * 0.11;
      const bufferSize = this.ctx.sampleRate * 0.07;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let j = 0; j < bufferSize; j++) {
        output[j] = (Math.random() * 2 - 1) * Math.exp(-j / (bufferSize * 0.25));
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';

      // Pitch munching based on animal
      let freq = 1100;
      if (soundType === 'lion') freq = 600; // Deep meat chomp
      if (soundType === 'bunny') freq = 1800; // High fast nibble
      if (soundType === 'frog') freq = 800; // Slurpy gulp

      filter.frequency.setValueAtTime(freq - (i % 2) * 150, startTime);
      filter.Q.value = 4;

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.35, startTime);
      gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.07);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start(startTime);
      noise.stop(startTime + 0.07);
    }

    // Followed immediately by the animal's signature happy voice sound!
    setTimeout(() => {
      this.playAnimalSound(soundType);
    }, 400);
  }

  // Doctor Heartbeat Stethoscope Sound
  public playDoctorHeartbeat() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    // Thump - Thump
    [0, 0.22].forEach((delay) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(110, now + delay);
      osc.frequency.exponentialRampToValueAtTime(40, now + delay + 0.12);

      gain.gain.setValueAtTime(0.5, now + delay);
      gain.gain.exponentialRampToValueAtTime(0.01, now + delay + 0.12);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + delay);
      osc.stop(now + delay + 0.12);
    });
  }

  public playPop() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(400, now);
    osc.frequency.exponentialRampToValueAtTime(800, now + 0.08);

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.08);
  }

  // Happy celebration sparkle sound
  public playSparkle() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51]; // C5, E5, G5, C6, E6
    
    notes.forEach((freq, idx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      const startTime = now + idx * 0.06;
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.2, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.25);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.25);
    });
  }

  // Funny yuck/dislike sound
  public playDislike() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.linearRampToValueAtTime(110, now + 0.3);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.3);
  }

  // Animal Vocalization Synthesizer & Speech with Realistic Acoustic Envelopes
  public playAnimalSound(type: string) {
    if (this.isMuted) return;
    this.initCtx();

    // 1. Spoken Onomatopoeia with SpeechSynthesis for clear child feedback
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      let word = '';
      let pitch = 1.0;
      let rate = 1.0;

      switch (type) {
        case 'dog':
          word = 'Woof! Woof!';
          pitch = 0.85;
          rate = 1.2;
          break;
        case 'cow':
          word = 'Mooo!';
          pitch = 0.55;
          rate = 0.75;
          break;
        case 'cat':
          word = 'Meow! Meow!';
          pitch = 1.45;
          rate = 1.1;
          break;
        case 'sheep':
          word = 'Baa! Baa!';
          pitch = 1.15;
          rate = 1.0;
          break;
        case 'goat':
          word = 'Maaa!';
          pitch = 1.3;
          rate = 1.1;
          break;
        case 'horse':
          word = 'Neighhhhh!';
          pitch = 1.0;
          rate = 0.95;
          break;
        case 'lion':
          word = 'Roarrrrr!';
          pitch = 0.5;
          rate = 0.85;
          break;
        case 'pig':
          word = 'Oink! Oink!';
          pitch = 1.25;
          rate = 1.2;
          break;
        case 'frog':
          word = 'Ribbit! Ribbit!';
          pitch = 0.7;
          rate = 1.25;
          break;
        default:
          word = 'Hello!';
          pitch = 1.2;
          rate = 1.1;
          break;
      }

      const utterance = new SpeechSynthesisUtterance(word);
      utterance.pitch = pitch;
      utterance.rate = rate;
      utterance.volume = 1.0;
      window.speechSynthesis.speak(utterance);
    }

    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    switch (type) {
      case 'cat': {
        // Realistic Meow: smooth pitch sweep with dual vocal formants
        const osc1 = this.ctx.createOscillator();
        const osc2 = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        filter.type = 'bandpass';
        filter.Q.value = 3;
        filter.frequency.setValueAtTime(600, now);
        filter.frequency.exponentialRampToValueAtTime(1400, now + 0.25);
        filter.frequency.exponentialRampToValueAtTime(500, now + 0.6);

        osc1.type = 'sawtooth';
        osc2.type = 'triangle';

        osc1.frequency.setValueAtTime(380, now);
        osc1.frequency.exponentialRampToValueAtTime(750, now + 0.25);
        osc1.frequency.exponentialRampToValueAtTime(420, now + 0.6);

        osc2.frequency.setValueAtTime(760, now);
        osc2.frequency.exponentialRampToValueAtTime(1500, now + 0.25);
        osc2.frequency.exponentialRampToValueAtTime(840, now + 0.6);

        gain.gain.setValueAtTime(0.01, now);
        gain.gain.linearRampToValueAtTime(0.35, now + 0.15);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.6);

        osc1.connect(filter);
        osc2.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        osc1.start(now);
        osc2.start(now);
        osc1.stop(now + 0.6);
        osc2.stop(now + 0.6);
        break;
      }

      case 'dog': {
        // Realistic Bark: 2 rich energetic woofs with chest resonance and breath noise
        for (let b = 0; b < 2; b++) {
          const bTime = now + b * 0.22;

          // Fundamental bark tone
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(280, bTime);
          osc.frequency.exponentialRampToValueAtTime(90, bTime + 0.14);

          // Bark chest filter
          const filter = this.ctx.createBiquadFilter();
          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(800, bTime);

          gain.gain.setValueAtTime(0.45, bTime);
          gain.gain.exponentialRampToValueAtTime(0.01, bTime + 0.14);

          osc.connect(filter);
          filter.connect(gain);
          gain.connect(this.ctx.destination);

          osc.start(bTime);
          osc.stop(bTime + 0.14);

          // Noise punch for realistic puff
          const bufferSize = this.ctx.sampleRate * 0.08;
          const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
          const output = buffer.getChannelData(0);
          for (let j = 0; j < bufferSize; j++) {
            output[j] = (Math.random() * 2 - 1) * Math.exp(-j / (bufferSize * 0.2));
          }
          const noise = this.ctx.createBufferSource();
          noise.buffer = buffer;
          const noiseGain = this.ctx.createGain();
          noiseGain.gain.setValueAtTime(0.2, bTime);
          noiseGain.gain.exponentialRampToValueAtTime(0.01, bTime + 0.08);

          noise.connect(noiseGain);
          noiseGain.connect(this.ctx.destination);
          noise.start(bTime);
          noise.stop(bTime + 0.08);
        }
        break;
      }

      case 'cow': {
        // Realistic Moo: rich low warm resonance with pitch swell
        const osc1 = this.ctx.createOscillator();
        const osc2 = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(350, now);

        osc1.type = 'sawtooth';
        osc2.type = 'triangle';

        osc1.frequency.setValueAtTime(100, now);
        osc1.frequency.linearRampToValueAtTime(145, now + 0.25);
        osc1.frequency.linearRampToValueAtTime(95, now + 0.8);

        osc2.frequency.setValueAtTime(200, now);
        osc2.frequency.linearRampToValueAtTime(290, now + 0.25);
        osc2.frequency.linearRampToValueAtTime(190, now + 0.8);

        gain.gain.setValueAtTime(0.01, now);
        gain.gain.linearRampToValueAtTime(0.45, now + 0.15);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.8);

        osc1.connect(filter);
        osc2.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        osc1.start(now);
        osc2.start(now);
        osc1.stop(now + 0.8);
        osc2.stop(now + 0.8);
        break;
      }

      case 'sheep': {
        // Realistic Baa: vocal pitch with natural 7Hz tremolo/vibrato
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const lfo = this.ctx.createOscillator();
        const lfoGain = this.ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(240, now);

        // 7Hz vibrato
        lfo.type = 'sine';
        lfo.frequency.setValueAtTime(7, now);
        lfoGain.gain.setValueAtTime(18, now);

        lfo.connect(osc.frequency);

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(750, now);
        filter.Q.value = 2;

        gain.gain.setValueAtTime(0.01, now);
        gain.gain.linearRampToValueAtTime(0.4, now + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.65);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        lfo.start(now);
        osc.start(now);
        lfo.stop(now + 0.65);
        osc.stop(now + 0.65);
        break;
      }

      case 'goat': {
        // Realistic Maaa Bleat: higher pitch with 12Hz rapid vibrato
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const lfo = this.ctx.createOscillator();
        const lfoGain = this.ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(320, now);

        lfo.type = 'sine';
        lfo.frequency.setValueAtTime(12, now);
        lfoGain.gain.setValueAtTime(30, now);

        lfo.connect(osc.frequency);

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(900, now);
        filter.Q.value = 2.5;

        gain.gain.setValueAtTime(0.01, now);
        gain.gain.linearRampToValueAtTime(0.4, now + 0.08);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.55);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        lfo.start(now);
        osc.start(now);
        lfo.stop(now + 0.55);
        osc.stop(now + 0.55);
        break;
      }

      case 'horse': {
        // Realistic Neigh: high whinny sweep starting at 750Hz with pitch flutter
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(750, now);
        osc.frequency.linearRampToValueAtTime(920, now + 0.15);
        osc.frequency.exponentialRampToValueAtTime(380, now + 0.65);

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(1200, now);

        gain.gain.setValueAtTime(0.01, now);
        gain.gain.linearRampToValueAtTime(0.38, now + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.65);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.65);
        break;
      }

      case 'frog': {
        // Realistic Ribbit: low throat croak pulse
        for (let r = 0; r < 2; r++) {
          const rTime = now + r * 0.22;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(150, rTime);
          osc.frequency.linearRampToValueAtTime(230, rTime + 0.12);

          gain.gain.setValueAtTime(0.35, rTime);
          gain.gain.exponentialRampToValueAtTime(0.01, rTime + 0.14);

          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(rTime);
          osc.stop(rTime + 0.14);
        }
        break;
      }

      case 'pig': {
        // Realistic Oink: dual snort pulses with square wave resonance
        for (let p = 0; p < 2; p++) {
          const pTime = now + p * 0.18;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'square';
          osc.frequency.setValueAtTime(210, pTime);
          osc.frequency.exponentialRampToValueAtTime(110, pTime + 0.12);

          gain.gain.setValueAtTime(0.3, pTime);
          gain.gain.exponentialRampToValueAtTime(0.01, pTime + 0.12);

          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(pTime);
          osc.stop(pTime + 0.12);
        }
        break;
      }

      case 'lion': {
        // Realistic Roar: deep low rumble growl
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(80, now);
        osc.frequency.linearRampToValueAtTime(150, now + 0.2);
        osc.frequency.linearRampToValueAtTime(65, now + 0.7);

        gain.gain.setValueAtTime(0.05, now);
        gain.gain.linearRampToValueAtTime(0.45, now + 0.2);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.7);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.7);
        break;
      }

      default: {
        // Happy cute squeak
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(450, now);
        osc.frequency.exponentialRampToValueAtTime(900, now + 0.18);

        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.18);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.18);
        break;
      }
    }
  }

  // Soft background melody tune loop
  public startBgm() {
    if (this.isBgmPlaying || this.isMuted) return;
    this.isBgmPlaying = true;
    this.initCtx();

    const melody = [
      261.63, 329.63, 392.00, 523.25, // C E G C
      349.23, 440.00, 523.25, 659.25, // F A C E
      392.00, 493.88, 587.33, 698.46, // G B D F
      523.25, 392.00, 329.63, 261.63  // C G E C
    ];

    let noteIdx = 0;
    const playNextNote = () => {
      if (!this.isBgmPlaying || this.isMuted || !this.ctx) return;
      const freq = melody[noteIdx % melody.length];
      noteIdx++;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.02, now); // Soft background level
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.4);
    };

    this.bgmInterval = window.setInterval(playNextNote, 450);
  }

  public stopBgm() {
    this.isBgmPlaying = false;
    if (this.bgmInterval !== null) {
      clearInterval(this.bgmInterval);
      this.bgmInterval = null;
    }
  }

  public toggleBgm(): boolean {
    if (this.isBgmPlaying) {
      this.stopBgm();
    } else {
      this.startBgm();
    }
    return this.isBgmPlaying;
  }

  public getBgmPlaying(): boolean {
    return this.isBgmPlaying;
  }
}

export const sound = new SoundManager();
