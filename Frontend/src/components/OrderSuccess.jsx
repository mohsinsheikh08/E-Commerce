// pages/OrderSuccess.jsx
import { useEffect, useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import axios from 'axios'
import EliteStoreText from '../assets/EliteStoreText.png'
import DarkEliteStore from '../assets/darklogo.png'

const OrderSuccess = () => {
  const location = useLocation()
  const [order, setOrder] = useState(location.state?.order || null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!order) {
      const fetchLastOrder = async () => {
        try {
          setLoading(true)
          const response = await axios.get('http://localhost:4000/api/order/my-orders', {
            withCredentials: true
          })
          const orders = response.data.order || []
          if (orders.length > 0) {
            setOrder(orders[0])
          }
        } catch (err) {
          console.log('Error fetching orders:', err)
        } finally {
          setLoading(false)
        }
      }
      fetchLastOrder()
    }
  }, [order])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF6200] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading order...</p>
        </div>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500">No order found.</p>
          <Link to="/EliteStore" className="text-[#FF6200]">Go to Home</Link>
        </div>
      </div>
    )
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-PK', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    })
  }

  const getStatusBadge = (status) => {
    const statusMap = {
      Pending: 'bg-yellow-200 text-yellow-800',
      Processing: 'bg-blue-200 text-blue-800',
      Shipped: 'bg-purple-200 text-purple-800',
      Delivered: 'bg-green-200 text-green-800',
      Cancelled: 'bg-red-200 text-red-800'
    }
    return statusMap[status] || 'bg-gray-200 text-gray-800'
  }

  return (
    <div className="min-h-screen bg-gray-50">

      <div className='w-full h-16 flex justify-between items-center px-4 bg-white shadow'>
        <a href='/EliteStore'>
          <div className='flex items-center gap-2'>
            <img className='w-10 h-10 object-contain' src={DarkEliteStore} alt="Logo" />
            <img className='object-contain w-full h-6' src={EliteStoreText} alt="Name" />
          </div>
        </a>
      </div>


      <div className="bg-white rounded-2xl shadow-sm p-6 mt-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">📊 Order Summary</h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm mb-4">
          <div>
            <p className="text-gray-500">Order ID</p>
            <p className="font-semibold">#{order?._id?.slice(-8)}</p>
          </div>
          <div>
            <p className="text-gray-500">Date</p>
            <p className="font-semibold">{formatDate(order?.createdAt)}</p>
          </div>
          <div>
            <p className="text-gray-500">Status</p>
            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusBadge(order?.status)}`}>
              {order?.status}
            </span>
          </div>
          <div>
            <p className="text-gray-500">Payment</p>
            <p className="font-semibold">{order?.paymentMethod}</p>
          </div>
        </div>

        <hr className="my-4" />

        <div className="space-y-3">
          <p className="font-semibold text-gray-700">🛍️ Items</p>
          {order?.items?.map((item, index) => (
            <div key={index} className="flex items-center gap-4 border-b border-gray-100 py-3">
              <img
                src={item.product?.mainImage || 'https://via.placeholder.com/60'}
                alt={item.product?.productName}
                className="w-16 h-16 object-contain rounded-lg bg-gray-50 p-1"
              />
              <div className="flex-1">
                <p className="font-medium">{item.product?.productName || 'Product'}</p>
                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
              </div>
              <div className="text-right">
                <p className="font-bold">Rs. {(item.price * item.quantity).toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>

        <hr className="my-4" />

        <div className="mt-4">
          <p className="font-semibold text-gray-700">📍 Delivery Address</p>
          <div className="bg-gray-50 rounded-lg p-4 mt-2 text-sm">
            <p>{order?.address?.street}</p>
            <p>{order?.address?.city}, {order?.address?.state}</p>
            <p>{order?.address?.zipCode}, {order?.address?.country}</p>
          </div>
        </div>

        <hr className="my-4" />

        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500">Total Items: {order?.totalItems || 0}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Total Amount</p>
            <p className="text-2xl font-bold text-[#FF6200]">
              Rs. {Math.floor(order?.totalPrice || 0).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderSuccess