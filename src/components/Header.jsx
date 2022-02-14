 
import NuevoPresupuesto from "./NuevoPresupuesto";
import ControlPresupuesto from "./ControlPrespuesto";

const Header = ({ 
    gastos,
    setGastos,
    presupuesto, 
    setPresupuesto, 
    isValidPresupuesto, 
    setIsValidPresupuesto,
}) => {
    return(
        <header>
            <h1>Planificador de Gastos</h1>

            {/*Si es valido mostrar el progreso del presupuesto*/}
            {isValidPresupuesto ? (
                <ControlPresupuesto 
                    gastos={gastos}
                    setGastos={setGastos}
                    presupuesto={presupuesto}
                    setPresupuesto={setPresupuesto}
                    setIsValidPresupuesto={setIsValidPresupuesto}
                />
            ): (
                <NuevoPresupuesto 
                    presupuesto={presupuesto}
                    setPresupuesto={setPresupuesto}
                    setIsValidPresupuesto={setIsValidPresupuesto}
                />
            )}
            
        </header>
    )
}

export default Header;