import React, { useState, useEffect } from 'react';
import { Form, Button, Row } from 'react-bootstrap';
import Card from 'react-bootstrap/Card'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteProductCart, actualizarProductCart } from '../redux/actions/cartActions';

const ProductResume = ({ item }) => {
    const dispatch = useDispatch();
    const product = item.product;
    const [contador, setContador] = useState([]);
    const limite = item.product.countInStock;
    const [cantidad, setCantidad] = useState(item.qty);
    const deleteItemCart = (e) => {
        e.preventDefault();
        //console.log('item para eliminar del carrito', item);
        dispatch(deleteProductCart(item));
    };
    useEffect(() => {
        function arrayStock() {
            let indices = [];
            for (let index = 0; index < limite; index++) {
                indices.push(index);
            }
            setContador(indices);
        }
        arrayStock();
    }, []);

    useEffect(() => {
        console.log('cantidad en item.qty: ', item.qty);
        console.log('cantidad actualizada carrito: ', cantidad);
        if (cantidad !== Number(item.qty)){
            console.log('actualizar carrito');
            //dispatch(actualizarProductCart(item, cantidad));
        }
    }, [cantidad]);
    

    return (
        <Row>

            <Card style={{ width: '20%' }}>
                <Card.Body>
                    <Card.Img src={item.image} />
                </Card.Body>
            </Card>

            <Card style={{ width: '35%' }}>
                <Card.Body>
                    <Card.Link>
                        <Link to={`/product/${product._id}`}>
                            <Card.Text>{item.name}</Card.Text>
                        </Link>
                    </Card.Link>
                </Card.Body>
            </Card>

            <Card style={{ width: '20%' }}>
                <Card.Body>
                    <Card.Text>$ {item.price}</Card.Text>
                </Card.Body>
            </Card>

            <Card style={{ width: '15%' }}>
                <Form.Select onChange={(e) => setCantidad(e.target.value)}>
                    {contador.map((element) => (
                        <option
                            key={element + 1}
                            value={element + 1}
                            selected={element + 1 === Number(item.qty) ? true : false}
                        >{element + 1}</option>
                    ))}
                </Form.Select>
            </Card>

            <Card style={{ width: '10%' }}>
                <Button variant="danger" onClick={(e) => deleteItemCart(e)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                        <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                    </svg>
                </Button>
            </Card>
        </Row>
    );
};

export default ProductResume;