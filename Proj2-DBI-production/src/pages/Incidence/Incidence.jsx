import { useState, useEffect } from 'react'
import { supabase } from '../../client'
import { useHistory } from 'react-router-dom'
import './Incidence.css'

function Incidence(){
    const [incidences, setDPIs] = useState([])
    const [incidence, setDPI] = useState({dpis: '', busqueda: false})
    let dpiFound = false
    const history = useHistory()

    useEffect(() => {
        window.localStorage.setItem('STATUS', JSON.stringify(incidence))
    }, [incidence])

    useEffect(() => {
    }, [incidences])

    async function fetchPosts() {
        const { data } = await supabase
            .from('incidences')
            .select()
        setDPIs(data)
    }

    const buscarDPI = () => {
        dpi = document.getElementById('input-dpi').value
        dpiFound = false
        
        let while_counter = 0
        while ((while_counter < incidences.length) && (dpiFound == false)){
            if(dpi == incidences[while_counter].dpis){
                dpiFound = true
                setDPI({dpis: dpi, busqueda: true})
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
        <div className='contenedor'>
            <form id='dpi_paciente' action='' method='post'>
                <h3>Expediente del paciente</h3>
                <fieldset>
                    <input id="input-dpi" onClick={fetchPosts} placeholder='DPI del paciente' type='text'></input>
                    <button className="buscar" onClick={buscarDPI}>Buscar</button>
                    <div id="status" className="status-message"></div>
                </fieldset>
            </form>

            <div className='detalles'>
                <fieldset>
                    <h4>No. expediente: </h4>
                    <div id="noExpediente" className="cadaDetalle"></div>

                    <h4>Fecha: </h4>
                    <div id="fecha" className="cadaDetalle"></div>

                    <h4>Enfermedades padecidas: </h4>
                    <div id="enfermedades" className="cadaDetalle"></div>

                    <h4>Examenes realizados: </h4>
                    <div id="examenes" className="cadaDetalle"></div>

                    <h4>Hospitales visitados: </h4>
                    <div id="hospitales" className="cadaDetalle"></div>

                    <h4>Doctores que le han atendido: </h4>
                    <div id="doctores" className="cadaDetalle"></div>
                </fieldset>
            </div>
        </div>
    )
}
export default Incidence