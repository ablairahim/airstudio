import React, { useState, useEffect } from 'react'
import { designTokens } from '@/lib/design-tokens'

interface LoadingScreenProps {
  onComplete: () => void
  duration?: number
}

export function LoadingScreen({ onComplete, duration = 2000 }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + (100 / (duration / 20)) // Рассчитываем шаг на основе duration
        
        if (newProgress >= 100) {
          clearInterval(interval)
          setIsComplete(true)
          
          // Даем время на анимацию шторки
          setTimeout(() => {
            onComplete()
          }, 800)
          return 100
        }
        
        return newProgress
      })
    }, 20) // Обновляем каждые 20мс

    return () => clearInterval(interval)
  }, [duration, onComplete])

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: designTokens.colors.grey100,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        transform: isComplete ? 'translateY(-100%)' : 'translateY(0)',
        transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      {/* Прогресс в процентах - уменьшенный размер */}
      <div
        style={{
          fontFamily: 'var(--font-funnel-display)',
          fontSize: '14px', // Уменьшено с 6rem до 14px
          fontWeight: 600,
          color: designTokens.colors.black,
          lineHeight: 1,
        }}
      >
        {Math.round(progress)}%
      </div>
      
      {/* Прогресс бар */}
      <div
        style={{
          width: '200px',
          height: '2px',
          backgroundColor: 'rgba(0, 0, 0, 0.1)',
          borderRadius: '1px',
          overflow: 'hidden',
          marginTop: designTokens.spacing.s, // Уменьшено расстояние
        }}
      >
        <div
          style={{
            width: `${progress}%`,
            height: '100%',
            backgroundColor: designTokens.colors.black,
            transition: 'width 0.1s ease',
          }}
        />
      </div>
    </div>
  )
} 