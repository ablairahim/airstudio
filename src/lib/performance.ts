// Performance utilities для мониторинга в продакшене
export const performanceMonitor = {
  // Мониторинг Core Web Vitals
  measureCLS: () => {
    if (typeof window !== 'undefined' && 'web-vital' in window) {
      // Implement CLS measurement
      return true
    }
    return false
  },

  // Мониторинг времени загрузки
  measurePageLoad: (pageName: string) => {
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
      const loadTime = performance.now()
      // В продакшене можно отправлять в аналитику
      if (process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS) {
        // gtag('event', 'page_load_time', { page: pageName, time: loadTime })
      }
      return loadTime
    }
    return 0
  },

  // Предзагрузка критических ресурсов
  preloadCriticalResources: () => {
    if (typeof window !== 'undefined') {
      const criticalImages = [
        '/img/ablai.png',
        '/img/Logo_SVG-Black.svg',
        '/img/favicon.png'
      ]
      
      criticalImages.forEach(src => {
        const link = document.createElement('link')
        link.rel = 'preload'
        link.as = 'image'
        link.href = src
        document.head.appendChild(link)
      })
    }
  },

  // Lazy loading для некритических ресурсов
  lazyLoadImages: (selector: string = 'img[data-src]') => {
    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement
            img.src = img.dataset.src || ''
            img.classList.remove('lazy')
            observer.unobserve(img)
          }
        })
      })

      document.querySelectorAll(selector).forEach(img => {
        observer.observe(img)
      })
    }
  }
}

// Функция для оптимизации видео
export const optimizeVideo = (videoElement: HTMLVideoElement) => {
  if (videoElement) {
    // Отключаем видео на медленных соединениях
    if ('connection' in navigator) {
      const connection = (navigator as any).connection
      if (connection && connection.effectiveType === 'slow-2g') {
        videoElement.pause()
        videoElement.style.display = 'none'
      }
    }
    
    // Добавляем preload="metadata" для экономии трафика
    videoElement.preload = 'metadata'
    
    // Останавливаем видео при выходе из viewport
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          videoElement.play().catch(() => {})
        } else {
          videoElement.pause()
        }
      })
    })
    
    observer.observe(videoElement)
  }
}

// Функция для оптимизации GSAP анимаций
export const optimizeGSAP = () => {
  if (typeof window !== 'undefined') {
    // Отключаем анимации на медленных устройствах
    const isSlowDevice = navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4
    if (isSlowDevice) {
      document.documentElement.style.setProperty('--reduce-motion', '1')
    }
  }
} 