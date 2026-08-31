import EliteStore from '../assets/EliteStore.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Phone, Mail, MapPin, Globe } from 'lucide-react'
import Img1 from '../assets/Food1.jpg'
import Img2 from '../assets/Food2.jpg'
import Img3 from '../assets/Food3.jpg'
import Img4 from '../assets/Food4.jpg'
import Img5 from '../assets/Food5.jpg'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Motion from '../Features/Motion'
const LandingPage = () => {

  const [CurrentImage, setCurrentImage] = useState(0)

  let images = [Img1, Img2, Img3, Img4, Img5];



  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage(prev => (prev + 1) % images.length)
    }, 4000);

    return () => clearInterval(interval)
  }, [])
  return (
   <Motion>
     <div className="w-full bg-gray-50 overflow-hidden ">


      {/* ============================================
            HERO SECTION
            ============================================ */}
      {images.map((img, index) => (
        <img
          key={index}
          src={img}
          className={`absolute top-0 left-0 w-full h-240 object-cover transition-opacity duration-1000 ease-in-out ${index === CurrentImage ? 'opacity-100' : 'opacity-0'
            }`}
          alt={`Slide ${index + 1}`}
        />
      ))}
      <div className='bg-black/60 w-full h-250 absolute top-0 left-0'></div>
      <div className=''>

        <div className='relative z-10  '>
          <div className="bg-[#131921]/95  w-full flex justify-between items-center h-13">
            <div className='w-15 h-full ml-3 flex justify-center items-center'>
              <img className='w-[70%]' src={EliteStore} alt="Logo" />
            </div>
            <div className='text-white flex w-30 justify-between mr-5'>
              <Link to='/user-signin'><p className='text-white font-semibold duration-200 ease-in transition-all hover:text-[#FF6200] cursor-pointer'>Sign in</p></Link>
              <Link to={'user-login'}><p className='text-white font-semibold duration-200 ease-in transition-all hover:text-[#FF6200] cursor-pointer'>Log in</p></Link>
            </div>
          </div>
          <p className='font-motion text-[#ffff] leading-18 text-[50px] pt-5 ml-3  font-bold'>
            Welcome to <span className='text-[#FF6200]'>Elite Store</span>
          </p>
        </div>
        <div>
          <p className='pt-5 font-motion ml-3 font-semibold text-[#ffff] text-lg'>
            Your One-Stop Shop for Everything!
          </p>
        </div>

        {/* =========================================
            ABOUT SECTION
            =========================================== */}
        <div className='font-motion pt-5'>
          <div className='text-[#ffff] leading-18 text-[40px] pt-5 ml-3 font-bold'>
            <h1>Why Choose <span className='text-[#FF6200]'>Elite Store ?</span></h1>
          </div>
          <div>
            <p className='pt-5 font-motion ml-3 sm:max-w-150 md:max-w-170 lg:max-w-200 max-w-120 font-semibold text-[#ffff] text-lg'>
              We bring you quality, affordability, and convenience — all in one place.
              From electronics to fashion, we've got everything you need.
            </p>
          </div>
        </div>

        {/* ============================================
            CONTACT SECTION
            ============================================ */}
        <div className='font-motion pt-5 pb-15'>
          <div className='text-[#ffff] leading-18 text-[50px] pt-5 ml-3 font-bold'>
            <h1>Contact <span className='text-[#FF6200]'>Us</span></h1>
          </div>
          <div className='flex items-center font-semibold cursor-pointer text-white hover:text-[#FF6200] text-2xl gap-2 w-100 ml-3 pt-5'>
            <Mail /> <span>:</span> <span>support@elitestore.com</span>
          </div>
          <div className='flex items-center font-semibold cursor-pointer text-white hover:text-[#FF6200] text-2xl gap-2 w-100 ml-3 pt-5'>
            <Phone /> <span>:</span> <span>+92 3463250622</span>
          </div>
          <div className='flex items-center font-semibold cursor-pointer text-white hover:text-[#FF6200] text-2xl gap-2 w-100 ml-3 pt-5'>
            <MapPin /> <span>:</span> <span>Karachi, Pakistan</span>
          </div>
          <div className='flex items-center font-semibold cursor-pointer text-white hover:text-[#FF6200] text-2xl gap-2 w-100 ml-3 pt-5'>
            <Globe /> <span>:</span> <span>www.elitestore.com</span>
          </div>
        </div>
        {/* ============================================
            FOOTER
            ============================================ */}
        <footer className="bg-[#131921] relative z-10 text-white">
          <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <img className='w-12' src={EliteStore} alt="Logo" />
                  <span className="text-xl font-bold">Elite Store</span>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Your one-stop shop for premium products. Quality you deserve, prices you love.
                </p>
                <div className="flex gap-4 mt-4">
                  <FontAwesomeIcon
                    icon={['fab', 'facebook-f']}
                    className="w-5 h-5 text-gray-400 hover:text-[#FF6200] cursor-pointer transition"
                  />
                  <FontAwesomeIcon
                    icon={['fab', 'instagram']}
                    className="w-5 h-5 text-gray-400 hover:text-[#FF6200] cursor-pointer transition"
                  />
                  <FontAwesomeIcon
                    icon={['fab', 'twitter']}
                    className="w-5 h-5 text-gray-400 hover:text-[#FF6200] cursor-pointer transition"
                  />
                  <FontAwesomeIcon
                    icon={['fab', 'youtube']}
                    className="w-5 h-5 text-gray-400 hover:text-[#FF6200] cursor-pointer transition"
                  />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
                <ul className="space-y-2 text-gray-400">
                  <li className="hover:text-[#FF6200] cursor-pointer transition">About Us</li>
                  <li className="hover:text-[#FF6200] cursor-pointer transition">Contact Us</li>
                  <li className="hover:text-[#FF6200] cursor-pointer transition">Privacy Policy</li>
                  <li className="hover:text-[#FF6200] cursor-pointer transition">Terms & Conditions</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-4">Customer Service</h3>
                <ul className="space-y-2 text-gray-400">
                  <li className="hover:text-[#FF6200] cursor-pointer transition">Help Center</li>
                  <li className="hover:text-[#FF6200] cursor-pointer transition">Track Order</li>
                  <li className="hover:text-[#FF6200] cursor-pointer transition">Returns & Refunds</li>
                  <li className="hover:text-[#FF6200] cursor-pointer transition">FAQ</li>
                </ul>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-800 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
              <p>© 2026 Elite Store. All rights reserved.</p>
              <div className="flex gap-6 mt-2 md:mt-0">
                <span className="hover:text-[#FF6200] cursor-pointer transition">Privacy Policy</span>
                <span className="hover:text-[#FF6200] cursor-pointer transition">Terms of Service</span>
                <span className="hover:text-[#FF6200] cursor-pointer transition">Cookies</span>
              </div>
            </div>
          </div>
        </footer>
      </div>


    </div>
   </Motion>
  )
}

export default LandingPage