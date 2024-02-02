
import FollowBtn from '../../FollowBtn';


import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next'

 

const CardInfosala = ({ post }) => {

  const { languagee } = useSelector(state => state)
  const { t } = useTranslation();
  const { specifications } = post;
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
                        <h3 style={{ color: '#007bff' }}  >  En {post.content}   </h3>
                      </div>

                      <div className="  flex-md-row flex-column" style={{ textAlign: languagee.language === 'ar' ? 'right' : 'left' }}>
                        <h3 className="mr-3" style={{ color: '#ff9900' }}>{post.content} {post.descripcion}</h3>
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
                            <li><i className="fas fa-calendar-alt" style={{ color: '#ff9900' }} /> <strong>Publié le</strong> {new Date(post.createdAt).toLocaleDateString()} à {new Date(post.createdAt).toLocaleTimeString()}</li>

                            <li><i className="fas fa-eye" style={{ color: '#33cc33' }} /> <strong>Vues</strong>  {post.vistas}</li>
                            <li><i className="fas fa-thumbs-up" style={{ color: '#ff0000' }} /> <strong>Likes</strong> {post.likes.length}</li>
 
                            <li><i className="fas fa-calendar" style={{ color: '#ff9900' }} /> <strong>Année</strong> {post.content}</li>

 
                          </ul>
                        </div>
                        <div className="col-md-4 col-12">
                          <ul>
                            

                            <li><i className="fas fa-bolt" style={{ color: '#ff9900' }} /> <strong>Énergie</strong> {post.wilata}</li>
                            <li><i className="fas fa-cogs" style={{ color: '#ff9900' }} /> <strong>Moteur</strong> {post.commune}</li>

                                <li><i className="fas fa-money-bill" style={{ color: '#ff9900' }} /> <strong>Prix</strong> {post.price} {post.dinero} {post.negociable}</li>


                          </ul>
                        </div>
                        <div className="col-md-4 col-12">
                          <ul style={{ listStyleType: 'none', padding: '0' }}>
                            <div className="card-title    " style={{ textAlign: languagee.language === 'ar' ? 'right' : 'left' }}>
                              <h5 className='text-danger' style={{ marginBottom: '10px' }}>  {t("Options de voiture", { lng: languagee.language })}</h5>
                              <ul style={{ listStyle: 'disc', marginLeft: '20px' }}>
                                {specifications.map((specValue, index) => (
                                  <li key={index} style={{ marginBottom: '10px' }}>{specValue}</li>
                                ))}
                              </ul>
                            </div>
                          </ul>
                        </div>
                        <div className="card col-12 mb-4 ">
                          <h5 className="card-title text-danger mt-2 "> {t("Description", { lng: languagee.language })}</h5>
                          <div className="card-text" style={{ backgroundColor: '#f5f5f5', padding: '10px', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                            {post.discripcion}
                          </div>

                        </div>



                        <div className="col-12">
                          <div className="d-flex flex-md-row flex-column align-items-center justify-content-end">
                            <button className="btn btn-success w-100 mb-md-0 mb-3 mt-3  mr-md-3 mr-0"><i className="fas fa-phone" /> {t("llamar al contacto", { lng: languagee.language })}</button>
                            <span className="  w-100  ">   <FollowBtn user={user} />          </span>
                            <button className="btn btn-default w-100"><i className="fas fa-comment" />  {t("Comments", { lng: languagee.language })} <strong className='text-danger'> {post.comments.length} </strong></button>
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

export default CardInfosala