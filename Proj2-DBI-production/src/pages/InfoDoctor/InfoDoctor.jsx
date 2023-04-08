import { useState, useEffect } from 'react'
import { supabase } from '../../client'
import { Switch, BrowserRouter, Link, Route, useHistory } from 'react-router-dom'
import './InfoDoctor.css'

function InfoDoctor() {






  return (
    <div class="container">
  <form id="contact" action="" method="post">
    <h3>Información del Doctor</h3>
    <h4>Porfavor llenar todos los espacios asignados</h4>
    <fieldset>
      <input placeholder="DPI del Doctor" type="text" tabindex="1" required autofocus />
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
        <select name="state" className="form-control selectpicker" >
            <option value=" " >Especialidad Medica: </option>
        </select>
    </fieldset>
    <fieldset>
        <select name="state" className="form-control selectpicker" >
            <option value=" " >En que hospital se encuentra: </option>
        </select>
    </fieldset>
    <fieldset>
      <input placeholder="Dirección" type="text" tabindex="4" required />
    </fieldset>
    <fieldset>
      <input placeholder="Numero de colegiado" type="text" tabindex="4" required />
    </fieldset>
    <fieldset>
      <button name="submit" type="submit" id="contact-submit" data-submit="...Sending">Submit</button>
    </fieldset>
  </form>
 
  
</div>
   )
}

export default InfoDoctor
