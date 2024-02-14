
import React, { useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux';

 
//import Avatar from '../components/Avatar'         <Avatar src={auth.user.avatar} size="medium-avatar" />      </div>
let scroll = 0;
const Salasfiestas = () => {
  const { auth, notify } = useSelector((state) => state);
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


 

  return (
    <div>
      <div className="page-wrapper chiller-theme toggled">
        <button id="show-sidebar" className="btn btn-sm btn-dark" >
          <i className="fas fa-bars" />
        </button>
        <nav id="sidebar" className="sidebar-wrapper">
           
        </nav>

        <main  >


          <div >






           <h1>gggg</h1>



          </div>







        </main>

      </div>

    </div>
  )
}

export default Salasfiestas
