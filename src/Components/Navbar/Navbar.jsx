import {useState, useEffect} from 'react'
import Logo from '../../Assets/logo.svg'
import Ham from '../../Assets/menu.png'
import Cross from '../../Assets/cross.png'
import user from '../../Assets/user.png'
import email from '../../Assets/email.png'
import lock from '../../Assets/lock.png'
import phone from '../../Assets/phone.png'
import facebook from '../../Assets/Facebook_icon.png'
import google from '../../Assets/google.png'
import apple from '../../Assets/apple.png'
import openEye from '../../Assets/openEye.png'
import closeEye from '../../Assets/closeEye.png'
export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [signIn, setSignIn] = useState(false)
  const [signUp, setSignUp] = useState(false)
  const [eye, setEye] = useState(false)


  useEffect(() => {
    if (isOpen || signUp || signIn) { 
      document.body.style.overflowY = 'hidden'
    } else {
      document.body.style.overflowY = 'scroll'
    }    
    return () => {
      document.body.style.overflowY = 'scroll'
    }
  }, [isOpen, signUp, signIn])

  return (
    <>
      {signUp 
        && <section className='w-screen h-screen flex items-center justify-center fixed top-0 left-0 z-10'>
            <div className='hidden sm_desktop:block w-screen h-screen bg-black bg-opacity-20 absolute top-0 left-0 z-20' onClick={() => setSignUp(!signUp) }></div>
          <section className='w-full sm_desktop:w-[50%] bg-white h-screen overflow-y-scroll sm_desktop:h-fit sm_desktop:overflow-y-hidden p-5 sm_tablet:p-10 flex flex-col gap-10 font-Onest rounded-[30px] relative z-30'>
            <div className='flex justify-center gap-2 flex-col'>
              <span className='flex items-center justify-between'>
                <h2 className='text-[#292C38] text-4xl font-bold'>Create Account</h2>
                <img src={Cross} alt="x" className='w-4 cursor-pointer' onClick={() => setSignUp(!signUp) } /> 
              </span>
              <h4 className='font-medium text-sm text-[#868580]'>Sign up and get started</h4>
            </div>
            <form action="">
              <section className='flex flex-col gap-5'>
                <div className='flex items-center justify-center gap-5 flex-col sm_desktop:flex-row'>
                  <span className='relative w-full'>
                    <input type="text" placeholder="Full Name" className='flex-1 w-full border border-[#E0E5ED] px-12 py-4 rounded-xl placeholder:text-[#96A0B5]' />
                    <img src={user} alt="user" className='absolute top-1/2 left-7 transform -translate-x-1/2 -translate-y-1/2' />
                  </span>
                  <span className='relative w-full'>
                    <input type="email" placeholder="Email" className='flex-1 w-full border border-[#E0E5ED] px-12 py-4 rounded-xl placeholder:text-[#96A0B5]' />
                    <img src={email} alt="email" className='absolute top-1/2 left-7 transform -translate-x-1/2 -translate-y-1/2' />
                  </span>
                </div>
                <div className='flex items-center justify-center gap-5 flex-col sm_desktop:flex-row'>
                  <span className='relative w-full'>
                    <input type="number" placeholder="Phone Number" className='flex-1 w-full border border-[#E0E5ED] px-12 py-4 rounded-xl placeholder:text-[#96A0B5]' />
                    <img src={phone} alt="phone" className='absolute top-1/2 left-7 transform -translate-x-1/2 -translate-y-1/2' />
                  </span>
                  <span className='relative w-full'>
                  <input type={eye ? "text" : "password"} placeholder="Password" className='flex-1 w-full border border-[#E0E5ED] px-12 py-4 rounded-xl placeholder:text-[#96A0B5]' />
                    <img src={lock} alt="lock" className='absolute top-1/2 left-7 transform -translate-x-1/2 -translate-y-1/2' />
                    <img src={eye ? closeEye : openEye} alt="eye" className='absolute top-1/2 right-7 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer' onClick={() => setEye(!eye)}/>
                  </span>
                </div>
                <div className='flex items-center gap-2'>
                  <input type="checkbox" id="check" />
                  <label htmlFor="check" className='text-[#868580] font-medium text-base cursor-pointer'>I agree to the Terms & Conditions</label>
                </div>
                <button className='w-full flex items-center justify-center bg-[#00CF91] text-white font-semibold text-base py-3 rounded-md'>Sign Up</button>
                <div className='flex items-center gap-5'>
                  <hr className='h-0 border-t border-[#ECEFF4] w-full'/>
                  <h3 className='font-medium text-sm text-[#73778B] w-fit whitespace-nowrap'>Or Sign Up With</h3>
                  <hr className='h-0 border-t border-[#ECEFF4] w-full'/>
                </div>
                <div className='w-full flex items-center justify-between gap-5'>
                  <button className='w-full flex items-center justify-center gap-2 font-normal text-sm text-[#0D0B01] border border-[#E1DFD7] py-3'><img src={facebook} alt="facebook" /> <h3 className='hidden sm_tablet:block'>Facebook</h3> </button>
                  <button className='w-full flex items-center justify-center gap-2 font-normal text-sm text-[#0D0B01] border border-[#E1DFD7] py-3'><img src={google} alt="google" /> <h3 className='hidden sm_tablet:block'>Google</h3> </button>
                  <button className='w-full flex items-center justify-center gap-2 font-normal text-sm text-[#0D0B01] border border-[#E1DFD7] py-3'><img src={apple} alt="apple" /> <h3 className='hidden sm_tablet:block'>Apple</h3> </button>
                </div>
                <span className='w-full flex items-center justify-center gap-2 font-medium text-base'>
                  <h3 className='text-[#0D0B01]'>Do you already have an account?</h3>
                  <h3 className='text-[#00CF91] cursor-pointer'>Login</h3>
                </span>
              </section>
            </form>
          </section>
        </section>
      }
      {signIn 
        && <section className='w-screen h-screen flex items-center justify-center fixed top-0 left-0 z-10'>
            <div className='w-screen h-screen bg-black bg-opacity-20 absolute top-0 left-0 z-20' onClick={() => setSignIn(!signIn) }></div>
          <section className='w-full sm_desktop:w-[50%] bg-white h-screen overflow-y-scroll sm_desktop:h-fit sm_desktop:overflow-y-hidden p-5 sm_tablet:p-10 flex flex-col gap-10 font-Onest rounded-[30px] relative z-30'>
            <div className='flex justify-center gap-2 flex-col'>
              <span className='flex items-center justify-between'>
                <h2 className='text-[#292C38] text-4xl font-bold'>Login</h2>
                <img src={Cross} alt="x" className='w-4 cursor-pointer' onClick={() => setSignIn(!signIn) } /> 
              </span>
              <h4 className='font-medium text-sm text-[#868580]'>Welcome back! Log in to continue</h4>
            </div>
            <form action="">
              <section className='flex flex-col gap-5'>
                <div className='flex items-center justify-center flex-col gap-5'>
                  <span className='relative w-full'>
                    <input type="email" placeholder="Email" className='flex-1 w-full border border-[#E0E5ED] px-12 py-4 rounded-xl placeholder:text-[#96A0B5]' />
                    <img src={email} alt="email" className='absolute top-1/2 left-7 transform -translate-x-1/2 -translate-y-1/2' />
                  </span>
                  <span className='relative w-full'>
                    <input type={eye ? "text" : "password"} placeholder="Password" className='flex-1 w-full border border-[#E0E5ED] px-12 py-4 rounded-xl placeholder:text-[#96A0B5]' />
                    <img src={lock} alt="lock" className='absolute top-1/2 left-7 transform -translate-x-1/2 -translate-y-1/2' />
                    <img src={eye ? closeEye : openEye} alt="eye" className='absolute top-1/2 right-7 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer' onClick={() => setEye(!eye)}/>
                  </span>
                </div>
                <div className='flex items-center gap-2'>
                  <input type="checkbox" id="check" />
                  <label htmlFor="check" className='text-[#868580] font-medium text-base cursor-pointer'>I agree to the Terms & Conditions</label>
                </div>
                <button className='w-full flex items-center justify-center bg-[#00CF91] text-white font-semibold text-base py-3 rounded-md'>Login</button>
                <div className='flex items-center gap-5'>
                  <hr className='h-0 border-t border-[#ECEFF4] w-full'/>
                  <h3 className='font-medium text-sm text-[#73778B] w-fit whitespace-nowrap'>Or Login With</h3>
                  <hr className='h-0 border-t border-[#ECEFF4] w-full'/>
                </div>
                <div className='w-full flex items-center justify-between gap-5'>
                  <button className='w-full flex items-center justify-center gap-2 font-normal text-sm text-[#0D0B01] border border-[#E1DFD7] py-3'><img src={facebook} alt="facebook" /> Facebook</button>
                  <button className='w-full flex items-center justify-center gap-2 font-normal text-sm text-[#0D0B01] border border-[#E1DFD7] py-3'><img src={google} alt="google" /> Google</button>
                  <button className='w-full flex items-center justify-center gap-2 font-normal text-sm text-[#0D0B01] border border-[#E1DFD7] py-3'><img src={apple} alt="apple" /> Apple</button>
                </div>
                <span className='w-full flex items-center justify-center gap-2 font-medium text-base'>
                  <h3 className='text-[#0D0B01]'>Don't have an account?</h3>
                  <h3 className='text-[#00CF91] cursor-pointer'>Create</h3>
                </span>
              </section>
            </form>
          </section>
        </section>
      }
      <nav id='navbar' className=' flex items-center justify-between py-5 px-[5%] bg-opacity-90'>
        <section>
          <img src={Logo} alt="logo" className='w-24 sm_desktop:w-40 cursor-pointer' />
        </section>
        <section id='navLinksContainer' className='hidden sm_desktop:block'>
          <ul className='flex items-center justify-center gap-7 text-[#0D0B01] font-Onest font-semibold text-lg'>
            <li>Home</li>
            <li>Services</li>
            <li>Portfolio</li>
            <li>About</li>
            <li>Blog</li>
            <li>Contact</li>
          </ul>
        </section>
        <div className='hidden sm_desktop:flex items-center justify-center gap-5'>
          <span className='border border-[#96a0b5] rounded-full w-10 h-10 flex items-center justify-center text-lg font-semibold cursor-pointer hover:text-[#00CF91] transition-colors ease-in-out duration-200'>EN</span>
          <button className='w-fit font-semibold font-Onest p-4 text-base text-black hover:text-[#00CF91] border border-transparent rounded-md hover:border-[#E1DFD7] transition-all ease-in-out duration-100 cursor-pointer' onClick={() => {setSignUp(!signUp); setEye(false)}} >Sign Up</button>
          <button className='w-fit font-semibold font-Onest p-4 text-base text-black hover:text-[#00CF91] border border-transparent rounded-md hover:border-[#E1DFD7] transition-all ease-in-out duration-100 cursor-pointer' onClick={() => {setSignIn(!signIn); setEye(false)}} >Sign In</button>
        </div>
        <section className='block sm_desktop:hidden'>
          <img src={Ham} alt="menu" className='w-6 xl_mobile:w-7' onClick={() => setIsOpen(!isOpen)} />
          {isOpen
            && <section className='w-screen h-screen fixed top-0 left-0 z-10'>
              <div className='w-screen h-screen bg-black bg-opacity-20 absolute top-0 left-0 z-20' onClick={() => setIsOpen(!isOpen)}></div>
              <div className='w-4/5 max-w-[300px] h-screen overflow-y-scroll bg-white absolute top-0 right-0 z-30 space-y-7 py-5 px-7'>
                <header className='flex justify-between'>
                  <h2 className='text-3xl font-Onest font-bold '>Menu</h2>
                  <img src={Cross} alt="cross" className='w-6 h-6 self-center cursor-pointer' onClick={() => setIsOpen(!isOpen)} />
                </header>
                <hr className='w-full h-1' />
                <ul className='w-full flex items-center justify-center flex-col gap-5 font-semibold font-Onest text-lg'>
                  <li>Home</li>
                  <li>Services</li>
                  <li>Portfolio</li>
                  <li>About</li>
                  <li>Blog</li>
                  <li>Contact</li>
                </ul>
                <hr className='w-full h-1' />
                <div className='flex items-center justify-center flex-col gap-5'>
                  <button className='w-fit font-semibold font-Onest p-4 text-base text-black hover:text-[#00CF91] border border-transparent rounded-md hover:border-[#E1DFD7] transition-all ease-in-out duration-100 cursor-pointer' onClick={() => {setSignUp(!signUp); setIsOpen(false)}} >Sign Up</button>
                  <button className='w-fit font-semibold font-Onest p-4 text-base text-black hover:text-[#00CF91] border border-transparent rounded-md hover:border-[#E1DFD7] transition-all ease-in-out duration-100 cursor-pointer'onClick={() => {setIsOpen(!isOpen); setSignIn(!signIn)}}>Sign In</button>
                </div>
              </div>
            </section>
          }
        </section>
      </nav>
    </>
  )
}
