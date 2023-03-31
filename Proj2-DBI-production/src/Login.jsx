import { useState, useEffect } from 'react'
import { supabase } from './client'
import './Login.css'

function get_login() {
  const [users, setUsers] = useState([])
  const [user, setPost] = useState({patient_dpi: "", name: ""} )
  const { patient_dpi, name } = user

  useEffect(() => {
    fetchPosts()
    console.log('database copy')
    console.log({users})
  },[])

  async function fetchPosts(){
    const { data } = await supabase
    .from('patient')
    .select()
    setUsers(data)
    // setPost(data)
    console.log("data: ", data)
    console.log('users: ', {users})
  }
}

function Login() {
  // get_login()
  const [users, setUsers] = useState([])
  const [user, setPost] = useState({patient_dpi: "", name: ""} )
  const { patient_dpi, name } = user

  useEffect(() => {
    fetchPosts()
    console.log('database copy')
    console.log({users})
  },[])

  async function fetchPosts(){
    const { data } = await supabase
    .from('patient')
    .select()
    const { users } = await supabase
    .from('patient')
    .select()
    setUsers(data)
    // setPost(data)
    console.log("data: ", data)
    console.log('users: ', users[0])
  }
  return (
    //<div className="login-root" >
      <div className="login-container">
        <img
          className="logo"
          src="https://cdn.pixabay.com/photo/2017/05/15/23/47/stethoscope-icon-2316460_960_720.png"
        />
        <div className="login-labels" >Username:</div>
        <input></input>
        <div className="login-labels" >Password:</div>
        <input></input>
        {
          users.map(user =>(
            <div key={user.patient_dpi}>
              <h3>{user.patient_dpi}</h3>
              <p>{user.name}</p>
            </div>
          ))
        }
      </div>
    //</div>
  )
}

export default Login
