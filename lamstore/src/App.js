import './App.css';
import {Navbar} from '../src/Components/Navbar/Navbar.jsx';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { ShopCategory } from './Pages/ShopCategory.jsx';
import { Shop } from './Pages/Shop.jsx';
import { LoginSignup } from './Pages/LoginSignup.jsx';
import { Product } from './Pages/Product.jsx';
import { Cart } from './Pages/Cart.jsx';
import Footer from './Components/Footer/Footer.jsx';
import skincare_banner from './Components/Assets/banners/skincare.png';
import body_banner from './Components/Assets/banners/hairandbody.png';
import makeup_banner from './Components/Assets/banners/makeup.png';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path="/" element={<Shop/>}/>
          <Route path="/skincare" element={<ShopCategory category="skincare" banner={skincare_banner}/>}/>
          <Route path="/body" element={<ShopCategory category="body" banner={body_banner}/>}/>
          <Route path="/makeup" element={<ShopCategory category='makeup' banner={makeup_banner}/>}/>
          <Route path='/product' element={<Product/>}>
              <Route path=':productId' element={<Product/>} />
          </Route>
          <Route path='/cart' element={<Cart/>} />
          <Route path=' cartId' element={<Cart/>} />
          <Route path="/login" element={<LoginSignup/>}/>
        </Routes>

      <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;


