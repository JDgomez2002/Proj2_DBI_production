import { useState, useEffect } from 'react'
import { supabase } from '../../client'
import { Switch, BrowserRouter, Link, Route, useHistory } from 'react-router-dom'
import './InfoPatient.css'

function InfoPatient() {
  const [user, setUser] = useState({ username: '', password_entry: '', role:'' })
  let { patient_dpi, user_id, name, last_name , phone_number, country, hereditary_diseases, body_mass_index, height, weight, addictions  } = ''
  const history = useHistory()

  useEffect(() => {
    const browser_data = window.localStorage.getItem('SIGNIN_INFORMATION')
    if (browser_data !== null) setUser(JSON.parse(browser_data))
  }, [])

  async function InsertInfo() {
    await supabase.from('patient').insert([{ patient_dpi, user_id , name, last_name, phone_number, country, hereditary_diseases, body_mass_index, height, weight, addictions  }]).single()
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
      document.getElementById('input-state-pais').value === '' ||
      document.getElementById('input-state-hereditary-diseases').value === '' ||
      document.getElementById('input-body-mass-index').value === '' ||
      document.getElementById('input-height').value === '' ||
      document.getElementById('input-weight').value === '' ||
      document.getElementById('input-addictions').value === ''
    ) {
      document.getElementById('div-sign-in-status').style.color = 'red'
      document.getElementById('div-sign-in-status').textContent =
        "Can't upload information. Complete all the form, please."
    }
    else{
      document.getElementById('div-sign-in-status').textContent = 'Information upload sucessfully!'
      document.getElementById('div-sign-in-status').style.color = 'green'
      patient_dpi = document.getElementById('input-DPI').value
      user_id = user.username
      name = document.getElementById('input-nombres').value
      last_name = document.getElementById('input-apellidos').value
      phone_number = document.getElementById('input-Num').value
      country = document.getElementById('input-state-pais').value
      if (document.getElementById('input-state-hereditary-diseases').value ==="true"){
        hereditary_diseases = `true`
        }
        else{
          hereditary_diseases = `false`
        }
      body_mass_index = document.getElementById('input-body-mass-index').value
      height = document.getElementById('input-height').value
      weight = document.getElementById('input-weight').value
      if (document.getElementById('input-addictions').value ==="si"){
      addictions = `true`
      }
      else{
        addictions = `false`
      }
      InsertInfo()
    }
  }




  return (
    <div id="contact" className="container">
      <h3>Información del Paciente</h3>
      <h4>Porfavor llenar todos los espacios asignados</h4>
      <fieldset>
        <input id = "input-DPI"  placeholder="DPI del Paciente" type="text" tabIndex="1" required autoFocus />
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
          <select id = "input-state-pais" name="state" className="form-control selectpicker" >
              <option value="1" >Hospital en el que se encuentra</option>
          </select>
      </fieldset>
      <fieldset>
          <select id = "input-state-hereditary-diseases"  className="enfermedad" >
            <option className="enfermedad" value="">Posee enfermedades hereditarias?</option>
            <option value="true" > Sí</option>
            <option value="false" > No</option>
          </select>
      </fieldset>
      <fieldset>
        <input id="input-body-mass-index" placeholder="índice de masa corporal" type="text" tabIndex="4" required />
      </fieldset>
      <fieldset>
        <input id="input-height" placeholder="Altura en cm" type="text" tabIndex="4" required />
      </fieldset>
      <fieldset>
        <input id="input-weight" placeholder="Peso en libras" type="text" tabIndex="4" required />
      </fieldset>
      <fieldset>
      <select id="input-addictions" className="enfermedad" >
            <option className="enfermedad" value=" ">Posee adiccion?</option>
            <option value="si" > Sí</option>
            <option value="no" > No</option>
          </select>
      </fieldset>
        <button  type="submit" id="contact-submit" onClick={get_Info} >Submit</button>
        <div id="div-sign-in-status" className="div-login-message"></div>
    </div>
  )
}

export default InfoPatient
