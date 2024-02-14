
import { Form } from 'react-bootstrap';
import Wilayacommune from '../../components/searching/Wilayacommune';


import Ventaprecioautomobile from '../../components/ranges/Ventaprecioautomobile';
import Marcamodelo from '../../components/searching/Marcamodelo';
import { Link } from 'react-router-dom';
 

import { useTranslation } from 'react-i18next'


import React, { useEffect, useState } from 'react';

import { getDataAPI } from '../../utils/fetchData';


import { getPosts } from '../../redux/actions/postAction';

import { getServicios, SERVICIO_TYPES } from '../../redux/actions/servicioAction';
import { POST_TYPES } from '../../redux/actions/postAction';
 
import { useSelector, useDispatch } from 'react-redux';
 
import Posts from '../../components/homePost/Posts';
import Servicios from '../../components/homeServicio/Servicios';
 
import Ventaprecioservicio from '../../components/ranges/Ventaprecioservicio';





let scroll = 0;
const Searchhomee = () => {



    const { homePostsReducer, auth, homeServiciosReducer } = useSelector((state) => state);
 
    const dispatch = useDispatch()

    const { t } = useTranslation();
    const [, setSearchResults] = useState([]);
    const [, setTotalResults] = useState(0);

    const [optionservicio, setOptionservicio] = useState('');
    const [tipoTransaccion, setTipoTransaccion] = useState('');
    const [showSearchFields, setShowSearchFields] = useState(false);
    const [ventaValue, setVentalocation] = useState('');
    const [wilayaValue, setWilayaValue] = useState('');
    const [communeValue, setCommuneValue] = useState('');
    const [marcaValue, setMarcaValue] = useState('');
    const [modeloValue, setModeloValue] = useState('');

    const [pricesala, setpricesala] = useState([5, 300]);
    const [priceservicio, setpriceservicio] = useState([500, 1000000]);




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







    const VentaPrecioservicioo = (value) => {
        setpriceservicio(value);
    };

    const VentaPrecioAutomobileee = (value) => {
        setpricesala(value);
    };


    const handleSelectChange = (value) => {
        setOptionservicio(value);
    };

    const handleReset = () => {
        setVentalocation('');
        setTipoTransaccion('');

        setWilayaValue('');
        setCommuneValue('');
        setMarcaValue('');
        setModeloValue('');
        setpricesala([5, 300]);;
        setpriceservicio([500, 1000000]);;

        setOptionservicio('')

        setpriceservicio([500, 1000000]);

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

                if (pricesala[0] !== 5 || pricesala[1] !== 300) {
                    url += `&minpriciosala=${pricesala[0]}&maxpriciosala=${pricesala[1]}`;
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

                if (priceservicio[0] !== 500 || priceservicio[1] !== 1000000) {
                    url += `&minpriceservicio=${priceservicio[0]}&maxpriceservicio=${priceservicio[1]}`;
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
                if (optionservicio) {
                    url += `&optionservicio=${optionservicio}`;
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






    return (


        <div>







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
                                            value={optionservicio}>
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
                            <div className="sidebar-search">
      {/* Usar el componente Link para envolver el botón */}
      <Link to="/pages/searchhomee">
        <button type="button" onClick={handleBuscar} className="btn btn-primary">
          Filtrar
        </button>
      </Link>
    </div>



                                <button type="button" onClick={handleReset} className="btn btn-secondary mr-2">
                                    <i className="fas fa-redo" style={{ cursor: 'pointer' }} />
                                </button>
                            </div>
                        </div>
                    )}
                </div>



            </form>










            
        </div>




    )
}

export default Searchhomee
