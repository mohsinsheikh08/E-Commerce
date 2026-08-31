import EliteStoreText from '../assets/EliteStoreText.png'
import DarkEliteStore from '../assets/darklogo.png'
import Motion from '../Features/Motion'
import { useState } from 'react'
import { Eye, EyeClosed } from 'lucide-react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'

const AdminSignin = () => {
  const navigate = useNavigate()
  const [isPassword, setIsPassword] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [Error, setError] = useState('')
  const [businessName, setBusinessName] = useState('')
  const [adminImage, setAdminImage] = useState(null)
  const [adminName, setAdminName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [number, setNumber] = useState('')
  const [street, setStreet] = useState('')
  const [city, setCity] = useState('')
  const [zipCode, setzipCode] = useState('')
  const [country, setCountry] = useState('')
  const [state, setState] = useState('')
  const [role, setRole] = useState('')
  const [businessType, setBusinessType] = useState('')
  const [Registered, setRegistered] = useState('')

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('businessName', businessName);
    formData.append('businessType', businessType || 'Other');
    formData.append('adminName', adminName);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('phone', number);
    if (adminImage) {
      formData.append('adminImage', adminImage);
    }
    formData.append('street', street);
    formData.append('city', city);
    formData.append('state', state);
    formData.append('zipCode', zipCode);
    formData.append('country', country);
    formData.append('role', role || 'product_admin')

    try {
      setIsLoading(true)
      await axios.post('http://localhost:4000/api/auth/admin-register', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true
      })
      setRegistered('Admin registered successfully!')
      setTimeout(() => {
        navigate('/EliteStore')
      }, 500);
    } catch (err) {
      setError('Admin not registered!')
      console.log("Full Error:", err)
      console.log("Error Response:", err.response)
      console.log("Status Code:", err.response?.status)
      console.log("Error Message:", err.response?.data?.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Motion>
      <div className="w-full h-screen">
        <div className='w-full h-15 flex '>
          <div className=' w-40 ml-5 flex justify-center items-center '>
            <img className='w-full h-10 object-contain' src={DarkEliteStore} alt="Logo" />
            <img className='object-contain w-full h-6' src={EliteStoreText} alt="Name" />
          </div>
        </div>
        <div className=' md:py-5 items-center flex justify-center flex-col '>
          <div className=' rounded-2xl border-gray-500/90 border-2 '>
            <div className='pt-3 flex flex-col items-center justify-center'>
              <h1 className='text-4xl font-semibold'>Sign <span className='text-[#FF6200]'>Up</span></h1>

              {Error && (
                <p className='text-red-500 text-xs mt-2'>{Error}</p>
              )}
              {Registered && (
                <p className='text-green-500 text-xs mt-2'>{Registered}</p>
              )}
              <div className='text-xs text-[#131921] pt-5'>Buy with us? <Link to='/user-signin' className='text-[#FF6200] font-semibold'>Create User Account</Link></div>
            </div>
            <form className='mx-4' onSubmit={(e) => { submitHandler(e) }}>
              <div className=' gap-5'>
                <label>
                  <div>
                    <p className='text-[#131921] font-semibold py-3'><span className='text-[#FF6200]'>*</span> Admin Image</p>
                    <input onChange={(e) => { setAdminImage(e.target.files[0]) }} className='border-2 rounded-xl border-gray-500 pl-3 py-1 w-full ' type='file' accept='image/*' />
                  </div>
                </label>
                <label>
                  <p className='text-[#131921] font-semibold py-3'><span className='text-[#FF6200]'>*</span> Business Name</p>
                  <input required value={businessName} onChange={(e) => { setBusinessName(e.target.value) }} className='border-2 rounded-xl border-gray-500 pl-3 py-1 w-full' type="text" placeholder='Write business name!' />
                </label>

                <label>
                  <p className='text-[#131921] font-semibold py-3'><span className='text-[#FF6200]'>*</span> Admin Name</p>
                  <input required value={adminName} onChange={(e) => { setAdminName(e.target.value) }} className='border-2 rounded-xl border-gray-500 pl-3 py-1 w-full' type="text" placeholder='Write admin name!' />
                </label>
              </div>
              <label>
                <div>
                  <p className='text-[#131921] font-semibold py-3'><span className='text-[#FF6200]'>*</span> Email</p>
                  <input required value={email} onChange={(e) => { setEmail(e.target.value) }} className='border-2 rounded-xl border-gray-500 pl-3 py-1 w-full' type="text" placeholder='Write your email!' />
                </div>
              </label>
              <label>
                <div>
                  <p className='text-[#131921] font-semibold py-3'><span className='text-[#FF6200]'>*</span> Password</p>
                  <div className='flex justify-center items-center'>
                    <input required value={password} onChange={(e) => { setPassword(e.target.value) }} className='border-2 border-r-0 rounded-tr-none rounded-br-none rounded-xl border-gray-500 pl-3 py-1 w-full ' type={!isPassword ? 'text' : 'password'} placeholder='Write your password!' />
                    <button type='button' onClick={() => { isPassword === true ? setIsPassword(false) : setIsPassword(true) }} className='border-2 py-1 cursor-pointer rounded-xl rounded-tl-none rounded-bl-none px-1 border-l-0 '>{!isPassword ? <Eye /> : <EyeClosed />}</button>
                  </div>
                </div>
              </label>
              <label>
                <div>
                  <p className='text-[#131921] font-semibold py-3'><span className='text-[#FF6200]'>*</span> Number</p>
                  <input required value={number} onChange={(e) => { setNumber(e.target.value) }} className='border-2 rounded-xl border-gray-500 pl-3 py-1 w-full ' type='text' placeholder='Write your phone number!' />
                </div>
              </label>
              <h1 className='pt-5 text-[#131921] font-semibold'><span className='text-[#FF6200]'>*</span> Address</h1>
              <div className=" md:flex md:gap-5">
                <label>
                  <div>
                    <p className='text-[#131921] font-semibold py-3'><span className='text-[#FF6200]'>*</span> Street</p>
                    <input value={street} required onChange={(e) => { setStreet(e.target.value) }} className='border-2 rounded-xl border-gray-500 pl-3 py-1 w-full ' type='text' placeholder='Write your street!' />
                  </div>
                </label>
                <label>
                  <div className=''>
                    <p className='text-[#131921] font-semibold py-3'><span className='text-[#FF6200]'>*</span> City</p>
                    <input value={city} required onChange={(e) => { setCity(e.target.value) }} className='border-2 rounded-xl border-gray-500 pl-3 py-1 w-full ' type='text' placeholder='Write your city!' />
                  </div>
                </label>
              </div>
              <div className=" md:flex md:gap-5">
                <label>
                  <div>
                    <p className='text-[#131921] font-semibold py-3'><span className='text-[#FF6200]'>*</span> State</p>
                    <input required value={state} onChange={(e) => { setState(e.target.value) }} className='border-2 rounded-xl border-gray-500 pl-3 py-1 w-full ' type='text' placeholder='Write your State!' />
                  </div>
                </label>
                <label>
                  <div className=''>
                    <p className='text-[#131921] font-semibold py-3'><span className='text-[#FF6200]'>*</span> Zip Code</p>
                    <input required value={zipCode} onChange={(e) => { setzipCode(e.target.value) }} className='border-2 rounded-xl border-gray-500 pl-3 py-1 w-full ' type='text' placeholder='Write your Zip Code!' />
                  </div>
                </label>
              </div>
              <div className=" md:flex md:gap-5">
                <label>
                  <div>
                    <p className='text-[#131921] font-semibold py-3'><span className='text-[#FF6200]'>*</span> Country</p>
                    <input required value={country} onChange={(e) => { setCountry(e.target.value) }} className='border-2 rounded-xl border-gray-500 pl-3 py-1 w-full ' type='text' placeholder='Write your country!' />
                  </div>
                </label>
              </div>
              <label>
                <div>
                  <p className='text-[#131921] font-semibold py-3'><span className='text-[#FF6200]'>*</span> Business Type</p>
                  <select value={businessType} onChange={(e) => { setBusinessType(e.target.value) }} required className='border-2 px-3 rounded-xl border-gray-500 pl-3 py-1 w-full' name="role" id="">
                    <option value="" hidden disabled>Select Business Type</option>
                    <option value="E-commerce">E-Commerce</option>
                    <option value="Restaurant">Restaurant</option>
                    <option value="Retail">Retail</option>
                    <option value="Service">Service</option>
                    <option value="Wholesale">Wholesale</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </label>

              <label>
                <div>
                  <p className='text-[#131921] font-semibold py-3'><span className='text-[#FF6200]'>*</span> Role</p>
                  <select value={role} required onChange={(e) => { setRole(e.target.value) }} className='border-2 px-3 rounded-xl border-gray-500 pl-3 py-1 w-full' name="role" id="">
                    <option className="hidden" value="" disabled >Select Role</option>
                    <option value="product_admin">Product Admin</option>
                    <option value="order_manager">Order Manager</option>
                    <option value="user_manager">User Manager</option>
                  </select>
                </div>
              </label>
              <div className='w-full py-5 flex justify-center items-center'>
                <button className="bg-[#FF6200] text-[#ffff] font-semibold py-2 px-3 rounded-lg" type='submit'>{!isLoading ? "Create Account" : "Creating..."}</button>
              </div>
            </form>
            <div className='w-full flex justify-center items-center'>
              <div className='text-xs text-[#131921] py-5'>Already have an account? {' '} <Link to='/admin-login' className='text-[#FF6200] font-semibold'>Login</Link></div>
            </div>
          </div>
        </div>
      </div>
    </Motion>
  )
}

export default AdminSignin