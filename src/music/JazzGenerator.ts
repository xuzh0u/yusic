import * as Tone from 'tone'
import { MusicParams, MusicGenerator } from '../types'
import { JazzTheory } from './JazzTheory'

export class JazzGenerator implements MusicGenerator {
  private piano: Tone.PolySynth | null = null
  private sax: Tone.Synth | null = null
  private bass: Tone.Synth | null = null
  private drums: {
    kick: Tone.MembraneSynth | null
    snare: Tone.NoiseSynth | null
    hihat: Tone.MetalSynth | null
  } = { kick: null, snare: null, hihat: null }
  
  private parts: {
    piano: Tone.Part | null
    sax: Tone.Part | null
    bass: Tone.Part | null
    kick: Tone.Part | null
    snare: Tone.Part | null
    hihat: Tone.Part | null
  } = { piano: null, sax: null, bass: null, kick: null, snare: null, hihat: null }
  
  private playing = false
  private currentParams: MusicParams | null = null

  async initialize(params: MusicParams): Promise<void> {
    await Tone.start()
    this.currentParams = params
    await this.setupInstruments(params)
    this.generateMusic(params)
  }

  private async setupInstruments(params: MusicParams): Promise<void> {
    // 钢琴 - 温暖的音色
    this.piano = new Tone.PolySynth(Tone.Synth, {
      oscillator: { type: 'triangle' },
      envelope: {
        attack: 0.005,
        decay: 0.1,
        sustain: 0.3,
        release: 1
      }
    }).toDestination()
    this.piano.volume.value = -8

    // 萨克斯 - 柔和的主旋律
    this.sax = new Tone.Synth({
      oscillator: { type: 'sine' },
      envelope: {
        attack: 0.05,
        decay: 0.1,
        sustain: 0.5,
        release: 0.8
      }
    }).toDestination()
    this.sax.volume.value = -18

    // 贝斯 - 低音支撑
    this.bass = new Tone.Synth({
      oscillator: { type: 'sine' },
      envelope: {
        attack: 0.01,
        decay: 0.1,
        sustain: 0.3,
        release: 0.4
      }
    }).toDestination()
    this.bass.volume.value = -10

    // 鼓组
    this.drums.kick = new Tone.MembraneSynth({
      pitchDecay: 0.05,
      octaves: 6,
      oscillator: { type: 'sine' },
      envelope: {
        attack: 0.001,
        decay: 0.4,
        sustain: 0.01,
        release: 1.4
      }
    }).toDestination()
    this.drums.kick.volume.value = -15

    this.drums.snare = new Tone.NoiseSynth({
      noise: { type: 'white' },
      envelope: {
        attack: 0.001,
        decay: 0.2,
        sustain: 0
      }
    }).toDestination()
    this.drums.snare.volume.value = -25

    this.drums.hihat = new Tone.MetalSynth({
      envelope: {
        attack: 0.001,
        decay: 0.1,
        release: 0.01
      },
      harmonicity: 5.1,
      modulationIndex: 32,
      resonance: 4000,
      octaves: 1.5
    }).toDestination()
    this.drums.hihat.volume.value = -30

    Tone.Transport.bpm.value = params.bpm
  }

  private generateMusic(params: MusicParams): void {
    const theory = new JazzTheory(params)
    
    // 生成和弦进行（32小节循环）
    const chords = theory.generateChordProgression(32)
    
    // 生成各个声部
    const pianoNotes = theory.generatePianoComping(chords)
    const saxMelody = theory.generateMelody(chords)
    const bassLine = theory.generateBassLine(chords)
    const drumPattern = theory.generateDrumPattern()

    // 创建循环播放的 Parts
    this.createPart('piano', pianoNotes, (time, note) => {
      if (this.piano && note.notes) {
        this.piano.triggerAttackRelease(note.notes, note.duration, time)
      }
    })

    this.createPart('sax', saxMelody, (time, note) => {
      if (this.sax && note.note) {
        this.sax.triggerAttackRelease(note.note, note.duration, time)
      }
    })

    this.createPart('bass', bassLine, (time, note) => {
      if (this.bass && note.note) {
        this.bass.triggerAttackRelease(note.note, note.duration, time)
      }
    })

    this.createPart('kick', drumPattern.kick, (time) => {
      if (this.drums.kick) {
        this.drums.kick.triggerAttackRelease('C1', '8n', time)
      }
    })

    this.createPart('snare', drumPattern.snare, (time) => {
      if (this.drums.snare) {
        this.drums.snare.triggerAttackRelease('8n', time)
      }
    })

    this.createPart('hihat', drumPattern.hihat, (time) => {
      if (this.drums.hihat) {
        this.drums.hihat.triggerAttackRelease('32n', time)
      }
    })
  }

  private createPart(
    name: keyof typeof this.parts,
    events: any[],
    callback: (time: number, value: any) => void
  ): void {
    if (this.parts[name]) {
      this.parts[name]!.dispose()
    }

    this.parts[name] = new Tone.Part(callback, events)
    this.parts[name]!.loop = true
    this.parts[name]!.loopEnd = 128 // 32小节 * 4拍 = 128拍
  }

  async play(): Promise<void> {
    if (!this.playing) {
      await Tone.start()
      Tone.Transport.start()
      
      Object.values(this.parts).forEach(part => {
        if (part) part.start(0)
      })
      
      this.playing = true
    }
  }

  pause(): void {
    if (this.playing) {
      Tone.Transport.pause()
      this.playing = false
    }
  }

  stop(): void {
    Tone.Transport.stop()
    Object.values(this.parts).forEach(part => {
      if (part) part.stop()
    })
    this.playing = false
  }

  isPlaying(): boolean {
    return this.playing
  }

  updateParams(params: MusicParams): void {
    // 只在停止时更新
    if (!this.playing && this.currentParams) {
      const needsRegenerate = 
        params.style !== this.currentParams.style ||
        params.key !== this.currentParams.key

      if (needsRegenerate) {
        this.currentParams = params
        this.generateMusic(params)
      }

      // BPM 可以实时更新
      if (params.bpm !== this.currentParams.bpm) {
        Tone.Transport.bpm.value = params.bpm
        this.currentParams.bpm = params.bpm
      }
    }
  }
}
