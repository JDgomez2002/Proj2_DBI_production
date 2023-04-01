import { useState, useEffect } from 'react'
import { supabase } from '../../client'
import { Switch, BrowserRouter, Link, Route, useHistory } from 'react-router-dom'
import './Login.css'

function Login() {
  const [users, setUsers] = useState([])
  const [user, setPost] = useState({ patient_dpi: '', name: '' })
  let { username, password, loginState } = ''
  let succesfull_login = false
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
  // }, [succesfull_login])

  const evaluate_login = () => {
    if (succesfull_login) {
      loginState = 'Login Succesfully!'
      document.getElementById('div-login-status').textContent = 'Login Succesfully!'
      document.getElementById('div-login-status').style.color = 'green'
      history.push('/MainPage')
    } else {
      document.getElementById('div-login-status').textContent = "Can't login. Check credentials"
      document.getElementById('div-login-status').style.color = 'red'
    }
  }

  async function fetchPosts() {
    const { data } = await supabase.from('patient').select()
    setUsers(data)
    console.log('data: ', data)
    console.log('users: ', { users })
  }

  const check_login = () => {
    succesfull_login = false
    if (!(document.getElementById('input-username') == null)) {
      username = document.getElementById('input-username').value
      password = document.getElementById('input-password').value
      // console.log('theUSER',username)
      // console.log('thePASSWORD',password)
      let while_counter = 0
      while (while_counter < users.length && succesfull_login == false) {
        if (username == users[while_counter].name && password == users[while_counter].patient_dpi) {
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
      {/* <button className="login-button" onClick={check_login}>
        Login
      </button> */}
      <BrowserRouter>
        {/* <Link className="login-button" onClick={check_login} to={succesfull_login==true ? '/MainPage' : '#'} > */}
        <Link className="login-button" onClick={check_login} to={"/MainPage"}>
          Login
        </Link>
        
      </BrowserRouter>
      <div id="div-login-status" className="div-login-message"></div>
    </div>
  )
}

export default Login
