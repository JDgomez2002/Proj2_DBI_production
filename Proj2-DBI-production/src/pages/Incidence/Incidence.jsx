import { useState, useEffect } from 'react'
import { supabase } from '../../client'
import { Switch, BrowserRouter, Link, Route, useHistory } from 'react-router-dom'
import './Incidence.css'

function Incidence(){

    return (
        <div className='container'>
            <h3>Expediente del paciente</h3>
            <form id='paciente' action='' method='post'>
                <label className='infoPaciente'>Ingrese la información del paciente:</label>
                <fieldset>
                    <input placeholder='DPI del paciente' type='text' tabIndex='1' required autoFocus/>
                </fieldset>
                <fieldset>
                    <button name='Buscar' type='submit'>Buscar</button>
                </fieldset>

                <label>No. expediente: </label>
                <label>DPI del paciente: </label>
                <label>Enfermedades padecidas: </label>
                {/*divididos por fecha de atención*/}
                <label>Examenes realizados: </label>
                <label>Hospitales visitados: </label>
                <label>Doctores que han atendido: </label>
            </form>
        </div>
    )
}
export default Incidence