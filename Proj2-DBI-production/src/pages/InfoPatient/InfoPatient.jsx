import { useState, useEffect } from 'react'
import { supabase } from '../../client'
import { Switch, BrowserRouter, Link, Route, useHistory } from 'react-router-dom'
import './InfoPatient.css'

function InfoPatient() {
  const [hospital, setHospitals] = useState([])
  const [hospital_ini, setHospital_ini] = useState(null)
  const [disease, setDisease] = useState("")
  const [disease_ini, setDisease_ini] = useState([])
  const [dise, setDise] = useState(null)
  const [user, setUser] = useState({ username: '', password_entry: '', role:'' })
  let { patient_dpi, user_id, name, last_name , phone_number, country, hereditary_diseases,disease_id, body_mass_index, height, weight, addictions  } = ''
  const history = useHistory()

  useEffect(() => {
    const browser_data = window.localStorage.getItem('SIGNIN_INFORMATION')
    if (browser_data !== null) setUser(JSON.parse(browser_data))
    fetchall()
  }, [])

  useEffect(() =>{
    console.log('info',disease_ini)
  },[disease_ini])

  async function InsertInfo() {
    await supabase.from('patient').insert([{ patient_dpi, user_id , name, last_name, phone_number, country, hereditary_diseases, disease_id, body_mass_index, height, weight, addictions  }]).single()
    setTimeout(() => {
        history.push('/Proj2_DBI/')
    }, 3000)
  }


  async function fetchall(){
    await fetchPost1()
    await fetchPost2()
  }

  async function fetchPost1(){
    const { data } = await supabase.from('hospital').select()
    setHospitals(data)
  }
  
  async function fetchPost2(){
    const { data } = await supabase.from('disease').select()
    setDisease_ini(data)
    console.log('data',data)
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
      if (document.getElementById('input-state-hereditary-diseases').value ===""){
          hereditary_diseases = `false`
          disease_id = `null`
        }
        else{
          hereditary_diseases = `true`
          disease_id =  document.getElementById('input-state-hereditary-diseases-id').value
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
          <select id = "input-state-pais" name="state" className="form-control selectpicker" required value={hospital_ini} onChange={(e) => setHospital_ini(e.target.value)}>
          {hospital&&(
            <>
            <option value="" >Hospital en el que se encuentra: </option>
            {hospital.map(e=> (
              <>
              <option value ={e.hospital_id}>{e.name+", "+e.localization}</option>
              </>
            ))}
          </>
          )}
          </select>
      </fieldset>
      <fieldset>
          <select id = "input-state-hereditary-diseases"  className="enfermedad" value={disease} onChange={(e) => setDisease(e.target.value)} >
            <option className="enfermedad" value="" >Posee enfermedades hereditarias?</option>
            <option value="true" > Sí</option>
            </select>
              {disease&&(
                <select id = "input-state-hereditary-diseases-id" className="enfermedad"  onChange={(e) => setDise(e.target.value)} >
                  <>
                  <option className="enfermedad" value="" >Enfermedad que posee: </option>
                    {disease_ini&&(
                      <>
                      {disease_ini.map(e=> (
                        <>
                        <option value ={e.disease_id}>{e.name}</option>
                        </>
                      ))}
                      </>
                    )}
                  </>
                </select>
              )}
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
