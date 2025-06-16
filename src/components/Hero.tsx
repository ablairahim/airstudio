'use client'

import { designTokens } from '@/lib/design-tokens'

export default function Hero() {
  // Array of colors from the new design tokens
  const colors = [
    designTokens.colors.green,      // #E5F902
    designTokens.colors.dun,        // #CFBFAC
    designTokens.colors.blue,       // #C7EEFF
    designTokens.colors.pink,       // #FBE5FC
    designTokens.colors.lightGreen, // #D2FFD2
    designTokens.colors.beige,      // #FFE5D2
    designTokens.colors.grey100,    // #F1F3F4
    designTokens.colors.grey500,    // #BFC9CA
    designTokens.colors.grey800,    // #202222
    designTokens.colors.black,      // #000000
  ]

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="text-center space-y-8">
        {/* Color demonstration with 10 headings */}
        <div className="space-y-4">
          {colors.map((color, index) => (
            <h1 
              key={index}
              className="text-h1"
              style={{ color }}
            >
              Color {index + 1}: {color}
            </h1>
          ))}
        </div>
        
        {/* Main content */}
        <div className="mt-16">
          <h2 className="text-h2" style={{ color: designTokens.colors.grey800 }}>
            Welcome to AirStudio
          </h2>
          <p className="text-body1 mt-4" style={{ color: designTokens.colors.grey500 }}>
            Design system with custom tokens
          </p>
        </div>
      </div>
    </section>
  )
} 