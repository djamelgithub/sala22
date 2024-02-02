import React, { useState } from "react";
import { useSelector } from 'react-redux'
import Comments from "./homePost/Comments";

import CardBody from "./homePost/post_card/CardBody";
import CardFooter from "./homePost/post_card/CardFooter";
import CardHeader from "./homePost/post_card/CardHeader";
import InputComment from "./homePost/InputComment";
import { useLocation } from "react-router-dom";
import CardInfosala from './homePost/post_card/CardInfosala';
 
 import InfoVendidor from "./homePost/post_card/InfoVendidor";  
import { FaExclamationTriangle } from 'react-icons/fa';
import { useTranslation } from 'react-i18next'
  
 
const PostCard = ({ post, theme }) => {
  
 
    const {  languagee } = useSelector(state => state)
 
    const { t } = useTranslation();
 
  const location = useLocation();
  const [tipoTransaccion, setTipoTransaccion] = useState(post.ventalocation);

  const isPostDetailPage = location.pathname.startsWith(`/post/${post._id}`);

  const handleChangeInput = (event) => {
    const { name, value } = event.target;
    if (name === 'ventalocation') {
      setTipoTransaccion(value);
    }
  };

  

  return (
    <div className="card">
      <CardHeader post={post} />
      <CardBody post={post} theme={theme} />

      <div>
        <select
          name="ventalocation"
          value={tipoTransaccion}
          onChange={handleChangeInput}
          style={{ visibility: 'hidden', height: 0, overflow: 'hidden' }}
        >
          {/* Opciones del select */}
        </select>
      </div>

     
   
      {isPostDetailPage && post.tipo === 'sala' && (
        <CardInfosala post={post} />
      )}

{isPostDetailPage && <InfoVendidor post={post} />}

      {isPostDetailPage && post.privacidad_informations !== 'autoriser-les-informations' && (
        <div className="card-body text-danger mt-3 mb-3" style={{ border: '1px solid #ff0000', padding: '10px', marginBottom: '10px' }}>
          <FaExclamationTriangle style={{ marginRight: '15px', color: 'yellow' }} />
          <p style={{ display: 'inline' }}> {t('La información de contacto no esta autorizada por el proprietarios del articulo.', { lng: languagee.language })} </p>
        </div>
      )}

      {isPostDetailPage && post.privacidad_commentarios !== 'autoriser-les-commentaires' && (
        <div className="card-body text-danger mt-3 mb-3 " style={{ border: '1px solid #ff0000', padding: '10px', marginBottom: '10px' }}>
          <FaExclamationTriangle style={{ marginRight: '15px', color: 'yellow' }} />
          <p style={{ display: 'inline' }}> {t('Los comentarios no están autorizados por el propietario del post.', { lng: languagee.language })}</p>
        </div>
      )}

      {isPostDetailPage && post.privacidad_informations === 'autoriser-les-informations' && (
        <>
         



        </>
      )}

      {isPostDetailPage && post.privacidad_commentarios === 'autoriser-les-commentaires' && (
        <>
          <CardFooter post={post} />
          <Comments post={post} />
          <InputComment post={post} />
        </>
      )}
    </div>
  );
};

export default PostCard;

