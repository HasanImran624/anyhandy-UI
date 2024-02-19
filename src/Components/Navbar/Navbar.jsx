import React, {useState} from 'react'
import Logo from '../../Assets/logo.svg'
import Ham from '../../Assets/menu.png'
import Cross from '../../Assets/cross.png'
export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
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
          <button className='w-fit font-semibold font-Onest p-4 text-base text-black hover:text-[#00CF91] border border-transparent hover:border-[#E1DFD7] transition-all ease-in-out duration-100 cursor-pointer'>Sign Up</button>
          <button className='w-fit font-semibold font-Onest p-4 text-base text-black hover:text-[#00CF91] border border-transparent hover:border-[#E1DFD7] transition-all ease-in-out duration-100 cursor-pointer'>Sign In</button>
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
                  <button className='w-fit font-semibold font-Onest p-4 text-base text-black hover:text-[#00CF91] border border-transparent hover:border-[#E1DFD7] transition-all ease-in-out duration-100 cursor-pointer'>Sign Up</button>
                  <button className='w-fit font-semibold font-Onest p-4 text-base text-black hover:text-[#00CF91] border border-transparent hover:border-[#E1DFD7] transition-all ease-in-out duration-100 cursor-pointer'>Sign In</button>
                </div>
              </div>
            </section>
          }
        </section>
      </nav>
    </>
  )
}
