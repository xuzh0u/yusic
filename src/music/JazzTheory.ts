import { MusicParams } from '../types'

interface Chord {
  root: string
  type: string
  notes: string[]
}

export class JazzTheory {
  private params: MusicParams
  private notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
  
  // Jazz 和弦进行模板 - 简化版，更和谐
  private progressions = {
    'lofi-jazz': [
      ['Cmaj7', 'Am7', 'Dm7', 'G7'],  // 使用绝对音名
      ['Cmaj7', 'Fmaj7', 'Em7', 'Am7'],
      ['Dm7', 'G7', 'Cmaj7', 'Am7']
    ],
    'smooth-jazz': [
      ['Cmaj7', 'Am7', 'Dm7', 'G7'],
      ['Cmaj7', 'Fmaj7', 'Em7', 'Am7'],
      ['Dm7', 'G7', 'Cmaj7', 'Cmaj7']
    ],
    'bossa-nova': [
      ['Cmaj7', 'Dm7', 'G7', 'Cmaj7'],
      ['Am7', 'Dm7', 'G7', 'Cmaj7'],
      ['Fmaj7', 'Em7', 'Am7', 'Dm7']
    ],
    'modal-jazz': [
      ['Dm7', 'Dm7', 'Dm7', 'Dm7'],
      ['G7', 'G7', 'Dm7', 'Dm7'],
      ['Bbmaj7', 'Bbmaj7', 'Dm7', 'Dm7']
    ],
    'bebop': [
      ['Cmaj7', 'Am7', 'Dm7', 'G7'],
      ['Em7', 'A7', 'Dm7', 'G7'],
      ['Cmaj7', 'C7', 'Fmaj7', 'Fm7']
    ]
  }

  constructor(params: MusicParams) {
    this.params = params
  }

  generateChordProgression(bars: number): Chord[] {
    const progression = this.progressions[this.params.style]
    const chords: Chord[] = []
    
    // 重复进行以填满小节数
    const repeats = Math.ceil(bars / 4)
    for (let i = 0; i < repeats; i++) {
      const pattern = progression[i % progression.length]
      pattern.forEach(chordName => {
        chords.push(this.parseChord(chordName))
      })
    }
    
    return chords.slice(0, bars)
  }

  private parseChord(chordName: string): Chord {
    // 直接解析和弦名称，如 "Cmaj7", "Am7", "G7"
    let root = chordName[0]
    let type = 'maj7'
    
    // 处理升降号
    if (chordName[1] === '#' || chordName[1] === 'b') {
      root += chordName[1]
      type = chordName.slice(2)
    } else {
      type = chordName.slice(1)
    }
    
    // 转换调性
    const keyOffset = this.notes.indexOf(this.params.key)
    const rootOffset = this.notes.indexOf(root)
    const transposedRoot = this.notes[(rootOffset + keyOffset) % 12]
    
    const notes = this.buildChord(transposedRoot, type)
    
    return { root: transposedRoot, type, notes }
  }

  private buildChord(root: string, type: string): string[] {
    const rootIndex = this.notes.indexOf(root)
    
    const intervals: { [key: string]: number[] } = {
      'maj7': [0, 4, 7, 11],
      '7': [0, 4, 7, 10],
      'm7': [0, 3, 7, 10],
      'Fm7': [0, 3, 7, 10],  // 特殊处理
      'dim7': [0, 3, 6, 9]
    }
    
    // 处理小七和弦
    if (type.includes('m7')) {
      type = 'm7'
    } else if (type.includes('maj7')) {
      type = 'maj7'
    } else if (type.includes('7')) {
      type = '7'
    }
    
    const chordIntervals = intervals[type] || intervals['maj7']
    return chordIntervals.map(interval => 
      this.notes[(rootIndex + interval) % 12]
    )
  }

  generatePianoComping(chords: Chord[]): any[] {
    const notes: any[] = []
    
    chords.forEach((chord, i) => {
      // 每个和弦4拍，使用简单的节奏
      const voicing = chord.notes.map(n => n + '4')
      
      // 每小节第1拍和第3拍
      notes.push({ 
        time: i * 4, 
        notes: voicing, 
        duration: 1.5 
      })
      
      notes.push({ 
        time: i * 4 + 2, 
        notes: voicing, 
        duration: 1.5 
      })
    })
    
    return notes
  }

  generateMelody(chords: Chord[]): any[] {
    const melody: any[] = []
    
    chords.forEach((chord, i) => {
      // 每个和弦生成简单的旋律
      // 主要使用和弦音，偶尔加入经过音
      
      // 第1拍：和弦根音
      melody.push({
        time: i * 4,
        note: chord.notes[0] + '5',
        duration: 1
      })
      
      // 第2拍：和弦三音
      melody.push({
        time: i * 4 + 1,
        note: chord.notes[1] + '5',
        duration: 1
      })
      
      // 第3拍：和弦五音
      melody.push({
        time: i * 4 + 2,
        note: chord.notes[2] + '5',
        duration: 1
      })
      
      // 第4拍：和弦七音
      melody.push({
        time: i * 4 + 3,
        note: chord.notes[3] + '5',
        duration: 1
      })
    })
    
    return melody
  }

  generateBassLine(chords: Chord[]): any[] {
    const bassLine: any[] = []
    
    chords.forEach((chord, i) => {
      const root = chord.root + '2'
      
      // 简单的根音 bass line
      // 每拍一个音符
      bassLine.push({ time: i * 4, note: root, duration: 0.9 })
      bassLine.push({ time: i * 4 + 1, note: root, duration: 0.9 })
      bassLine.push({ time: i * 4 + 2, note: root, duration: 0.9 })
      bassLine.push({ time: i * 4 + 3, note: root, duration: 0.9 })
    })
    
    return bassLine
  }

  generateDrumPattern(): { kick: any[], snare: any[], hihat: any[] } {
    const kick: any[] = []
    const snare: any[] = []
    const hihat: any[] = []
    
    // 32小节的鼓点
    for (let bar = 0; bar < 32; bar++) {
      const baseTime = bar * 4
      
      // Kick - 1, 3拍
      kick.push({ time: baseTime })
      kick.push({ time: baseTime + 2 })
      
      // Snare - 2, 4拍
      snare.push({ time: baseTime + 1 })
      snare.push({ time: baseTime + 3 })
      
      // Hi-hat - 每拍
      hihat.push({ time: baseTime })
      hihat.push({ time: baseTime + 0.5 })
      hihat.push({ time: baseTime + 1 })
      hihat.push({ time: baseTime + 1.5 })
      hihat.push({ time: baseTime + 2 })
      hihat.push({ time: baseTime + 2.5 })
      hihat.push({ time: baseTime + 3 })
      hihat.push({ time: baseTime + 3.5 })
    }
    
    return { kick, snare, hihat }
  }
}
