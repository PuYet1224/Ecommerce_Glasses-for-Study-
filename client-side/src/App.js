import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './Context/AuthContext';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import Home from './Pages/Home';
import Sunglasses from './Pages/Sunglasses';
import Optics from './Pages/Optics';
import Glasses from './Pages/Glasses';
import About from './Pages/About';
import Contact from './Pages/Contact';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import SunglassesDetail from './Pages/SunglassesDetail';
import OpticsDetail from './Pages/OpticsDetail';
import GlassesDetail from './Pages/GlassesDetail';
import AdminProductList from './Pages/AdminProductList';
import AdminProductForm from './Pages/AdminProductForm';

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/sunglasses/:slug" element={<SunglassesDetail />} />
        <Route path="/optics/:slug" element={<OpticsDetail />} />
        <Route path="/glasses/:slug" element={<GlassesDetail />} />
        <Route path="/" element={<Home />} />
        <Route path="/sunglasses" element={<Sunglasses />} />
        <Route path="/optics" element={<Optics />} />
        <Route path="/glasses" element={<Glasses />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/admin/products" element={<AdminProductList />} />
        <Route path="/admin/product/new" element={<AdminProductForm />} />
        <Route path="/admin/product/:id" element={<AdminProductForm />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  </AuthProvider>
);

export default App;
