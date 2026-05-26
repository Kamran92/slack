import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react'
import { rollbarConfig } from '@shared/config'
import { ReactNode } from 'react'

interface RollbarProviderWrapperProps {
  children: ReactNode
}

export const RollbarProviderWrapper = ({ children }: RollbarProviderWrapperProps) => {
  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        {children}
      </ErrorBoundary>
    </RollbarProvider>
  )
}
