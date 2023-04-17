import { useState, useEffect } from 'react'
import forest from '../../../../img/background/forest.jpg'
import './HomePage.css'

const HomePage = () => {
  const [user, setUser] = useState({})

  useEffect(() => {
    const browser_data = window.localStorage.getItem('LOGIN_STATUS')
    if (browser_data !== null) setUser(JSON.parse(browser_data))
  }, [])

  return (
    <div style={{ 
      height: '100%', 
      height: '91%', 
      display: 'grid', 
      alignContent: 'center',
      backgroundImage: `url(${forest})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      }}>
        <h1 className="main-title" >Welcome back, {user.user_id}!</h1>
    </div>
  )
}

export default HomePage
