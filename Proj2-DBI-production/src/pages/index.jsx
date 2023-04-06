import React, { useEffect } from 'react'
import Login from './Login'
import SignIn from './SignIn'
import InfoPatient from './InfoPatient'
import InfoDoctor from './InfoDoctor'
import MainPage from './MainPage'
import Incidence from './Incidence'
import { Switch, Route, useHistory } from 'react-router-dom'

// const navigate = (page) => {
//   window.location = `/?route=${page}`
// }

const Page = () => {
  // escoger la pagina
  const history = useHistory()
  history.push('/Proj2_DBI/')

  return (
    <Switch>
      <Route path="/Proj2_DBI/MainPage">
        <MainPage />
      </Route>
      <Route path="/Proj2_DBI/SignIn">
        <SignIn />
      </Route>
      <Route path="/Proj2_DBI/InfoPatient">
        <InfoPatient />
      </Route>
      <Route path="/Proj2_DBI/InfoDoctor">
        <InfoDoctor />
      </Route>
      <Route path="/Proj2_DBI/">
        <Login />
      </Route>
    </Switch>
  )
}

// export { navigate }
export default Page
