import { useState, useEffect } from 'react'
import { supabase } from '../../client'
import { useHistory, useLocation } from 'react-router-dom'
import './Login.css'

function Login() {
  const [users, setUsers] = useState([])
  const [user, setUser] = useState({ user_id: '', password: '', logged_in: false, role:'' })
  let { username, password, role } = ''
  let succesfull_login = false
  const history = useHistory()
  const location = useLocation()

  useEffect(() => {
    fetchPosts()
    history.push('/Proj2_DBI/')
    // console.log('Users before loading page', users)
    // const browser_data = window.localStorage.getItem('LOGIN_STATUS')
    // if (browser_data !== null) setUser(JSON.parse(browser_data))
    // console.log('reading', browser_data)
  }, [])

  useEffect(() => {
    // console.log('writing', user)
    window.localStorage.setItem('LOGIN_STATUS', JSON.stringify(user))
  }, [user])

  useEffect(() => {
    console.log('Users after loading page', users)
  }, [users])

  const evaluate_login = () => {
    if (succesfull_login) {
      // loginState = 'Login Succesfully!'
      document.getElementById('div-login-status').style.color = 'green'
      document.getElementById('div-login-status').textContent = 'Login Succesfully!'
      document.getElementById('div-login-loading').textContent = 'Loading...'
      setTimeout(() => {
        // history.push('/Proj2_DBI/MainPage')
        // const path = `${location.pathname}MainPage`
        history.push(`${location.pathname}MainPage`)
        
      }, 3000)
    } else {
      document.getElementById('div-login-status').textContent = "Can't login. Check credentials"
      document.getElementById('div-login-status').style.color = 'red'
    }
  }

  const sign_in = () => {
    console.log('/SignIn')
    history.push('/Proj2_DBI/')
    history.push('/Proj2_DBI/SignIn')
  }

  async function fetchPosts() {
    const { data } = await supabase.from('users').select()
    setUsers(data)
    // console.log('data: ', data)
    // console.log('users: ', { users })
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
          role = users[while_counter].role
          setUser({ user_id: username, password: password, logged_in: true, role: role })
        } else {
          while_counter++
        }
      }
    }
    evaluate_login()
    // console.log('succesfullLoginVar', succesfull_login.toString())
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
        {/* <Link className="login-button" onClick={check_login} to={succesfull_login==true ? '/MainPage' : '#'} > */}
      <button className="login-button" onClick={check_login} >
        Login
      </button>
      <button className="sign-in-button-link" onClick={sign_in} >
        Sign in
      </button>
      <div id="div-login-status" className="div-login-message"></div>
      <div id="div-login-loading" className="div-login-message" style={{fontSize:'20px'}}></div>
    </div>
  )
}

export default Login
