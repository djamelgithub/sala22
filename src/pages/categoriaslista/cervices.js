import React, { useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import { useDispatch } from 'react-redux';
import Statusmodalsalle from '../../components/statusmodelll/Statusmodalsalle';
import StatusModalservicio from '../../components/statusmodelll/StatusModalservicio';
 
import { GLOBALTYPES } from '../../redux/actions/globalTypes';

const Cervices = () => {
  const dispatch = useDispatch();
  const [showSalleModal, setShowSalleModal] = useState(false);
  const [showServicioModal, setShowServicioModal] = useState(false);

  const handleButtonClicksalle = () => {
    setShowSalleModal(true);
    setShowServicioModal(false);
    dispatch({ type: GLOBALTYPES.STATUS, payload: true });
  };

  const handleButtonClickservicio = () => {
    setShowServicioModal(true);
    setShowSalleModal(false);
    dispatch({ type: GLOBALTYPES.STATUSSERVICIO, payload: true });
  };

  const closeModal = () => {
    setShowSalleModal(false);
    setShowServicioModal(false);
    dispatch({ type: GLOBALTYPES.STATUS, payload: false });
    dispatch({ type: GLOBALTYPES.STATUSSERVICIO, payload: false });
    // Puedes agregar otra acción para resetear el estado específico del servicio aquí
  };
  

  return (
    <div  >
      <Accordion className='mt-4'>
        <Accordion.Item eventKey="0">
          <Accordion.Header><h5>Salle de Fête</h5></Accordion.Header>
          <Accordion.Body>
            <p
              style={{ textDecoration: 'underline', color: 'blue', cursor: 'pointer' }}
              onClick={handleButtonClicksalle}
            >
              Annonces Salle de Fête
            </p>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header><h5>Services</h5></Accordion.Header>
          <Accordion.Body>
            <p
              style={{ textDecoration: 'underline', color: 'blue', cursor: 'pointer' }}
              onClick={handleButtonClickservicio}
            >
              Annonces Services
            </p>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      {showSalleModal && <Statusmodalsalle closeModal={closeModal} />}
      {showServicioModal && <StatusModalservicio closeModal={closeModal} />}
    </div>
  );
}

export default Cervices;
