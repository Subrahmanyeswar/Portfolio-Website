'use client'

import { useState, useRef, useEffect } from 'react'

// Types
type Message = {
  role: 'user' | 'assistant'
  content: string
}

type ChatStatus = 'idle' | 'loading' | 'error'

// Starter chips
const STARTER_QUESTIONS = [
  "Tell me about Aeternum Hub",
  "What's your strongest skill?",
  "Are you open to internships?",
  "What makes you stand out?",
]

export default function ChatWidget() {

  // State
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [status, setStatus] = useState<ChatStatus>('idle')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Auto scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen])

  // CORE SEND FUNCTION — single source of truth for all sending
  const sendMessage = async (textToSend: string) => {
    const trimmed = textToSend?.trim()
    
    // Guard: do nothing if empty or already loading
    if (!trimmed || status === 'loading') return

    // Build new user message
    const userMessage: Message = { role: 'user', content: trimmed }
    
    // Update UI immediately
    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)
    setInput('')
    setStatus('loading')

    try {
      // Call local API route for security
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updatedMessages })
      })

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }

      const data = await response.json()
      const assistantReply = data.reply

      if (!assistantReply) {
        throw new Error('Empty response from API')
      }

      // Add assistant reply to messages
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: assistantReply 
      }])
      setStatus('idle')

    } catch (error) {
      console.error('Chat error:', error)
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "Sorry, I'm having trouble connecting right now. Please try again in a moment or reach out directly at subrahmanyeswarkolluru@gmail.com"
      }])
      setStatus('error')
      // Reset to idle after error so user can retry
      setTimeout(() => setStatus('idle'), 2000)
    }
  }

  // Form submit handler
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(input)
  }

  // Enter key handler
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage(input)
    }
  }

  // Chip click handler
  const handleChipClick = (question: string) => {
    sendMessage(question)
  }

  return (
    <>
      {/* FLOATING BUTTON */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open AI Chat"
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 1000,
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          backgroundColor: '#1C6EF2',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: '600',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 20px rgba(28, 110, 242, 0.35)',
        }}
      >
        {isOpen ? '✕' : 'ASK'}
      </button>

      {/* CHAT PANEL */}
      {isOpen && (
        <div style={{
          position: 'fixed',
          bottom: '92px',
          right: '24px',
          zIndex: 999,
          width: '360px',
          height: '500px',
          backgroundColor: 'white',
          borderRadius: '16px',
          border: '1px solid #E2E2DC',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          boxShadow: '0 8px 40px rgba(0,0,0,0.12)',
        }}>

          {/* HEADER */}
          <div style={{
            padding: '16px 20px',
            borderBottom: '1px solid #E2E2DC',
            backgroundColor: 'white',
          }}>
            <div style={{ fontWeight: '700', fontSize: '16px', color: '#0F0F0E' }}>
              Ask Subbu
            </div>
            <div style={{ fontSize: '12px', color: '#6B6B65', marginTop: '2px' }}>
              AI-powered Q&A about my work
            </div>
          </div>

          {/* MESSAGES AREA */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}>

            {/* Welcome message — always shown */}
            <div style={{
              backgroundColor: '#F4F4F0',
              borderRadius: '12px',
              padding: '12px 14px',
              fontSize: '14px',
              color: '#0F0F0E',
              lineHeight: '1.5',
            }}>
              Hi! I'm Subbu's AI twin. Ask me anything about my 
              projects, research, or experience!
            </div>

            {/* Starter chips — only show before first message */}
            {messages.length === 0 && (
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
              }}>
                {STARTER_QUESTIONS.map((question) => (
                  <button
                    key={question}
                    onClick={() => handleChipClick(question)}
                    disabled={status === 'loading'}
                    style={{
                      backgroundColor: '#EBF2FF',
                      color: '#1C6EF2',
                      border: '1px solid #C7D9FB',
                      borderRadius: '20px',
                      padding: '8px 14px',
                      fontSize: '13px',
                      cursor: 'pointer',
                      textAlign: 'left',
                      fontFamily: 'inherit',
                      transition: 'background 0.15s',
                    }}
                  >
                    {question}
                  </button>
                ))}
              </div>
            )}

            {/* Conversation messages */}
            {messages.map((msg, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                }}
              >
                <div style={{
                  maxWidth: '80%',
                  padding: '10px 14px',
                  borderRadius: msg.role === 'user' 
                    ? '16px 16px 4px 16px' 
                    : '16px 16px 16px 4px',
                  backgroundColor: msg.role === 'user' 
                    ? '#1C6EF2' 
                    : '#F4F4F0',
                  color: msg.role === 'user' ? 'white' : '#0F0F0E',
                  fontSize: '14px',
                  lineHeight: '1.5',
                }}>
                  {msg.content}
                </div>
              </div>
            ))}

            {/* Loading indicator */}
            {status === 'loading' && (
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div style={{
                  backgroundColor: '#F4F4F0',
                  borderRadius: '16px 16px 16px 4px',
                  padding: '12px 16px',
                  fontSize: '20px',
                  letterSpacing: '2px',
                }}>
                  ···
                </div>
              </div>
            )}

            {/* Scroll anchor */}
            <div ref={messagesEndRef} />
          </div>

          {/* INPUT FORM */}
          <form
            onSubmit={handleFormSubmit}
            style={{
              padding: '12px 16px',
              borderTop: '1px solid #E2E2DC',
              display: 'flex',
              gap: '8px',
              alignItems: 'center',
              backgroundColor: 'white',
            }}
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything..."
              disabled={status === 'loading'}
              style={{
                flex: 1,
                border: '1px solid #E2E2DC',
                borderRadius: '20px',
                padding: '10px 16px',
                fontSize: '14px',
                outline: 'none',
                fontFamily: 'inherit',
                backgroundColor: status === 'loading' ? '#F9F9F7' : 'white',
                color: '#0F0F0E',
              }}
            />
            <button
              type="submit"
              disabled={status === 'loading' || !input?.trim()}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: status === 'loading' || !input?.trim() 
                  ? '#C0C0BA' 
                  : '#1C6EF2',
                border: 'none',
                cursor: status === 'loading' || !input?.trim() 
                  ? 'not-allowed' 
                  : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background 0.15s',
                flexShrink: 0,
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" 
                fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" 
                  stroke="white" strokeWidth="2" strokeLinecap="round" 
                  strokeLinejoin="round"/>
              </svg>
            </button>
          </form>

        </div>
      )}
    </>
  )
}
