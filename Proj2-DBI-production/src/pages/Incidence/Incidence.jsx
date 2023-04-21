import { useState } from 'react'
import { supabase } from '../../client'
import './Incidence.css'

function Incidence(){
    const [lista_dpi, setDPIs] = useState([])
    const [fecha, setFecha] = useState([])
    const [horas, setHoras] = useState([])
    const [enfermedad, setEnfermedad] = useState([])
    const [examen, setExamen] = useState([])
    const [hospital, setHospital] = useState([])
    const [doctor, setDoctor] = useState([])
    const [medicamentos, setMedicamentos] = useState([])
    const [status_paciente, setStatusPaciente] = useState([])
    const [fileIds, setFileIds] = useState([]);
    let{dpi_ingresado} = ''
    let dpiFound = false
    
    async function fetchPosts() {
        await fetchPost()
        await fetchPost1()
        await fetchPost2()
        await fetchPostH()
        await fetchPost3()
        await fetchPost4()
        await fetchPost5()
        await fetchPost6()
        await fetchPostM()
        await fetchPost7()
    }

    //queries para obtener cada uno de los datos del expediente
    async function fetchPost() {
        const { data } = await supabase.from('incidence').select('patient_dpi').eq('patient_dpi', dpi_ingresado)
        setDPIs(data)
    }

    async function fetchPost1(){
        const {data} = await supabase.from('incidence').select('file_id').eq('patient_dpi', dpi_ingresado)
        const fileIds = data.map((item) => item.file_id)
        setFileIds(fileIds)
    }

    async function fetchPost2(){
        const {data} = await supabase.from('incidence').select('date_time').eq('patient_dpi', dpi_ingresado)
        const fecha = data.map((item) => item.date_time)
        setFecha(fecha)
    }

    async function fetchPostH(){
        const {data} = await supabase.from('incidence').select('entry_time').eq('patient_dpi', dpi_ingresado)
        const horas = data.map((item) => item.entry_time)
        setHoras(horas)
    }

    async function fetchPost3(){
        const {data} = await supabase
            .from('incidence')
            .select('disease_id')
            .eq('patient_dpi', dpi_ingresado)
        const diseaseIds = data.map((item) => item.disease_id)

        const {data: generalData} = await supabase
            .from('disease')
            .select('name')
            .in('disease_id', diseaseIds)
        const enfermedad = generalData.map((item) => item.name)
        setEnfermedad(enfermedad)   
    }
      

    async function fetchPost4(){
        const {data} = await supabase
            .from('incidence')
            .select('exam_id')
            .eq('patient_dpi', dpi_ingresado)
        const examenId = data.map((item) => item.exam_id)

        const {data: generalData} = await supabase
            .from('exams')
            .select('name')
            .in('exam_id', examenId)
        const examen = generalData.map((item) => item.name)
        setExamen(examen)
    }

    async function fetchPost5(){
        const {data} = await supabase
            .from('incidence')
            .select('hospital_id')
            .eq('patient_dpi', dpi_ingresado)
        const hospitalId = data.map((item) => item.hospital_id)

        const {data: generalData} = await supabase
            .from('hospital')
            .select('name')
            .in('hospital_id', hospitalId)
        const examen = generalData.map((item) => item.name)
        setHospital(examen)
    }

    async function fetchPost6(){
        const {data} = await supabase
            .from('incidence')
            .select('doctor_dpi')
            .eq('patient_dpi', dpi_ingresado)
        const doctorId = data.map((item) => item.doctor_dpi)

        const {data: generalData} = await supabase
            .from('doctor')
            .select('name, last_name')
            .in('doctor_dpi', doctorId)
        const doctor = generalData.map((item) => `${item.name} ${item.last_name}`)
        setDoctor(doctor)
    }

    async function fetchPostM(){
        const {data} = await supabase.from('incidence').select('medications_id').eq('patient_dpi', dpi_ingresado)
        const medicamentosId = data.map((item) => item.medications_id)

        const {data: generalData} = await supabase
            .from('medications')
            .select('name')
            .in('medications_id', medicamentosId)
        const medicamentos = generalData.map((item) => item.name)
        setMedicamentos(medicamentos)
    }

    async function fetchPost7(){
        const {data} = await supabase.from('incidence').select('status').eq('patient_dpi', dpi_ingresado)
        const status_paciente = data.map((item) => item.status)
        setStatusPaciente(status_paciente)
    }

    //busca el dpi en la tabla
    const buscarDPI = () => {
        dpi_ingresado = document.getElementById('input-dpi').value.toString()
        dpiFound = false
        let while_counter = 0
        fetchPosts()
        console.log('fetch',lista_dpi)
        while ((while_counter < lista_dpi.length)){
            if(dpi_ingresado == lista_dpi[while_counter].patient_dpi){
                dpiFound = true
                while_counter++
            } else {
                while_counter++
            }
        }
    }

    //comienza a guardar cada uno de los datos en arrays
    const n = 5; 
    const displayedFileIds = []; 
    for (let i = 0; i < n && i < fileIds.length; i++) {
        displayedFileIds.push(
        <div key={fileIds[i]}>
            <p>{fileIds[i]}</p>
        </div>
        ); 
    }

    const displayedFechas = []; 
    for (let i = 0; i < n && i < fecha.length; i++) {
        displayedFechas.push(
        <div key={fecha[i]}>
            <p>{fecha[i]}</p>
        </div>
        ); 
    }

    const displayedHoras = []; 
    for (let i = 0; i < n && i < horas.length; i++) {
        displayedHoras.push(
        <div key={horas[i]}>
            <p>{horas[i]}</p>
        </div>
        ); 
    }

    const displayedEnfermedades = []; 
    for (let i = 0; i < n && i < enfermedad.length; i++) {
        displayedEnfermedades.push(
        <div key={enfermedad[i]}>
            <p>{enfermedad[i]}</p>
        </div>
        ); 
    }

    const displayedExamenes = []; 
    for (let i = 0; i < n && i < examen.length; i++) {
        displayedExamenes.push(
        <div key={examen[i]}>
            <p>{examen[i]}</p>
        </div>
        ); 
    }

    const displayedHospitales = []; 
    for (let i = 0; i < n && i < hospital.length; i++) {
        displayedHospitales.push(
        <div key={hospital[i]}>
            <p>{hospital[i]}</p>
        </div>
        ); 
    }

    const displayedDoctores = []; 
    for (let i = 0; i < n && i < doctor.length; i++) {
        displayedDoctores.push(
        <div key={doctor[i]}>
            <p>{doctor[i]}</p>
        </div>
        ); 
    }

    const displayedMedicamentos = []; 
    for (let i = 0; i < n && i < medicamentos.length; i++) {
        displayedMedicamentos.push(
        <div key={medicamentos[i]}>
            <p>{medicamentos[i]}</p>
        </div>
        ); 
    }

    const displayedStatus = []; 
    for (let i = 0; i < n && i < status_paciente.length; i++) {
        displayedStatus.push(
        <div key={status_paciente[i]}>
            <p>{status_paciente[i]}</p>
        </div>
        ); 
    }

    //muestra la informacion en la interfaz
    return (
        <div className="incindence-mainpage-root">
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
                        <div>
                            <h4>No. expediente: </h4>
                            <div id="noExpediente" className="cadaDetalle" >
                            {displayedFileIds[0]}
                            </div>

                            <h4>Fecha: </h4>
                            <div id="fecha" className="cadaDetalle">
                            {displayedFechas[0]}
                            </div>

                            <h4>Hora: </h4>
                            <div id="hora" className="cadaDetalle">
                            {displayedHoras[0]}
                            </div>

                            <h4>Enfermedades padecidas: </h4>
                            <div id="enfermedades" className="cadaDetalle">
                            {displayedEnfermedades[0]}
                            </div>

                            <h4>Examenes realizados: </h4>
                            <div id="examenes" className="cadaDetalle">
                            {displayedExamenes[0]}
                            </div>

                            <h4>Hospital que visitó: </h4>
                            <div id="hospitales" className="cadaDetalle">
                            {displayedHospitales[0]}
                            </div>

                            <h4>Doctor que le atendió: </h4>
                            <div id="doctores" className="cadaDetalle">
                            {displayedDoctores[0]}
                            </div>

                            <h4>Medicamentos suministrados: </h4>
                            <div id="medicinas" className="cadaDetalle">
                            {displayedMedicamentos[0]}
                            </div>

                            <h4>Status del paciente: </h4>
                            <div id="statusDelPaciente" className="cadaDetalle">
                            {displayedStatus[0]}
                            </div>
                        </div>
                    
                    {fileIds.length >= 2 &&
                        <div>
                            <hr></hr>
                            <h4>No. expediente: </h4>
                            <div id="noExpediente" className="cadaDetalle" >
                            {displayedFileIds[1]}
                            </div>

                            <h4>Fecha: </h4>
                            <div id="fecha" className="cadaDetalle">
                            {displayedFechas[1]}
                            </div>

                            <h4>Hora: </h4>
                            <div id="fecha" className="cadaDetalle">
                            {displayedHoras[1]}
                            </div>

                            <h4>Enfermedades padecidas: </h4>
                            <div id="enfermedades" className="cadaDetalle">
                            {displayedEnfermedades[1]}
                            </div>

                            <h4>Examenes realizados: </h4>
                            <div id="examenes" className="cadaDetalle">
                            {displayedExamenes[1]}
                            </div>

                            <h4>Hospital que visitó: </h4>
                            <div id="hospitales" className="cadaDetalle">
                            {displayedHospitales[1]}
                            </div>

                            <h4>Doctor que le atendió: </h4>
                            <div id="doctores" className="cadaDetalle">
                            {displayedDoctores[1]}
                            </div>

                            <h4>Medicamentos suministrados: </h4>
                            <div id="medicinas" className="cadaDetalle">
                            {displayedMedicamentos[1]}
                            </div>

                            <h4>Status del paciente: </h4>
                            <div id="statusDelPaciente" className="cadaDetalle">
                            {displayedStatus[1]}
                            </div>
                        </div>
                    }

                    {fileIds.length >= 3 &&
                        <div>
                            <hr></hr>
                            <h4>No. expediente: </h4>
                            <div id="noExpediente" className="cadaDetalle" >
                            {displayedFileIds[2]}
                            </div>

                            <h4>Fecha: </h4>
                            <div id="fecha" className="cadaDetalle">
                            {displayedFechas[2]}
                            </div>

                            <h4>Hora: </h4>
                            <div id="fecha" className="cadaDetalle">
                            {displayedHoras[2]}
                            </div>

                            <h4>Enfermedades padecidas: </h4>
                            <div id="enfermedades" className="cadaDetalle">
                            {displayedEnfermedades[2]}
                            </div>

                            <h4>Examenes realizados: </h4>
                            <div id="examenes" className="cadaDetalle">
                            {displayedExamenes[2]}
                            </div>

                            <h4>Hospital que visitó: </h4>
                            <div id="hospitales" className="cadaDetalle">
                            {displayedHospitales[2]}
                            </div>

                            <h4>Doctor que le atendió: </h4>
                            <div id="doctores" className="cadaDetalle">
                            {displayedDoctores[2]}
                            </div>

                            <h4>Medicamentos suministrados: </h4>
                            <div id="medicinas" className="cadaDetalle">
                            {displayedMedicamentos[2]}
                            </div>

                            <h4>Status del paciente: </h4>
                            <div id="statusDelPaciente" className="cadaDetalle">
                            {displayedStatus[2]}
                            </div>
                        </div>
                    }

                    {fileIds.length >= 4 &&
                        <div>
                            <hr></hr>
                            <h4>No. expediente: </h4>
                            <div id="noExpediente" className="cadaDetalle" >
                            {displayedFileIds[3]}
                            </div>

                            <h4>Fecha: </h4>
                            <div id="fecha" className="cadaDetalle">
                            {displayedFechas[3]}
                            </div>

                            <h4>Hora: </h4>
                            <div id="fecha" className="cadaDetalle">
                            {displayedHoras[3]}
                            </div>

                            <h4>Enfermedades padecidas: </h4>
                            <div id="enfermedades" className="cadaDetalle">
                            {displayedEnfermedades[3]}
                            </div>

                            <h4>Examenes realizados: </h4>
                            <div id="examenes" className="cadaDetalle">
                            {displayedExamenes[3]}
                            </div>

                            <h4>Hospital que visitó: </h4>
                            <div id="hospitales" className="cadaDetalle">
                            {displayedHospitales[3]}
                            </div>

                            <h4>Doctor que le atendió: </h4>
                            <div id="doctores" className="cadaDetalle">
                            {displayedDoctores[3]}
                            </div>

                            <h4>Medicamentos suministrados: </h4>
                            <div id="medicinas" className="cadaDetalle">
                            {displayedMedicamentos[3]}
                            </div>

                            <h4>Status del paciente: </h4>
                            <div id="statusDelPaciente" className="cadaDetalle">
                            {displayedStatus[3]}
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}
export default Incidence