import React from 'react'
import Login from './Login'
import SignIn from './SignIn'
import InfoPatient from './InfoPatient'
import InfoDoctor from './InfoDoctor'
import MainPage from './MainPage'
import { Switch, Route } from 'react-router-dom'

// const navigate = (page) => {
//   window.location = `/?route=${page}`
// }

const Page = () => {
  // escoger la pagina

  return (
    <Switch>
      <Route path="/MainPage">
        <MainPage />
      </Route>
      <Route path="/">
        {/*/<Login />*/}
        {/*<SignIn />*/}
        {/*<InfoPatient />*/}
        <InfoDoctor />
      </Route>
    </Switch>
  )
}

// export { navigate }
export default Page
