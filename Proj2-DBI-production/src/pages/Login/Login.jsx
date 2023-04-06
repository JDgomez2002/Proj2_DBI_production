import { useState, useEffect } from 'react'
import { supabase } from '../../client'
import { BrowserRouter, Link, useHistory } from 'react-router-dom'
import './Login.css'

function Login() {
  const [users, setUsers] = useState([])
  const [user, setPost] = useState({ user_id: '', password: '' })
  let { username, password, loginState } = ''
  let succesfull_login = false
  const history = useHistory()

  useEffect(() => {
    fetchPosts()
    // console.log('database copy')
    // console.log({users})
  }, [])

  const evaluate_login = () => {
    if (succesfull_login) {
      loginState = 'Login Succesfully!'
      document.getElementById('div-login-status').textContent = 'Login Succesfully!'
      document.getElementById('div-login-status').style.color = 'green'
      document.getElementById('div-login-loading').textContent = 'Loading...'
      setTimeout(() => {
        history.push('/Proj2_DBI/MainPage')
      }, 3000)
    } else {
      document.getElementById('div-login-status').textContent = "Can't login. Check credentials"
      document.getElementById('div-login-status').style.color = 'red'
    }
  }

  const sign_in = () => {
    console.log('/SignIn')
    history.push('/SignIn')
  }

  async function fetchPosts() {
    const { data } = await supabase.from('users').select()
    setUsers(data)
    console.log('data: ', data)
    console.log('users: ', { users })
  }

  const check_login = () => {
    succesfull_login = false
    username = document.getElementById('input-username').value
    password = document.getElementById('input-password').value
    if(!((username==='')&&(password===''))){
      let while_counter = 0
      while ((while_counter < users.length) && (succesfull_login == false)) {
        if ((username == users[while_counter].user_id) && (password == users[while_counter].password)) {
          succesfull_login = true
        } else {
          while_counter++
        }
      }
    }
    evaluate_login()
    console.log('succesfullLoginVar', succesfull_login.toString())
  }

  return (
    <div className="login-container">
      <img
        className="logo"
        src="https://github.com/JDgomez2002/Proj2_DBI_production/blob/main/Proj2-DBI-production/src/img/stethoscope-icon.png?raw=true"
      />
      <div className="login-labels">Username:</div>
      <input id="input-username" onClick={fetchPosts} className="input-login"></input>
      <div className="login-labels">Password:</div>
      <input id="input-password" onClick={fetchPosts} className="input-login"></input>
      <BrowserRouter>
        {/* <Link className="login-button" onClick={check_login} to={succesfull_login==true ? '/MainPage' : '#'} > */}
        <Link className="login-button" onClick={check_login} to={"#"}>
          Login
        </Link>
        <Link className="sign-in-button-link" onClick={sign_in} to={"#"} >
          Sign in
        </Link>
      </BrowserRouter>
      <div id="div-login-status" className="div-login-message"></div>
      <div id="div-login-loading" className="div-login-message" style={{fontSize:'20px'}}></div>
    </div>
  )
}

export default Login
