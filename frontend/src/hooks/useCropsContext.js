import { CropsContext } from '../context/CropsContext'
import { useContext } from 'react'

export const useCropsContext = () => {
  const context = useContext(CropsContext)

  if (!context) {
    throw Error('useCropsContext must be used inside an CropsContextProvider')
  }

  return context
}