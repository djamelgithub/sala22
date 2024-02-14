import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Link } from 'react-router-dom';
import jQuery from 'jquery';
import Posts from '../components/homePost/Posts';
import Servicios from '../components/homeServicio/Servicios';


import { logout } from '../redux/actions/authAction';
import Searchhomee from './administracion/searchhomee';
import Statussearch from '../components/Statussearch';

let scroll = 0;
const Home = () => {
    const { homePostsReducer, auth, homeServiciosReducer, notify } = useSelector((state) => state);

    const dispatch = useDispatch()


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




    const userLink = () => {
        return (
            <div className="page-wrapper chiller-theme toggled">
                <a id="show-sidebar" className="btn btn-sm btn-dark" href="#">
                    <i className="fas fa-bars" />
                </a>
                <nav id="sidebar" className="sidebar-wrapper">
                    <div className="sidebar-content">
                        <div className="sidebar-brand">
                            <a href="#">pro sidebar</a>
                            <div id="close-sidebar">
                                <i className="fas fa-times" />
                            </div>
                        </div>
                        <div className="sidebar-header">
                            <div className="user-pic">
                                <img className="img-responsive img-rounded" src="https://raw.githubusercontent.com/azouaoui-med/pro-sidebar-template/gh-pages/src/img/user.jpg" alt="User picture" />
                            </div>
                            <div className="user-info">
                                <span className="user-name">Jhon
                                    <strong>Smith</strong>
                                </span>
                                <span className="user-role">Administrator</span>
                                <span className="user-status">
                                    <i className="fa fa-circle" />
                                    <span>Online</span>
                                </span>
                            </div>
                        </div>

                        <div className="sidebar-search">
                            <div>
                                <div className="input-group">
                                    <input type="text" className="form-control search-menu" placeholder="Search..." />
                                    <div className="input-group-append">
                                        <span className="input-group-text">
                                            <i className="fa fa-search" aria-hidden="true" />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="sidebar-menu">
                            <ul>

                                <div className="sidebar-menu">
                                    <ul>
                                        <li className="header-menu">
                                            <span>Mon compte</span>
                                        </li>
                                        <li className="sidebar-dropdown">
                                            <Link className="dropdown-item" to="/login">
                                                <i className="fa fa-sign-in-alt" />
                                                <span>Se connecter</span>
                                            </Link>
                                        </li>
                                        <li className="sidebar-dropdown">
                                            <Link className="dropdown-item" to="/register">
                                                <i className="fa fa-user-plus" />
                                                <span>S'inscrire</span>
                                            </Link>
                                        </li>
                                        <li className="header-menu">
                                            <span>Catégories</span>
                                        </li>
                                        <li className="sidebar-dropdown">
                                            <Link className="dropdown-item" to="/salasfiestas">
                                                <i className="fas fa-gem"></i>
                                                <span>Salle des fêtes</span>
                                            </Link>
                                        </li>
                                        <li className="sidebar-dropdown">
                                            <Link className="dropdown-item" to="/cervicios">
                                                <i className="fas fa-tools"></i>
                                                <span>Services</span>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>





                            </ul>
                        </div>

                    </div>
                </nav>
            </div>

        )

    }

    const userauthLink = () => {
        return (
            <div className="page-wrapper chiller-theme toggled">
                <a id="show-sidebar" className="btn btn-sm btn-dark" href="#">
                    <i className="fas fa-bars" />
                </a>
                <nav id="sidebar" className="sidebar-wrapper">
                    <div className="sidebar-content">
                        <div className="sidebar-brand">
                            <a href="#">pro sidebar</a>
                            <div id="close-sidebar">
                                <i className="fas fa-times" />
                            </div>
                        </div>
                        <div className="sidebar-header">
                            <div className="user-pic">
                                <img className="img-responsive img-rounded" src="https://raw.githubusercontent.com/azouaoui-med/pro-sidebar-template/gh-pages/src/img/user.jpg" alt="User picture" />
                            </div>
                            <div className="user-info">
                                <span className="user-name">Jhon
                                    <strong>Smith</strong>
                                </span>
                                <span className="user-role">Administrator</span>
                                <span className="user-status">
                                    <i className="fa fa-circle" />
                                    <span>Online</span>
                                </span>
                            </div>
                        </div>
                        
                     
                                    <Statussearch/>
                            



                        <div className="sidebar-menu">
                            <ul>
                                <li className="header-menu">
                                    <span>Mon compte</span>
                                </li>
                                <li className="sidebar-dropdown">
                                    <Link className="dropdown-item" to="/pages/categoriaslista/cervices">
                                        <i className="fas fa-plus-circle"></i>
                                        <span>Ajouter Annonce</span>
                                    </Link>
                                </li>
                                <li className="sidebar-dropdown">
                                    <Link className="dropdown-item" to="/pages/notificacionesusuario">
                                        <i className="fas fa-bell"></i>
                                        <span>Notifications</span>
                                        <span className="badge badge-pill badge-danger">{notify.data.length}</span>
                                    </Link>
                                </li>
                                <li className="sidebar-dropdown">
                                    <Link className="dropdown-item" to={`/profile/${auth.user._id}`}>
                                        <i className="fas fa-user"></i>
                                        <span>Profil</span>
                                    </Link>
                                </li>
                                <li className="sidebar-dropdown">
                                    <Link
                                        className="dropdown-item"
                                        to="/"
                                        onClick={() => dispatch(logout())}
                                    >
                                        <i className="fas fa-sign-out-alt"></i>
                                        Se déconnecter
                                    </Link>
                                </li>
                                <li className="header-menu">
                                    <span>Catégories</span>
                                </li>
                                <li className="sidebar-dropdown">
                                    <Link className="dropdown-item" to="/salasfiestas">
                                        <i className="fas fa-gem"></i>
                                        <span>Salle des fêtes</span>
                                    </Link>
                                </li>
                                <li className="sidebar-dropdown">
                                    <Link className="dropdown-item" to="/cervicios">
                                        <i className="fas fa-tools"></i>
                                        <span>Services</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>


                    </div>
                </nav>

                <div>
                    <div className="page-wrapper chiller-theme toggled">
                        <button id="show-sidebar" className="btn btn-sm btn-dark"  >
                            <i className="fas fa-bars" />
                        </button>

                        <div>




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
                        </div>


                    </div>
                </div>






            </div>
        )
    }

    const adminauthLink = () => {
        return (
            <div className="page-wrapper chiller-theme toggled">
                <a id="show-sidebar" className="btn btn-sm btn-dark" href="#">
                    <i className="fas fa-bars" />
                </a>
                <nav id="sidebar" className="sidebar-wrapper">
                    <div className="sidebar-content">
                        <div className="sidebar-brand">
                            <a href="#">pro sidebar</a>
                            <div id="close-sidebar">
                                <i className="fas fa-times" />
                            </div>
                        </div>
                        <div className="sidebar-header">
                            <div className="user-pic">
                                <img className="img-responsive img-rounded" src="https://raw.githubusercontent.com/azouaoui-med/pro-sidebar-template/gh-pages/src/img/user.jpg" alt="User picture" />
                            </div>
                            <div className="user-info">
                                <span className="user-name">Jhon
                                    <strong>Smith</strong>
                                </span>
                                <span className="user-role">Administrator</span>
                                <span className="user-status">
                                    <i className="fa fa-circle" />
                                    <span>Online</span>
                                </span>
                            </div>
                        </div>
                        {/* sidebar-header  */}
                        <div className="sidebar-search">
                            <div>
                                <div className="input-group">
                                    <input type="text" className="form-control search-menu" placeholder="Search..." />
                                    <div className="input-group-append">
                                        <span className="input-group-text">
                                            <i className="fa fa-search" aria-hidden="true" />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="sidebar-menu">
                            <ul>
                                <li className="header-menu">
                                    <span>Administrations</span>
                                </li>
                                <li className="sidebar-dropdown">
                                    <Link className="dropdown-item" to="/pages/administracion/postspendientes">
                                        <i className="fa fa-plus-circle" />
                                        <span>Aprouve salle fetes</span>
                                    </Link>
                                </li>
                                <li className="sidebar-dropdown">
                                    <Link className="dropdown-item" to="/pages/administracion/serviciospendientes">
                                        <i className="fa fa-plus-circle" />
                                        <span>Aprouve services</span>
                                    </Link>
                                </li>
                                <li className="sidebar-dropdown">
                                    <Link className="dropdown-item" to="/pages/users/usersposts">
                                        <i className="fa fa-plus-circle" />
                                        <span>Liste Utilizateurs</span>
                                    </Link>
                                </li>

                                <li className="sidebar-dropdown">
                                    <Link className="dropdown-item" to="/pages/roles/userrole">
                                        <i className="fa fa-plus-circle" />
                                        <span>Liste Roles</span>
                                    </Link>
                                </li>
                                <li className="sidebar-dropdown">
                                    <Link className="dropdown-item" to="/pages/bloqueos/blockposts">
                                        <i className="fa fa-plus-circle" />
                                        <span>Block post</span>
                                    </Link>
                                </li>
                                <li className="sidebar-dropdown">
                                    <Link className="dropdown-item" to="/pages/bloqueos/blockcomments">
                                        <i className="fa fa-plus-circle" />
                                        <span>Block comment</span>
                                    </Link>
                                </li>
                                <li className="sidebar-dropdown">
                                    <Link className="dropdown-item" to={`/pages/profile/${auth.user._id}`}>
                                        <i className="fa fa-user" />
                                        <span>Profil</span>
                                    </Link>
                                </li>




                                <li className="sidebar-dropdown">
                                    <Link
                                        className="dropdown-item"
                                        to="/"
                                        onClick={() => dispatch(logout())}
                                    >
                                        <i className="fas fa-sign-out-alt"></i>
                                        Se déconnecter
                                    </Link>
                                </li>
                                <li className="header-menu">
                                    <span>Catégories</span>
                                </li>
                                <li className="sidebar-dropdown">
                                    <Link className="dropdown-item" to="/pages/salasfiestas">
                                        <i className="fas fa-gem"></i>
                                        <span>Salle des fêtes</span>
                                    </Link>
                                </li>
                                <li className="sidebar-dropdown">
                                    <Link className="dropdown-item" to="/cervicios">
                                        <i className="fas fa-tools"></i>
                                        <span>Services</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>

                    </div>
                </nav>
            </div>

        )
    }

    return (
        <div>
            {auth.user ?
                auth.user.role === "admin" ?
                    adminauthLink()
                    : userauthLink()
                : userLink()}
        </div>



    );
}

export default Home;

