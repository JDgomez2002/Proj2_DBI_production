import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import './MainPage.css'

function MainPage() {
  const [user, setUser] = useState({})
  const [logged_In, set_Logged_In_Status] = useState(false)
  const [user_Authorized, setUserAuthorized] = useState(false)
  const [authorizedChange, setauthorizedChange] = useState(false)
  // let logged = false
  const history = useHistory()

  useEffect(() => {
    const browser_data = window.localStorage.getItem('LOGIN_STATUS')
    if (browser_data !== null) setUser(JSON.parse(browser_data))
  }, [])

  useEffect(() => {
    console.log('user UseEffect:', user, typeof user.user_id)
    set_Logged_In_Status(user.logged_in)
    setUserAuthorized((user.logged_in))
    // logged = user.logged_in
    console.log('uawe authorized', user.logged_in)
  }, [user])

  const signOut = () => {
    // console.log('signing out...')
    set_Logged_In_Status(false)
    window.localStorage.setItem('LOGIN_STATUS', JSON.stringify({ user_id: '', password: '', logged_in: false, role:'' }))
    setTimeout(() => {
      history.push('/Proj2_DBI/')
    }, 3000)
  }

  const verify_Loggin_status = () => {
    setTimeout(() => {
        if(!user_Authorized){
          history.push('/Proj2_DBI/')
          console.log('waited 1 more')
        }
      }, [1000])
  }

  function UserMainPage() {
    // const [user, setUser] = useState({})
    return(
      <div>
        {logged_In ? 
        <>
          <div>You are signed in!</div>
          <div>USER: {user.user_id} <br/>PSSW: {user.password} <br/>ROLE: {user.role} </div>
          <button onClick={signOut} >Sign out</button>
        </>
        : <div id="logged-out-status" style={{color: 'red'}} > Signing out...</div>}
      </div>
    )
  }

  function UserUnauthorized() {
    console.log('UserUnauthorized rendered', user.user_id)
    if(!(user.user_id===undefined)){
      console.log('inside if', logged_In)
      if((!logged_In)&&(logged_In!=undefined)){
        setTimeout(() => {
          history.push('/Proj2_DBI/')
        }, [3000])
      }
    }
    return (
      <>
        <div>You are not authorized... </div>
        <div>Signing out...</div>
      </>
    )
  }

  return (
    <div className="main-page-header-container" >
      <div></div>
      MAIN PAGE
      {/* {logged_In ? <UserMainPage /> : <div id="logged-out-status" style={{color: 'red'}} > Signing out...</div>} */}
      {user_Authorized ? <UserMainPage /> : <UserUnauthorized/> }
    </div>
  )
}

export default MainPage
