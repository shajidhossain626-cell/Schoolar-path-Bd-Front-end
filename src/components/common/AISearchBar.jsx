import { useState, useRef } from 'react'
import { useAI } from '@hooks/useAI'

const SUGGESTIONS = [
  'Best scholarships for engineering students in Germany',
  'How to apply for DAAD from Bangladesh',
  'IELTS score needed for Chevening',
  'Fully funded PhD scholarships 2025',
  'Documents needed for Chevening application',
]

export default function AISearchBar({ className = '' }) {
  const [query, setQuery] = useState('')
  const { ask, loading, answer } = useAI()
  const inputRef = useRef(null)

  const handleAsk = async () => {
    if (!query.trim()) return
    await ask(query)
  }

  const fillSuggestion = (s) => {
    setQuery(s)
    ask(s)
    inputRef.current?.focus()
  }

  return (
    <div className={className}>
      {/* Input row */}
      <div className={`flex items-center gap-2 bg-white border-2 rounded-2xl px-5 py-2 transition-all ${loading ? 'border-blue-300' : 'border-gray-200 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100'}`}>
        <span className="text-xl flex-shrink-0">✦</span>
        <input
          ref={inputRef}
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleAsk()}
          placeholder="Ask anything about scholarships... e.g. What's the deadline for DAAD?"
          className="flex-1 text-sm bg-transparent border-none outline-none text-gray-800 placeholder-gray-400 py-2"
        />
        <button onClick={handleAsk} disabled={loading || !query.trim()}
          className="flex-shrink-0 bg-gradient-to-r from-blue-600 to-navy-800 text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity whitespace-nowrap">
          {loading ? (
            <><span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" />
              <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:.15s]" />
              <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:.3s]" /></>
          ) : <>Ask AI ✦</>}
        </button>
      </div>

      {/* Suggestions */}
      <div className="flex flex-wrap gap-2 mt-3">
        {SUGGESTIONS.map(s => (
          <button key={s} onClick={() => fillSuggestion(s)}
            className="px-3 py-1.5 border border-blue-200/60 bg-blue-50/60 rounded-full text-xs font-medium text-blue-600 hover:bg-blue-100 transition-colors cursor-pointer">
            {s}
          </button>
        ))}
      </div>

      {/* Answer box */}
      {answer && (
        <div className="mt-4 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200/50 rounded-2xl p-5">
          <div className="flex items-center gap-2 text-blue-600 font-bold text-sm mb-3">
            <span>✦</span> AI Scholarship Advisor
          </div>
          <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line" dangerouslySetInnerHTML={{ __html: answer
  .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
  .replace(/^• /gm, '&bull; ')
}} />
        </div>
      )}
    </div>
  )
}
