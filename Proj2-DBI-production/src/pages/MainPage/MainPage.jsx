import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import './MainPage.css'

function MainPage() {
  const [user, setUser] = useState({ user_id: '', password: '', logged_in: false })
  const [logged_In, set_Logged_In_Status] = useState(false)
  const history = useHistory()

  useEffect(() => {
    const browser_data = window.localStorage.getItem('LOGIN_STATUS')
    if (browser_data !== null) setUser(JSON.parse(browser_data))
  }, [])

  useEffect(() => {
    // console.log('user UseEffect:', user)
    set_Logged_In_Status(user.logged_in)
  }, [user])

  const signOut = () => {
    // console.log('signing out...')
    set_Logged_In_Status(false)
    window.localStorage.setItem('LOGIN_STATUS', JSON.stringify({ user_id: '', password: '', logged_in: false }))
    setTimeout(() => {
      history.push('/Proj2_DBI/')
    }, 3000)
  }

  function UserMainPage() {
    // const [user, setUser] = useState({})
    return(
      <div>
        <div>You are signed in!</div>
        <div>USER: {user.user_id} <br/>PSSW: {user.password} </div>
        <button onClick={signOut} >Sign out</button>
      </div>
    )
  }
  
  return (
    <div className="main-page-header-container" >
      <div></div>
      MAIN PAGE
      {logged_In ? <UserMainPage /> : <div id="logged-out-status" style={{color: 'red'}} > Signing out...</div>}
    </div>
  )
}

export default MainPage
