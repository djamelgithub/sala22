import React, { useEffect } from 'react';

 
import LoadIcon from '../images/loading.gif';

import { useSelector } from 'react-redux';
 
import Servicios from '../components/homeServicio/Servicios';

let scroll = 0;

const Cervicios = () => {
  const { auth, homeServiciosReducer } = useSelector((state) => state);
 

  window.addEventListener('scroll', () => {
    if (window.location.pathname === '/') {
      scroll = window.pageYOffset
      return scroll;
    }
  })

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({ top: scroll, behavior: 'smooth' })
    }, 100)
  }, [])



 
 






  return (
    <div>



















   

 


        <div className='home' >



          {
            homeServiciosReducer.loading
              ? <img src={LoadIcon} alt="loading" className="d-block mx-auto" />
              : (homeServiciosReducer.result === 0 && homeServiciosReducer.servicios.length === 0)
                ? <h2 className="text-center my-4">Pas d'article Cervices</h2>
                : <Servicios />
          }

        </div>








      </div>

  
  )
}

export default Cervicios
