import { useState, useEffect } from 'react'
import { supabase } from '../../client'
import { useHistory } from 'react-router-dom'
import './SignIn.css'

function SignIn() {
  const [users, setUsers] = useState([])
  const [user, setPost] = useState({ username: '', password_entry: '', role: ''})
  let { user_id, password, role, SignInState } = ''
  let UserUnsigned  = true
  const [isChecked, setIsChecked] = useState(false)
  const history = useHistory()

  const handleOnChange = () => {
    setIsChecked(!isChecked);
  }

  useEffect(() => {
    fetchPosts()
    history.push('/Proj2_DBI/SignIn')
  }, [])

  const evaluate_signin = () => {
    if (UserUnsigned) {
      SignInState = 'Sign in Succesfully!'
      document.getElementById('div-sign-in-status').textContent = 'Sign in Succesfully!'
      document.getElementById('div-sign-in-status').style.color = 'green'
      createUser()
      setTimeout(() => {
        if(isChecked) {
          history.push('/Proj2_DBI/InfoDoctor')}
        else{
          history.push('/Proj2_DBI/InfoPatient')
        }
      }, 3000)
    } else {
      document.getElementById('div-sign-in-status').style.color = 'red'
      if((document.getElementById('input-username').value==='')||((document.getElementById('input-password').value===''))||((document.getElementById('input-confirm-password').value===''))){
        document.getElementById('div-sign-in-status').textContent = "Can't Sign in. Complete form, please."
      }
      else{
        document.getElementById('div-sign-in-status').textContent = "Can't Sign in. User already exists!"
      }
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
        // if (user_id == users[while_counter].user_id || password == users[while_counter].password) {
        if (user_id == users[while_counter].user_id) {
          UserUnsigned = false
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
      <div className="login-labels">Confirm password:</div>
      <input id="input-confirm-password" onClick={fetchPosts} className="input-login"></input>
      <label className="checkbox-label-doctor" ><input type="checkbox" id="input-role" hecked={isChecked.toString()} onChange={handleOnChange} className="input-checkbox-doctor" />Doctor</label>
        {/* <Link className="login-button" onClick={check_login} to={succesfull_signin==true ? '/Login' : '#'} > */}
        <button className="sign-in-button" onClick={check_signIn} >
          Sign in
        </button>
      <div id="div-sign-in-status" className="div-login-message"></div>
    </div>
  )
}

export default SignIn
