import React, { useEffect } from 'react'


 
 
import { Card, Container } from 'react-bootstrap';



//import Avatar from '../components/Avatar'         <Avatar src={auth.user.avatar} size="medium-avatar" />      </div>
let scroll = 0;

const Index = () => {
 

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
 
  )
}



export default Index

