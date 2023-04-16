import { useState, useEffect } from 'react'
import { useHistory, Route, Switch } from 'react-router-dom'
import { ColorModeContext, useMode } from '../../theme'
import { CssBaseline, ThemeProvider } from '@mui/material'
import Incidence from '../Incidence'
import Topbar from './scenes/global/Topbar'
import  Sidebar  from './scenes/global/Sidebar'
import './MainPage.css'
// import Dashboard from './scenes/dashboard'
// import Team from "./scenes/team";
// import Invoices from "./scenes/invoices";
// import Contacts from "./scenes/contacts";
// import Bar from "./scenes/bar";
// import Form from "./scenes/form";
// import Line from "./scenes/line";
// import Pie from "./scenes/pie";
// import FAQ from "./scenes/faq";

function MainPage() {
  const [user, setUser] = useState({})
  const [logged_In, set_Logged_In_Status] = useState(false)
  const [user_Authorized, setUserAuthorized] = useState(false)
  // MaterialUI mode colors
  const [theme, colorMode] = useMode()

  // let logged = false
  const history = useHistory()

  useEffect(() => {
    const browser_data = window.localStorage.getItem('LOGIN_STATUS')
    if (browser_data !== null) setUser(JSON.parse(browser_data))
  }, [])

  useEffect(() => {
    // console.log('user UseEffect:', user, typeof user.user_id)
    set_Logged_In_Status(user.logged_in)
    setUserAuthorized((user.logged_in))
    // logged = user.logged_in
    // console.log('uawe authorized', user.logged_in)
  }, [user])

  const signOut = () => {
    // console.log('signing out...')
    set_Logged_In_Status(false)
    window.localStorage.setItem('LOGIN_STATUS', JSON.stringify({ user_id: '', password: '', logged_in: false, role:'' }))
    setTimeout(() => {
      history.push('/Proj2_DBI/')
      console.log('pushing to /Proj2_DBI/')
      history.go(0)
    }, 3000)
  }

  const verify_Loggin_status = () => {
    // console.log('user_id', user.user_id)
    if(!(user.user_id===undefined)){
      // console.log('inside if: lloged_In (useState)', logged_In)
      if((!logged_In)&&(logged_In!=undefined)){
        setTimeout(() => {
          history.push('/Proj2_DBI/')
          history.go(0)
        }, [3000])
      }
    }
  }

  function UserMainPage() {
    return(
      <div>
        {logged_In ?
        <div className="app" >
          <Sidebar />
          <main className="content">
            <Topbar/>
            <Switch>
              <Route path="/Proj2_DBI/MainPage/incidence/" element={<Incidence />} />
              {/* <Route path="/team" element={<Team />} /> */}
              {/* <Route path="/contacts" element={<Contacts />} /> */}
              {/* <Route path="/invoices" element={<Invoices />} /> */}
              {/* <Route path="/form" element={<Form />} /> */}
              {/* <Route path="/bar" element={<Bar />} /> */}
              {/* <Route path="/pie" element={<Pie />} /> */}
              {/* <Route path="/line" element={<Line />} /> */}
              {/* <Route path="/faq" element={<FAQ />} /> */}
              {/* <Route path="/calendar" element={<Calendar />} /> */}
              {/* <Route path="/geography" element={<Geography />} /> */}
            </Switch>
            {/* <div>You are signed in!</div>
            <div>USER: {user.user_id} <br/>PSSW: {user.password} <br/>ROLE: {user.role} </div>
            <button onClick={signOut} >Sign out</button> */}
          </main>
        </div>
        : <div id="logged-out-status" style={{color: 'red'}} > Signing out...</div>}
      </div>
    )
  }

  function UserUnauthorized() {
    // console.log('UserUnauthorized rendered', user.user_id)
    verify_Loggin_status()
    return (
      <>
        <div>You are not authorized... </div>
        <div>Signing out...</div>
      </>
    )
  }

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="main-page" >
          {/* <main className="content">
          </main> */}
          {/* {logged_In ? <UserMainPage /> : <div id="logged-out-status" style={{color: 'red'}} > Signing out...</div>} */}
          {user_Authorized ? <UserMainPage /> : <UserUnauthorized/> }
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}

export default MainPage
