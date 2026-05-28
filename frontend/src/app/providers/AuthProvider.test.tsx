import { screen, fireEvent, waitFor } from '@testing-library/react'
import { render } from '@testing-library/react'
import { AuthProvider } from './AuthProvider'
import { useContext } from 'react'
import AuthContext from './AuthProvider'

const TestComponent = () => {
  const context = useContext(AuthContext)
  if (!context) return <div>No context</div>

  return (
    <div>
      <div data-testid="user">{context.user ? JSON.stringify(context.user) : 'null'}</div>
      <button onClick={() => context.logIn({ username: 'test', token: '123' })}>Log In</button>
      <button onClick={context.logOut}>Log Out</button>
      <div data-testid="auth-header">{JSON.stringify(context.getAuth())}</div>
    </div>
  )
}

describe('AuthProvider', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('renders children and provides context', () => {
    render(
      <AuthProvider>
        <div>Test child</div>
      </AuthProvider>,
    )

    expect(screen.getByText('Test child')).toBeInTheDocument()
  })

  it('logIn updates user and saves to localStorage', async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    )

    fireEvent.click(screen.getByText('Log In'))

    await waitFor(() => {
      expect(screen.getByTestId('user').textContent).toBe('{"username":"test","token":"123"}')
    })
    expect(localStorage.getItem('user')).toBe('{"username":"test","token":"123"}')
  })

  it('logOut clears user and localStorage', async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    )

    fireEvent.click(screen.getByText('Log In'))

    await waitFor(() => {
      expect(screen.getByTestId('user').textContent).toBe('{"username":"test","token":"123"}')
    })

    fireEvent.click(screen.getByText('Log Out'))

    await waitFor(() => {
      expect(screen.getByTestId('user').textContent).toBe('null')
    })
    expect(localStorage.getItem('user')).toBeNull()
  })

  it('getAuth returns correct headers', async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    )

    expect(screen.getByTestId('auth-header').textContent).toBe('{}')

    fireEvent.click(screen.getByText('Log In'))

    await waitFor(() => {
      expect(screen.getByTestId('auth-header').textContent).toBe('{"Authorization":"Bearer 123"}')
    })
  })
})
