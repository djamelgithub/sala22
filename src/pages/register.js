import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, Link } from 'react-router-dom'
import { register } from '../redux/actions/authAction'
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next'
const Register = () => {
    const { auth, alert,languagee } = useSelector(state => state)
    const dispatch = useDispatch()
    const history = useHistory()
    const { t } = useTranslation();
    const initialState = { 
       username: '', email: '', password: '', cf_password: ''
    }
    const [userData, setUserData] = useState(initialState)
    const {   username, email, password, cf_password } = userData

    const [typePass, setTypePass] = useState(false)
    const [typeCfPass, setTypeCfPass] = useState(false)

    useEffect(() => {
        if(auth.token) history.push("/")
    }, [auth.token, history])

    
    const handleChangeInput = e => {
        const { name, value } = e.target
        setUserData({...userData, [name]:value})
         console.log("handleChangeInput called", name, value);
    }

    const handleSubmit = e => {
        e.preventDefault()
        dispatch(register(userData))
       
   
    }

    return (
        <Container>
      <Row className="justify-content-center">
        <Col xs={12} sm={4} md={7}>
          <Card className="my-4">
            <Card.Body>
              <h3 className="text-uppercase text-center mb-4">Tassili Automobile</h3>

              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="username">
                  <Form.Label>{t('Username', { lng: languagee.language })}</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder={t('Enter username', { lng: languagee.language })}
                    name="username"
                    onChange={handleChangeInput}
                    value={username}
                    style={{ background: `${alert.username ? '#fd2d6a14' : ''}` }}
                  />
                  <small className="form-text text-danger">
                    {alert.username ? alert.username : ''}
                  </small>
                </Form.Group>

                <Form.Group controlId="email">
                  <Form.Label>{t('Email address', { lng: languagee.language })}</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder={t('Enter email', { lng: languagee.language })}
                    name="email"
                    onChange={handleChangeInput}
                    value={email}
                    style={{ background: `${alert.email ? '#fd2d6a14' : ''}` }}
                  />
                  <small className="form-text text-danger">
                    {alert.email ? alert.email : ''}
                  </small>
                </Form.Group>

                <Form.Group controlId="password">
                  <Form.Label>{t('Password', { lng: languagee.language })}</Form.Label>
                  <div className="pass">
                    <Form.Control
                      type={typePass ? 'text' : 'password'}
                      placeholder={t('Password', { lng: languagee.language })}
                      name="password"
                      onChange={handleChangeInput}
                      value={password}
                      style={{ background: `${alert.password ? '#fd2d6a14' : ''}` }}
                    />
                    <small onClick={() => setTypePass(!typePass)}>
                      {typePass ? t('Hide', { lng: languagee.language }) : t('Show', { lng: languagee.language })}
                    </small>
                  </div>
                  <small className="form-text text-danger">
                    {alert.password ? alert.password : ''}
                  </small>
                </Form.Group>

                <Form.Group controlId="cf_password">
                  <Form.Label>Mot de passe</Form.Label>
                  <div className="pass">
                    <Form.Control
                      type={typeCfPass ? 'text' : 'password'}
                      placeholder="confirmer le mot de passe"
                      name="cf_password"
                      onChange={handleChangeInput}
                      value={cf_password}
                      style={{ background: `${alert.cf_password ? '#fd2d6a14' : ''}` }}
                    />
                    <small onClick={() => setTypeCfPass(!typeCfPass)}>
                      {typeCfPass ? t('Hide', { lng: languagee.language }) : t('Show', { lng: languagee.language })}
                    </small>
                  </div>
                  <small className="form-text text-danger">
                    {alert.cf_password ? alert.cf_password : ''}
                  </small>
                </Form.Group>

                <Button type="submit" variant="dark" className="w-100">
                  {t('Register', { lng: languagee.language })}
                </Button>

                <p className="my-2">
                  {t('Already have an account?', { lng: languagee.language })}{' '}
                  <Link to="/login" style={{ color: 'crimson' }}>
                    {t('Connexion', { lng: languagee.language })}
                  </Link>
                </p>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>

    )
}

export default Register
