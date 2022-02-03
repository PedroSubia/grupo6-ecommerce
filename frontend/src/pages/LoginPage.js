import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useDispatch, useSelector } from 'react-redux';
import { loginActions } from '../redux/actions/userActions';
import { useNavigate } from 'react-router-dom';

const LoginPages = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch(); 
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const initialUserState = {
            email:email,
            password: password,
        }
        dispatch(loginActions(initialUserState));
    };
    const { user } = useSelector( (state) => state.userReducer);
    //console.log('user recibido en login page: ', user);

    useEffect(() => {
      if (user?.name){
        navigate('/');
      };
    }, [user]);

    return (
            <div style={{alignItems: 'center',justifyItems:'center', width:'50%'}}>
                <h1>Iniciar Sesion</h1>
                <Form onSubmit={(e) => handleSubmit(e)}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Ingrese su email" value={email} onChange={(e)=> setEmail(e.target.value)}/>
                        {/* <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text> */}
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control type="password" placeholder="Ingrese su contraseña" value={password} onChange={(e)=> setPassword(e.target.value)} />
                    </Form.Group>
                    {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Check me out" />
                    </Form.Group> */}
                    <Button variant="primary" type="submit">
                        Iniciar Sesion
                    </Button>
                </Form>
                <div style={{display: 'flex'}}>
                    <p>Eres un nuevo usuario? <a href='/register'>Crear Cuenta </a></p>
                </div>
            </div>
    );
};

export default LoginPages; 
