import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { login } from '../redux/actions/authAction'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
 
const Login = () => {
    const initialState = { email: '', password: '' }
    const [userData, setUserData] = useState(initialState)
    const { email, password } = userData
    const { t } = useTranslation();
    const [typePass, setTypePass] = useState(false)

    const { auth, languagee } = useSelector(state => state)
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        if (auth.token) history.push("/")
    }, [auth.token, history])

    const handleChangeInput = e => {
        const { name, value } = e.target
        setUserData({ ...userData, [name]: value })
    }

    const handleSubmit = e => {
        e.preventDefault()
        dispatch(login(userData))
    }

    return (
        <Container>
            <Row className="justify-content-center">
                <Col xs={12} sm={4} md={7}>
                    <Card className="my-4">
                        <Card.Img
                            src="https://source.unsplash.com/random?wedding"
                            alt="Wedding"
                            className="card-img"
                        />
                        <Card.Body>
              <Card.Title className="text-center">{t('Tassili Wedding', { lng: languagee.language })}</Card.Title>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>{t('Email address', { lng: languagee.language })}</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder={t('Enter email', { lng: languagee.language })}
                    name="email"
                    onChange={handleChangeInput}
                    value={email}
                  />
                
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>{t('Password', { lng: languagee.language })}</Form.Label>
                  <div className="pass">
                    <Form.Control
                      type={typePass ? "text" : "password"}
                      placeholder={t('Password', { lng: languagee.language })}
                      name="password"
                      onChange={handleChangeInput}
                      value={password}
                    />
                    <small onClick={() => setTypePass(!typePass)}>
                      {typePass ? t('Hide', { lng: languagee.language }) : t('Show', { lng: languagee.language })}
                    </small>
                  </div>
                </Form.Group>
                <Button
                  variant="dark"
                  type="submit"
                  className="w-100"
                  disabled={email && password ? false : true}
                >
                  {t('Loginn', { lng: languagee.language })}
                </Button>
                <p className="my-2">
                  {t('You dont have an account?', { lng: languagee.language })}{' '}
                  <Link to="/register">{t('Register Now', { lng: languagee.language })}</Link>
                </p>
              </Form>
            </Card.Body>
            </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default Login
