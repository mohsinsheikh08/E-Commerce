import EliteStoreText from '../assets/EliteStoreText.png'
import DarkEliteStore from '../assets/darklogo.png'
import Motion from '../Features/Motion'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const CreateProduct = () => {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const [Error, setError] = useState('')
    const [Registered, setRegistered] = useState('')
    const [productName, setProductName] = useState('')
    const [productImage, setProductImage] = useState(null)
    const [description, setDescription] = useState('')
    const [brandName, setbrandName] = useState('')
    const [price, setPrice] = useState(0)
    const [stock, setStock] = useState(0)
    const [discount, setDiscount] = useState(0)
    const [tax, setTax] = useState(0)
    const [size, setSize] = useState('')
    const [category, setCategory] = useState('')
    const [color, setColor] = useState('')
    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('productName', productName);
        formData.append('description', description);    
        if (productImage) {
            formData.append('mainImage', productImage)
        }
        formData.append('price', price);
        formData.append('stock', stock);
        formData.append('brandName', brandName);
        if (size) formData.append('size', size);
        if (color) formData.append('color', color);
        if (category) formData.append('category', category);
        formData.append('discount', discount);
        try {
            setIsLoading(true)
            await axios.post('http://localhost:4000/api/product/create-product', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                withCredentials: true
            })
            setRegistered('Product created successfully!')
            setTimeout(() => {
                navigate('/EliteStore')
            }, 500);
        } catch (err) {
            console.log(err)
             console.log("Full Error:", err)
                  console.log("Error Response:", err.response)
                  console.log("Status Code:", err.response?.status)
                  console.log("Error Message:", err.response?.data?.message)
            setError('Product not create!')
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <Motion>
            <div className="w-full h-screen">
                <div className='w-full h-15 flex '>
                    <div className=' w-40 ml-5 flex justify-center  items-center '>
                        <a href='/EliteStore'> <div className='flex items-center gap-2'>
          <img className='w-10 h-10 object-contain' src={DarkEliteStore} alt="Logo" />
           <img className='object-contain w-full h-6' src={EliteStoreText} alt="Name" />
        </div></a>
                       
                    </div>
                </div>
                <div className=' md:py-5 pt-10  px-5  items-center flex justify-center flex-col '>
                    <div className=' px-5  rounded-2xl border-gray-500/90 border-2 '>
                        <div className='pt-3  flex flex-col items-center justify-center'>
                            <h1 className='text-4xl font-semibold'>Create <span className='text-[#FF6200]'>Product</span></h1>

                            {Error && (
                                <p className='text-red-500 text-xs mt-2'>{Error}</p>
                            )}
                            {Registered && (
                                <p className='text-green-500 text-xs mt-2'>{Registered}</p>
                            )}
                        </div>
                        <form className='mx-4' onSubmit={(e) => { submitHandler(e) }}>
                            <div className=' gap-5'>
                                <label>
                                    <p className='text-[#131921] font-semibold py-3'><span className='text-[#FF6200]'>*</span> Name</p>
                                    <input required value={productName} onChange={(e) => { setProductName(e.target.value) }} className='border-2 rounded-xl border-gray-500 pl-3 py-1 w-full' type="text" placeholder='Write product name!' />
                                </label>
                                <label>
                                    <p className='text-[#131921] font-semibold py-3'><span className='text-[#FF6200]'>*</span> Image</p>
                                    <input required onChange={(e) => { setProductImage(e.target.files[0]) }} className='border-2 rounded-xl border-gray-500 pl-3 py-1 w-full' type="file" accept='image/*' />
                                </label>
                                <label>
                                    <p className='text-[#131921] font-semibold py-3'><span className='text-[#FF6200]'>*</span> Description</p>
                                    <textarea required value={description} onChange={(e) => { setDescription(e.target.value) }} className='border-2 rounded-xl border-gray-500 pl-3 py-1 w-full' type="text" placeholder='Write product description!' />
                                </label>
                                <label>
                                    <p className='text-[#131921] font-semibold py-3'><span className='text-[#FF6200]'>*</span> Brand Name</p>
                                    <input required value={brandName} onChange={(e) => { setbrandName(e.target.value) }} className='border-2 rounded-xl border-gray-500 pl-3 py-1 w-full' type="text" placeholder='Write brand name!' />
                                </label>
                                <div className='flex gap-2'>
                                    <label>
                                        <p className='text-[#131921] font-semibold py-3'><span className='text-[#FF6200]'>*</span> Price</p>
                                        <input required value={price} onChange={(e) => { setPrice(e.target.value) }} className='border-2 rounded-xl border-gray-500 pl-3 py-1 w-full' type="number" placeholder='Write product price!' />
                                    </label>
                                    <label>
                                        <p className='text-[#131921] font-semibold py-3'><span className='text-[#FF6200]'>*</span> Stock</p>
                                        <input required value={stock} onChange={(e) => { setStock(e.target.value) }} className='border-2 rounded-xl border-gray-500 pl-3 py-1 w-full' type="number" placeholder='Write product stock!' />
                                    </label>
                                </div>
                                <label>
                                    <div className='flex items-center gap-2'><p className='text-[#131921] font-semibold py-3'><span className='text-[#FF6200]'>*</span> Discount</p> <p className='text-[10px]'>(Optional)</p></div>
                                    <input value={discount} onChange={(e) => { setDiscount(e.target.value) }} className='border-2 rounded-xl border-gray-500 pl-3 py-1 w-full' type="number" placeholder='Write discount!' />
                                </label>
                                <label>
                                    <div className='flex items-center gap-2'><p className='text-[#131921] font-semibold py-3'><span className='text-[#FF6200]'>*</span> Tax</p> <p className='text-xs text-[10px]'>(Optional)</p></div>
                                    <input value={tax} onChange={(e) => { setTax(e.target.value) }} className='border-2 rounded-xl border-gray-500 pl-3 py-1 w-full' type="number" placeholder='Write product tax!' />
                                </label>
                                <div className='flex justify-around items-center gap-2'>
                                    <label>
                                        <div className='flex items-center gap-2'><p className='text-[#131921] font-semibold py-3'><span className='text-[#FF6200]'>*</span> Size</p> <p className='text-xs text-[10px]'>(Optional)</p></div>
                                        <select onChange={(e) => { setSize(e.target.value) }} className='border-2  px-15 rounded-xl border-gray-500 pl-3  py-1 w-full' name="Size" >
                                            <option value="" hidden>Select Size</option>
                                            <option value="3XL">3XL</option>
                                            <option value="XXL">XXL</option>
                                            <option value="XL">XL</option>
                                            <option value="L">L</option>
                                            <option value="M">M</option>
                                            <option value="S">S</option>
                                            <option value="XS">XS</option>
                                        </select>
                                    </label>
                                    <label>
                                        <div className='flex items-center gap-2'><p className='text-[#131921] font-semibold py-3'><span className='text-[#FF6200]'>*</span> Color</p> <p className='text-xs text-[10px] '>(Optional)</p></div>
                                        <select onChange={(e) => { setColor(e.target.value) }} className='border-2  px-15 rounded-xl border-gray-500 pl-3 py-1 w-full' name="Color" >
                                            <option value="" hidden>Select Color</option>
                                            <option value="Black">Black</option>
                                            <option value="White">White</option>
                                            <option value="Red">Red</option>
                                            <option value="Blue">Blue</option>
                                            <option value="Brown">Brown</option>
                                            <option value="Green">Green</option>
                                            <option value="Yellow">Yellow</option>
                                            <option value="Gold">Gold</option>
                                            <option value="Silver">Silver</option>
                                            <option value="Purple">Purple</option>
                                            <option value="Pink">Pink</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </label>
                                </div>
                                <label>
                                    <div className='flex items-center gap-2'><p className='text-[#131921] font-semibold py-3'><span className='text-[#FF6200]'>*</span> Category</p> <p className='text-xs text-[10px]'>(Optional)</p></div>
                                    <select required onChange={(e) => { setCategory(e.target.value) }} className='border-2  px-5 rounded-xl border-gray-500 pl-3 py-1 w-full' name="Category" >
                                        <option value="" hidden>Select Category</option>
                                        <option value="Electronics">Electronics</option>
                                        <option value="Clothing">Clothing</option>
                                        <option value="Books">Books</option>
                                        <option value="Food">Food</option>
                                        <option value="Home">Home</option>
                                        <option value="Beauty">Beauty</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </label>
                            </div>
                            <div className='w-full py-5 flex justify-center items-center'>
                                <button className="bg-[#FF6200] text-[#ffff] font-semibold py-2 px-3 rounded-lg" type='submit'>{!isLoading ? "Create Product" : "Creating..."}</button>
                            </div>
                        </form>
                    </div>

                </div>

            </div>
        </Motion>
    )
}

export default CreateProduct