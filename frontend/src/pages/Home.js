import { useEffect }from 'react'
import { useCropsContext } from "../hooks/useCropsContext"
import { useAuthContext } from "../hooks/useAuthContext"

// components
import CropDetails from '../components/CropDetails'
import CropForm from '../components/CropForm'
// import SkillsBar from '../components/SkillsBar'


const Home = () => {
  const {crops, dispatch} = useCropsContext()
  const {user} = useAuthContext()

  useEffect(() => {
    const fetchCrops = async () => {
      const response = await fetch('/api/crops', {
        headers: {'Authorization': `Bearer ${user.token}`},
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_CROP', payload: json})
      }
    }

    if (user) {
      fetchCrops()
    }
  }, [dispatch, user])

  return (
    <div className="home">
      <div className="crops">
        {crops && crops.map((crop) => (
          <CropDetails key={crop._id} crop={crop} />
        ))}
      </div>
      <CropForm />
      {/* <SkillsBar /> */}
    </div>
  )
}

export default Home