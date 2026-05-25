import { Provider } from 'react-redux'
import store from '../store/slices/StoreReducer'

export const StoreProvider = ({ children }) => {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  )
}