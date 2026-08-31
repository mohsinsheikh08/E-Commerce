import EliteStoreText from '../assets/EliteStoreText.png'
import DarkEliteStore from '../assets/darklogo.png'
import Motion from '../Features/Motion'
import { useState } from 'react'
import { Eye, EyeClosed } from 'lucide-react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'

const UserSignin = () => {
  const navigate = useNavigate()
  const [isPassword, setIsPassword] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [Error, setError] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [Registered, setRegistered] = useState('')

  const submitHandler = async (e) => {
    e.preventDefault();
    setFirstName('')
    setLastName('')
    setEmail('')
    setPassword('')
    try {
      setIsLoading(true)
      await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
        fullName: {
          firstName: firstName,
          lastName: lastName
        },
        email: email,
        password: password
      }, {
        withCredentials: true
      })
      setRegistered('User registered successfully!')
      setTimeout(() => {
        navigate('/EliteStore')
      }, 500);
    } catch (err) {
      console.log(err)
      setError('User not registered!')
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
              <div className='text-xs text-[#131921] pt-5'>Sell with us? <Link to='/admin-signin' className='text-[#FF6200] font-semibold'>Create Seller Account</Link></div>
            </div>
            <form className='mx-4' onSubmit={(e) => { submitHandler(e) }}>
              <div className=' gap-5'>
                <label>
                  <p className='text-[#131921] font-semibold py-3'><span className='text-[#FF6200]'>*</span> First Name</p>
                  <input value={firstName} onChange={(e) => { setFirstName(e.target.value) }} className='border-2 rounded-xl border-gray-500 pl-3 py-1 w-full' type="text" placeholder='Write first name!' />
                </label>
                <label>
                  <p className='text-[#131921] font-semibold py-3'><span className='text-[#FF6200]'>*</span> Last Name</p>
                  <input value={lastName} onChange={(e) => { setLastName(e.target.value) }} className='border-2 rounded-xl border-gray-500 pl-3 py-1 w-full' type="text" placeholder='Write last name!' />
                </label>
              </div>
              <label>
                <div>
                  <p className='text-[#131921] font-semibold py-3'><span className='text-[#FF6200]'>*</span> Email</p>
                  <input value={email} onChange={(e) => { setEmail(e.target.value) }} className='border-2 rounded-xl border-gray-500 pl-3 py-1 w-full' type="text" placeholder='Write your email!' />
                </div>
                <div>
                  <p className='text-[#131921] font-semibold py-3'><span className='text-[#FF6200]'>*</span> Password</p>
                  <div className='flex justify-center items-center'>
                    <input value={password} onChange={(e) => { setPassword(e.target.value) }} className='border-2 border-r-0 rounded-tr-none rounded-br-none rounded-xl border-gray-500 pl-3 py-1 w-full ' type={!isPassword ? 'text' : 'password'} placeholder='Write your password!' />
                    <button type='button' onClick={() => { isPassword === true ? setIsPassword(false) : setIsPassword(true) }} className='border-2 py-1 cursor-pointer rounded-xl rounded-tl-none rounded-bl-none px-1 border-l-0 '>{!isPassword ? <Eye /> : <EyeClosed />}</button>
                  </div>
                </div>
              </label>
              <div className='w-full py-5 flex justify-center items-center'>
                <button className="bg-[#FF6200] text-[#ffff] font-semibold py-2 px-3 rounded-lg" type='submit'>{!isLoading ? "Create Account" : "Creating..."}</button>
              </div>
            </form>
            <div className='w-full flex justify-center items-center'>
              <div className='text-xs text-[#131921] py-5'>Already have an account? {' '} <Link to='/user-login' className='text-[#FF6200] font-semibold'>Login</Link></div>
            </div>
          </div>
        </div>
      </div>
    </Motion>
  )
}

export default UserSignin