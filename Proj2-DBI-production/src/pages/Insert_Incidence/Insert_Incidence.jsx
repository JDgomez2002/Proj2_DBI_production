import { useState, useEffect } from 'react'
import { supabase } from '../../client'
import { useHistory } from 'react-router-dom'
import './Insert_Incidence.css'

function Insert_Incidence(){
    const [hospital, setHospitals] = useState([])
    const [hospital_ini, setHospital_ini] = useState(null)
    const [lista_dpi, setDPIs] = useState([])
    const [dise,setDise] = useState(null)
    const [DPIs, setDpi] = useState(null)
    const [disease_ini, setDisease_ini] = useState([])
    const [exam, setExam] = useState("")
    const [exam_ini, setExam_ini] = useState([])
    const [file, setFile] = useState([])
    const [doctor, setDoctor] = useState([])
    const [doctor_ini, setDoctor_ini] = useState(null)
    const [user, setUser] = useState({})
    let{ file_id, patient_dpi , disease_id, exam_id, hospital_id, doctor_dpi, date_time, status, user_id} = ''

    useEffect(() => {
        fetchPosts()
        const browser_data = window.localStorage.getItem('LOGIN_STATUS')
        if (browser_data !== null) setUser(JSON.parse(browser_data))
    }, [])


    async function fetchPosts() {
        await fetchPost()
        await fetchPost1()
        await fetchPost2()
        await fetchPost3()
        await fetchPost4()
        await fetchPost5()
    }

    async function fetchPost() {
        const { data } = await supabase.from('patient').select()
        setDPIs(data)
    }

    async function fetchPost1(){
        const { data } = await supabase.from('disease').select()
        setDisease_ini(data)
    }

    async function fetchPost2(){
        const {data} = await supabase.from('exams').select()
        setExam_ini(data)
    }

    async function fetchPost3(){
        const { data } = await supabase.from('hospital').select()
        setHospitals(data)
    }

    async function fetchPost4(){
        const {data} = await supabase.from('doctor').select()
        setDoctor(data)
    }

    async function fetchPost5(){
        const { data } = await supabase.from('incidence').select()
        setFile(data)
        console.log('number of files',file.length)
    }

    async function InsertInfo() {
        user_id = user.user_id 
        await supabase.from('incidence').insert([{ file_id, patient_dpi , disease_id, exam_id, hospital_id, doctor_dpi, date_time, status, user_id }]).single()
    }

    const get_Info = () => {
        if (
        document.getElementById('dpi_paciente').value === '' ||
        document.getElementById('fecha').value === ''||
        document.getElementById('input-state-hereditary-diseases-id').value === '' ||
        document.getElementById('input-state-exam-id').value === '' ||
        document.getElementById('input-state-pais').value === '' ||
        document.getElementById('doctores').value === '' ||
        document.getElementById('statusDelPaciente').value === ''
    ) {
        document.getElementById('status').style.color = 'red'
        document.getElementById('status').textContent =
            "Can't upload information. Complete all the form, please."
        }
        else{
            document.getElementById('status').textContent = 'Information upload sucessfully!'
            document.getElementById('status').style.color = 'green'
            file_id = file.length + 1
            patient_dpi = document.getElementById('dpi_paciente').value
            disease_id = document.getElementById('input-state-hereditary-diseases-id').value
            exam_id =  document.getElementById('input-state-exam-id').value
            hospital_id = document.getElementById('input-state-pais').value
            doctor_dpi = document.getElementById('doctores').value
            date_time = document.getElementById('fecha').value
            status = document.getElementById('statusDelPaciente').value
            console.log('f',file_id,patient_dpi,disease_id,exam_id,hospital_id ,doctor_dpi,date_time, status)
            InsertInfo()
        }
    }

    return (
        <div className="insert-incindence-mainpage-root" style={{display: "grid", placeItems: "center",}}>
            <div id="contact" className="container" style={{width: "300px",background: "rgba(0,0,0,0)"}}>
                    <h3>Nuevo expediente</h3>
                    <fieldset>
                        <select id="dpi_paciente" className="cadaDetalle"  onChange={(e) => setDpi(e.target.value)} >
                            <>
                            <option className="enfermedad" value="" >DPI del paciente: </option>
                                {lista_dpi&&(
                                <>
                                {lista_dpi.map(e=> (
                                    <>
                                    <option value ={e.patient_dpi}>{e.patient_dpi}</option>
                                    </>
                                ))}
                                </>
                                )}
                            </>
                        </select>
                    </fieldset>
                    <fieldset>
                        <input id="fecha" className="cadaDetalle" type="date" />
                    </fieldset>
                    <fieldset>
                        <select id = "input-state-hereditary-diseases-id" className="cadaDetalle"  onChange={(e) => setDise(e.target.value)} >
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
                    </fieldset>
                    <fieldset>
                        <select id = "input-state-exam-id" className="cadaDetalle"  onChange={(e) => setExam(e.target.value)} >
                            <>
                            <option className="enfermedad" value="" >Examen realizado: </option>
                                {exam_ini&&(
                                <>
                                {exam_ini.map(e=> (
                                    <>
                                    <option value ={e.exam_id}>{e.name}</option>
                                    </>
                                ))}
                                </>
                                )}
                            </>
                        </select>
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
                        <select id = "doctores" name="doct" className="cadaDetalle" required value={doctor_ini} onChange={(e) => setDoctor_ini(e.target.value)}>
                        {doctor&&(
                            <>
                            <option value="" >Doctor que le atiende: </option>
                            {doctor.map(e=> (
                            <>
                            <option value ={e.doctor_dpi}>{e.name+", "+e.last_name}</option>
                            </>
                            ))}
                        </>
                        )}
                        </select>
                    </fieldset>
                    <fieldset>
                        <input id="statusDelPaciente" className="cadaDetalle" placeholder="Status del paciente" type="text"/>
                    </fieldset>
                <button className="enviar" onClick={get_Info}  >Enviar</button>
                <div id="status" className="status-message"></div>
            </div>
        </div>
    )
}
export default Insert_Incidence