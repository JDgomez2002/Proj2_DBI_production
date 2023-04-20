import { useState, useEffect, useMemo } from 'react'
import { supabase } from '../../client'
import { useHistory } from 'react-router-dom'
import './ChangeDoctorHospital.css'

function ChangeDoctorHospital() {
  const [hospital, setHospitals] = useState([])
  const [hospital_ini, setHospital_ini] = useState(null)
  const [lista_dpi_doctor, setDPIsDoctor] = useState([])
  const [DPIs, setDpi] = useState(null) // IMPORTANTE: almacena el DPI del doctor
  const [doctor, setDoctor] = useState({})
  const [doctorHospital, setDoctorHospital] = useState('')
  const [doctorFound, setDoctorFound] = useState(false)
  const [user, setUser] = useState({})
  let { doctor_dpi, initial_date, name, last_name , phone_number, medical_speciality_id, in_hospital, direction, collegiate_number, actualDate, observation } = ''

  useEffect(() => {
    fetchPosts()
    const browser_data = window.localStorage.getItem('LOGIN_STATUS')
    if (browser_data !== null) setUser(JSON.parse(browser_data))
  }, [])

  useEffect(() => {
    // console.log(hospital)
    let cond_for_counter = 0
    let hospital_found = false
    while (cond_for_counter < hospital.length && hospital_found === false) {
      if (hospital[cond_for_counter].hospital_id === doctor.in_hospital) {
        // console.log('found hosp:',hospital[cond_for_counter].name)
        setDoctorHospital(hospital[cond_for_counter].name)
        hospital_found = true
      } else {
        cond_for_counter++
      }
    }
  }, [hospital, doctor])

  useEffect(() => {
    // console.log('doctores:',lista_dpi_doctor)
    let cond_for_counter = 0
    let doctor_found = false
    while (cond_for_counter < lista_dpi_doctor.length && doctor_found === false) {
      if (lista_dpi_doctor[cond_for_counter].doctor_dpi === DPIs) {
        // console.log('found doc:',lista_dpi_doctor[cond_for_counter])
        setDoctor(lista_dpi_doctor[cond_for_counter])
        setDoctorFound(true)
        doctor_found = true
      } else {
        cond_for_counter++
      }
    }
  }, [lista_dpi_doctor, DPIs])

  async function fetchPosts() {
    await fetchHospitals()
    await fetchDoctors()
  }

  const fetchDoctors = async () => {
    const { data } = await supabase.from('doctor').select()
    setDPIsDoctor(data)
  }

  async function fetchHospitals() {
    const { data } = await supabase.from('hospital').select()
    setHospitals(data)
  }

  const updateHospitalFetch = async () => {
    await supabase
      .from('doctor')
      .update({ in_hospital: document.getElementById('input-state-pais').value })
      .eq('doctor_dpi', doctor.doctor_dpi)
      .select()
  }

  async function InsertDoctorHospitalResgistration() {
    await supabase
    .from('doctor_hospital_registration')
    .insert([{ 
      doctor_dpi: doctor.doctor_dpi, 
      hospital_id: document.getElementById('input-state-pais').value, 
      initial_date: actualDate, 
      final_date: null, 
      observation: null}])
    .single()
  }

  const updateHospital = () => {
    actualDate = getDate()
    observation = document.getElementById('statusDelPaciente').value
    updateHospitalFetch()
    updateResgitration()
    setTimeout(() => {
      InsertDoctorHospitalResgistration()
    }, 3000)
    document.getElementById('dpi_paciente').value = ''
    setDoctorFound(false)
    document.getElementById('status').textContent = 'Doctor cambiado de hospital con éxito!'
    document.getElementById('status').style.color = 'green'
  }

  const test = async () => {
    await supabase
      .from('doctor_hospital_registration')
      .update({ final_date: '2023-5-12', observation: 'Hey!'})
      .eq('doctor_dpi', '134')
      .is('final_date', null)
      .select()
  }

  const updateDoctorHospitalRegistrationFetch = async () => {
    await supabase
      .from('doctor_hospital_registration')
      .update({ final_date: actualDate, observation: observation})
      .eq('doctor_dpi', doctor.doctor_dpi)
      .is('final_date', null)
      .select()
  }

  const getDate = () => {
    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth()+1
    const day = date.getDate()
    const actual_date = `${year}-${month}-${day}`
    return actual_date
  }

  const updateResgitration = () => {
    updateDoctorHospitalRegistrationFetch()
  }

  return (
    <div
      className="change-doctor-hospital-mainpage"
      style={{ display: 'grid', placeItems: 'center' }}
    >
      <div
        id="contact"
        className="container"
        style={{
          width: '300px',
          background: 'rgba(0,0,0,0)',
          padding: '15px',
          margin: '50px 0px 0px 0px',
        }}
      >
        <h3>Cambiar a Doctor de hospital</h3>
        <h4
          style={{
            display: 'flex',
            justifyContent: 'left',
            fontSize: '21px',
            padding: '0px',
            margin: '0px',
          }}
        >
          Información del doctor:
        </h4>
        <p style={{ display: 'flex', justifyContent: 'left' }}>DPI:</p>
        <fieldset style={{ margin: '0px' }}>
          <select
            id="dpi_paciente"
            className="cadaDetalle"
            onChange={(e) => {
              setDpi(e.target.value)
            }}
          >
            <>
              <option className="enfermedad" value="">
                DPI del doctor:
              </option>
              {lista_dpi_doctor && (
                <>
                  {lista_dpi_doctor.map((e) => (
                    <>
                      <option value={e.doctor_dpi}>{e.doctor_dpi}</option>
                    </>
                  ))}
                </>
              )}
            </>
          </select>
        </fieldset>
        {doctorFound && (
          <div
            style={{
              display: 'grid',
              justifyContent: 'left',
              placeContent: 'left',
              alignContent: 'left',
            }}
          >
            <p style={{ display: 'grid', justifyContent: 'left' }}>
              Nombre: {doctor.name} {doctor.last_name}
            </p>
            <p style={{ display: 'grid', justifyContent: 'left' }}>Número: {doctor.phone_number}</p>
            <p style={{ display: 'grid', justifyContent: 'left' }}>
              Colegiado: {doctor.collegiate_number}
            </p>
            <p style={{ display: 'grid', justifyContent: 'left' }}>Dirección: {doctor.direction}</p>
            <h5 style={{ fontSize: '13px', display: 'grid', justifyContent: 'left' }}>
              Hospital actual: ({doctor.in_hospital}) {doctorHospital}
            </h5>
          </div>
        )}
        <h4
          style={{
            display: 'flex',
            justifyContent: 'left',
            fontSize: '21px',
            padding: '0px',
            margin: '20px 0px 0px 0px',
          }}
        >
          Asignar nuevo hospital:
        </h4>
        <p style={{ display: 'flex', justifyContent: 'left' }}>Hospital:</p>
        <fieldset style={{ margin: '0px 0px 0px 0px' }}>
          {' '}
          {/** onChange={printNewHospital} */}
          <select
            id="input-state-pais"
            name="state"
            className="form-control selectpicker"
            required
            value={hospital_ini}
            onChange={(e) => setHospital_ini(e.target.value)}
          >
            {hospital && (
              <>
                <option value="">Nuevo Hospital asignado:</option>
                {hospital.map((e) => (
                  <>
                    <option value={e.hospital_id}>{e.name + ', ' + e.localization}</option>
                  </>
                ))}
              </>
            )}
          </select>
        </fieldset>
        <fieldset>
          <input
            id="statusDelPaciente"
            className="cadaDetalle"
            placeholder="Comentario"
            type="text"
          />
        </fieldset>
        <button className="enviar" onClick={updateHospital}>
          Asignar
        </button>
        {/* <button className="enviar" onClick={test}>
          Test
        </button> */}
        <div id="status" style={{ fontSize: '15px' }}></div>
      </div>
    </div>
  )
}

export default ChangeDoctorHospital
