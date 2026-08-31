import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import { Star, Minus, Plus, Truck, Shield, RotateCcw, MoveLeft } from 'lucide-react'
import DarkEliteStore from '../assets/darklogo.png'
import EliteStoreText from '../assets/EliteStoreText.png'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api'

const ProductPage = () => {
    const { id } = useParams();
    const [product, setproduct] = useState({})
    const [stockNum, setstockNum] = useState(1)
    const [loading, setLoading] = useState(false)
    
    useEffect(() => {
        const getData = async () => {
            try {
                setLoading(true)
                const response = await axios.get(`${API_URL}/product/${id}`)
                console.log(response.data.product)
                setproduct(response.data.product)
            } catch (err) {
                console.log(err)
                console.log("Full Error:", err)
                console.log("Error Response:", err.response)
                console.log("Status Code:", err.response?.status)
                console.log("Error Message:", err.response?.data?.message)
            } finally {
                setLoading(false)
            }
        }
        getData()
    }, [id])

    const ProductPrice = product.price;
    const discount = product.discount;
    const discountPrice = Math.floor((ProductPrice * discount) / 100)
    const productStock = product.stock;

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
                        <p className='mt-4 text-gray-600'>Loading Product Page...</p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
                <div className="flex items-center justify-between px-4 h-16 max-w-7xl mx-auto">
                    <a href='/EliteStore'>
                        <div className='flex items-center gap-2'>
                            <img className='w-10 h-10 object-contain' src={DarkEliteStore} alt="Logo" />
                            <img className='object-contain w-full h-6' src={EliteStoreText} alt="Name" />
                        </div>
                    </a>
                </div>
            </div>

            <div className="px-4 py-3 max-w-7xl mx-auto">
                <Link to='/EliteStore'>
                    <p className="inline-flex items-center gap-2 text-[#FF6200] font-semibold hover:text-[#e05500] transition-colors duration-200">
                        <MoveLeft size={18} />
                        Back to Products
                    </p>
                </Link>
            </div>

            <div className="max-w-7xl md:hidden mx-auto px-4 pb-8">
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                    <div className="flex justify-center items-center p-6 bg-gray-50">
                        <img
                            src={product.mainImage}
                            alt={product.productName}
                            className="w-full max-w-md h-auto object-contain max-h-[400px]"
                        />
                    </div>
                    <div className="p-5 space-y-4">
                        <h1 className="text-xl font-bold text-gray-800 leading-tight">
                            {product.productName}
                        </h1>
                        <p className="text-sm text-[#ed5b00] font-medium">
                            {product.description}
                        </p>
                        <hr className="border-gray-100" />
                        <div className="flex items-center gap-2">
                            <div className="flex text-yellow-400">
                                <Star size={16} fill="currentColor" />
                                <Star size={16} fill="currentColor" />
                                <Star size={16} fill="currentColor" />
                                <Star size={16} fill="currentColor" />
                                <Star size={16} fill="currentColor" />
                            </div>
                            <span className="text-sm font-semibold">4.8</span>
                            <span className="text-sm text-gray-500">(120 Reviews)</span>
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-gray-800">
                                Rs. {product?.price?.toLocaleString() || 0}
                            </p>
                            <div className="flex items-center gap-3 mt-1">
                                <p className="text-sm line-through text-gray-400 font-medium">
                                    Rs. {discountPrice?.toLocaleString() || 0}
                                </p>
                                <span className="text-xs font-bold text-white bg-[#FF6200] px-3 py-1 rounded-full">
                                    -{discount}% off
                                </span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm font-semibold">
                            {productStock === 0 ? (
                                <span className="text-red-500">Out of Stock</span>
                            ) : (
                                <span className="text-green-600">In Stock</span>
                            )}
                            <span className="text-gray-500 font-normal">
                                ({product.stock} available)
                            </span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 p-3 bg-gray-50 rounded-xl text-xs font-semibold">
                            <div className="flex items-center gap-1.5 text-gray-700">
                                <span>Brand:</span>
                                <span className="text-gray-900">{product.brandName || "--"}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-gray-700">
                                <span>Category:</span>
                                <span className="text-gray-900">{product.category || "--"}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-gray-700">
                                <span>Size:</span>
                                <span className="text-gray-900">{product.size || "--"}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-gray-700">
                                <span>Color:</span>
                                <span className="text-gray-900">{product.color || "--"}</span>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 gap-1.5 p-3 bg-gray-50 rounded-xl text-xs font-semibold">
                            <div className="flex items-center gap-1.5 text-gray-700">
                                <span>Seller:</span>
                                <span className="text-gray-900">{product.sellerInfo?.adminName || "Not available"}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-gray-700">
                                <span>Email:</span>
                                <span className="text-gray-900">{product.sellerInfo?.email || "Not available"}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-gray-700">
                                <span>Phone:</span>
                                <span className="text-gray-900">{product.sellerInfo?.phone || "Not available"}</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-sm font-semibold text-gray-700">Quantity</span>
                            <div className="flex items-center gap-3">
                                <button disabled={stockNum === 1} className={`
                                    ${stockNum === 1 ? "p-1.5 bg-gray-300 rounded-lg cursor-not-allowed transition-colors duration-200" : "p-1.5 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"}
                                `}>
                                    <Minus onClick={() => { setstockNum(stockNum - 1) }} size={18} className="text-gray-600" />
                                </button>
                                <span className="text-lg font-semibold w-6 text-center">{stockNum}</span>
                                <button disabled={product.stock < stockNum} className={`
                                    ${product.stock < stockNum ? "p-1.5 bg-gray-300 rounded-lg cursor-not-allowed transition-colors duration-200" : "p-1.5 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"}
                                `}>
                                    <Plus onClick={() => { setstockNum(stockNum + 1) }} size={18} className="text-gray-600" />
                                </button>
                            </div>
                        </div>
                        <button disabled={product.stock === 0} className={`
                            ${product.stock === 0 ? "w-full bg-[#e25700] cursor-not-allowed text-white font-bold py-3 rounded-full transition-all duration-200 shadow-sm hover:shadow-md active:scale-[0.98]" : "w-full bg-[#FF6200] hover:bg-[#e05500] text-white font-bold py-3 rounded-full transition-all duration-200 shadow-sm hover:shadow-md active:scale-[0.98]"}
                        `}>
                            {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
                        </button>
                    </div>
                </div>
            </div>

            <div className='px-3 hidden md:flex'>
                <div className='w-[30%] flex justify-center items-center'>
                    <img className='w-150 rounded-xl bg-white h-95 lg:h-108 object-contain' src={product.mainImage} alt="" />
                </div>
                <div className='w-[70%] gap-4 flex rounded-xl mx-4'>
                    <div className='w-[70%] rounded-xl bg-white flex flex-col gap-3 px-4 pt-4'>
                        <p className='text-xl lg:text-2xl font-semibold'>{product.productName}</p>
                        <p className='text-[#ed5b00] text-md h-20 font-semibold line-clamp-3 text-sm pr-5 lg:text-lg'>{product.description}</p>
                        <div className="flex items-center gap-2">
                            <div className="flex text-yellow-400">
                                <Star size={16} fill="currentColor" />
                                <Star size={16} fill="currentColor" />
                                <Star size={16} fill="currentColor" />
                                <Star size={16} fill="currentColor" />
                                <Star size={16} fill="currentColor" />
                            </div>
                            <span className="text-sm font-semibold">4.8</span>
                            <span className="text-sm text-gray-500">(120 Reviews)</span>
                        </div>
                        <div>
                            <p className="text-3xl lg:text-4xl font-bold text-gray-800">
                                Rs. {discountPrice}
                            </p>
                            {discount === 0 ? " " :
                                <div className="flex items-center gap-3 mt-2">
                                    <p className="text-md line-through text-gray-400 font-medium">
                                        Rs. {product.price}
                                    </p>
                                    <span className="text-sm font-bold text-white bg-[#FF6200] px-3 py-1 rounded-full">
                                        -{discount}% off
                                    </span>
                                </div>
                            }
                            <div className="flex items-center pt-3 gap-2 text-sm font-semibold">
                                {productStock === 0 ? (
                                    <span className="text-red-500">Out of Stock</span>
                                ) : (
                                    <span className="text-green-600">In Stock</span>
                                )}
                                <span className="text-gray-500 font-normal">
                                    ({product.stock} available)
                                </span>
                            </div>
                        </div>
                        <div className="flex items-center lg:pt-4 gap-4">
                            <span className="text-sm font-semibold lg:text-xl text-gray-700">Quantity</span>
                            <div className="flex items-center gap-3">
                                <button disabled={stockNum === 1} className={`
                                    ${stockNum === 1 ? "p-1.5 bg-gray-300 rounded-lg cursor-not-allowed transition-colors duration-200" : "p-1.5 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"}
                                `}>
                                    <Minus onClick={() => { setstockNum(stockNum - 1) }} size={18} className="text-gray-600" />
                                </button>
                                <span className="text-lg font-semibold w-6 text-center">{stockNum}</span>
                                <button disabled={product.stock < stockNum} className={`
                                    ${product.stock < stockNum ? "p-1.5 bg-gray-300 rounded-lg cursor-not-allowed transition-colors duration-200" : "p-1.5 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"}
                                `}>
                                    <Plus onClick={() => { setstockNum(stockNum + 1) }} size={18} className="text-gray-600" />
                                </button>
                            </div>
                        </div>
                        <button disabled={product.stock === 0} className={`
                            ${product.stock === 0 ? "w-full bg-[#e25700] cursor-not-allowed text-white font-bold py-2 mt-2 rounded-full transition-all duration-200 shadow-sm hover:shadow-md active:scale-[0.98]" : "w-full bg-[#FF6200] hover:bg-[#e05500] text-white font-bold mt-3 py-1.5 rounded-full transition-all duration-200 shadow-sm hover:shadow-md active:scale-[0.98]"}
                        `}>
                            {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
                        </button>
                    </div>
                    <div className='w-[30%] rounded-xl p-1 flex flex-col lg:justify-between space-y-4 bg-white'>
                        <div className="grid grid-cols-1 space-y-4 p-3 bg-gray-50 rounded-xl text-xs font-semibold">
                            <div className="flex items-center gap-1.5 text-gray-700">
                                <span>Brand:</span>
                                <span className="text-gray-900 truncate">{product.brandName || "--"}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-gray-700">
                                <span>Category:</span>
                                <span className="text-gray-900 truncate">{product.category || "--"}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-gray-700">
                                <span>Size:</span>
                                <span className="text-gray-900 truncate">{product.size || "--"}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-gray-700">
                                <span>Color:</span>
                                <span className="text-gray-900 truncate">{product.color || "--"}</span>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 space-y-4 px-3 mt-2 py-2 bg-gray-50 rounded-xl text-xs font-semibold">
                            <div className="flex items-center gap-1.5 text-gray-700">
                                <span>Seller:</span>
                                <span className="text-gray-900 truncate">{product.sellerInfo?.adminName || "Not available"}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-gray-700">
                                <span>Email:</span>
                                <span className="text-gray-900 truncate">{product.sellerInfo?.email || "Not available"}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-gray-700">
                                <span>Phone:</span>
                                <span className="text-gray-900 truncate">{product.sellerInfo?.phone || "Not available"}</span>
                            </div>
                        </div>
                        <div className="space-y-3 px-3 bg-gray-50 rounded-xl py-2">
                            <div className="flex items-center gap-2.5 text-sm text-[#FF6200]">
                                <Truck size={18} className="flex-shrink-0" />
                                <p className="font-medium truncate">Free Delivery</p>
                            </div>
                            <div className="flex items-center gap-2.5 text-sm text-[#FF6200]">
                                <Shield size={18} className="flex-shrink-0" />
                                <p className="font-medium truncate">Secure Payments</p>
                            </div>
                            <div className="flex items-center gap-2.5 text-sm text-[#FF6200]">
                                <RotateCcw size={18} className="flex-shrink-0" />
                                <p className="font-medium truncate">30-Day Returns</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductPage