
import { Link, useLocation } from 'react-router-dom';
import CarouselServicio from '../../Carouselss/CarouselServicio';
import { IoCarOutline } from 'react-icons/io5';
import { useTranslation } from 'react-i18next'
import { useSelector  } from 'react-redux'
 
const CardBody = ({ servicio }) => {
  const {   languagee } = useSelector(state => state)
 
  const { t } = useTranslation();

 
  const location = useLocation();
  const isDetailPage = location.pathname.includes('/servicio/');

  return (
    <>
      {servicio.images.length > 0 && <CarouselServicio images={servicio.images} id={servicio._id} />}

      {!isDetailPage && (
        <>
          <div style={{ textAlign: languagee.language === 'ar' ? 'right' : 'left' }}>
            <h2 className='mb-2 mr-2' style={{ fontSize: '20px', margin: '0', color: '#007bff' }}>
              {t(servicio.ventalocation, { lng: languagee.language })}
            </h2>
          </div>






          <div style={{ display: 'flex', alignItems: 'center' }}>
            <IoCarOutline style={{ fontSize: '24px', marginRight: '10px', color: '#007bff' }} />
            <h4 style={{ fontSize: '18px', margin: '0' }}>
              <span style={{ color: '#333' }}>  {servicio.marca}  </span> :     <span style={{ color: '#ff5722' }}> {servicio.modelo}</span> &nbsp; <span style={{ color: '#888' }}>{servicio.wilaya}</span>
            </h4>
          </div>

          <div className="card-body row">
  <div className="col-md-6 d-flex align-items-center justify-content-between">
  <div style={{ textAlign: 'left' }}>
  <span style={{ color: 'blue' }}>Publié le: </span>
  <span style={{ color: 'red' }}>{new Date(servicio.createdAt).toLocaleDateString()}</span>
</div>


    <div className="d-flex align-items-center details-item">
      <i className="far fa-heart text-danger mr-2" style={{ fontSize: '1.2rem' }}></i>
      <span className="details-count" style={{ fontSize: '1rem', fontWeight: 'bold' }}>
        {servicio.likes.length}
      </span>
    </div>
  </div>
</div>



          <div className="ml-2 my-2">
            <button className="btn btn-primary form-control px-3"  >
              <Link to={`/servicio/${servicio._id}`} className="text-white">
                {t('Voir les détails', { lng: languagee.language })}
              </Link>
            </button>
          </div>




        </>
      )}
    </>
  );
};

export default CardBody;
 