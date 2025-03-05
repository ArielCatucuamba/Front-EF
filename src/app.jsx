import React from 'react';
import './app.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Auth from './layout/Auth';
import LoadingPage from './pages/LoadingPage';
import Register from './pages/SellerRegister';
import { PrivateRoute } from './routes/PrivateRoutes';
import Dashboard from './layout/Dasboard';
import Sellers from './pages/Seller';
import UpdateSeller from './pages/SellerUpdate';
import SellerDetaill from './pages/SellerDetatill';
import Orders from './pages/Orders';
import Clients from './pages/Clients';
import { AuthProvider } from './context/AuthProvider';
import RegisterOrders from './pages/OrdersRegister';
import OrderDetaill from './pages/OrdersDetatill';
import UpdateOrder from './pages/OrdersUpdate';
import RegisterClients from './pages/ClientsRegister';
import ClientDetaill from './pages/ClientsDetatill';
import UpdateClient from './pages/ClientsUpdate';
import NotFound from './pages/NotFound'; // <-- Importa la página de error 404

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    {/* Rutas públicas */}
                    <Route index element={<LoadingPage />} />
                    <Route path="/" element={<Auth />}>
                        <Route path="login" element={<Login />} />
                    </Route>

                    {/* Rutas protegidas */}
                    <Route
                        path="dashboard/*"
                        element={
                            <PrivateRoute>
                                <Dashboard />
                            </PrivateRoute>
                        }
                    >
                        <Route path="sellers/" element={<Sellers />} />
                        <Route path="sellers/:id" element={<SellerDetaill/>} />
                        <Route path="sellers/register" element={<Register />} />
                        <Route path="sellers/update/:id" element={<UpdateSeller />} />
                        
                        <Route path="clients/" element={<Clients/>} />
                        <Route path="clients/register" element={<RegisterClients />} />
                        <Route path="clients/:id" element={<ClientDetaill/>} />
                        <Route path="clients/update/:id" element={<UpdateClient />} />

                        <Route path="orders/" element={<Orders/>} />
                        <Route path="orders/:id" element={<OrderDetaill/>} />
                        <Route path="orders/register" element={<RegisterOrders/>} />
                        <Route path="orders/update/:id" element={<UpdateOrder />} />

                        {/* ⛔ Captura rutas desconocidas dentro de Dashboard */}
                        <Route path="*" element={<NotFound />} />
                    </Route>

                    {/* ⛔ Captura rutas desconocidas fuera de Dashboard */}
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
