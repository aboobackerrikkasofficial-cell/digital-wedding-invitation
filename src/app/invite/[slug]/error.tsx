'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Invitation Page Error:', error)
  }, [error])

  return (
    <div className="min-h-screen w-full bg-[#fdfbf0] flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-6">
        <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      
      <h2 className="text-2xl font-serif font-bold text-gray-900 mb-2">Something went wrong</h2>
      <p className="text-gray-500 max-w-md mb-8">
        We encountered a problem while loading this invitation. This could be due to a temporary connection issue.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => reset()}
          className="bg-gold text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:shadow-gold/20 transition-all active:scale-95"
        >
          Try Again
        </button>
        <button
          onClick={() => window.location.reload()}
          className="bg-white border border-gray-200 text-gray-600 px-8 py-3 rounded-xl font-bold hover:bg-gray-50 transition-all active:scale-95"
        >
          Refresh Page
        </button>
      </div>
    </div>
  )
}
