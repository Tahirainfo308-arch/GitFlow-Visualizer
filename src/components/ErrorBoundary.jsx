import { Component } from 'react'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          background: 'var(--c-bg, #0D1117)',
          color: 'var(--c-text, #F0F6FC)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          fontFamily: 'monospace',
        }}>
          <div style={{
            maxWidth: '700px',
            width: '100%',
            background: 'var(--c-card, #161B22)',
            border: '1px solid var(--c-border, #30363D)',
            borderRadius: '12px',
            padding: '32px',
          }}>
            <h1 style={{ color: 'var(--c-red, #F85149)', fontSize: '20px', marginBottom: '16px' }}>
              Something went wrong
            </h1>
            <pre style={{
              background: 'var(--c-bg, #0D1117)',
              border: '1px solid var(--c-border, #30363D)',
              borderRadius: '8px',
              padding: '16px',
              overflow: 'auto',
              fontSize: '13px',
              color: 'var(--c-red, #F85149)',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
            }}>
              {this.state.error?.message}
            </pre>
            <pre style={{
              background: 'var(--c-bg, #0D1117)',
              border: '1px solid var(--c-border, #30363D)',
              borderRadius: '8px',
              padding: '16px',
              overflow: 'auto',
              fontSize: '12px',
              color: 'var(--c-muted, #8B949E)',
              marginTop: '12px',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              maxHeight: '300px',
            }}>
              {this.state.error?.stack}
            </pre>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
