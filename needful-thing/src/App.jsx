import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import store from './Redux/store';
import { createRoot } from 'react-dom/client';
import HomePage from './pages/HomePage';
import Cart from './pages/Cart';
import FavoritesPage from './pages/FavoritesPage';
import Products from './pages/Products';
import ProductDetailPage from './components/ProductsDetail';
import Footer from './components/Footer';
import AddProduct from './pages/AddProduct';
import LoginPage from './pages/LoginPage';

const root = createRoot(document.getElementById('root'));

root.render(
  <>
  <Provider store={store}>
    <App />
  </Provider>
  </>

);
/////////buradaki document kısmını çıkardım
function App() {

  return (
    <div>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/favoritesPage" element={<FavoritesPage />} />
        <Route path="/:id" element={<ProductDetailPage />} />
        <Route path="/addProduct" element={<AddProduct />} />
        <Route path="/Login" element={<LoginPage/>}/>
      </Routes>
     </Router>
     
    <Footer/>
  </div>
  )
}

export default App
