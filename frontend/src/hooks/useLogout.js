import { useAuthContext } from './useAuthContext'
import { useCropsContext } from './useCropsContext'

export const useLogout = () => {
  const { dispatch } = useAuthContext()
  const { dispatch: dispatchCrops} = useCropsContext()

  const logout = () => {
    // remove user from storage
    localStorage.removeItem('user')

    // dispatch logout action
    dispatch({ type: 'LOGOUT' })
    dispatchCrops({ type: 'SET_CROPS', payload: null })
  }

  return { logout }
}