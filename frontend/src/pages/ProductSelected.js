import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Button,
    Card,
    Col,
    Image,
    ListGroup,
    Row,
} from 'react-bootstrap';
import { listProductsDetails } from '../redux/actions/productActions';
import Message from '../components/Message';
import Loader from '../components/Loader'
import { Link, useParams } from 'react-router-dom';

const ProductSelected = () => {
    const dispatch = useDispatch();
    const productSelected = useSelector((state) => state.productDetails);
    const { loading, error, product } = productSelected;
    const params = useParams();
    const {id} = params;
    console.log("Id: ", id);
    useEffect(() => {
        dispatch(listProductsDetails(id));
    }, [dispatch, id]);

    return (
        <>
            <Link className='btn btn-dark my-3' to='/'>
                Atrás
            </Link>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger' >{error}</Message>
            ) : (
                <>
                    <Row>
                        <Col md={6}>
                            <Image src={product?.image} alt={product?.name} fluid />
                            
                        </Col>
                        <Col md={3}>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <h3>{product?.name}</h3>
                                </ListGroup.Item>
                                <ListGroup.Item>Precio: $ {product?.price}</ListGroup.Item>
                                <ListGroup.Item>
                                    Descripción: {product?.description}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <Col md={3}>
                            <Card>
                                <ListGroup variant='flush'>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Precio</Col>
                                            <Col>
                                                <strong>$ {product?.price}</strong>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Stock:</Col>
                                            <Col>
                                                {product?.countInStock > 0 ? 'Disponible' : 'Sin stock'}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                    {product?.countInStock > 0 && (
                                        <ListGroup.Item>
                                            <Row>
                                                <Col></Col>
                                                {/* <Col>
                                                    <Form.Select
                                                        value={qty}
                                                        onChange={(e) => setQty(e.target.value)}>
                                                        {[...Array(product.countInStock).keys()].map(
                                                            (x) => (
                                                                <option key={x + 1} value={x + 1}>
                                                                    {x + 1}
                                                                </option>
                                                            )
                                                        )}
                                                    </Form.Select>
                                                </Col> */}
                                            </Row>
                                        </ListGroup.Item>
                                    )}
                                    <ListGroup.Item className='d-grid'>
                                        <Button
                                            // onClick={addToCartHandler}
                                            disabled={product?.countInStock === 0}
                                            variant='primary'
                                            className='text-uppercase fw-bold'
                                            type='button'>
                                            Agregar al Carrito
                                        </Button>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <h2>Reviews</h2>
                            {product?.reviews?.length === 0 ? <Message>Sin reviews</Message>
                            :<></>
                            // <ListGroup variant='flush'>
                            //     {product?.reviews.map((review) => (
                            //         <ListGroup.Item key={review._id}>
                            //             <strong>{review.name}</strong>
                            //             <Rating value={review.rating} />
                            //             <p>{review.createdAt.substring(0, 10)}</p>
                            //             <p>{review.comment}</p>
                            //         </ListGroup.Item>
                            //     ))}
                            //     <ListGroup.Item>
                            //         <h2>Escribir una review</h2>
                            //         {errorProductReview && (
                            //             <Message variant='danger'>{errorProductReview}</Message>
                            //         )}
                            //         {userInfo ? (
                            //             <Form onSubmit={submitHandler}>
                            //                 <Form.Group controlId='rating' className='mb-2'>
                            //                     <Form.Label>Rating</Form.Label>
                            //                     <FormSelect
                            //                         value={review.rating}
                            //                         onChange={(e) =>
                            //                             setReview({ ...review, rating: e.target.value })
                            //                         }>
                            //                         <option value=''>Seleccionar...</option>
                            //                         <option value='1'>1 - Malo</option>
                            //                         <option value='2'>2 - Regular</option>
                            //                         <option value='3'>3 - Bueno</option>
                            //                         <option value='4'>4 - Muy Bueno</option>
                            //                         <option value='5'>5 - Excelente</option>
                            //                     </FormSelect>
                            //                 </Form.Group>
                            //                 <Form.Group controlId='comment' className='mb-3'>
                            //                     <Form.Label>Comentario</Form.Label>
                            //                     <Form.Control
                            //                         as='textarea'
                            //                         rows='3'
                            //                         value={review.comment}
                            //                         onChange={(e) =>
                            //                             setReview({ ...review, comment: e.target.value })
                            //                         }></Form.Control>
                            //                 </Form.Group>
                            //                 <Button type='submit' variant='primary'>
                            //                     Enviar
                            //                 </Button>
                            //             </Form>
                            //         ) : (
                            //             <Message>
                            //                 Por favor <Link to='/login'>iniciar sesión</Link> para
                            //                 escribir una review
                            //             </Message>
                            //         )}
                            //     </ListGroup.Item>
                            // </ListGroup>
                            }
                            
                        </Col>
                    </Row>
                </>
            )}
        </>
    )
};

export default ProductSelected;