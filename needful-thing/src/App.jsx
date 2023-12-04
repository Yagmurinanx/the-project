import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import store from './Redux/store';
import { createRoot } from 'react-dom/client';
import HomePage from './pages/HomePage';
// import ProductsPage from './pages/ProductsPage'
import Cart from './pages/Cart';
import FavoritesPage from './pages/FavoritesPage';
import Products from './pages/Products';


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
        <Route path="/product" element={<Products />} />
        {/* <Route path="/products" element={<ProductsPage />} /> */}
        <Route path="/cart" element={<Cart />} />
        <Route path="/favoritesPage" element={<FavoritesPage />} />
      </Routes>
    </div>
  </Router>
  </div>
  )
}

export default App
