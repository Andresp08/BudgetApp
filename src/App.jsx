import { useState } from 'react'
import  Header from './components/Header';
import Modal from './components/Modal';

import IconoNuevoGasto from './img/nuevo-gasto.svg';

const App = ()  => {

  //Hooks
  const [presupuesto, setPresupuesto] = useState(0);
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);
  const [modal, setModal] = useState(false);
  const [animarModal, setAnimarModal] = useState(false);

  //
  const handleNuevoGasto = () => {
    setModal(true);

    setTimeout(() => {
      setAnimarModal(true);
    }, 500)
  }

  return (
    <div>
      <Header 
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
      />

      {/*si es valido muestre el botón*/}
      {isValidPresupuesto && (
        <div className="nuevo-gasto">
          <img 
            src={IconoNuevoGasto}
            alt="Icono nuevo gasto" 
            onClick={handleNuevoGasto}
          />
        </div>
      )}

      {/*si true => muestra el modal*/}  
      {modal && <Modal 
                  setModal={setModal} 
                  animarModal={animarModal}
                  setAnimarModal={setAnimarModal}
                />}
    </div>
  )
}

export default App
