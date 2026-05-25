import { StoreProvider } from './StoreProvider'
import { RouterProvider } from './RouterProvider'
import { I18nProvider } from './i18n/I18nProvider'
import { RollbarProviderWrapper } from './RollbarProvider'
import { AuthProvider } from './AuthProvider'
import { ChatProvider } from './ChatProvider'

export const AppProviders = ({ children }) => {
  return (
    <RollbarProviderWrapper>
      <StoreProvider>
        <AuthProvider>
          <RouterProvider>
            <I18nProvider>
              <ChatProvider>
                {children}
              </ChatProvider>
            </I18nProvider>
          </RouterProvider>
        </AuthProvider>
      </StoreProvider>
    </RollbarProviderWrapper>
  )
}