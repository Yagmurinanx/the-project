import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import store from './Redux/store';
import { createRoot } from 'react-dom/client';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage'
import Cart from './pages/Cart';
import Favorites from './pages/Favorites';


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
        <Route path="/cart" element={<Cart />} />
        <Route path="/favorites" element={<Cart />} />
      </Routes>
    </div>
  </Router>
  </div>
  )
}

export default App
