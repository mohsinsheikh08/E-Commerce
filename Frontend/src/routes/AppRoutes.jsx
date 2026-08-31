import { Route, Routes} from 'react-router-dom'
import LandingPage from '../pages/LandingPage'
import UserLogin from '../pages/UserLogin'
import AdminLogin from '../pages/AdminLogin'
import UserSignin from '../pages/UserSignin'
import AdminSignin from '../pages/AdminSignin'
import Motion from '../Features/Motion'
import Home from '../components/Home.jsx'
import CreateProduct from '../pages/CreateProduct.jsx'
import ProductPage from '../components/ProductPage.jsx'
import CartPage from '../components/CartPage.jsx'
import OrderSuccess from '../components/OrderSuccess.jsx'
import OrderInfo from '../pages/OrderInfo.jsx'
import AdminDashboard from '../components/AdminDashboard.jsx'

const AppRoutes = () => {
  return (
    <div>
      <Motion>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path='/user-login' element={<UserLogin />} />
          <Route path='/admin-login' element={<AdminLogin />} />
          <Route path='/user-signin' element={<UserSignin />} />
          <Route path='/admin-signin' element={<AdminSignin />} />
          <Route path='/create-product' element={<CreateProduct />} />
          <Route path='/EliteStore' element={<Home />} />
          <Route path='/product-page/:id' element={<ProductPage />} />
          <Route path='/cart-page' element={<CartPage />}/>
          <Route path='/order-history' element={<OrderSuccess/>}/>
          <Route path='/order-info' element={<OrderInfo />} />
          <Route path='/admin-board' element={<AdminDashboard />} />
        </Routes>
      </Motion>
    </div>
  )
}

export default AppRoutes