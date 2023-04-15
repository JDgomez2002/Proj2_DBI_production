import { useState, useEffect } from 'react'
import { supabase } from '../../client'
import { useHistory } from 'react-router-dom'
import './Incidence.css'

function Incidence(){
    const [lista_dpi, setDPIs] = useState([])
    const [incidence, setDPI] = useState({dpis: '', busqueda: false})
    const [noExpediente, setNoExpediente] = useState([])
    const [fecha, setFecha] = useState([])
    const [enfermedad, setEnfermedad] = useState([])
    const [examen, setExamen] = useState([])
    const [hospital, setHospital] = useState([])
    const [doctor, setDoctor] = useState([])
    const [status_paciente, setStatusPaciente] = useState([])
    let{dpi_ingresado} = ''
    let dpiFound = false
    const history = useHistory()

    
    async function fetchPosts() {
        await fetchPost()
        await fetchPost1()
        await fetchPost2()
        await fetchPost3()
        await fetchPost4()
        await fetchPost5()
        await fetchPost6()
        await fetchPost7()
    }

    async function fetchPost() {
        console.log('dpi',dpi_ingresado)
        const { data } = await supabase.from('incidence').select('patient_dpi').eq('patient_dpi', dpi_ingresado)
        console.log('length: ', data.length)
        setDPIs(data)
        console.log('incidence',data)
    }

    async function fetchPost1(){
        const {data} = await supabase.from('incidence').select('file_id').eq('patient_dpi', dpi_ingresado)
        setNoExpediente(data)
    }

    async function fetchPost2(){
        const {data} = await supabase.from('incidence').select('date_time').eq('patient_dpi', dpi_ingresado)
        setFecha(data)
    }

    async function fetchPost3(){
        const {data} = await supabase.from('incidence').select('disease_id').eq('patient_dpi', dpi_ingresado)
        setEnfermedad(data)
    }

    async function fetchPost4(){
        const {data} = await supabase.from('incidence').select('exam_id').eq('patient_dpi', dpi_ingresado)
        setExamen(data)
    }

    async function fetchPost5(){
        const {data} = await supabase.from('incidence').select('hospital_id').eq('patient_dpi', dpi_ingresado)
        setHospital(data)
    }

    async function fetchPost6(){
        const {data} = await supabase.from('incidence').select('doctor_dpi').eq('patient_dpi', dpi_ingresado)
        setDoctor(data)
    }

    async function fetchPost7(){
        const {data} = await supabase.from('incidence').select('status').eq('patient_dpi', dpi_ingresado)
        setStatusPaciente(data)
    }


    const buscarDPI = () => {
        dpi_ingresado = document.getElementById('input-dpi').value.toString()
        dpiFound = false
        let while_counter = 0
        fetchPosts()
        console.log('fetch',lista_dpi)
        while ((while_counter < lista_dpi.length)){
            console.log('entro',lista_dpi)
            console.log('patient',dpi_ingresado)
            if(dpi_ingresado == lista_dpi[while_counter].patient_dpi){
                dpiFound = true
                while_counter++
            } else {
                while_counter++
            }
        }
        DPIfindMessage()
    }

    const DPIfindMessage = () => {
        if(dpiFound){
            document.getElementById('status').style.color = 'green'
            document.getElementById('status').textContent = 'DPI found'
        } else {
            document.getElementById('status').textContent = 'DPI not found'
            document.getElementById('status').style.color = 'red'
        }
    }

    return (
        <div className='incindence-root'>
            <div className='contenedor'>
                <form id='dpi_paciente' action='' method='post'>
                    <h3>Expediente del paciente</h3>
                    <fieldset>
                        <input id="input-dpi" placeholder='DPI del paciente' type='text'></input>
                    </fieldset>
                </form>
                <button className="buscar" onClick={buscarDPI}  >Buscar</button>
                <div id="status" className="status-message"></div>

                <div className='detalles'>
                        <h4>No. expediente: </h4>
                        <div id="noExpediente" className="cadaDetalle" >
                            {noExpediente&&(
                                <>
                                {noExpediente.map(e=> (
                                <>
                                <div className="detalle">{e.file_id}</div>
                                </>
                                ))}
                            </>
                            )}
                        </div>

                        <h4>Fecha: </h4>
                        <div id="fecha" className="cadaDetalle">
                            {fecha&&(
                                <>
                                {fecha.map(e=> (
                                <>
                                <div className="detalle">{e.date_time}</div>
                                </>
                                ))}
                            </>
                            )}
                        </div>

                        <h4>Enfermedades padecidas: </h4>
                        <div id="enfermedades" className="cadaDetalle">
                            {enfermedad&&(
                                <>
                                {enfermedad.map(e=> (
                                <>
                                <div className="detalle">{e.disease_id}</div>
                                </>
                                ))}
                            </>
                            )}
                        </div>

                        <h4>Examenes realizados: </h4>
                        <div id="examenes" className="cadaDetalle">
                            {examen&&(
                                <>
                                {examen.map(e=> (
                                <>
                                <div className="detalle">{e.exam_id}</div>
                                </>
                                ))}
                            </>
                            )}
                        </div>

                        <h4>Hospitales visitados: </h4>
                        <div id="hospitales" className="cadaDetalle">
                            {hospital&&(
                                <>
                                {hospital.map(e=> (
                                <>
                                <div className="detalle">{e.hospital_id}</div>
                                </>
                                ))}
                            </>
                            )}
                        </div>

                        <h4>Doctores que le han atendido: </h4>
                        <div id="doctores" className="cadaDetalle">
                            {doctor&&(
                                <>
                                {doctor.map(e=> (
                                <>
                                <div className="detalle">{e.doctor_dpi}</div>
                                </>
                                ))}
                            </>
                            )}
                        </div>

                        <h4>Status del paciente: </h4>
                        <div id="statusDelPaciente" className="cadaDetalle">
                            {status_paciente&&(
                                <>
                                {status_paciente.map(e=> (
                                <>
                                <div className="detalle">{e.status}</div>
                                </>
                                ))}
                            </>
                            )}
                        </div>
                </div>
            </div>
        </div>
    )
}
export default Incidence