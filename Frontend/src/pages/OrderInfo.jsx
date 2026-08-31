import EliteStoreText from '../assets/EliteStoreText.png'
import DarkEliteStore from '../assets/darklogo.png'
import Motion from '../Features/Motion'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const OrderInfo = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [Error, setError] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('')
  const [street, setStreet] = useState('')
  const [city, setCity] = useState('')
  const [zipCode, setzipCode] = useState('')
  const [country, setCountry] = useState('')
  const [state, setState] = useState('')
  const [Registered, setRegistered] = useState('')

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true)
      await axios.post(`${import.meta.env.VITE_API_URL}/api/order/add-order`, {
        'paymentMethod': paymentMethod,
        'address': {
          'street': street,
          'city': city,
          'state': state,
          'zipCode': zipCode,
          'country': country
        }
      }, {
        withCredentials: true
      })
      setRegistered('Order placed successfully!')
      setTimeout(() => {
        navigate('/EliteStore')
      }, 500);
    } catch (err) {
      setError('Order not place!')
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
      <div className='w-full h-15 flex '>
        <a href='/EliteStore'>
          <div className=' w-40 ml-5 py-3 flex justify-center items-center '>
            <img className='w-full h-10 object-contain' src={DarkEliteStore} alt="Logo" />
            <img className='object-contain w-full h-6' src={EliteStoreText} alt="Name" />
          </div>
        </a>
      </div>
      <div className=' md:py-5 items-center flex justify-center flex-col '>
        <div className=' rounded-2xl border-gray-500/90 border-2 '>
          <div className='pt-3 flex flex-col items-center justify-center'>
            <h1 className='text-4xl font-semibold'>Post <span className='text-[#FF6200]'>Orders</span></h1>

            {Error && (
              <p className='text-red-500 text-xs mt-2'>{Error}</p>
            )}
            {Registered && (
              <p className='text-green-500 text-xs mt-2'>{Registered}</p>
            )}
            <form className='mx-4' onSubmit={(e) => { submitHandler(e) }}>
              <label>
                <div>
                  <p className='text-[#131921] font-semibold py-3'><span className='text-[#FF6200]'>*</span> Payment Method</p>
                  <select onChange={(e) => { setPaymentMethod(e.target.value) }} required className="border-2 rounded-xl border-gray-500 pl-3 py-1 w-full " name="PaymentMethod">
                    <option selected disabled value="">Select Your Payment Method</option>
                    <option value="Cash">Cash</option>
                    <option value="Card">Card</option>
                    <option value="Online">Online</option>
                  </select>
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
              <label>
                <div>
                  <p className='text-[#131921] font-semibold py-3'><span className='text-[#FF6200]'>*</span> Country</p>
                  <input required value={country} onChange={(e) => { setCountry(e.target.value) }} className='border-2 rounded-xl border-gray-500 pl-3 py-1 w-full ' type='text' placeholder='Write your country!' />
                </div>
              </label>

              <div className='w-full py-5 flex justify-center items-center'>
                <button className="bg-[#FF6200] text-[#ffff] font-semibold py-2 px-3 rounded-lg" type='submit'>{!isLoading ? "Order Place " : "Placing"}</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Motion>
  )
}

export default OrderInfo