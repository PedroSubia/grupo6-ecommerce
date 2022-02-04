import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductResume from "../components/ProductResume";
import Alert from "react-bootstrap/Alert";
import { Col, Row } from 'react-bootstrap';

const CartPage = () => {
  // const prod1 = { _id: 1, name: 'Airpods Bluetooth Headphones', image: '/uploads/airpods.jpg', description: 'Bluetooth technology lets you connect it wich compatible devices wirelessly High-quality AAC audio offers inmersive listening experience Built-in microphone allows you to take calls while working', brand: 'Apple', category: 'Electronics', price: 89.99, countInStock: 10, rating: 4.5, numReviews: 12, };
  // const prod2 = { _id: 2, name: 'iPhone 11 Pro 256GB Memory', image: '/uploads/phone.jpg', description: 'Introducing the iPhone 11 Pro. A transformative triple-camera system that adds tons of capability without complexity. An unprecedented leap in battery life', brand: 'Apple', category: 'Electronics', price: 599.99, countInStock: 7, rating: 4.0, numReviews: 8, };
  // let carrito = [prod1, prod2];

  //const dispatch = useDispatch();
  const { cart: carrito } = useSelector((state) => state.cartReducer);
  //console.log('carrito recibido en CartPage: ', carrito);
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    const calcularSubtotal = () => {
      const suma = carrito.reduce( (acc, item) => acc + (item.price*item.qty) , 0 );
      setSubtotal(suma);
    };
    calcularSubtotal();
  }, [carrito]);
  

  return (
    <Row>
      <div className="card-body" style={{ width: "66%" }}>
        <h1>Carrito de Compras</h1>
        {carrito.length > 0 ? (
          <>
            {carrito.map((item) => (
              <Col key={item.product._id}>
                <ProductResume item={item} />
              </Col>
            ))}
          </>
        ) : (
          // <div role='alert'>
          //   Tu carrito esta vacío{'\n'}
          //   <a href='/'>Regresar</a>
          // </div>
          <Alert variant="primary">
            Tu carrito esta vacío{' '}
            <Alert.Link href="/">Regresar</Alert.Link>
          </Alert>
        )}
      </div>
      <div className="card-body" style={{ width: "33%", backgroundColor: 'black', }}>
        <div>
          <h2>Subtotal items</h2>
          <h4>$ {subtotal}</h4>
        </div>
        <div>
          <button
            type="submit"
            className="btn btn-primary btn-lg"
            disabled={carrito ? false : true}
            style={{ position: 'relative', left: '8%', marginTop: '5%' }}
          >
            PROCESAR LA COMPRA
          </button>
        </div>
      </div>
    </Row>
  );
};

export default CartPage;
