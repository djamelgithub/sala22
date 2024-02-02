 
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
 

import jQuery from 'jquery'
import { logout } from '../../redux/actions/authAction';
import RolUsuario from '../../components/roles/RolUsuario'
 
import Search from '../../components/header/Search'
 

const UserRole = () => {

    const { auth } = useSelector(state => state)
 const isAuthenticated = !!auth.token;
const dispatch = useDispatch();



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


  const avatarSrc = auth?.user?.avatar;
  const username = auth?.user?.username;
  const role = auth?.user?.role || "Unknown Role"; // Valor predeterminado si role no está presente





  return (
    <div className="  sidebaraprove page-wrapper chiller-theme toggled" >
      <button id="show-sidebar" className="btn btn-sm btn-dark"  >
        <i className="fas fa-bars" />
      </button>
      <nav id="sidebar" className="sidebar-wrapper">
        <div className="sidebar-content">
          <div className="sidebar-brand">
            <Link className="dropdown-item" to='/'>

              <span>Tassili Web Site</span>
            </Link>
            <div id="close-sidebar">
              <i className="fas fa-times" />
            </div>
          </div>
          <div className="sidebar-header">

            <div className="user-pic">
              <h5>avatar</h5>
              <div className="user-info">
                <span className="user-name">
                  <strong>username</strong>
                </span>
                <span className="user-role">Role: role</span>
                <span className="user-status">
                  <i className="fa fa-circle" />
                  <span>Online</span>
                </span>
              </div>
            </div>
          </div>




          <div className="sidebar-menu">
            <ul className="list-group">

              {isAuthenticated ? (
                <>
                  <li className="header-menu" style={{ color: 'red' }}>
                    <span>Administrations</span>
                  </li>


                  <li>
                    <Link className="dropdown-item" to="/administracion/postspendientes">
                      <i className="fa fa-plus-circle" />
                      <span>Aprouve salle fetes</span>
                    </Link>
                  </li>


                  <li>
                    <Link className="dropdown-item" to="/administracion/serviciospendientes">
                      <i className="fa fa-plus-circle" />
                      <span>Aprouve services</span>
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/users/usersposts">
                      <i className="fa fa-plus-circle" />
                      <span>Utilizateurs</span>
                    </Link>
                  </li>

                  <li>
                    <Link className="dropdown-item" to="/roles/userrole">
                      <i className="fa fa-plus-circle" />
                      <span>Roles</span>
                    </Link>
                  </li>

                  <li>
                    <Link className="dropdown-item" to="/bloqueos/blockposts">
                      <i className="fa fa-plus-circle" />
                      <span>Block post</span>
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/bloqueos/blockcomments">
                      <i className="fa fa-plus-circle" />
                      <span>Block comment</span>
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
                  <li className="header-menu" style={{ color: '#3498db', fontSize: '18px', fontWeight: 'bold' }}>
                    <span>Catégories</span>
                  </li>


                  <li>
                    <Link className="dropdown-item" to="/salasfiestas">
                      <i className="far fa-gem"></i>
                      <span>Salle</span>
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

                  <li className="header-menu" style={{ color: 'red' }}>
                    <span>Catégories</span>
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
      </nav>




      <main className="page-content">
        <div className="container-fluid">

 
          <Search />
          <RolUsuario   />

 





        </div>

      </main>




    </div>
  )
}

 
export default UserRole