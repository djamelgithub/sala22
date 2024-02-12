import React, { useState, useEffect } from "react";
 
import { useLocation } from "react-router-dom";
import Comments from "./homeServicio/Comments";
import CardBody from "./homeServicio/servicio_card/CardBody";
import CardFooter from "./homeServicio/servicio_card/CardFooter";
import InputComment from "./homeServicio/InputComment";
 
 
import CardInfoservicio from './homeServicio/servicio_card/CardInfoservicio';
 
import CardFooterdisplay from './homeServicio/servicio_card/CardFooterdisplay';
import Cardserviciosdeservicio from './homeServicio/servicio_card/Cardserviciosdeservicio';
import CardHeaderr from './homeServicio/servicio_card/CardHeaderr';
import Cardtitleservicio from './homeServicio/servicio_card/Cardtitleservicio';
import Informaciondecontacto from "./homeServicio/servicio_card/Informaciondecontacto";

const ServicioCard = ({ servicio, theme }) => {
 
  const location = useLocation();
  const isServicioDetailPage = location.pathname.startsWith(`/servicio/${servicio._id}`);
  const [showFooter, setShowFooter] = useState(false);
  const [commentsVisible, setCommentsVisible] = useState(false);
    const [inputCommentVisible, setInputCommentVisible] = useState(false); // Estado para controlar la visibilidad del área de comentario
  
  useEffect(() => {
    // Mostrar el CardFooter en la página de detalles del servicio si está autorizado
    if (isServicioDetailPage && servicio.informacion === 'permitirinformacion') {
      setShowFooter(true);
    }
  }, [isServicioDetailPage, servicio.informacion]);

  
 
  const toggleCommentsVisibility = () => {
    setCommentsVisible(!commentsVisible);
    if (!commentsVisible) {
      setInputCommentVisible(true); // Mostrar InputComment cuando se muestren los comentarios
    }
  };
  
  const renderInformacionContacto = () => {
    if (!isServicioDetailPage || servicio.informacion !== 'permitirinformacion') return null;
    return <Informaciondecontacto servicio={servicio} />;
  };

  const renderComentarios = () => {                           
    if (!isServicioDetailPage || servicio.comentarios !== 'permitircomentarios' || !commentsVisible) return null;
    return (
      <>
        <Comments servicio={servicio} />
        <InputComment servicio={servicio} />
      </>
    );
  };

  return (
    <div className="card">
    <CardHeaderr servicio={servicio} />
    <Cardtitleservicio servicio={servicio} />
    <CardBody servicio={servicio} theme={theme} />
    {isServicioDetailPage && <CardInfoservicio servicio={servicio} />}
 
    {isServicioDetailPage && <Cardserviciosdeservicio servicio={servicio} />}
    {isServicioDetailPage && <CardFooterdisplay servicio={servicio} />}
 {isServicioDetailPage && renderInformacionContacto()}

    {isServicioDetailPage && renderComentarios()}
    {isServicioDetailPage && showFooter && (
  <>
    
    <CardFooter servicio={servicio} toggleCommentsVisibility={toggleCommentsVisibility} />
    <Comments servicio={servicio} />
    <InputComment servicio={servicio} />

  </>
)}

  </div>
  );
};

export default ServicioCard;
