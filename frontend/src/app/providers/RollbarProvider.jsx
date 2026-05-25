import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react'
import { rollbarConfig } from '../../shared/config'

export const RollbarProviderWrapper = ({ children }) => {
  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        {children}
      </ErrorBoundary>
    </RollbarProvider>
  )
}