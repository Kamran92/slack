import { screen } from '@testing-library/react'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import NotFoundPage from './NotFoundPage'

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}))

vi.mock('@shared/assets/notFound.svg', () => ({
  default: 'not-found.svg',
}))

vi.mock('@widgets/header', () => ({
  Header: () => <div data-testid="header">Header</div>,
}))

const renderWithRouter = () => {
  return render(
    <MemoryRouter>
      <NotFoundPage />
    </MemoryRouter>,
  )
}

describe('NotFoundPage', () => {
  it('renders 404 page with image', () => {
    renderWithRouter()

    expect(screen.getByRole('img')).toBeInTheDocument()
  })

  it('renders not found text', () => {
    renderWithRouter()

    expect(screen.getByText('notFound.title')).toBeInTheDocument()
  })

  it('renders link to home', () => {
    renderWithRouter()

    const link = screen.getByText('notFound.link')
    expect(link).toBeInTheDocument()
    expect(link.closest('a')).toHaveAttribute('href', '/')
  })
})
