import { MusicParams } from '../types'
import './ControlPanel.css'

interface ControlPanelProps {
  params: MusicParams
  onParamsChange: (params: MusicParams) => void
}

const styles = [
  { 
    value: 'lofi-jazz', 
    label: 'Lo-fi Jazz',
    description: '轻松温暖，适合工作学习',
    emoji: '☕'
  },
  { 
    value: 'smooth-jazz', 
    label: 'Smooth Jazz',
    description: '流畅优雅，适合放松休息',
    emoji: '🌙'
  },
  { 
    value: 'bossa-nova', 
    label: 'Bossa Nova',
    description: '巴西风情，轻快愉悦',
    emoji: '🌴'
  },
  { 
    value: 'modal-jazz', 
    label: 'Modal Jazz',
    description: '现代空灵，适合深度思考',
    emoji: '🌌'
  },
  { 
    value: 'bebop', 
    label: 'Bebop',
    description: '快速复杂，充满活力',
    emoji: '⚡'
  }
]

const keys = ['C', 'D♭', 'D', 'E♭', 'E', 'F', 'G♭', 'G', 'A♭', 'A', 'B♭', 'B']

export function ControlPanel({ params, onParamsChange }: ControlPanelProps) {
  return (
    <div className="control-panel">
      <div className="control-section">
        <h3>音乐风格</h3>
        <div className="style-grid">
          {styles.map(style => (
            <button
              key={style.value}
              className={`style-card ${params.style === style.value ? 'active' : ''}`}
              onClick={() => onParamsChange({ ...params, style: style.value as any })}
            >
              <div className="style-emoji">{style.emoji}</div>
              <div className="style-name">{style.label}</div>
              <div className="style-desc">{style.description}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="control-section">
        <h3>节奏速度 (BPM)</h3>
        <div className="slider-container">
          <input
            type="range"
            min="60"
            max="140"
            value={params.bpm}
            onChange={(e) => onParamsChange({ ...params, bpm: Number(e.target.value) })}
          />
          <span className="value">{params.bpm}</span>
        </div>
        <div className="bpm-labels">
          <span>慢 (60)</span>
          <span>中 (100)</span>
          <span>快 (140)</span>
        </div>
      </div>

      <div className="control-section">
        <h3>调性</h3>
        <div className="key-grid">
          {keys.map(key => (
            <button
              key={key}
              className={`key-button ${params.key === key ? 'active' : ''}`}
              onClick={() => onParamsChange({ ...params, key })}
            >
              {key}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
