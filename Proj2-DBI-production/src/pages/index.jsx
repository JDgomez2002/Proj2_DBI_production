import React from 'react'
import Login from './Login'
import SignIn from './SignIn'
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
        <SignIn />
      </Route>
    </Switch>
  )
}

// export { navigate }
export default Page
