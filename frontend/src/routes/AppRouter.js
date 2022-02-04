import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from "../components/Header";
import HomePage from "../pages/HomePage";
import { Container } from "react-bootstrap";
import ProductSelected from "../pages/ProductSelected";
import Login from '../pages/LoginPage';
import Register from '../pages/RegisterPage';
import Products from '../pages/ProductsPage';
import CreateProductPage from '../pages/CreateProductPage';

const AppRouter = () => {
    return (
        <Router>
            <Header />
            <main className="py-3" >
                <Container>
                    <Routes>
                        <Route path='/' element={<HomePage />} />
                        <Route path='/login' element={<Login />} />
                        <Route path='/register' element={<Register />} />
                        <Route path='/product/:id' element={<ProductSelected />} />
                        <Route path='/admin/products/' element={<Products />} />
                        <Route path='/product/create' element={<CreateProductPage />} />
                    </Routes>
                </Container>
            </main>
        </Router>
    );
};

export default AppRouter;