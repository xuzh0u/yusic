import { useState, useEffect } from 'react'
import { MusicPlayer } from './components/MusicPlayer'
import { ControlPanel } from './components/ControlPanel'
import { MusicParams } from './types'
import './App.css'

// 从 localStorage 加载配置
const loadConfig = (): MusicParams => {
  const saved = localStorage.getItem('bgm-config')
  if (saved) {
    try {
      return JSON.parse(saved)
    } catch (e) {
      console.error('Failed to load config:', e)
    }
  }
  // 默认配置
  return {
    bpm: 85,
    key: 'C',
    style: 'lofi-jazz'
  }
}

function App() {
  const [params, setParams] = useState<MusicParams>(loadConfig)

  // 保存配置到 localStorage
  useEffect(() => {
    localStorage.setItem('bgm-config', JSON.stringify(params))
  }, [params])

  return (
    <div className="app">
      <header className="header">
        <h1>🎵 BGM Generator</h1>
        <p>日式 Jazz 风格背景音乐生成器</p>
      </header>

      <MusicPlayer params={params} />
      
      <ControlPanel params={params} onParamsChange={setParams} />

      <footer className="footer">
        <p>算法生成 · 完全合规 · 可商用</p>
      </footer>
    </div>
  )
}

export default App
