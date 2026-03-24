import { useState, useCallback, useRef } from 'react'
import { askScholarshipAI } from '@services/aiService'

export function useAI() {
  const [loading, setLoading] = useState(false)
  const [answer, setAnswer] = useState('')
  const [error, setError] = useState(null)
  const historyRef = useRef([])

  const ask = useCallback(async (question) => {
    if (!question.trim()) return
    setLoading(true)
    setAnswer('')
    setError(null)
    try {
      const response = await askScholarshipAI(question, historyRef.current)
      setAnswer(response)
      historyRef.current = [
        ...historyRef.current,
        { role: 'user', content: question },
        { role: 'assistant', content: response },
      ].slice(-12) // keep last 12 messages
      return response
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  const reset = useCallback(() => {
    setAnswer('')
    setError(null)
    historyRef.current = []
  }, [])

  return { ask, loading, answer, error, reset, history: historyRef.current }
}

export function useChat() {
  const [messages, setMessages] = useState([{
    role: 'assistant',
    content: "Hello! I'm your AI Scholarship Advisor. Ask me anything about international scholarships, eligibility, documents, or how to strengthen your application! 🎓",
  }])
  const [loading, setLoading] = useState(false)
  const historyRef = useRef([])

  const send = useCallback(async (question) => {
    if (!question.trim()) return
    const userMsg = { role: 'user', content: question }
    setMessages(prev => [...prev, userMsg])
    setLoading(true)
    try {
      const response = await askScholarshipAI(question, historyRef.current)
      const assistantMsg = { role: 'assistant', content: response }
      setMessages(prev => [...prev, assistantMsg])
      historyRef.current = [...historyRef.current, userMsg, assistantMsg].slice(-12)
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' }])
    } finally {
      setLoading(false)
    }
  }, [])

  const clear = useCallback(() => {
    setMessages([{ role: 'assistant', content: "Hello! I'm your AI Scholarship Advisor. How can I help you today? 🎓" }])
    historyRef.current = []
  }, [])

  return { messages, send, loading, clear }
}
