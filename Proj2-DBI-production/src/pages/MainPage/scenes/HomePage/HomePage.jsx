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
      width: '100%', 
      height: '80%', 
      display: 'grid', 
      alignContent: 'center',
      backgroundImage: 'url(https://github.com/JDgomez2002/Proj2_DBI_production/blob/main/Proj2-DBI-production/src/img/background/forest.jpg?raw=true)',
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      }}>
        <h1 className="main-title" >Welcome back, {user.user_id}!</h1>
        <p className="role-message"  >You signed in as {user.role}</p>
    </div>
  )
}

export default HomePage
