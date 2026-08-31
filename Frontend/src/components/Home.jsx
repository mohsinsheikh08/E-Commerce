import DarkEliteStore from '../assets/darklogo.png'
import { Search, Menu, X, ShoppingCart, Truck } from 'lucide-react'
import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import EliteStoreText from '../assets/EliteStoreText.png'
import { cartContext } from '../context/Context'

const Home = () => {
  const { setCartInfo, cartInfo } = useContext(cartContext)
  const [isOpen, setIsOpen] = useState(false)
  const [products, setProducts] = useState([])
  const [adminInfo, setAdminInfo] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [inputVal, setInputVal] = useState('')
  const [getVal, setgetVal] = useState('')
  const categories = ['All', 'Electronics', 'Clothing', 'Books', 'Food', 'Home', 'Beauty']
  console.log("VITE_API_URL:", import.meta.env.VITE_API_URL);
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/product/all-products`, {
          withCredentials: true
        })
        setProducts(response.data?.products)

        const secResponse = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/admin-info`, {
          withCredentials: true
        })
        setAdminInfo(secResponse.data?.admin)

        try {
          const cartResponse = await axios.get(`${import.meta.env.VITE_API_URL}/api/cart/cart`, {
            withCredentials: true
          })
          setCartInfo(cartResponse.data?.cart || null)
          console.log('Cart fetched:', cartResponse.data?.cart)
        } catch (cartErr) {
          console.log('Cart not available:', cartErr.message)
          setCartInfo(null)
        }

      } catch (err) {
        console.log(err)
        console.log(err.response?.data)
        setError('Failed to load products!')
      } finally {
        setLoading(false)
      }
    }
    getData()
  }, [setCartInfo])

  const cartData = async (productId) => {
    try {
      const thirdResponse = await axios.post(`http://localhost:4000/api/cart/item/${productId}`, {
        quantity: 1,
      }, {
        withCredentials: true
      })
      setCartInfo(thirdResponse.data.cart)
      console.log(thirdResponse.data.cart)
    } catch (err) {
      console.log('❌ Error:', err);
      console.log('❌ Error Response:', err.response?.data);
    }
  }

  const filteredByCategory = selectedCategory === 'All'
    ? products
    : products.filter((product) => product.category === selectedCategory)

  const filteredProducts = getVal.trim() === ''
    ? filteredByCategory
    : filteredByCategory.filter((product) =>
      product.productName.toLowerCase().includes(getVal.toLowerCase())
    )

  if (loading) {
    return (
      <div className='bg-gray-50'>
        <div className='w-full h-16 flex justify-between items-center px-4 bg-white shadow'>
          <a href='/EliteStore'>
            <div className='flex items-center gap-2'>
              <img className='w-10 h-10 object-contain' src={DarkEliteStore} alt="Logo" />
              <img className='object-contain w-full h-6' src={EliteStoreText} alt="Name" />
            </div>
          </a>
        </div>
        <div className='flex items-center justify-center h-96'>
          <div className='text-center'>
            <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF6200] mx-auto'></div>
            <p className='mt-4 text-gray-600'>Loading EliteStore...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gray-50">
        <div className="text-xl text-red-500">{error}</div>
      </div>
    )
  }

  return (
    <div className="w-full relative min-h-screen bg-gray-50">
      <div className='w-full h-16 flex justify-between items-center px-4 bg-white shadow'>
        <a href='/EliteStore'>
          <div className='flex items-center gap-2'>
            <img className='w-10 h-10 object-contain' src={DarkEliteStore} alt="Logo" />
            <img className='object-contain w-full h-6' src={EliteStoreText} alt="Name" />
          </div>
        </a>

        <div className='hidden md:flex flex-1 max-w-xl mx-4'>
          <input
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setgetVal(inputVal)
              }
            }}
            className='w-full px-4 py-2 rounded-l-lg border border-gray-300 text-black focus:outline-none focus:border-[#FF6200]'
            type="text"
            placeholder='Search EliteStore'
          />
          <button onClick={() => { setgetVal(inputVal) }} className='bg-[#FF6200] px-4 rounded-r-lg hover:bg-[#e55a00] transition text-white'>
            <Search size={20} />
          </button>
        </div>

        <div className='flex items-center gap-4'>
          <Link to="/order-history" className="relative hover:text-[#FF6200] transition">
            <Truck size={24} className="text-[#131921]" />
          </Link>

          <Link to="/cart-page" className="relative hover:text-[#FF6200] transition">
            <ShoppingCart size={24} className="text-[#131921]" />
            <span className='absolute -top-2 -right-2 bg-[#FF6200] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center'>{cartInfo?.totalItems || 0}</span>
          </Link>

          <Link to="/user-login" className="hidden md:block text-[#131921] hover:text-[#FF6200] transition">
            Login
          </Link>

          {adminInfo ? <Link to='/admin-board'><img className='rounded-full w-10 h-10 border-2 border-[#FF6200]' src={adminInfo?.adminImage} alt="Profile" /></Link> : ""}

          <button className='md:hidden text-[#131921]' onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <div className={`
        md:hidden transition-all z-100 w-110 absolute top-15 duration-300 ease-in-out bg-white shadow-lg
        ${isOpen ? 'max-h-60 opacity-100 py-4' : 'max-h-0 opacity-0 overflow-hidden'}
      `}>
        <div className="px-4 bg-white space-y-3">
          <div className='flex'>
            <input
              onChange={(e) => setInputVal(e.target.value)}
              className='flex-1 px-4 py-2 rounded-l-lg border border-gray-300 text-black focus:outline-none'
              type="text"
              placeholder='Search...'
            />
            <button onClick={() => { setgetVal(inputVal) }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setgetVal(inputVal)
                }
              }}
              className='bg-[#FF6200] px-4 rounded-r-lg text-white'>
              <Search size={20} />
            </button>
          </div>
          <Link to="/cart" className="block text-[#131921] py-2 active:text-white active:bg-[#FF6200] pl-2 rounded-md hover:text-[#FF6200] transition">Cart</Link>
          <Link to="/user-login" className="block text-[#131921] py-2 active:text-white active:bg-[#FF6200] pl-2 rounded-md hover:text-[#FF6200] transition">Login</Link>
          <Link to="/user-signin" className="block text-[#131921] hover:text-[#FF6200] py-2 active:text-white active:bg-[#FF6200] pl-2 rounded-md transition">Sign Up</Link>
        </div>
      </div>

      <div className="bg-white border-y border-gray-200 top-16 z-40">
        <div className="max-w-7xl mx-auto px-4">
          <ul className='flex text-sm text-[#131921] font-medium h-12 w-full gap-1 items-center overflow-x-auto'>
            {categories.map((cat) => (
              <li
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`cursor-pointer px-4 py-1.5 rounded-full transition-all duration-200 whitespace-nowrap ${selectedCategory === cat
                  ? 'bg-[#FF6200] text-white'
                  : 'hover:text-[#FF6200] hover:bg-orange-50'
                  }`}
              >
                {cat}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="max-w-7xl relative z-1 mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-[#131921]">
            {selectedCategory === 'All' ? 'All' : selectedCategory} <span className="text-[#FF6200]">Products</span>
          </h2>
          <span className="text-sm text-gray-500">{filteredProducts.length} products</span>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-gray-500">No products found</p>
          </div>
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            {filteredProducts.map((product) => {
              const discountPrice = product.discount
                ? product.price - (product.price * product.discount / 100)
                : product.price

              return (
                <div className='relative group' key={product._id}>
                  <div className='bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden'>
                    <Link to={`/product-page/${product._id}`} className="block">
                      <div className='w-full h-48 overflow-hidden bg-gray-50'>
                        <img
                          className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
                          src={product.mainImage}
                          alt={product.productName}
                        />
                      </div>
                    </Link>

                    <div className='p-4'>
                      <Link to={`/product-page/${product._id}`}>
                        <p className='text-sm font-semibold text-[#131921] hover:text-[#FF6200] transition truncate'>
                          {product.productName}
                        </p>
                      </Link>

                      <div className="flex items-center gap-2 mt-1">
                        <p className='font-bold text-[#FF6200] text-lg'>
                          Rs. {Math.floor(discountPrice).toLocaleString()}
                        </p>
                        {product.discount > 0 && (
                          <p className='text-gray-400 text-sm line-through'>
                            Rs. {product.price.toLocaleString()}
                          </p>
                        )}
                        {product.discount > 0 && (
                          <span className="bg-[#FF6200] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                            -{product.discount.toLocaleString()}%
                          </span>
                        )}
                      </div>

                      <div className="mt-1">
                        {product.stock > 0 ? (
                          <span className='text-green-600 text-xs font-semibold'>✓ In Stock ({product.stock})</span>
                        ) : (
                          <span className='text-red-500 text-xs font-semibold'>✗ Out of Stock</span>
                        )}
                      </div>

                      <button
                        onClick={() => { cartData(product._id) }}
                        className={`font-semibold cursor-pointer w-full mt-3 py-2 rounded-lg transition-all duration-300 ${product.stock > 0
                          ? 'bg-[#FF6200] text-white hover:bg-[#e55a00]'
                          : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                          }`}
                        disabled={product.stock === 0}
                      >
                        {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default Home