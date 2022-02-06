 
import NuevoPresupuesto from "./NuevoPresupuesto";
import ControlPrespuesto from "./ControlPrespuesto";
import ControlPresupuesto from "./ControlPrespuesto";

const Header = ({ 
    presupuesto, 
    setPresupuesto, 
    isValidPresupuesto, 
    setIsValidPresupuesto 
}) => {
    return(
        <header>
            <h1>Planificador de Gastos</h1>

            {/*Si es valido mostrar el progreso del presupuesto*/}
            {isValidPresupuesto ? (
                <ControlPresupuesto 
                    presupuesto={presupuesto}
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