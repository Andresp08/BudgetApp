import { useEffect, useState } from "react"
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import "react-circular-progressbar/dist/styles.css"

const ControlPresupuesto = ({
    gastos, 
    setGastos,
    presupuesto,
    setPresupuesto,
    setIsValidPresupuesto
}) => {

    //Hooks
    const [porcentaje, setPorcentaje] = useState(0);
    const [disponible, setDisponible] = useState(0);
    const [gastado, setGastado] = useState(0);

    //escuchar por los gatos
    useEffect(() => {
        const totalGastado = gastos.reduce((total, gasto) => gasto.cantidad + total, 0);
        const saldoDisponible = presupuesto - totalGastado;
        

        //Calcular el porcentaje gastado
        const nuevoPorcentaje = (( (presupuesto - saldoDisponible) / presupuesto ) * 100).toFixed(2);


        setGastado(totalGastado);
        setDisponible(saldoDisponible);
        setTimeout(() => {
            setPorcentaje(nuevoPorcentaje)
        }, 1500);
    },[gastos])

    //formatear presupuesto
    const formatPresupuesto = (cantidad)  => {
        return cantidad.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        })
    }

    //ResetApp
    const handleResetApp = () => {
        const resultado = confirm('Deseas reiniciar presupuesto y gastos?');
        if(resultado){
            setGastos([])
            setPresupuesto(0)
            setIsValidPresupuesto(false);
        } else {
            console.log('no')
        }
    }

    return(
        <div className="contenedor-presupuesto contenedor sombra dos-columnas">
            <div>
                <CircularProgressbar 
                    styles={buildStyles({
                        pathColor: porcentaje > 100 ? '#DC2626' :'#3b82f6',
                        trailColor: '#F5F5F5',
                        textColor: porcentaje > 100 ? '#DC2626' : '#3b82f6'
                    })}
                    value={porcentaje}
                    text={`${porcentaje}% Gastado`}
                />
            </div>
            <div className="contenido-presupuesto">
                <button
                    className="reset-app"
                    type="button"
                    onClick={handleResetApp}
                >
                    Resetear App
                </button>
                <p>
                    <span>Presupuesto: </span>{formatPresupuesto(presupuesto)}
                </p>

                <p className={`${disponible < 0  ? 'negativo' : '' }`}>
                    <span>Disponible: </span>{formatPresupuesto(disponible)}
                </p>

                <p>
                    <span>Gastado: </span>{formatPresupuesto(gastado)}
                </p>
            </div>
        </div>
    )
}

export default ControlPresupuesto;