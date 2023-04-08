import { useState, useEffect } from 'react'
import { supabase } from '../../client'
import { Switch, BrowserRouter, Link, Route, useHistory } from 'react-router-dom'
import './InfoPatient.css'

function InfoPatient() {






  return (
    <div class="container">
  <form id="contact" action="" method="post">
    <h3>Información del Paciente</h3>
    <h4>Porfavor llenar todos los espacios asignados</h4>
    <fieldset>
      <input placeholder="DPI del Paciente" type="text" tabindex="1" required autofocus />
    </fieldset>
    <fieldset>
      <input placeholder="Nombres" type="text" tabindex="2" required />
    </fieldset>
    <fieldset>
      <input placeholder="Apellidos" type="text" tabindex="2" required />
    </fieldset>
    <fieldset>
      <input placeholder="Numero de teléfono" type="tel" tabindex="3" required />
    </fieldset>
    <fieldset>
        <select name="state" class="form-control selectpicker" >
            <option value=" " >Hospital en el que se encuentra</option>
        </select>
    </fieldset>
    <fieldset>
    <label className="enfermedad" >Posee enfermedades hereditarias? </label>
    <div className="radio">
        <label>
            <input type="radio" name="hosting" value="si" /> Sí
        </label>
    </div>
    <div className="radio">
        <label>
            <input type="radio" name="hosting" value="no" /> No
        </label>
    </div>
    </fieldset>
    <fieldset>
      <input placeholder="índice de masa corporal" type="text" tabindex="4" required />
    </fieldset>
    <fieldset>
      <input placeholder="Altura en cm" type="text" tabindex="4" required />
    </fieldset>
    <fieldset>
      <input placeholder="Peso en libras" type="text" tabindex="4" required />
    </fieldset>
    <fieldset>
      <form method="get" action="form-action.html">
        <label className="adiccion" >Adicción: </label>
          <div className="radio">
              <label>
                  <input type="radio" name="hosting" value="si" /> Sí
              </label>
          </div>
          <div className="radio">
              <label>
                  <input type="radio" name="hosting" value="no" /> No
              </label>
          </div>
      </form>
      </fieldset>
    <fieldset>
      <button name="submit" type="submit" id="contact-submit" data-submit="...Sending">Submit</button>
    </fieldset>
  </form>
</div>
   )
}

export default InfoPatient
