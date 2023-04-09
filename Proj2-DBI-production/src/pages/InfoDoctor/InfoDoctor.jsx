import { useState, useEffect } from 'react'
import { supabase } from '../../client'
import { Switch, BrowserRouter, Link, Route, useHistory } from 'react-router-dom'
import './InfoDoctor.css'

function InfoDoctor() {

  const [user, setUser] = useState({ username: '', password_entry: '', role:'' })
  let { doctor_dpi, user_id, name, last_name , phone_number, medical_speciality_id, in_hospital, direction, collegiate_number } = ''
  const history = useHistory()

  useEffect(() => {
    const browser_data = window.localStorage.getItem('SIGNIN_INFORMATION')
    if (browser_data !== null) setUser(JSON.parse(browser_data))
  }, [])

  async function InsertInfo() {
    await supabase.from('doctor').insert([{ doctor_dpi, user_id , name, last_name, phone_number, direction, collegiate_number, medical_speciality_id, in_hospital }]).single()
    setTimeout(() => {
        history.push('/Proj2_DBI/')
    }, 3000)
  }

  const get_Info = () => {
    if (
      document.getElementById('input-DPI').value === '' ||
      document.getElementById('input-nombres').value === '' ||
      document.getElementById('input-apellidos').value === ''||
      document.getElementById('input-Num').value === '' ||
      document.getElementById('input-state-especialidad').value === '' ||
      document.getElementById('input-state-hospital').value === '' ||
      document.getElementById('input-direccion').value === '' ||
      document.getElementById('input-numero-colegiado').value === ''
    ) {
      document.getElementById('div-sign-in-status').style.color = 'red'
      document.getElementById('div-sign-in-status').textContent =
        "Can't upload information. Complete all the form, please."
    }
    else{
      document.getElementById('div-sign-in-status').textContent = 'Information upload sucessfully!'
      document.getElementById('div-sign-in-status').style.color = 'green'
      doctor_dpi = document.getElementById('input-DPI').value
      user_id = user.username
      name = document.getElementById('input-nombres').value
      last_name = document.getElementById('input-apellidos').value
      phone_number = document.getElementById('input-Num').value
      medical_speciality_id = document.getElementById('input-state-especialidad').value
      in_hospital = document.getElementById('input-state-hospital').value
      direction = document.getElementById('input-direccion').value
      collegiate_number = document.getElementById('input-numero-colegiado').value
      InsertInfo()
    }
  }

  return (
    <div id="contact"className="container">
    <h3>Información del Doctor</h3>
    <h4>Porfavor llenar todos los espacios asignados</h4>
    <fieldset>
      <input id = "input-DPI" placeholder="DPI del Doctor" type="text" tabIndex="1" required autoFocus />
    </fieldset>
    <fieldset>
      <input id = "input-nombres" placeholder="Nombres" type="text" tabIndex="2" required />
    </fieldset>
    <fieldset>
      <input id = "input-apellidos" placeholder="Apellidos" type="text" tabIndex="2" required />
    </fieldset>
    <fieldset>
      <input id = "input-Num" placeholder="Numero de teléfono" type="tel" tabIndex="3" required />
    </fieldset>
    <fieldset>
        <select id = "input-state-especialidad" name="state" className="form-control selectpicker">
            <option value="1" >Especialidad Medica: </option>
            <option value="1"> Fernando </option>
        </select>
    </fieldset>
    <fieldset>
        <select id = "input-state-hospital" name="state" className="form-control selectpicker">
            <option value="1" >En que hospital se encuentra: </option>
            <option value="2"> Rupertos</option>
        </select>
    </fieldset>
    <fieldset>
      <input id = "input-direccion" placeholder="Dirección" type="text" tabIndex="4" required />
    </fieldset>
    <fieldset>
      <input id = "input-numero-colegiado" placeholder="Numero de colegiado" type="text" tabIndex="4" required />
    </fieldset>
  <button type="submit" onClick={get_Info} >Submit</button>
  <div id="div-sign-in-status" className="div-login-message"></div>
</div>
  )
}

export default InfoDoctor
