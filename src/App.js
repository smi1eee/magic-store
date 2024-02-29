import React from 'react';
import { BrowserRouter, Route, Routes, Navigate, Outlet } from 'react-router-dom'; 
import SignIn from './components/SignIn';
import BookList from './components/BookList';
import SpecificBook from './components/SpecificBook';
import ShoppingCart from './components/ShoppingCart';
import NotFoundPage from './components/NotFoundPage';
import Header from './components/Header';
import Footer from './components/Footer';
import { BookProvider } from './BookContext';

const ProtectedRoute = ({ redirectPath = '/' }) => {
  const username = localStorage.getItem('username');
  if (!username) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

function App() {
  
  
  
  return (
    <BrowserRouter basename="/magic-store">
      <BookProvider>
        <Header /> 
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/main" element={<BookList />} />          
            <Route path="/book/:id" element={<SpecificBook />} />
            <Route path="/cart" element={<ShoppingCart />} />
            
          </Route>
          <Route path="/not-found" element={<NotFoundPage />} />
          <Route path="*" element={<Navigate to="/not-found" />} />          
        </Routes>
        <Footer />
      </BookProvider>
    </BrowserRouter>
  );
}

export default App;
