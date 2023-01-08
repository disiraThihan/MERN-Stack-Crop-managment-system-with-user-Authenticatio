import { useState } from "react"
import { useCropsContext } from "../hooks/useCropsContext"
import { useAuthContext } from '../hooks/useAuthContext'

const CropForm = () => {
  const { dispatch } = useCropsContext()
  const { user } = useAuthContext()

  const [item, setItem] = useState('')
  const [amount, setAmount] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!user) {
      setError('You must be logged in')
      return
    }

    const crop = {item,amount}

    const response = await fetch('/api/crops', {
      method: 'POST',
      body: JSON.stringify(crop),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      setItem('')
      setAmount('')
      setError(null)
      setEmptyFields([])
      dispatch({type: 'CREATE_CROP', payload: json})
    }
  }

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Crop</h3>

      <label>Item name:</label>
      <input 
        type="text"
        onChange={(e) => setItem(e.target.value)}
        value={item}
        className={emptyFields.includes('item') ? 'error' : ''}
      />

      <label>Amount (in kg):</label>
      <input 
        type="number"
        onChange={(e) => setAmount(e.target.value)}
        value={amount}
        className={emptyFields.includes('amount') ? 'error' : ''}
      />

      <button>Add Crop</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default CropForm