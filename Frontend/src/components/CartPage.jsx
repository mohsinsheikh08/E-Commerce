import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import EliteStoreText from '../assets/EliteStoreText.png'
import DarkEliteStore from '../assets/darklogo.png'
import { cartContext } from '../context/Context'
import Iphone from '../images/Iphone.jpg'

const CartPage = () => {
  const { cartInfo, setCartInfo } = useContext(cartContext)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getData = async () => {
      try {
        const cartResponse = await axios.get('http://localhost:4000/api/cart/cart', {
          withCredentials: true
        })
        setCartInfo(cartResponse.data?.cart || null)
        console.log('Cart fetched:', cartResponse.data?.cart)

      } catch (cartErr) {
        console.log('Cart not available:', cartErr.message)
        setCartInfo(null)
      } finally {
        setLoading(false)
      }
    }
    getData()

  }, [setCartInfo])
  const deleteData = async (productId) => {
    if (!confirm("Are you sure you want to remove this item from cart?")) {
      return;
    }

    try {
      const response = await axios.delete(`http://localhost:4000/api/cart/${productId}`, {
        withCredentials: true
      })
      setCartInfo(response?.data?.cart || null)
      console.log("Delete Cart", response?.data?.cart)
    } catch (err) {
      console.log(err.response.data)
    }
  }
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
            <p className='mt-4 text-gray-600'>Loading cart...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!cartInfo || cartInfo?.items?.length === 0) {
    return (
      <div className='min-h-screen bg-gray-50'>
        <div className='w-full h-16 flex justify-between items-center px-4 bg-white shadow'>
          <a href='/EliteStore'>
            <div className='flex items-center gap-2'>
              <img className='w-10 h-10 object-contain' src={DarkEliteStore} alt="Logo" />
              <img className='object-contain w-full h-6' src={EliteStoreText} alt="Name" />
            </div>
          </a>
        </div>
        <div className='flex flex-col items-center justify-center h-96'>
          <div className='text-6xl mb-4'>🛒</div>
          <h2 className='text-2xl font-bold text-gray-700'>Your cart is empty</h2>
          <p className='text-gray-500 mt-2'>Looks like you haven't added anything yet.</p>
          <Link to='/EliteStore'>
            <button className='mt-6 bg-[#FF6200] text-white px-6 py-2 rounded-lg hover:bg-[#e05500] transition'>
              Start Shopping
            </button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className='bg-gray-50 min-h-screen'>
      <div className='w-full h-16 flex justify-between items-center px-4 bg-white shadow'>
        <a href='/EliteStore'>
          <div className='flex items-center gap-2'>
            <img className='w-10 h-10 object-contain' src={DarkEliteStore} alt="Logo" />
            <img className='object-contain w-full h-6' src={EliteStoreText} alt="Name" />
          </div>
        </a>
      </div>

      <div className='w-full bg-gray-200 p-1 px-5'>
        <div className='w-full bg-gray-200 flex font-semibold justify-end items-center'>
          <p>Product: <span className='text-[#FF6200]'>{cartInfo?.totalItems || 0}</span></p>
        </div>
      </div>

      <div className='w-full bg-gray-200 p-2 flex flex-col gap-2'>
        {cartInfo?.items?.map((item, index) => {
          const productId = item?.product?._id;
          return (
            <div key={index} className='bg-white flex flex-col w-full rounded-2xl shadow-md p-4'>
              <div className='flex gap-5 items-center'>
                <div className='flex flex-col justify-center items-center rounded-2xl w-35 h-40'>
                  <img
                    className='object-contain rounded-2xl p-2'
                    src={item?.product?.mainImage || Iphone}
                    alt={item?.product?.productName || 'Product'}
                  />
                </div>
                <div>
                  <div className='flex-1 py-2'>
                    <h2 className='text-lg font-bold text-gray-800'>
                      {item?.product?.productName || 'Product Name'}
                    </h2>
                    {item?.product?.size && (
                      <p className='text-sm text-gray-500'>Size: {item.product.size}</p>
                    )}
                    {item?.product?.color && (
                      <p className='text-sm text-gray-500'>Color: {item.product.color}</p>
                    )}
                  </div>
                  <div className='flex flex-col gap-4 mt-2'>
                    <p className='text-sm text-gray-500'>
                      Price: <span className='font-semibold'>Rs. {item?.price?.toLocaleString() || 0}</span>
                    </p>
                    <div className='text-sm flex gap-2 items-center text-gray-500'>
                      <span>Qty:</span>
                      <span className='font-semibold'>{item.quantity}</span>
                    </div>
                    <p className='text-sm font-bold text-[#FF6200]'>
                      Subtotal: Rs. {((item?.price || 0) * (item?.quantity || 1)).toLocaleString()}
                    </p>
                    <button onClick={() => {deleteData(productId)}} className='font-bold border-[#FF6200] text-[#FF6200] border-2 w-20 flex rounded-lg justify-center py-1 hover:bg-red-50 transition'>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )
        })}

        <div className='bg-white w-full rounded-2xl shadow-md p-5 mt-4'>
          <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center'>
            <div>
              <p className='text-gray-500'>Total Items: <span className='font-bold'>{cartInfo?.totalItems || 0}</span></p>
              <p className='text-gray-500'>Total Products: <span className='font-bold'>{cartInfo?.items?.length || 0}</span></p>
            </div>
            <div className='sm:text-right mt-2 sm:mt-0'>
              <p className='text-sm text-gray-500'>Total Amount</p>
              <p className='text-3xl font-bold text-[#FF6200]'>
                Rs. {Math.floor(cartInfo?.totalPrice)?.toLocaleString() || 0}
              </p>
            </div>
          </div>

          <Link to='/order-info'>
            <button  className='w-full mt-5 bg-[#FF6200] text-white py-3 rounded-xl font-bold hover:bg-[#e05500] transition active:scale-[0.98]'>
              Proceed to Checkout
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CartPage