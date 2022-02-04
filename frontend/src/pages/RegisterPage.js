import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/actions/userActions";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const dispatch = useDispatch();
  const navigation = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      name: name,
      email: email,
      password: password,
    };
    dispatch(registerUser(newUser));
  };

  const { loading, user } = useSelector((state) => state.userReducer);
  console.log(user);

  useEffect(() => {
    if (user?.name) {
      navigation("/");
    }
  }, [user]);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <>
          <h1>Registrar Usuario</h1>
          <Form onSubmit={(e) => handleSubmit(e)}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="name"
                placeholder="Ingrese su nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Ingrese su email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Ingrese una contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Confirmar contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Ingrese nuevamente su contraseña"
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
                disabled={password ? false : true}
                isInvalid={password !== confirmPass}
                className={password ? "" : "opacity-50"}
              />
              <Form.Control.Feedback type="invalid">
                Las contraseñas deben coincidir
              </Form.Control.Feedback>
            </Form.Group>
            <Button variant="primary" type="submit">
              Crear Cuenta
            </Button>
          </Form>
          <div className="column">
            "Ya tienes una cuenta?"
            <a href="/login?redirect=///">Iniciar Sesion</a>
          </div>        
        </>
      )}
    </div>
  );
};

export default RegisterPage;
