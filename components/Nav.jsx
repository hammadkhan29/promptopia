"use client";
import {useEffect , useState} from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {signIn , signOut , useSession , getProviders} from 'next-auth/react'


const Nav = () => {
  const {data : session} = useSession()
  const [providers , setProviders] = useState(null)
  const [toggleDropDown , setToggleDropDown] = useState(false)

  console.log('session',session)
  useEffect( ()=>{
    const setUpProviders = async () =>{
      const response = await getProviders()
      setProviders(response)
    }

    setUpProviders();
    },[])
  return (
    <nav className='flex-between w-full mb-16 pt-3'>
      <Link href='/' className='flex flex-center gap-2 '>
        <Image 
        src="/assets/images/logo.svg"
        alt='promptia logo'
        width={30}
        height={30}
        className='object-contain'
        />
        <p className='logo_text'>Promptopia</p>
      </Link>

      {/* Desktop navigation*/}
      <div className='sm:flex hidden'>
        {session?.user ? (
          <div className='flex gap-3 md:gap-5'>
            <Link href='/create-prompt' className='black_btn'>
            Create prompt
            </Link>

            <button type='button' onClick={signOut} className='outline_btn'>
              Sign Out
            </button>

            <Link href='/profile'>
              <Image 
              src={session?.user.image}
              alt='profile'
              width={37}
              height={37}
              className='rounded-full'
                />
            </Link>
          </div>
        ):
        <>
        {providers && 
          Object.values(providers).map((provider) => (
            <button
              type='button'
              key={provider.name}
              onClick={() => signIn(provider.id)}
              className='black_btn'
              >
              Sign In
            </button>
          ))}
        </>
      }
      </div>

      {/* Mobible navigation*/}
      <div className='sm:hidden flex relative'>
      { session?.user ? (
        <div className='flex'>
          <Image 
          src={session?.user.image}
          alt='profile'
          width={37}
          height={37}
          className='rounded-full'
          onClick={()=>{ setToggleDropDown((prev)=> !prev)}}
          />

          {toggleDropDown && (
            <div className='dropdown'>
              <Link 
              href='/profile' 
              onClick={()=> setToggleDropDown(false)}
              className='dropdown_link'>
              My Profile
              </Link>
              <Link 
              href='/create-prompt' 
              onClick={()=> setToggleDropDown(false)}
              className='dropdown_link'>
              Create Prompt
              </Link>
              <button
              type='button'
              onClick={()=>{
                toggleDropDown(false)
                signOut()
              }}
              className='black_btn mt-5 w-full'>
              Sign Out
              </button>
            </div>
          )}
        </div>
      ):
      <>
      {providers && 
        Object.values(providers).map((provider) => (
          <button
            type='button'
            key={provider.name}
            onClick={() => signIn(provider.id)}
            className='black_btn'
          >
            Sign In
          </button>
        ))}

      </>
      }
      </div>

    </nav>
  )
}

export default Nav
