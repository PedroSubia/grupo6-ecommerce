import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'react-bootstrap';
import Product from '../components/Product';
import { listProducts } from '../redux/actions/productActions';
import Message from '../components/Message';
import { useParams } from 'react-router-dom';
import  Loader from '../components/Loader' 


const HomePage = () =>{
    const dispatch = useDispatch();
    const productList = useSelector((state) => state.productList);
    const { loading, error, products} = productList;
    
    const params = useParams();
    const { keyword } = params;
    const pageNumber = params.pageNumber || 1;

    useEffect(()=>{
        dispatch(listProducts(keyword, pageNumber));
    }, [dispatch, keyword, pageNumber]);

    return (
        <>
        <h1>Últimos productos</h1>
            {loading ? (
                <Loader/>
            ):error ?  (
                <Message variant= 'danger' >{error}</Message>
            ): (
                <>
                    <Row>
                        {products.map((product) => (
                            <Col key= {product._id} sm={12} md={6} lg={4} xl={4}>
                                <Product product={product} />
                            </Col>
                            
                        ))}
                    </Row>
                </>
            )}
        </>
    )
};

export default HomePage;