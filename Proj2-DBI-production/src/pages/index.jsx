import React, { useEffect } from 'react'
import Login from './Login'
import SignIn from './SignIn'
import InfoPatient from './InfoPatient'
import InfoDoctor from './InfoDoctor'
import MainPage from './MainPage'
import Incidence from './Incidence'
import Insert_Incidence from './Insert_Incidence'
import { Switch, Route, BrowserRouter } from 'react-router-dom'

const Page = () => {

  return (
    <Switch>
      <Route path="/Proj2_DBI/MainPage/incidence/">
          <MainPage />
      </Route>
      <Route path="/Proj2_DBI/MainPage">
          <MainPage />
      </Route>
      <Route path="/Proj2_DBI/SignIn">
        <SignIn />
      </Route>
      <Route path="/Proj2_DBI/InfoPatient">
        <InfoPatient fullscreen={true} />
      </Route>
      <Route path="/Proj2_DBI/InfoDoctor">
        <InfoDoctor fullscreen={true} />
      </Route>
      <Route path="/">
        <Login />
      </Route>
    </Switch>
  )
}

// export { navigate }
export default Page
