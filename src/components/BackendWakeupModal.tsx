import { useEffect, useState } from 'react'

interface BackendWakeupModalProps {
  isWakingUp: boolean
}

const funnyMessages = [
  "Waking up our agents from Lagos traffic... 🚗",
  "Our Abuja agent just finished his tea break... ☕",
  "Kano agent is dusting off his keyboard... ⌨️",
  "Port Harcourt agent is coming online... 🌊",
  "Ibadan agent is stretching after a nap... 😴",
  "Enugu agent is loading wisdom... 🧠",
  "Calabar agent is wrapping up suya prep... 🍖",
  "Jos agent is descending from the plateau... 🏔️"
]

export default function BackendWakeupModal({ isWakingUp }: BackendWakeupModalProps) {
  const [messageIndex, setMessageIndex] = useState(0)
  const [dots, setDots] = useState('')

  useEffect(() => {
    if (!isWakingUp) return

    // Rotate through messages every 3 seconds
    const messageInterval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % funnyMessages.length)
    }, 3000)

    // Animate dots
    const dotsInterval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? '' : prev + '.'))
    }, 500)

    return () => {
      clearInterval(messageInterval)
      clearInterval(dotsInterval)
    }
  }, [isWakingUp])

  if (!isWakingUp) return null

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center animate-scale-in">
        {/* Animated Icon */}
        <div className="mb-6 relative">
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center animate-pulse">
            <span className="text-4xl">🇳🇬</span>
          </div>
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-white-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-800 mb-3">
          Our Agents Are On Their Way! 🚀
        </h2>

        {/* Description */}
        <p className="text-gray-600 mb-6">
          Gathering multilingual agents from across Nigeria to assist you
        </p>

        {/* Rotating Message */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4 mb-6 min-h-[60px] flex items-center justify-center">
          <p className="text-gray-700 font-medium">
            {funnyMessages[messageIndex]}{dots}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <div className="bg-gradient-to-r from-green-500 to-blue-500 h-full rounded-full animate-progress"></div>
        </div>

        {/* Subtitle */}
        <p className="text-xs text-gray-500 mt-4">
          This usually takes 30-60 seconds for our backend to wake up
        </p>
      </div>

      <style>{`
        @keyframes scale-in {
          from {
            transform: scale(0.9);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes progress {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(400%);
          }
        }

        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }

        .animate-progress {
          animation: progress 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
