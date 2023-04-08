import { useState, useEffect } from 'react'
import { supabase } from '../../client'
import { Switch, BrowserRouter, Link, Route, useHistory } from 'react-router-dom'
import './InfoPatient.css'

function InfoPatient() {






  return (
    <div id="contact" class="container">
      <h3>Información del Paciente</h3>
      <h4>Porfavor llenar todos los espacios asignados</h4>
      <fieldset>
        <input placeholder="DPI del Paciente" type="text" tabIndex="1" required autoFocus />
      </fieldset>
      <fieldset>
        <input placeholder="Nombres" type="text" tabIndex="2" required />
      </fieldset>
      <fieldset>
        <input placeholder="Apellidos" type="text" tabIndex="2" required />
      </fieldset>
      <fieldset>
        <input placeholder="Numero de teléfono" type="tel" tabIndex="3" required />
      </fieldset>
      <fieldset>
          <select name="state" class="form-control selectpicker" >
              <option value=" " >Hospital en el que se encuentra</option>
          </select>
      </fieldset>
      <fieldset>
          <select className="enfermedad" >
            <option className="enfermedad" value="">Posee enfermedades hereditarias?</option>
            <option value="si" > Sí</option>
            <option value="no" > No</option>
          </select>
      </fieldset>
      <fieldset>
        <input placeholder="índice de masa corporal" type="text" tabIndex="4" required />
      </fieldset>
      <fieldset>
        <input placeholder="Altura en cm" type="text" tabIndex="4" required />
      </fieldset>
      <fieldset>
        <input placeholder="Peso en libras" type="text" tabIndex="4" required />
      </fieldset>
      <fieldset>
      <select className="enfermedad" >
            <option className="enfermedad" value="">Posee adiccion?</option>
            <option value="si" > Sí</option>
            <option value="no" > No</option>
          </select>
      </fieldset>
      <fieldset>
        <button name="submit" type="submit" id="contact-submit" data-submit="...Sending">Submit</button>
      </fieldset>
    </div>
  )
}

export default InfoPatient
