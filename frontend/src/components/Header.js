import React from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../redux/actions/userActions'
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate();

  const { user } = useSelector((state) => state.userReducer);
  //console.log('user recibido en component header:', user);

  const cerrarSesion = () => {
    dispatch(logoutUser());
  }

  const mostrarProductos = () => {
    navigation('/admin/products/');
  }

  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>TiendaVirtual</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              <LinkContainer to='/cart'>
                <Nav.Link>
                  <i className='fas fa-shopping-cart'></i>Carrito
                </Nav.Link>
              </LinkContainer>
              {user && user?.name ?
                <LinkContainer to='/'>
                  <NavDropdown title={user?.name} id='basic-nav-dropdown'>
                    <NavDropdown.Item href=''>Perfil</NavDropdown.Item>
                    {user && user?.isAdmin?
                    <NavDropdown.Item onClick={() => mostrarProductos()}>Productos</NavDropdown.Item>:
                    <></>
                    }
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={() => cerrarSesion()}>Cerrar Sesion</NavDropdown.Item>
                  </NavDropdown>
                  {/* <Nav.Link>
                  <i className='fas fa-user'></i>{user.name}
                </Nav.Link> */}
                </LinkContainer>
                :
                <LinkContainer to='/login'>
                  <Nav.Link>
                    <i className='fas fa-user'></i>Login
                  </Nav.Link>
                </LinkContainer>
              }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
