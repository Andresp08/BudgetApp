
import { useState } from "react";
import Mensaje from "./Mensaje";

const NuevoPresupuesto = ({ 
    presupuesto, 
    setPresupuesto,
    setIsValidPresupuesto 
}) => {

    //Hooks
    const [mensaje, setMensaje] = useState('');

    //validar presupuesto
    const handlePresupuesto = (e) =>{
        e.preventDefault();

        //validación
        if(!presupuesto || presupuesto < 0 ){
            setMensaje('No es un presupuesto valido');
            return;
        } 

        //limpiar el msj
        setMensaje('');

        setIsValidPresupuesto(true);


    }

    return(
        <div className="contenedor-presupuesto contenedor sombra">

            <form className="formulario" onSubmit={handlePresupuesto}>
                <div className="campo">
                    <label htmlFor="presupuesto">Definir Presupuesto</label>
                    <input 
                        type="number" 
                        className="nuevo-presupuesto"
                        placeholder="Añade tu presupuesto"
                        id="presupuesto"
                        value={presupuesto}
                        onChange={(e) => setPresupuesto(Number(e.target.value))}
                    />
                </div>

                <input type="submit" value="Añadir" />

                {/*Alerta de error - presupuesto no valido*/}
                {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
            </form>
        </div>
    )
}

export default NuevoPresupuesto;