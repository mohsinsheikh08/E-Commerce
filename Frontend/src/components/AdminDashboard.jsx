// pages/AdminDashboard.jsx
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { 
  Package, 
  Users, 
  ShoppingBag, 
  DollarSign, 
  PlusCircle,
  Eye,
  LogOut,
} from 'lucide-react'
import EliteStoreText from '../assets/EliteStoreText.png'
import DarkEliteStore from '../assets/darklogo.png'

const AdminDashboard = () => {
  const navigate = useNavigate()
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalUsers: 0,
    totalOrder: 0,
    totalRevenue: 0
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [adminInfo, setAdminInfo] = useState(null)

  useEffect(() => {
    const getStats = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/auth/admin-stats', {
          withCredentials: true
        })
        setStats(response.data.stats)
        console.log('Stats:', response.data.stats)

        const adminResponse = await axios.get('http://localhost:4000/api/auth/admin-info', {
          withCredentials: true
        })
        setAdminInfo(adminResponse.data.admin)
        console.log('Admin Info:', adminResponse.data.admin)

      } catch (err) {
        console.log('Error:', err.response?.data)
        setError(err.response?.data?.message || 'Failed to load stats')
        if (err.response?.status === 409 || err.response?.status === 401) {
          navigate('/admin-login')
        }
      } finally {
        setLoading(false)
      }
    }
    getStats()
  }, [navigate])

  const handleLogout = async () => {
    try {
      await axios.get('http://localhost:4000/api/auth/admin-logout', {
        withCredentials: true
      })
      navigate('/admin-login')
    } catch (err) {
      console.log('Logout error:', err)
    }
  }

  if (loading) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF6200] mx-auto'></div>
          <p className='mt-4 text-gray-600'>Loading Dashboard...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <div className='text-center'>
          <div className='text-red-500 text-6xl mb-4'>⚠️</div>
          <h2 className='text-2xl font-bold text-gray-700'>Access Denied</h2>
          <p className='text-gray-500 mt-2'>{error}</p>
          <Link to='/admin-login'>
            <button className='mt-6 bg-[#FF6200] text-white px-6 py-2 rounded-lg hover:bg-[#e05500] transition'>
              Login as Admin
            </button>
          </Link>
        </div>
      </div>
    )
  }

  const statCards = [
    {
      title: 'Total Products',
      value: stats.totalProducts,
      icon: Package,
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      title: 'Total Users',
      value: stats.totalUsers,
      icon: Users,
      bgColor: 'bg-green-50',
      textColor: 'text-green-600'
    },
    {
      title: 'Total Orders',
      value: stats.totalOrder,
      icon: ShoppingBag,
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600'
    },
    {
      title: 'Revenue',
      value: `Rs. ${stats.totalRevenue?.toLocaleString() || 0}`,
      icon: DollarSign,
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600'
    }
  ]

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Header */}
      <div className='bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50'>
        <div className='max-w-7xl mx-auto px-4 h-16 flex justify-between items-center'>
          <Link to='/EliteStore'>
            <div className='flex items-center gap-2'>
              <img className='w-10 h-10 object-contain' src={DarkEliteStore} alt="Logo" />
              <img className='object-contain w-full h-6' src={EliteStoreText} alt="Name" />
            </div>
          </Link>
          <div className='flex items-center gap-4'>
            <span className='text-sm font-semibold text-gray-700 hidden sm:block'>Admin Panel</span>
            <button
              onClick={handleLogout}
              className='flex items-center gap-2 text-red-500 hover:text-red-700 transition px-3 py-1.5 rounded-lg hover:bg-red-50'
            >
              <LogOut size={18} />
              <span className='hidden sm:inline'>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className='max-w-7xl mx-auto px-4 py-6'>
        {/* Welcome */}
        <div className='mb-6'>
          <h1 className='text-2xl font-bold text-gray-800'>📊 Dashboard</h1>
          <p className='text-gray-500'>Welcome back, {adminInfo?.adminName}! Here's what's happening with your store.</p>
        </div>

        {/* Stats Cards */}
        <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mb-6'>
          {statCards.map((card, index) => {
            const Icon = card.icon
            return (
              <div key={index} className='bg-white rounded-xl shadow-sm p-5 hover:shadow-md transition'>
                <div className='flex items-center justify-between'>
                  <div>
                    <p className='text-sm text-gray-500 font-medium'>{card.title}</p>
                    <p className='text-2xl font-bold text-gray-800 mt-1'>{card.value}</p>
                  </div>
                  <div className={`${card.bgColor} p-3 rounded-xl`}>
                    <Icon className={`${card.textColor} w-6 h-6`} />
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Quick Actions */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-6'>
          <Link to='/create-product'>
            <div className='bg-white rounded-xl shadow-sm p-5 hover:shadow-md transition cursor-pointer border border-transparent hover:border-[#FF6200]'>
              <div className='flex items-center gap-4'>
                <div className='bg-[#FF6200]/10 p-3 rounded-xl'>
                  <PlusCircle className='text-[#FF6200] w-6 h-6' />
                </div>
                <div>
                  <h3 className='font-semibold text-gray-800'>Add New Product</h3>
                  <p className='text-sm text-gray-500'>Create a new product</p>
                </div>
              </div>
            </div>
          </Link>

          <Link to='/all-orders'>
            <div className='bg-white rounded-xl shadow-sm p-5 hover:shadow-md transition cursor-pointer border border-transparent hover:border-[#FF6200]'>
              <div className='flex items-center gap-4'>
                <div className='bg-blue-500/10 p-3 rounded-xl'>
                  <Eye className='text-blue-500 w-6 h-6' />
                </div>
                <div>
                  <h3 className='font-semibold text-gray-800'>View Orders</h3>
                  <p className='text-sm text-gray-500'>Manage all orders</p>
                </div>
              </div>
            </div>
          </Link>

          <Link to='/all-users'>
            <div className='bg-white rounded-xl shadow-sm p-5 hover:shadow-md transition cursor-pointer border border-transparent hover:border-[#FF6200]'>
              <div className='flex items-center gap-4'>
                <div className='bg-green-500/10 p-3 rounded-xl'>
                  <Users className='text-green-500 w-6 h-6' />
                </div>
                <div>
                  <h3 className='font-semibold text-gray-800'>View Users</h3>
                  <p className='text-sm text-gray-500'>Manage all users</p>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Recent Orders */}
        <div className='bg-white rounded-xl shadow-sm p-5'>
          <div className='flex justify-between items-center mb-4'>
            <h2 className='text-lg font-bold text-gray-800'>🛒 Recent Orders</h2>
            <Link to='/all-orders' className='text-[#FF6200] text-sm font-semibold hover:underline'>
              View All →
            </Link>
          </div>
          <div className='text-center py-8 text-gray-500'>
            <ShoppingBag size={40} className='mx-auto text-gray-300 mb-3' />
            <p>No recent orders to display</p>
            <p className='text-sm'>Orders will appear here once customers place them.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard