import { useState, useEffect } from 'react'
import { supabase } from '../../client'
import { useHistory } from 'react-router-dom'
import './Inventory.css'

function Inventory(){

    return(
        <div className='inventario'>
            <h3>Inventario</h3>
            <fieldset>
                <div className='busqueda_mensual'>Si desea buscar los medicamentos que están por vencer</div>
                <button className="buscar_mensual" onClick={buscarDPI}>Presione aquí</button>
            </fieldset>
        </div>
    )
}
export default Inventory