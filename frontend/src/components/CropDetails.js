import { useCropsContext } from '../hooks/useCropsContext'
import { useAuthContext } from '../hooks/useAuthContext'

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const CropDetails = ({ crop }) => {
  const { dispatch } = useCropsContext()
  const { user } = useAuthContext()

  const handleClick = async () => {
    if (!user) {
      return
    }

    const response = await fetch('/api/crops/' + crop._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'DELETE_CROP', payload: json})
    }
  }

  return (
    <div className="crop-details">
      <h4>{crop.item}</h4>
      <p><strong>Load (kg): </strong>{crop.amount}</p>
      <p>{formatDistanceToNow(new Date(crop.createdAt), { addSuffix: true })}</p>
      <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
    </div>
  )
}

export default CropDetails