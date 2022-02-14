import { useState, useEffect } from 'react'

import  Header from './components/Header';
import ListadoGastos from './components/ListadoGastos';
import Modal from './components/Modal';
import Filtro from './components/Filtros';

import { generarId } from './helpers';

import IconoNuevoGasto from './img/nuevo-gasto.svg';

const App = ()  => {

  //Hooks
  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem('presupuesto')) ?? 0
  );
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);
  const [modal, setModal] = useState(false);
  const [animarModal, setAnimarModal] = useState(false);

  //para guardar el gasto que viene del modal
  const [gastos, setGastos] = useState(
    localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : []
  );

  //Editar gasto
  const [gastoEditar, setGastoEditar] = useState({});
  
  const [filtro, setFiltro] = useState('');
  const [gastosFiltrados, setGastosFiltrados] = useState([]);


  //useEffect
  useEffect(() => {
    if(Object.keys(gastoEditar).length > 0){
      //ABRIR EL MODAL
      setModal(true);

      setTimeout(() => {
        setAnimarModal(true);
      }, 500)
    }
  }, [gastoEditar])

  //guardar en localStorage
  useEffect(() => {
    localStorage.setItem('presupuesto', presupuesto ?? 0);
  },[presupuesto])

  //guardar gastos en ls
  useEffect(() => {
    localStorage.setItem('gastos', JSON.stringify(gastos) ?? [])
  },[gastos])

  //mostrar por filtro categoria
  useEffect(() => {
    if(filtro){
      const gastosFiltrados = gastos.filter(gasto => gasto.categoria === filtro)
      setGastosFiltrados(gastosFiltrados);
    }
  },[filtro])


  //al cargar el app
  useEffect(() => {
    const presupuestoLs = Number(localStorage.getItem('presupuesto')) ?? 0;
    
    if(presupuestoLs > 0 ){
      setIsValidPresupuesto(true);
    }
  },[])


  //mostrar el modal
  const handleNuevoGasto = () => {
    setModal(true);

    setGastoEditar({}); //limpiar la edición al agregar un gasto nuevo

    setTimeout(() => {
      setAnimarModal(true);
    }, 500)
  }

  //gasto que recibe objeto desde modal.jsx
  const guardarGasto = (gasto) => {
    if(gasto.id ){
      //Actualizar
      const gastosActualizados = gastos.map( gastoState => gastoState.id === gasto.id ? gasto : gastoState);
      
      setGastos(gastosActualizados);
      setGastoEditar({})
    } else {
      //Nuevo gasto
      gasto.id = generarId();
      gasto.fecha = Date.now();
      setGastos([...gastos, gasto]);
    }

    //Animación para modal
    setAnimarModal(false);
    setTimeout(() => {
      setModal(false);
    },1000)
  }


  //Eliminar gasto
  const eliminarGasto = id => {
    const gastosActualizados = gastos.filter(gasto => gasto.id !== id);
    setGastos(gastosActualizados)
  }

  return (
    <div className={modal ? 'fijar' : ''}>
      <Header 
        gastos={gastos}
        setGastos={setGastos}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
      />

      {/*si es valido muestre el botón*/}
      {isValidPresupuesto && (
        <>
          <main>
              <Filtro 
                filtro={filtro}
                setFiltro={setFiltro}
              />
              <ListadoGastos 
                gastos={gastos}
                setGastoEditar={setGastoEditar}
                eliminarGasto={eliminarGasto}
                filtro={filtro}
                gastosFiltrados={gastosFiltrados}
              />
          </main>
          <div className="nuevo-gasto">
            <img 
              src={IconoNuevoGasto}
              alt="Icono nuevo gasto" 
              onClick={handleNuevoGasto}
            />
          </div>
        </>
      )}

      {/*si true => muestra el modal*/}  
      {modal && <Modal 
                  setModal={setModal} 
                  animarModal={animarModal}
                  setAnimarModal={setAnimarModal}
                  guardarGasto={guardarGasto}
                  gastoEditar={gastoEditar}
                  setGastoEditar={setGastoEditar}
                />}
    </div>
  )
}

export default App
