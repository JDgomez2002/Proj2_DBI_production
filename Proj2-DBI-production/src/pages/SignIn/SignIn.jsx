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
  }, [])

  const evaluate_signin = () => {
    if (UserUnsigned) {
      SignInState = 'Sign in Succesfully!'
      document.getElementById('div-sign-in-status').textContent = 'Sign in Succesfully!'
      document.getElementById('div-sign-in-status').style.color = 'green'
      createUser()
      setTimeout(() => {
        history.push('/Login')
      }, 3000)
    } else {
      document.getElementById('div-sign-in-status').textContent = "Can't Sign in. User already exists!"
      document.getElementById('div-sign-in-status').style.color = 'red'
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
      while (while_counter < users.length && UserUnsigned == true) {
        if (user_id == users[while_counter].user_id || password == users[while_counter].password) {
          UserUnsigned = false
          // break
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
      <BrowserRouter>
        {/* <Link className="login-button" onClick={check_login} to={succesfull_signin==true ? '/Login' : '#'} > */}
        <Link className="sign-in-button" onClick={check_signIn} to={'Login'}>
          Sign in
        </Link>
      </BrowserRouter>
      <div id="div-sign-in-status" className="div-login-message"></div>
    </div>
  )
}

export default SignIn
