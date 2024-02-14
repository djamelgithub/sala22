import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import jQuery from 'jquery'
import $ from 'jquery'
import { useSelector } from 'react-redux';
const Home = () => {
    const { auth } = useSelector(state => state);
    useEffect(() => {
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
    }, []);

    useEffect(() => {
        $(document).ready(function () {
            $(".sidebar-dropdown a").on('click', function (event) {
                if (this.hash !== "") {
                    event.preventDefault();
                    var hash = this.hash;
                    $('html, body').animate({
                        scrollTop: $(hash).offset().top
                    }, 800, function () {
                        window.location.hash = hash;
                    });
                }
            });
        });
    }, []);


    const userLink = () => {
        if (auth.user) { // Verificar si el usuario está autenticado
            return (
                <div className="menu">
                    <ul className="navbar-nav flex-row">
                        {/* Renderizar los enlaces de navegación */}
                        {
                            navLinks.map((link, index) => (
                                <li className={`nav-item px-2 ${isActive(link.path)}`} key={index}>
                                    <Link className="nav-link" to={link.path}>
                                        <span className="material-icons">{link.icon}</span>
                                    </Link>
                                </li>
                            ))
                        }
                        {/* Renderizar el menú desplegable para notificaciones */}
                        <li className="nav-item dropdown" style={{ opacity: 1 }}>
                            <span className="nav-link position-relative" id="navbarDropdown"
                                role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <span className="material-icons" style={{ color: notify.data.length > 0 ? 'crimson' : '' }}>favorite</span>
                                <span className="notify_length">{notify.data.length}</span>
                            </span>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown" style={{ transform: 'translateX(75px)' }}>
                                <NotifyModal />
                            </div>
                        </li>
                        {/* Renderizar el menú desplegable para el perfil del usuario */}
                        <li className="nav-item dropdown" style={{ opacity: 1 }}>
                            <span className="nav-link dropdown-toggle" id="navbarDropdown"
                                role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <Avatar src={auth.user.avatar} size="medium-avatar" />
                            </span>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <Link className="dropdown-item" to={`/profile/${auth.user._id}`}>Profile</Link>
                                <label htmlFor="theme" className="dropdown-item" onClick={() => dispatch({ type: GLOBALTYPES.THEME, payload: !theme })}>
                                    {theme ? 'Light mode' : 'Dark mode'}
                                </label>
                                <div className="dropdown-divider"></div>
                                <Link className="dropdown-item" to="/" onClick={() => dispatch(logout())}>Logout</Link>
                            </div>
                        </li>
                    </ul>
                </div>
            );
        } else { // Si el usuario no está autenticado
            // Devolver el botón de inicio de sesión
            return (
                <div>
                    <Link
                        to="/login"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            transition: 'background-color 0.3s, color 0.3s',
                            backgroundColor: '#000fff',
                            color: '#fff',
                            padding: '8px 12px',
                            borderRadius: '5px',
                            textDecoration: 'none',
                        }}
                        className="login-btn"
                    >
                        <span className="material-icons" style={{ marginRight: '5px' }}>login</span>
                    </Link>
                </div>
            );
        }
    }


    const userauthLink = () => {
        if (auth.user) { // Verificar si el usuario está autenticado
            return (
                <div className="menu">
                    <ul className="navbar-nav flex-row bg-primary ">
                        {/* Renderizar los enlaces de navegación */}
                        {
                            navLinks.map((link, index) => (
                                <li className={`nav-item px-2 ${isActive(link.path)}`} key={index}>
                                    <Link className="nav-link" to={link.path}>
                                        <span className="material-icons">{link.icon}</span>
                                    </Link>
                                </li>
                            ))
                        }

                        <li className="nav-item dropdown" style={{ opacity: 1 }}>
                            <span className="nav-link dropdown-toggle" id="navbarDropdown"
                                role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <Avatar src={auth.user.avatar} size="medium-avatar" />
                            </span>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <Link className="dropdown-item" to={`/profile/${auth.user._id}`}>Profile</Link>
                                <label htmlFor="theme" className="dropdown-item" onClick={() => dispatch({ type: GLOBALTYPES.THEME, payload: !theme })}>
                                    {theme ? 'Light mode' : 'Dark mode'}
                                </label>
                                <div className="dropdown-divider"></div>
                                <Link className="dropdown-item" to="/" onClick={() => dispatch(logout())}>Logout</Link>
                            </div>
                        </li>
                    </ul>
                </div>
            );
        } else { // Si el usuario no está autenticado
            // Devolver el botón de inicio de sesión
            return (
                <div>
                    <Link
                        to="/login"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            transition: 'background-color 0.3s, color 0.3s',
                            backgroundColor: '#000fff',
                            color: '#fff',
                            padding: '8px 12px',
                            borderRadius: '5px',
                            textDecoration: 'none',
                        }}
                        className="login-btn"
                    >
                        <span className="material-icons" style={{ marginRight: '5px' }}>login</span>
                    </Link>
                </div>
            );
        }
    }

    const adminauthLink = () => {
        if (auth.user) { // Verificar si el usuario está autenticado
            return (
                <div className="menu">
                    <ul className="navbar-nav flex-row  bg-primary ">
                        {/* Renderizar los enlaces de navegación */}
                        {
                            navLinks.map((link, index) => (
                                <li className={`nav-item px-2 ${isActive(link.path)}`} key={index}>
                                    <Link className="nav-link" to={link.path}>
                                        <span className="material-icons">{link.icon}</span>
                                    </Link>
                                </li>
                            ))
                        }
                        {/* Renderizar el menú desplegable para notificaciones */}
                        <li className="nav-item dropdown" style={{ opacity: 1 }}>
                            <span className="nav-link position-relative" id="navbarDropdown"
                                role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <span className="material-icons" style={{ color: notify.data.length > 0 ? 'crimson' : '' }}>favorite</span>
                                <span className="notify_length">{notify.data.length}</span>
                            </span>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown" style={{ transform: 'translateX(75px)' }}>
                                <NotifyModal />
                            </div>
                        </li>
                        {/* Renderizar el menú desplegable para el perfil del usuario */}
                        <li className="nav-item dropdown" style={{ opacity: 1 }}>
                            <span className="nav-link dropdown-toggle" id="navbarDropdown"
                                role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <Avatar src={auth.user.avatar} size="medium-avatar" />
                            </span>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <Link className="dropdown-item" to='/pages/administracion/index'>Administration</Link>
                                <Link className="dropdown-item" to='/roles/userRole'>Roles</Link>



                                <Link className="dropdown-item" to={`/profile/${auth.user._id}`}>Profile</Link>



                                <label htmlFor="theme" className="dropdown-item" onClick={() => dispatch({ type: GLOBALTYPES.THEME, payload: !theme })}>
                                    {theme ? 'Light mode' : 'Dark mode'}
                                </label>
                                <div className="dropdown-divider"></div>
                                <Link className="dropdown-item" to="/" onClick={() => dispatch(logout())}>Logout</Link>
                            </div>
                        </li>
                    </ul>
                </div>
            );
        } else { // Si el usuario no está autenticado
            // Devolver el botón de inicio de sesión
            return (
                <div>
                    <Link
                        to="/login"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            transition: 'background-color 0.3s, color 0.3s',
                            backgroundColor: '#000fff',
                            color: '#fff',
                            padding: '8px 12px',
                            borderRadius: '5px',
                            textDecoration: 'none',
                        }}
                        className="login-btn"
                    >
                        <span className="material-icons" style={{ marginRight: '5px' }}>login</span>
                    </Link>
                </div>
            );
        }
    }
    const authuseractiveLink = () => {
        if (auth.user && auth.user.isActive && auth.user.role === "useractivado") {
            return (
                <div className="menu">
                    <ul className="navbar-nav flex-row">
                        {/* Renderizar los enlaces de navegación */}
                        {
                            navLinks.map((link, index) => (
                                <li className={`nav-item px-2 ${isActive(link.path)}`} key={index}>
                                    <Link className="nav-link" to={link.path}>
                                        <span className="material-icons">{link.icon}</span>
                                    </Link>
                                </li>
                            ))
                        }
                        {/* Renderizar el menú desplegable para notificaciones */}
                        <li className="nav-item dropdown" style={{ opacity: 1 }}>
                            <span className="nav-link position-relative" id="navbarDropdown"
                                role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <span className="material-icons" style={{ color: notify.data.length > 0 ? 'crimson' : '' }}>favorite</span>
                                <span className="notify_length">{notify.data.length}</span>
                            </span>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown" style={{ transform: 'translateX(75px)' }}>
                                <NotifyModal />
                            </div>
                        </li>
                        {/* Renderizar el menú desplegable para el perfil del usuario */}
                        <li className="nav-item dropdown" style={{ opacity: 1 }}>
                            <span className="nav-link dropdown-toggle" id="navbarDropdown"
                                role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <Avatar src={auth.user.avatar} size="medium-avatar" />
                            </span>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <Link className="dropdown-item" to={`/profile/${auth.user._id}`}>Profile</Link>
                                <label htmlFor="theme" className="dropdown-item" onClick={() => dispatch({ type: GLOBALTYPES.THEME, payload: !theme })}>
                                    {theme ? 'Light mode' : 'Dark mode'}
                                </label>
                                <div className="dropdown-divider"></div>
                                <Link className="dropdown-item" to="/" onClick={() => dispatch(logout())}>Logout</Link>
                            </div>
                        </li>
                    </ul>
                </div>
            );
        } else {
            // Devolver un mensaje o componente indicando que el usuario no está activado o no tiene el rol adecuado
            return null;
        }
    }
    return (
        <div className="page-wrapper chiller-theme toggled">
            <a id="show-sidebar" className="btn btn-sm btn-dark" href="#">
                <i className="fas fa-bars" />
            </a>
            <nav id="sidebar" className="sidebar-wrapper">
                <div className="sidebar-content">
                    <div className="sidebar-brand">
                        <a href="#"> Tassili page</a>
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
                    {!auth.user ? userLink() : auth.user.role !== "admin" ? userauthLink() : adminauthLink()}
                    {authuseractiveLink()}
                </div>
            </nav>
        </div>










    )
}

export default Home
