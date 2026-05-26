import { Provider } from 'react-redux'
import store from '../store/slices/StoreReducer'
import { ReactNode } from 'react'

interface StoreProviderProps {
  children: ReactNode
}

export const StoreProvider = ({ children }: StoreProviderProps) => {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  )
}
