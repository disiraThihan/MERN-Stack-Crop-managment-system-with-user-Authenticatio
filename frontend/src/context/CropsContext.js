import { createContext, useReducer } from 'react'

export const CropsContext = createContext()

export const CropsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CROP':
      return { 
        crops: action.payload 
      }
    case 'CREATE_CROP':
      return { 
        crops: [action.payload, ...state.crops] 
      }
    case 'DELETE_CROP':
     return { 
        crops: state.crops.filter((w) => w._id !== action.payload._id) 
      }
    default:
      return state
  }
}

export const CropsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CropsReducer, { 
    crops: null
  })
  
  return (
    <CropsContext.Provider value={{ ...state, dispatch }}>
      { children }
    </CropsContext.Provider>
  )
}