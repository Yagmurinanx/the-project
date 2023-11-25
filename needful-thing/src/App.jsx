import { useState } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import store from './Redux/store';
import './App.css'
import { createApi } from '@reduxjs/toolkit/query'
import { createApi as createApiReact } from '@reduxjs/toolkit/query/react';
import { createRoot } from 'react-dom/client';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage'
import Chart from './pages/Chart';


const root = createRoot(document.getElementById('root'));

root.render(
  <>
  <Provider store={store}>
    <App />
  </Provider>,
  </>

);

function App() {

  return (
    <div>
    <Router>
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/chart" element={<Chart />} />
      </Routes>
    </div>
  </Router>
  </div>
  )
}

export default App
