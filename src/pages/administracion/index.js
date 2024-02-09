import React, { useEffect } from 'react'



import { useSelector, useDispatch } from 'react-redux';

import { Link } from 'react-router-dom';
import { logout } from '../../redux/actions/authAction';
import { Card, Container } from 'react-bootstrap';



//import Avatar from '../components/Avatar'         <Avatar src={auth.user.avatar} size="medium-avatar" />      </div>
let scroll = 0;

const Index = () => {
  const { auth } = useSelector((state) => state);
  const isAuthenticated = !!auth.token;
  const dispatch = useDispatch();

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
    const sidebarDropdownLinks = document.querySelectorAll('.sidebar-dropdown > a');
    const sidebarSubmenus = document.querySelectorAll('.sidebar-submenu');
    const pageWrapper = document.querySelector('.page-wrapper');
    const closeSidebarButton = document.getElementById('close-sidebar');
    const showSidebarButton = document.getElementById('show-sidebar');

    sidebarDropdownLinks.forEach(link => {
      link.addEventListener('click', () => {
        sidebarSubmenus.forEach(submenu => {
          submenu.style.display = 'none';
        });

        const parentListItem = link.parentElement;

        if (parentListItem.classList.contains('active')) {
          document.querySelectorAll('.sidebar-dropdown').forEach(dropdown => {
            dropdown.classList.remove('active');
          });

          parentListItem.classList.remove('active');
        } else {
          document.querySelectorAll('.sidebar-dropdown').forEach(dropdown => {
            dropdown.classList.remove('active');
          });

          link.nextElementSibling.style.display = 'block';
          parentListItem.classList.add('active');
        }
      });
    });

    closeSidebarButton.addEventListener('click', () => {
      pageWrapper.classList.remove('toggled');
    });

    showSidebarButton.addEventListener('click', () => {
      pageWrapper.classList.add('toggled');
    });
  }, []);


  const handleSidebarToggle = () => {
    // Lógica para mostrar/ocultar la barra lateral, si es necesario
  };



  return (

    <div>
      <div className="page-wrapper chiller-theme toggled">


        <button id="show-sidebar" className="btn btn-sm btn-dark" onClick={handleSidebarToggle}>
          <i className="fas fa-bars" />
        </button>
        <nav id="sidebar" className="sidebar-wrapper">
          <div className="sidebar-content">
            <div className="sidebar-brand">
              <Link className="dropdown-item" to='/'>

                <span>Tassili Web Site
                </span>
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
                        <span>Liste Utilizateurs</span>
                      </Link>
                    </li>

                    <li>
                      <Link className="dropdown-item" to="/roles/userrole">
                        <i className="fa fa-plus-circle" />
                        <span>Liste Roles</span>
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


        <main  >


          <div >


            <Container>
              <Card>
                <Card.Body>
                  <Card.Title className="display-1">Home page</Card.Title>
                  <Card.Text>home page administracion</Card.Text>
                </Card.Body>
              </Card>
            </Container>

          </div>

        </main>

      </div>

    </div>
  )
}



export default Index

