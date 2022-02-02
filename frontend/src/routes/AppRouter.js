import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from "../components/Header";
import HomePage from "../pages/HomePage";
import { Container } from "react-bootstrap";
import ProductSelected from "../pages/ProductSelected";

const AppRouter = () => {
    return (
        <Router>
            <Header/>
            <main className="py-3">
                <Container>
                    <Routes>
                        <Route path='/' element={<HomePage/>}/>
                        <Route path='/product/:id' element={<ProductSelected/>}/>
                    </Routes>
                </Container>
            </main>
        </Router>
    );
};

export default AppRouter;
