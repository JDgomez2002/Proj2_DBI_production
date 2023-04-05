import { useState, useEffect } from 'react'
import { supabase } from '../../client'
import { Switch, BrowserRouter, Link, Route, useHistory } from 'react-router-dom'
import './SignIn.css'

function SignIn() {
  const [users, setUsers] = useState([])
  const [user, setPost] = useState({ username: '', password_entry: '', role: ''})
  let { user_id, password, role, SignInState } = ''
  let UserUnsigned  = true
  const [isChecked, setIsChecked] = useState(false)

  const handleOnChange = () => {
    setIsChecked(!isChecked);
  }
  const history = useHistory()

  useEffect(() => {
    fetchPosts()
    // console.log('database copy')
    // console.log({users})
  }, [])

  // useEffect(() => {
  //   history.push('/MainPage')
  //   // console.log('database copy')
  //   // console.log({users})
  // }, [succesfull_signin])

  const evaluate_signin = () => {
    if (UserUnsigned) {
      SignInState = 'Sign in Succesfully!'
      document.getElementById('div-login-status').textContent = 'Sign in Succesfully!'
      document.getElementById('div-login-status').style.color = 'green'
      createUser()
      history.push('/Login')
    } else {
      document.getElementById('div-login-status').textContent = "Can't Sign in. Check credentials"
      document.getElementById('div-login-status').style.color = 'red'
    }
  }

  async function fetchPosts() {
    const { data } = await supabase.from('users').select()
    setUsers(data)
    console.log('data: ', data)
    console.log('users: ', { users })
  }

  async function createUser() {
    await supabase
    .from('users')
    .insert([
      {user_id,password,role}
    ])
    .single()
    fetchPosts()
  }

  const check_signIn = () => {
    UserUnsigned = true
    if (!(document.getElementById('input-username') == null)) {
      user_id = document.getElementById('input-username').value
      password = document.getElementById('input-password').value
      if(isChecked == true){
      role = "Doctor"
      }
      else{
        role = "Paciente"
      }

      // console.log('theUSER',username)
      // console.log('thePASSWORD',password)
      let while_counter = 0
      while (while_counter < users.length && UserUnsigned  == true) {
        if (user_id == users[while_counter].password_entry && password == users[while_counter].username) {
          UserUnsigned  = false
          break
        } else {
          while_counter++
        }
      }
    }
    console.log('succesfullSignInVar', UserUnsigned.toString())
    evaluate_signin()
  }

  return (
    <div className="sign-in-container">
      <img
        className="logo"
        src="https://github.com/JDgomez2002/Proj2_DBI_production/blob/main/Proj2-DBI-production/src/img/stethoscope-icon.png?raw=true"
      />
      <div className="login-labels">Username:</div>
      <input id="input-username" onClick={fetchPosts} className="input-login"></input>
      <div className="login-labels">Password:</div>
      <input id="input-password" onClick={fetchPosts} className="input-login"></input>
      <label><input type="checkbox" id="input-role" hecked={isChecked} onChange={handleOnChange} className="input-login" />Doctor</label>

      {/* <button className="login-button" onClick={check_login}>
    Login
  </button> */}
      <BrowserRouter>
        {/* <Link className="login-button" onClick={check_login} to={succesfull_signin==true ? '/MainPage' : '#'} > */}
        <Link className="sign-in-button" onClick={check_signIn} to={'MainPage'}>
          Sign in
        </Link>
      </BrowserRouter>
      <div id="div-login-status" className="div-login-message"></div>
    </div>
  )
}

export default SignIn
