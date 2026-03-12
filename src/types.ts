export type GeneratorMode = 'algorithmic' | 'ai'

export type MusicStyle = 
  | 'lofi-jazz'      // Lo-fi Jazz - 轻松、温暖
  | 'smooth-jazz'    // Smooth Jazz - 流畅、优雅
  | 'bossa-nova'     // Bossa Nova - 巴西风格
  | 'modal-jazz'     // Modal Jazz - 现代、空灵
  | 'bebop'          // Bebop - 快速、复杂

export interface MusicParams {
  bpm: number
  key: string
  style: MusicStyle
}

export interface Instrument {
  name: string
  enabled: boolean
  volume: number
}

export interface MusicGenerator {
  initialize(params: MusicParams): Promise<void>
  play(): void
  pause(): void
  stop(): void
  isPlaying(): boolean
  updateParams(params: MusicParams): void
}
