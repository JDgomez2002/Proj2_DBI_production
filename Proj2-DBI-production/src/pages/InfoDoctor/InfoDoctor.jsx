import { useState, useEffect } from 'react'
import { supabase } from '../../client'
import { Switch, BrowserRouter, Link, Route, useHistory } from 'react-router-dom'
import './InfoDoctor.css'

function InfoDoctor({fullscreen}) {

  const [hospital, setHospitals] = useState([])
  const [hospital_ini, setHospital_ini] = useState(null)
  const [medical_speciality, setMedical_speciality] = useState([])
  const [medical_speciality_ini, setMedical_speciality_ini] = useState(null)
  const [user, setUser] = useState({ username: '', password_entry: '', role:'' })
  let { doctor_dpi, user_id, name, last_name , phone_number, medical_speciality_id, in_hospital, direction, collegiate_number, actualDate, initial_date, final_date, hospital_id, observation} = ''
  const history = useHistory()

  useEffect(() => {
    const browser_data = window.localStorage.getItem('SIGNIN_INFORMATION')
    if (browser_data !== null) setUser(JSON.parse(browser_data))
    fetchPostAll()
  }, [])

  async function InsertInfo() {
    await supabase.from('doctor').insert([{ doctor_dpi, user_id , name, last_name, phone_number, direction, collegiate_number, medical_speciality_id, in_hospital }]).single()
    if(fullscreen){
      setTimeout(() => {
        history.push('/Proj2_DBI/')
      }, 3000)
    }
  }

  async function InsertDoctorHospitalResgistration() {
    await supabase
    .from('doctor_hospital_registration')
    .insert([{ doctor_dpi: doctor_dpi, hospital_id: in_hospital, initial_date: actualDate, final_date: null, observation: null}])
    .single()
  }

  async function InsertTest() {
    await supabase
    .from('doctor_hospital_registration')
    .insert([{ doctor_dpi: '1', hospital_id: '11', initial_date: getDate(), final_date: null, observation: null}])
    .single()
  }

  async function fetchPostAll(){
    fetchPost1()
    fetchPost2()
  }

  async function fetchPost1(){
    const { data } = await supabase.from('hospital').select()
    setHospitals(data)
  }

  async function fetchPost2(){
    const { data } = await supabase.from('medical_speciality').select()
    setMedical_speciality(data)
  }

  const getDate = () => {
    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth()+1
    const day = date.getDate()
    const actual_date = `${year}-${month}-${day}`
    return actual_date
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
      actualDate = getDate()
      InsertInfo()
      InsertDoctorHospitalResgistration()
    }
  }

  return (
    <div className={fullscreen ? "info-doctor-root" : "info-doctor-root-mainpage"} style={{display: "grid", placeItems: "center"}} >
      <div id="contact" className="container-info-doctor" style={{backgroundColor: !fullscreen && "rgba(0,0,0,0)", padding:"15px", margin: "50px 0px 0px 0px"}}>
      <h3>Información del Doctor</h3>
      <h4>Porfavor llenar todos los espacios asignados</h4>
      <fieldset>
        <input id = "input-DPI" placeholder="DPI del Doctor" type="text" tabIndex="1" required />
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
          <select id = "input-state-especialidad" name="state" className="form-control selectpicker"  required value={medical_speciality_ini} onChange={(e) => setMedical_speciality_ini(e.target.value)}>
          {medical_speciality&&(
              <>
              <option value="" >Especialidad médica: </option>
              {medical_speciality.map(e=> (
                <>
                <option value ={e.medical_speciality_id}>{e.name}</option>
                </>
              ))}
            </>
            )}
          </select>
      </fieldset>
      <fieldset>
          <select id = "input-state-hospital" name="state" className="form-control selectpicker" required value={hospital_ini} 
          onChange={(e) => {
            setHospital_ini(e.target.value)
            // console.log(document.getElementById('input-state-hospital').value)
            // InsertTest()
            }}>
            {hospital&&(
              <>
              <option value="" >En que hospital se encuentra: </option>
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
        <input id = "input-direccion" placeholder="Dirección" type="text" tabIndex="4" required />
      </fieldset>
      <fieldset>
        <input id = "input-numero-colegiado" placeholder="Numero de colegiado" type="text" tabIndex="4" required />
      </fieldset>
    <button type="submit" onClick={get_Info} >Submit</button>
    <div id="div-sign-in-status" className="div-login-message"></div>
  </div>
</div>
  )
}

export default InfoDoctor
