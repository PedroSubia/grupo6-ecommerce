import React, { useEffect } from 'react';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { deleteProduct, listProducts } from '../redux/actions/productActions';
import Paginate from '../components/Paginate';
//import { useNavigate } from 'react-router-dom';

const ProductListPage = () => {
    const params = useParams();
    const pageNumber = params.pageNumber || 1;

    const productList = useSelector((state) => state.productList);
    const { loading, error, products, page, pages } = productList;
    const productDelete = useSelector((state) => state.productDelete);
    const {
        loading: loadingDelete,
        error: errorDelete,
        success: successDelete,
    } = productDelete;

    // const crearProducto = () => {
    //     navigation('/product/create');
    //   }
    const userLogin = useSelector((state) => state.userReducer);
    const { user } = userLogin;
    const dispatch = useDispatch();

    const navigate = useNavigate();

    useEffect(() => {
        if (!user?.isAdmin) {
            navigate('/login');
        }
        dispatch(listProducts('', pageNumber));
    }, [
        dispatch,
        navigate,
        user,
        successDelete,
        pageNumber,
    ]);

    const deleteHandler = (productId) => {
        if (window.confirm('¿Está seguro de eliminar este producto?')) {
            dispatch(deleteProduct(productId, user.token));
        }
    };

    const createProduct = () => {
        navigate('/product/create');
    };

    return (
        <>
            <Row className='align-items-center'>
                <Col>
                    <h1>Productos</h1>
                </Col>
                <Col className='d-flex justify-content-end'>
                    <Button className='my-3' onClick={() => createProduct()}>
                        <i className='fas fa-plus'></i> Crear Producto
                    </Button>
                </Col>
            </Row>
            {loadingDelete && <Loader />}
            {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <>
                    <Table striped bordered hover responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NOMBRE</th>
                                <th>PRECIO</th>
                                <th>CATEGORIA</th>
                                <th>MARCA</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product._id}>
                                    <td>{product._id}</td>
                                    <td>{product.name}</td>
                                    <td>U$D {product.price}</td>
                                    <td>{product.category}</td>
                                    <td>{product.brand}</td>
                                    <td>
                                        <Button variant='light' className='btn-sm'>
                                            <i className='fas fa-edit'></i>
                                        </Button>
                                        <Button
                                            variant='danger'
                                            className='btn-sm'
                                            onClick={() => deleteHandler(product._id)}>
                                            <i className='fas fa-trash'></i>
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <Paginate page={page} pages={pages} isAdmin={true} />
                </>
            )}
        </>
    );
};

export default ProductListPage;