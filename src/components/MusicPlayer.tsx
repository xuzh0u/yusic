import { useState, useEffect, useRef } from 'react'
import { MusicParams } from '../types'
import { JazzGenerator } from '../music/JazzGenerator'
import './MusicPlayer.css'

interface MusicPlayerProps {
  params: MusicParams
}

export function MusicPlayer({ params }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)
  const generatorRef = useRef<JazzGenerator | null>(null)

  useEffect(() => {
    // 初始化生成器
    const initGenerator = async () => {
      if (!generatorRef.current) {
        generatorRef.current = new JazzGenerator()
        await generatorRef.current.initialize(params)
        setIsInitialized(true)
      }
    }
    initGenerator()

    return () => {
      if (generatorRef.current) {
        generatorRef.current.stop()
      }
    }
  }, [])

  // 参数变化时更新生成器
  useEffect(() => {
    if (generatorRef.current && isInitialized) {
      generatorRef.current.updateParams(params)
    }
  }, [params, isInitialized])

  const handlePlay = async () => {
    if (!generatorRef.current) return
    
    try {
      await generatorRef.current.play()
      setIsPlaying(true)
    } catch (error) {
      console.error('播放失败:', error)
      alert('播放失败，请刷新页面重试')
    }
  }

  const handleStop = () => {
    if (!generatorRef.current) return
    generatorRef.current.stop()
    setIsPlaying(false)
  }

  return (
    <div className="music-player">
      <div className="player-visualizer">
        <div className={`wave ${isPlaying ? 'playing' : ''}`}>
          <div className="wave-bar"></div>
          <div className="wave-bar"></div>
          <div className="wave-bar"></div>
          <div className="wave-bar"></div>
          <div className="wave-bar"></div>
        </div>
      </div>

      <div className="player-controls">
        {!isPlaying ? (
          <button
            className="btn-play"
            onClick={handlePlay}
            disabled={!isInitialized}
          >
            <span className="btn-icon">▶️</span>
            <span className="btn-text">开始播放</span>
          </button>
        ) : (
          <button className="btn-stop" onClick={handleStop}>
            <span className="btn-icon">⏹️</span>
            <span className="btn-text">停止播放</span>
          </button>
        )}
      </div>

      <div className="player-info">
        {isPlaying ? (
          <p className="status-playing">🎵 正在播放中...</p>
        ) : (
          <p className="status-idle">点击播放按钮开始享受音乐</p>
        )}
      </div>

      <div className="player-features">
        <div className="feature-item">
          <span className="feature-icon">🎹</span>
          <span>钢琴</span>
        </div>
        <div className="feature-item">
          <span className="feature-icon">🎷</span>
          <span>萨克斯</span>
        </div>
        <div className="feature-item">
          <span className="feature-icon">🥁</span>
          <span>鼓组</span>
        </div>
        <div className="feature-item">
          <span className="feature-icon">🎸</span>
          <span>贝斯</span>
        </div>
      </div>
    </div>
  )
}
