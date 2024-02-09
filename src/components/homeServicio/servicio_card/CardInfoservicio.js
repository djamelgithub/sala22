
import FollowBtn from '../../FollowBtn';


import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next'
 
 

const CardInfoservicio = ({ servicio}) => {

  const { languagee } = useSelector(state => state)
  const { t } = useTranslation();
  
  const { user } = useSelector(state => state.auth);
 


  return (
    <div>
      <div className="container mt-2 mb-2 ">
        <div className="row">

          <div className="col-12">



            <article className="card car-details label-info new">
             
                <div className="d-flex flex-md-row align-items-md-start align-items-center flex-column">
                  
                  <div className="w-100 ">

                    <div className='card-title mb-2 ml-2 mt-2' style={{ textAlign: languagee.language === 'ar' ? 'right' : 'left' }} >
                      <div className>
                        <h3 style={{ color: '#007bff' }}  >  En {servicio.content}   </h3>
                      </div>

                      <div className="  flex-md-row flex-column" style={{ textAlign: languagee.language === 'ar' ? 'right' : 'left' }}>
                        <h3 className="mr-3" style={{ color: '#ff9900' }}>{servicio.content} {servicio.descripcion}</h3>
                      </div>
                    </div>


                    <div style={{ textAlign: languagee.language === 'ar' ? 'right' : 'left' }}>
                      <p className='ml-2 mr4 text-danger' style={{ borderBottom: '2px solid #007bff', paddingBottom: '5px', margin: '20px 0', color: '#007bff', fontSize: '1.25rem', fontFamily: 'Arial, sans-serif', fontWeight: 'bold' }}>
                        {t("Description de l'annonce", { lng: languagee.language })}
                      </p>

                    </div>






                    <hr />
                    <div className="container-fluid">
                      <div className="row">
                        <div className="col-md-4 col-12">
                          <ul>
                            <li><i className="fas fa-calendar-alt" style={{ color: '#ff9900' }} /> <strong>Publié le</strong> {new Date(servicio.createdAt).toLocaleDateString()} à {new Date(servicio.createdAt).toLocaleTimeString()}</li>
                            <li><i className="fas fa-eye" style={{ color: '#33cc33' }} /> <strong>Vistas</strong>   </li>
                            <li><i className=" " style={{ color: '#33cc33' }} /> <strong>wilaya</strong>  {servicio.wilaya}</li>
                            <li><i className="fas fa-thumbs-up" style={{ color: '#ff0000' }} /> <strong>Likes</strong> {servicio.likes.length}</li>
 
                            <li><i className="fas fa-calendar" style={{ color: '#ff9900' }} /> <strong>Année</strong> {servicio.content}</li>

 
                          </ul>
                        </div>
                        <div className="col-md-4 col-12">
                          <ul>
                            

      
                                <li><i className="fas fa-money-bill" style={{ color: '#ff9900' }} /> <strong>Prix</strong> {servicio.precioservicio} {servicio.dinero} {servicio.negociable}</li>
                                <li><i className="fas fa-money-bill" style={{ color: '#ff9900' }} /> <strong>opcions servcice</strong> {servicio.opcionesservicio}  </li>


                          </ul>
                        </div>
                       
                        <div className="card col-12 mb-4 ">
                          <h5 className="card-title text-danger mt-2 "> {t("Description", { lng: languagee.language })}</h5>
                          <div className="card-text" style={{ backgroundColor: '#f5f5f5', padding: '10px', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                            {servicio.discripcion}
                          </div>

                        </div>



                         
                      </div>
                    </div>
                  </div>
                </div>
               
            </article>
          </div>
        </div>
      </div>


    </div>
  )
}

export default CardInfoservicio