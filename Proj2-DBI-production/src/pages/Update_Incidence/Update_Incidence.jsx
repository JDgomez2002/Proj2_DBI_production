import { useState, useEffect } from 'react'
import { supabase } from '../../client'
import { useHistory } from 'react-router-dom'
import './Update_Incidence.css'

function Update_Incidence() {
  const [hospital, setHospitals] = useState([])
  const [doctor, setDoctor] = useState([])
  const [file, setFile] = useState(null)
  const [statusComponent, setStatusComponent] = useState('')
  const [file_ini, setFile_ini] = useState([])
  const [file_fin, setFile_fin] = useState([])
  const [lista_dpi, setDPIs] = useState([])
  const [DPIs, setDpi] = useState(null)
  const [disease_ini, setDisease_ini] = useState([])
  const [dise, setDise] = useState(null)
  const [disease_tot, setDisease_tot] = useState([])
  const [dise_tot, setDise_tot] = useState(null)
  const [exam_ini, setExam_ini] = useState([])
  const [exam, setExam] = useState('')
  const [exam_tot, setExam_tot] = useState([])
  const [exam_toto, setExam_toto] = useState('')
  const [hospital_ini, setHospital_ini] = useState([])
  const [hospital_tot, setHospital_tot] = useState([])
  const [doctor_ini, setDoctor_ini] = useState([])
  const [doctor_tot, setDoctor_tot] = useState([])
  const [user, setUser] = useState({})
  let {
    file_id,
    patient_dpi,
    disease_id,
    exam_id,
    hospital_id,
    doctor_dpi,
    date_time,
    status,
    user_id,
  } = ''

  useEffect(() => {
    fetchPosts()
    const browser_data = window.localStorage.getItem('LOGIN_STATUS')
    if (browser_data !== null) setUser(JSON.parse(browser_data))
  }, [])

  async function fetchPosts() {
    await fetchPost()
    await fetchPost7()
    await fetchPost8()
    await fetchPost9()
    await fetchPost10()
  }

  async function fetchPost() {
    const { data } = await supabase.from('patient').select()
    setDPIs(data)
  }

  async function fetchPost1() {
    const { data } = await supabase
      .from('incidence')
      .select()
      .eq('patient_dpi', document.getElementById('input-dpi-paciente').value)
    setFile_ini(data)
  }
  async function fetchPost2() {
    const { data } = await supabase
      .from('incidence')
      .select()
      .eq('file_id', document.getElementById('input-state-file-id').value)
    setFile_fin(data)
  }
  async function fetchPost3() {
    console.log('disease id:', file_ini)
    console.log('disease fin:', file_fin)
    const { data } = await supabase
      .from('disease')
      .select()
      .eq('disease_id', file_fin[0].disease_id)
    setDisease_ini(data)
  }
  async function fetchPost4() {
    const { data } = await supabase.from('exams').select().eq('exam_id', file_fin[0].exam_id)
    setExam_ini(data)
  }
  async function fetchPost5() {
    const { data } = await supabase
      .from('hospital')
      .select()
      .eq('hospital_id', file_fin[0].hospital_id)
    setHospital_ini(data)
  }

  async function fetchPost6() {
    const { data } = await supabase.from('doctor').select().eq('doctor_dpi', file_fin[0].doctor_dpi)
    setDoctor_ini(data)
  }

  const get_Info = () => {
    patient_dpi = document.getElementById('input-dpi-paciente').value
    fetchPost1()
  }

  const get_File = () => {
    fetchPost2()
  }
  const buscar = () => {
    fetchPost3()
    fetchPost4()
    fetchPost5()
    fetchPost6()
  }

  const export_info = () => {
    console.log('disease busc:', disease_ini[0])
    setStatusComponent(`file: ${document.getElementById('input-state-file-id').value}
        dpi for patient: ${document.getElementById('input-dpi-paciente').value}
        disease: ${disease_ini[0].name}
        exam: ${exam_ini[0].name}
        hospital: ${hospital_ini[0].name}
        doctor name: ${doctor_ini[0].name}
        date_time: ${file_fin[0].date_time}
        status: ${file_fin[0].status}`)
  }

  async function fetchPost7() {
    const { data } = await supabase.from('disease').select()
    setDisease_tot(data)
  }

  async function fetchPost8() {
    const { data } = await supabase.from('exams').select()
    setExam_tot(data)
  }

  async function fetchPost9() {
    const { data } = await supabase.from('hospital').select()
    setHospitals(data)
  }
  async function fetchPost10() {
    const { data } = await supabase.from('doctor').select()
    setDoctor(data)
  }

  async function update_info() {
    patient_dpi = document.getElementById('input-dpi-paciente').value
    disease_id = document.getElementById('input-state-hereditary-diseases-id').value
    exam_id = document.getElementById('input-state-exam-id').value
    hospital_id = document.getElementById('input-state-pais').value
    doctor_dpi = document.getElementById('doctores').value
    date_time = document.getElementById('fecha').value
    status = document.getElementById('statusDelPaciente').value
    user_id = user.user_id
    await supabase
      .from('incidence')
      .update({
        patient_dpi: patient_dpi,
        disease_id: disease_id,
        exam_id: exam_id,
        hospital_id: hospital_id,
        doctor_dpi: doctor_dpi,
        date_time: date_time,
        status: status,
        user_id: user_id,
      })
      .eq('file_id', document.getElementById('input-state-file-id').value)
      .then((result) => {
        console.log('INSERTADO')
      })
      .catch((error) => {
        console.log('FALLO', error)
      })
  }
  return (
    <div
      className="update-incindence-mainpage-root1"
      style={{ display: 'grid', placeItems: 'center', margin: "0px" }}
    >
      <div id="update-contact" className="container" style={{ background: 'rgba(0,0,0,0)', padding:"15px", margin: "50px 0px 0px 0px"}}>
        <h3>Edición de expediente</h3>
        {statusComponent &&
          statusComponent.split('\n').map((line, index) => (
            <div key={index}>
              {line}
              <br />
            </div>
          ))}
        <fieldset>
          <select
            id="input-dpi-paciente"
            className="cadaDetalle"
            onChange={(e) => {
              setDpi(e.target.value)
              get_Info()
            }}
          >
            <>
              <option className="file" value="">
                DPI del paciente:{' '}
              </option>
              {lista_dpi && (
                <>
                  {lista_dpi.map((e) => (
                    <>
                      <option value={e.patient_dpi}>{e.patient_dpi}</option>
                    </>
                  ))}
                </>
              )}
            </>
          </select>
        </fieldset>
        <fieldset>
          <select
            id="input-state-file-id"
            className="cadaDetalle"
            onChange={(e) => {
              setFile(e.target.value), get_File()
            }}
          >
            <>
              <option className="file" defaultValue="">
                Archivo que desea editar:{' '}
              </option>
              {file_ini && (
                <>
                  {file_ini.map((e) => (
                    <>
                      <option value={e.file_id}>{e.file_id}</option>
                    </>
                  ))}
                </>
              )}
            </>
          </select>
        </fieldset>
        <button className="buscar" onMouseOver={buscar} onClick={export_info}>
          {' '}
          Buscar
        </button>
        <fieldset>
          <input id="fecha" className="cadaDetalle" type="date" />
        </fieldset>
        <fieldset>
          <select
            id="input-state-hereditary-diseases-id"
            className="cadaDetalle"
            onChange={(e) => setDise_tot(e.target.value)}
          >
            <>
              <option className="enfermedad" value="">
                Enfermedad que posee:{' '}
              </option>
              {disease_tot && (
                <>
                  {disease_tot.map((e) => (
                    <>
                      <option value={e.disease_id}>{e.name}</option>
                    </>
                  ))}
                </>
              )}
            </>
          </select>
        </fieldset>
        <fieldset>
          <select
            id="input-state-exam-id"
            className="cadaDetalle"
            onChange={(e) => setExam_toto(e.target.value)}
          >
            <>
              <option className="enfermedad" value="">
                Examen realizado:{' '}
              </option>
              {exam_tot && (
                <>
                  {exam_tot.map((e) => (
                    <>
                      <option value={e.exam_id}>{e.name}</option>
                    </>
                  ))}
                </>
              )}
            </>
          </select>
        </fieldset>
        <fieldset>
          <select
            id="input-state-pais"
            name="state"
            className="form-control selectpicker"
            required
            value={hospital_tot}
            onChange={(e) => setHospital_tot(e.target.value)}
          >
            {hospital && (
              <>
                <option value="">Hospital en el que se encuentra: </option>
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
          <select
            id="doctores"
            name="doct"
            className="cadaDetalle"
            required
            value={doctor_tot}
            onChange={(e) => setDoctor_tot(e.target.value)}
          >
            {doctor && (
              <>
                <option value="">Doctor que le atiende: </option>
                {doctor.map((e) => (
                  <>
                    <option value={e.doctor_dpi}>{e.name + ', ' + e.last_name}</option>
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
            placeholder="Status del paciente"
            type="text"
          />
        </fieldset>
        <button className="buscar" onClick={update_info}>
          {' '}
          Editar{' '}
        </button>
      </div>
    </div>
  )
}
export default Update_Incidence
