import React, { useState } from "react";
import { useSelector } from 'react-redux';
//import Comments from "./homeServicio/Comments";  <Comments servicio={servicio} />   
//<InputComment servicio={servicio} />   

import CardBody from "./homeServicio/servicio_card/CardBody";  
import CardFooter from "./homeServicio/servicio_card/CardFooter";   
import CardHeader from "./homeServicio/servicio_card/CardHeader";   
//import InputComment from "./homeServicio/InputComment";   
import { useLocation } from "react-router-dom";
 import CardInfoservicio from './homeServicio/servicio_card/CardInfoservicio';   
import InfoVendidor from "./homeServicio/servicio_card/InfoVendidor";   
import { FaExclamationTriangle } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const ServicioCard = ({ servicio, theme }) => {   

  const { languagee } = useSelector(state => state);

  const { t } = useTranslation();

  const location = useLocation();
  const [tipoTransaccion, setTipoTransaccion] = useState(servicio.ventalocation);  

  const isServicioDetailPage = location.pathname.startsWith(`/servicio/${servicio._id}`);   

  const handleChangeInput = (event) => {
    const { name, value } = event.target;
    if (name === 'ventalocation') {
      setTipoTransaccion(value);
    }
  };

  return (
    <div className="card">
      <CardHeader servicio={servicio} />  
      <CardBody servicio={servicio} theme={theme} />  

      <div>
        <select
          name="ventalocation"
          value={tipoTransaccion}
          onChange={handleChangeInput}
          style={{ visibility: 'hidden', height: 0, overflow: 'hidden' }}
        >
         
        </select>
      </div>

      

      {isServicioDetailPage && servicio.tipo === 'servicio' && (
        <CardInfoservicio servicio={servicio} />   
      )}

      {isServicioDetailPage && servicio.privacidad_informations !== 'autoriser-les-informations' && (
        <div className="card-body text-danger mt-3 mb-3" style={{ border: '1px solid #ff0000', padding: '10px', marginBottom: '10px' }}>
          <FaExclamationTriangle style={{ marginRight: '15px', color: 'yellow' }} />
          <p style={{ display: 'inline' }}> {t('La información de contacto no está autorizada por el propietario del artículo.', { lng: languagee.language })} </p>
        </div>
      )}

      {isServicioDetailPage && servicio.privacidad_commentarios !== 'autoriser-les-commentaires' && (
        <div className="card-body text-danger mt-3 mb-3 " style={{ border: '1px solid #ff0000', padding: '10px', marginBottom: '10px' }}>
          <FaExclamationTriangle style={{ marginRight: '15px', color: 'yellow' }} />
          <p style={{ display: 'inline' }}> {t('Los comentarios no están autorizados por el propietario del servicio.', { lng: languagee.language })}</p>
        </div>
      )}

      {isServicioDetailPage && servicio.privacidad_informations === 'autoriser-les-informations' && (
        <>
          {isServicioDetailPage && <InfoVendidor servicio={servicio} />   
          }
        </>
      )}

      {isServicioDetailPage && servicio.privacidad_commentarios === 'autoriser-les-commentaires' && (
        <>
          <CardFooter servicio={servicio} />   
           
        </>
      )}
    </div>
  );
};

export default ServicioCard;

