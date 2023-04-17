import { useState } from 'react'
import { supabase } from '../../client'
import './Inventory.css'

function Inventory(){
    const [medicamentosQ, setMedicamentosQ] = useState([])
    const [medicamentosE, setMedicamentosE] = useState([])
    const [supplies, setSupplies] = useState([])
    const [activeButton, setActiveButton] = useState(null);
    let quincePorciento = 200

    //QUERY para mostrar los medicamentos que tenga un 15% o menos en existencia
    async function fetchPostQ() {
        //obtiene toda la data de la tabla 'inventory_medication'
        const { data } = await supabase
            .from('inventory_medication')
            .select('medications_id, quantity')
            .lt('quantity', quincePorciento)
        const medicamentosId = data.map((item) => item.medications_id)

        //realiza el join de la tabla 'inventory_medication' con 'medications' para obtener el nombre
        const {data: generalData} = await supabase
            .from('medications')
            .select('name')
            .in('medications_id', medicamentosId)
        const medicamentosQ = generalData.map((item) => item.name)
        setMedicamentosQ(medicamentosQ, medicamentosId)
    }
    
    //QUERY para mostrar los medicamentos más prontos a vencer
    async function fetchPostE() {
        //obtiene toda la data de la tabla 'inventory_medication' y los guarda
        const { data } = await supabase
            .from('inventory_medication')
            .select()
        const medicamentosId = data.map((item) => item.medications_id)

        //realiza el join de la tabla 'inventory_medication' con 'medications' para obtener el nombre y fecha de expiracion, luego la ordena a la fecha de expiracion mas proxima
        const {data: generalData} = await supabase
            .from('medications')
            .select('name, expiration')
            .in('medications_id', medicamentosId)
            .order('expiration',  { ascending: true })
        const medicamentosE = generalData.map((item) => `${item.name} ${item.expiration}`)
        setMedicamentosE(medicamentosE)
    }

    //QUERY para mostrar los implementos que tenga un 15% o menos en existencia
    async function fetchPostS() {
        //obtiene toda la data de la tabla 'inventory_supplies'
        const { data } = await supabase
            .from('inventory_supplies')
            .select()
            .lt('quantity', quincePorciento)
        const suppliesId = data.map((item) => item.supply_id)

        //realiza el join de la tabla 'inventory_supplies' con 'supplies' para obtener el nombre
        const {data: generalData} = await supabase
            .from('supplies')
            .select('name')
            .in('supply_id', suppliesId)
        const supplies = generalData.map((item) => item.name)
        setSupplies(supplies)
    }

    const buscarMedicamentos = () => {
        fetchPostQ()
        fetchPostE()
    }

    const buscarSupplies = () => {
        fetchPostS()
    }

    const n = 100
    const displayMedicamentosCantidad = []; 
    for (let i = 0; i < n && i < medicamentosQ.length; i++) {
        displayMedicamentosCantidad.push(
        <div key={medicamentosQ[i]}>
            <p>{medicamentosQ[i]}</p>
        </div>
        ); 
    }

    const displayMedicamentosExpiracion = []; 
    for (let i = 0; i < n && i < medicamentosE.length; i++) {
        displayMedicamentosExpiracion.push(
        <div key={medicamentosE[i]}>
            <p>{medicamentosE[i]}</p>
        </div>
        ); 
    }

    const displaySupplies = []; 
    for (let i = 0; i < n && i < supplies.length; i++) {
        displaySupplies.push(
        <div key={supplies[i]}>
            <p>{supplies[i]}</p>
        </div>
        ); 
    }

    return(
        <div className="inventario-root" style={{width: "100%", height: "100%"}} >
        {/* <div className='inventario1'> */}
            <h1>Inventario</h1>

            <div className="button-container">
                <button className="boton" onClick={() => {
                    buscarMedicamentos();
                    setActiveButton("medicamentos");
                }}>Medicamentos</button>

                <button className="boton" onClick={() => {
                    buscarSupplies();
                    setActiveButton("supplies");
                }}>Otros elementos</button>
            </div>
            

            {activeButton === "medicamentos" && medicamentosQ.length >= 1 && (
            <div>
                <hr></hr>
                <h2>Medicamentos que tienen menos del 15%</h2>
                <div className="detalles" >{displayMedicamentosCantidad}</div>
                <hr></hr>
                <h2>Medicamentos más prontos a vencer</h2>
                <div className="detalles" >{displayMedicamentosExpiracion}</div>
            </div>
            )}

            {activeButton === "supplies" && supplies.length >= 1 && (
            <div>
                <hr></hr>
                <h2>Elementos que tienen menos de un 15%</h2>
                <div className="detalles" >{displaySupplies}</div>
            </div>
            )}
        {/* </div> */}
        </div>
    )
}
export default Inventory