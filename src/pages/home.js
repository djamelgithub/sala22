
import { Form } from 'react-bootstrap';
import Wilayacommune from '../components/searching/Wilayacommune';


import Ventaprecioautomobile from '../components/ranges/Ventaprecioautomobile';
import Marcamodelo from '../components/searching/Marcamodelo';


import jQuery from 'jquery'

import { useTranslation } from 'react-i18next'


import React, { useEffect, useState } from 'react';

import { getDataAPI } from '../utils/fetchData';


import { getPosts } from '../redux/actions/postAction';

import { getServicios, SERVICIO_TYPES } from '../redux/actions/servicioAction';
import { POST_TYPES } from '../redux/actions/postAction';
import LoadIcon from '../images/loading.gif'
import { useSelector, useDispatch } from 'react-redux';


import { Link } from 'react-router-dom';
import { logout } from '../redux/actions/authAction';
import Posts from '../components/homePost/Posts';
import Servicios from '../components/homeServicio/Servicios';
import Avatar from '../components/Avatar';
import Ventaprecioservicio from '../components/ranges/Ventaprecioservicio';





let scroll = 0;
const Home = () => {

  const { homePostsReducer, auth, homeServiciosReducer, notify } = useSelector((state) => state);
  const isAuthenticated = !!auth.token;
  const dispatch = useDispatch()

  const { t } = useTranslation();
  const [, setSearchResults] = useState([]);
  const [, setTotalResults] = useState(0);
  const [optionservicios, setOptionservicios] = useState('');
  const [tipoTransaccion, setTipoTransaccion] = useState('');
  const [showSearchFields, setShowSearchFields] = useState(false);
  const [ventaValue, setVentalocation] = useState('');
  const [wilayaValue, setWilayaValue] = useState('');
  const [communeValue, setCommuneValue] = useState('');
  const [marcaValue, setMarcaValue] = useState('');
  const [modeloValue, setModeloValue] = useState('');

  const [price, setprice] = useState([500, 1000000]);

  const [precioservicio, setPrecioservicio] = useState([5, 300]);
 
 


  useEffect(() => {
    jQuery(function ($) {

      $(".sidebar-dropdown > a").click(function () {
        $(".sidebar-submenu").slideUp(200);
        if (
          $(this)
            .parent()
            .hasClass("active")
        ) {
          $(".sidebar-dropdown").removeClass("active");
          $(this)
            .parent()
            .removeClass("active");
        } else {
          $(".sidebar-dropdown").removeClass("active");
          $(this)
            .next(".sidebar-submenu")
            .slideDown(200);
          $(this)
            .parent()
            .addClass("active");
        }
      });

      $("#close-sidebar").click(function () {
        $(".page-wrapper").removeClass("toggled");
      });
      $("#show-sidebar").click(function () {
        $(".page-wrapper").addClass("toggled");
      });

    });
  }, [])

  const VentaPrecioAutomobileee = (value) => {
    setprice(value);
  };

  const VentaPrecioservicioo = (value) => {
    setPrecioservicio(value);
  };
  const handleSelectChange = (value) => {
    setOptionservicios(value);
  };

  const handleReset = () => {
    setVentalocation('');
    setTipoTransaccion('');

    setWilayaValue('');
    setCommuneValue('');
    setMarcaValue('');
    setModeloValue('');
    setprice([5, 300]);;
setOptionservicios('')

    setPrecioservicio([500, 1000000]);

    dispatch(getPosts());
    dispatch(getServicios());
  };

  const handleBuscar = async () => {
    try {
      let url = '';

      if (tipoTransaccion === 'sala') {
        url = `/posts?limit=${homePostsReducer.page * 9}`;


        if (tipoTransaccion) {
          url += `&salaservicio=${tipoTransaccion}`;
        }
        if (ventaValue) {
          url += `&venta=${ventaValue}`;
        }

        if (price[0] !== 5 || price[1] !== 300) {
          url += `&minpriciosala=${price[0]}&maxpriciosala=${price[1]}`;
        }

        if (wilayaValue) {
          url += `&wilaya=${wilayaValue}`;
        }

        if (communeValue) {
          url += `&commune=${communeValue}`;
        }

        if (marcaValue) {
          url += `&marca=${marcaValue}`;
        }




      } else if (tipoTransaccion === 'servicio') {
        

        url = `/servicios?limit=${homeServiciosReducer.page * 9}`;

        if (tipoTransaccion) {
          url += `&salaservicio=${tipoTransaccion}`;
        }
        if (ventaValue) {
          url += `&venta=${ventaValue}`;
        }

        if (precioservicio[0] !== 500 || precioservicio[1] !== 1000000) {
          url += `&minprecioservicio=${precioservicio[0]}&maxprecioservicio=${precioservicio[1]}`;
        }

        if (wilayaValue) {
          url += `&wilaya=${wilayaValue}`;
        }

        if (communeValue) {
          url += `&commune=${communeValue}`;
        }

        if (marcaValue) {
          url += `&marca=${marcaValue}`;
        }
        if (optionservicios) {
          url += `&optionservicios=${optionservicios}`;
        }

      } else {
        // Tipo de transacción no especificado, manejar según tu lógica
        console.error('Tipo de transacción no especificado');
        return;
      }

      // Resto del código de construcción de la URL...

      const response = await getDataAPI(url);

      // Verifica si response está definido antes de acceder a sus propiedades
      if (response?.data) {
        setSearchResults(tipoTransaccion === 'sala' ? response.data.posts : response.data.servicios);
        setTotalResults(response.data.result);

        dispatch({
          type: POST_TYPES.GET_POSTS,
          payload: { ...response.data, page: homePostsReducer.page + 1 },
        });

        dispatch({
          type: SERVICIO_TYPES.GET_SERVICIOS,
          payload: { ...response.data, page: homeServiciosReducer.page + 1 },
        });
      } else {
        // No hay datos en la respuesta
        setSearchResults([]);
        setTotalResults(0);
      }
    } catch (error) {
      console.error('Error en handleBuscar:', error);
    }
  }



  const avatarSrc = auth?.user?.avatar;
  const handleSidebarToggle = () => {
    // Lógica para mostrar/ocultar la barra lateral, si es necesario
  };


  return (

    <div>
      <div className="page-wrapper chiller-theme toggled">
      <button id="show-sidebar" className="btn btn-sm btn-dark"  >
        <i className="fas fa-bars" />
      </button>
      <nav id="sidebar" className="sidebar-wrapper">
          <div className="sidebar-content">
            <div className="sidebar-brand">
              {auth.user && auth.user.role === 'admin' ?
                <>
                  <Link className="dropdown-item" to='/pages/administracion/index'>

                    <i className="fa fa-user" style={{ color: 'green' }} />
                    <span style={{ marginLeft: '8px' }}>Administration</span>

                  </Link>
                  <div className="sidebar-brand">
                    <div id="close-sidebar">
                      <i className="fas fa-times" />
                    </div>
                  </div>
                </>
                :
                <>
                  <Link className="dropdown-item" to='/'>

                    <span>Tassili Home</span>
                  </Link>
                </>
              }



              <button id="show-sidebar" className="btn btn-sm btn-dark"  >
                <i className="fas fa-bars" />
              </button>
            </div>
            <div className="sidebar-header">
              <div className="user-pic">
                <div className="user-pic" style={{ marginRight: '10px' }}>
                  {avatarSrc && <Avatar src={avatarSrc} className="img-responsive img-rounded" />}
                </div>
              </div>

              <div className="user-info">
                {auth.user && auth.user.username &&
                  <span className="user-name">
                    <strong className="user-name">{auth.user.username}</strong>
                  </span>
                }

                <span className="user-name">
                  {auth.user && auth.user.role &&
                    <span>role: {auth.user.role}</span>
                  }
                </span>

                <span className="user-status">
                  <i className="fa fa-circle" />
                  <span>Online</span>
                </span>
              </div>
            </div>




            <form>
              <div>




                <div className="sidebar-search">
                  <div>
                    <div className="input-group">
                      <input type="text" className="form-control search-menu" onClick={() => setShowSearchFields(!showSearchFields)} placeholder="Search..." />
                      <div className="input-group-append">
                        <span className="input-group-text">
                          <i className="fa fa-search" aria-hidden="true"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>




                {showSearchFields && (
                  <div className='card mx-2'>
                    <div className='form-group'>
                      <select
                        value={tipoTransaccion}
                        onChange={(e) => setTipoTransaccion(e.target.value)}
                        className="form-control mx-2 mb-2 mt-2"
                      >
                        <option value="">Option </option>
                        <option value="sala">Salle des fêtes </option>
                        <option value="servicio"> Prestations de service </option>
                      </select>
                    </div>



                    {tipoTransaccion === 'sala' && (

                      <div>
                        <div className="search-container   mb-2 mt-2">
                          <Wilayacommune
                            selectedWilaya={wilayaValue}
                            setSelectedWilaya={setWilayaValue}
                            selectedCommune={communeValue}
                            setSelectedCommune={setCommuneValue} />
                        </div>


                        <div className='card-body mb-2'>


                          <div className="search-container   mb-2 mt-2">
                            <Ventaprecioautomobile
                              VentaPrecioAutomobileee={VentaPrecioAutomobileee}
                            />
                          </div>


                        </div>




                      </div>
                    )}





                    {tipoTransaccion === 'servicio' && (

                      <div>
                        <div className="search-container   mb-2 mt-2">
                          <Wilayacommune
                            selectedWilaya={wilayaValue}
                            setSelectedWilaya={setWilayaValue}
                            selectedCommune={communeValue}
                            setSelectedCommune={setCommuneValue} />
                        </div>
                        <div>

                          <Form.Select aria-label="Default select example" onChange={handleSelectChange}
                            value={optionservicios}>
                            <option value="">Selecciona un servicio</option>
                            <option value="planificacionevnevenements">Services de Planification de événements</option>
                            <option value="organisasionmariage">Organisations de mariage</option>
                            <option value="mobilierequipement">Location de Mobilier et Équipement</option>
                            <option value="decorationallefetes">Décoration Des Salles Des Fêtes</option>
                            <option value="espaceenements">Espace pour les événements</option>
                            <option value="cateringbanquet">Catering et Banquet</option>
                            <option value="locationvoiture">Transport de Luxe / Location de voiture de mariage</option>
                            <option value="audiovisueLumieres">Location de matériel audiovisuel et Lumières</option>
                            <option value="musiciendirect">Musiciens et Groupes en Direct</option>
                            <option value="robescostumes">Location de robes de mariée et de costumes</option>
                            <option value="maquillagecoiffure">Service de maquillage et coiffure</option>
                            <option value="navetteinvites">Service de navette pour les invités</option>
                            <option value="photographievideographie">Photographie et Vidéographie</option>
                            <option value="traiteurestauration">Service de Traiteur et Restauration</option>
                            <option value="gateaumariage">Gâteau de mariage</option>
                            <option value="fleurdecoration">Services de Fleurs et Décoration</option>
                            <option value="enfants">Service de garde d'enfants</option>
                            <option value="nettoyage">Services de Nettoyage</option>
                            <option value="securite">Service de sécurité</option>
                            <option value="feuxartifice">Feux d'artifice</option>
                          </Form.Select>
                        </div>
                        <div className="search-container   mb-2 mt-2">
                          <Marcamodelo
                            selectedMarca={marcaValue}
                            setSelectedMarca={setMarcaValue}
                            selectedModelo={modeloValue}
                            setSelectedModelo={setModeloValue}
                          />
                        </div>



                        <div>

                          <Ventaprecioservicio VentaPrecioservicioo={VentaPrecioservicioo} />
                        </div>






                      </div>
                    )}




                    <div className="search-container card-body   mb-2 mt-2" style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <button type="button" onClick={handleBuscar} className="btn btn-primary" >
                        Filtre

                      </button>



                      <button type="button" onClick={handleReset} className="btn btn-secondary mr-2">
                        <i className="fas fa-redo" style={{ cursor: 'pointer' }} />
                      </button>
                    </div>
                  </div>
                )}
              </div>



            </form>


            <div className="sidebar-menu">


              <ul className="list-group">

                {isAuthenticated ? (
                  <>
                    <li className="header-menu" style={{ color: 'red' }}>
                      <span>Mon compte</span>
                    </li>



                    <li>
                      <Link className="dropdown-item" to="/pages/categoriaslista/cervices">
                        <i className="fa fa-plus-circle" />
                        <span>Ajouter Annonce</span>
                      </Link>
                    </li>


                    <li>
                      <Link className="dropdown-item" to="/pages/notificacionesusuario">
                        <i className="fa fa-plus-circle" />
                        <span>Notifications</span>
                        <span className="badge badge-pill badge-danger">{notify.data.length}</span>
                      </Link>
                    </li>

                    <li>
                      <Link className="dropdown-item" to="/pages/categoriaslista/cervices">
                        <i className="fa fa-plus-circle" />
                        <span>Contacte l'administratio</span>
                      </Link>
                    </li>

                    <li>
                      <Link className="dropdown-item" to={`/profile/${auth.user._id}`}>
                        <i className="fa fa-user" />
                        <span>Profil</span>
                      </Link>
                    </li>


                    <li   >
                      <Link
                        className="dropdown-item"
                        to="/"
                        onClick={() => dispatch(logout())}
                      >
                        <i className="fa fa-sign-out-alt" />
                        Se déconnecter
                      </Link>
                    </li>
                    <li className="header-menu">
                      <span>Catégories</span>
                    </li>


                    <li>
                      <Link className="dropdown-item" to="/salasfiestas">
                        <i className="far fa-gem"></i>
                        <span>Salle des fete</span>
                      </Link>
                    </li>

                    <li>
                      <Link className="dropdown-item" to="/cervicios">
                        <i className="far fa-gem"></i>
                        <span>Services</span>
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="#">
                        <i className="far fa-gem"></i>
                        <span>Téléphone</span>
                      </Link>
                    </li>

                    <li>
                      <Link className="dropdown-item" to="#">
                        <i className="far fa-gem"></i>
                        <span>Immobilier</span>
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="header-menu">
                      <span>Usuario No Autenticado</span>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/login">
                        <i className="fa fa-sign-in-alt" />
                        <span>Se connecter</span>
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/register">
                        <i className="fa fa-user-plus" />
                        <span>S'inscrire</span>
                      </Link>
                    </li>

                    <li className="header-menu">
                      <span>Catégories</span>
                    </li>

                    <li>
                      <Link className="dropdown-item" to="/salasfiestas">
                        <i className="far fa-gem"></i>
                        <span>Salle des fete</span>
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/cervicios">
                        <i className="far fa-gem"></i>
                        <span>Services</span>
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="#">
                        <i className="far fa-gem"></i>
                        <span>Téléphone</span>
                      </Link>
                    </li>

                    <li>
                      <Link className="dropdown-item" to="#">
                        <i className="far fa-gem"></i>
                        <span>Immobilier</span>
                      </Link>
                    </li>


                  </>
                )}

              </ul>
            </div>
          </div>
        </nav >


        <div>
          <div className="page-wrapper chiller-theme toggled">
            <button id="show-sidebar" className="btn btn-sm btn-dark"  >
              <i className="fas fa-bars" />
            </button>

            <main>

              <div className='home'>
                {homePostsReducer.result === 0 && (!homePostsReducer.posts?.length || homePostsReducer.posts.length === 0) ? (
                  <h2 className="text-center">Aucun résultat trouvé pour cette recherche</h2>
                ) : (
                  <Posts />
                )}
              </div>

 
              <hr></hr>
              <hr></hr>
              <div className='home' >
                {homeServiciosReducer.result === 0 && (!homeServiciosReducer.servicios?.length || homeServiciosReducer.servicios.length === 0) ? (
                  <h2 className="text-center">Aucun résultat trouvé pour cette recherche</h2>
                ) : (
                  <Servicios />
                )}
              </div>
            </main>
          </div>
        </div>



      </div >

    </div >
  )
}

export default Home

