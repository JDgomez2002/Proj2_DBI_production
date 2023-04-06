import { useState, useEffect } from 'react'
import { supabase } from '../../client'
import { useHistory } from 'react-router-dom'
import './Incidence.css'

function Incidence(){
    const [incidence, setUsers] = useState([])
    const history = useHistory()

    const mostrarExpediente = () => {
        if(dpiFound){
            document.getElementById('status').textContent = 'DPI found'
        } else {
            document.getElementById('status').textContent = 'DPI not found'
            document.getElementById('status').style.color = 'red'
        }
    }

    async function fetchPosts() {
        const { data } = await supabase.from('incidence').select()
        setUsers(data)
    }

    const buscarExpediente = () => {
        dpi = document.getElementById('input-dpi').value
        dpiFound = false
        
        let while_counter = 0
        if(dpi == incidence[while_counter].patient.dpi){
            dpiFound = true
        } else {
            while_counter++
        }
        mostrarExpediente()
        console.log('expediente', dpiFound.toString())
    }

    return (
        <div className='contenedor'>
            <form id='dpi_paciente' action='' method='post'>
                <h3>Expediente del paciente</h3>
                <fieldset>
                    <input id="input-dpi" onClick={fetchPosts} placeholder='DPI del paciente' type='text' tabIndex='1' required autoFocus/>
                </fieldset>
                <fieldset>
                    <button className="buscar" onClick={buscarExpediente}>Buscar</button>
                    <div id="status" className="status-message"></div>
                </fieldset>
            </form>

            <div className='detalles'>
                <h4>No. expediente: </h4>
                <h4>Fecha: </h4>
                <h4>Enfermedades padecidas: </h4>
                <h4>Examenes realizados: </h4>
                <h4>Hospitales visitados: </h4>
                <h4>Doctores que le han atendido: </h4>
            </div>
        </div>
    )
}
export default Incidence