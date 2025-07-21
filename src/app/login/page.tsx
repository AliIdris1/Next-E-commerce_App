"use client"
import { useWixClient } from '@/hooks/useWixClient'
import { LoginState } from '@wix/sdk'
import  Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

enum MODE {
  LOGIN = "LOGIN",
  REGISTER = "REGISTER",
  RESET_PASSWORD = "RESET_PASSWORD",
  EMAIL_VERIFICATION = "EMAIL_VERIFICATION"

}

const page = () => {
  const  [mode , setMode] = useState(MODE.LOGIN)

  const [userName, setUserName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [emailCode, setEmailCode] = useState("")
  const [isLoading, setisLoading] = useState(false)
  const [erorr, setErorr] = useState("")
  const [message, setMessage] = useState("")

  const fromTitle = mode === MODE.LOGIN ? "Log in" : mode === MODE.REGISTER ? "Register" : mode === MODE.RESET_PASSWORD ? "Reset Your Password" : "Verify Your Email"

  const buttonTitle = mode === MODE.LOGIN ? "Login" : mode === MODE.REGISTER ? "Register" : mode === MODE.RESET_PASSWORD ? "Reset" : "Verify"

  const wixClient = useWixClient()
  const isLogin = wixClient.auth.loggedIn()

  
  console.log(isLogin)
  const win11 = window.location.href
  const router = useRouter()
  if(isLogin) {
    router.push("/")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setisLoading(true)
    setErorr("")



    try {
      
    

      let respone
      switch(mode) {
        case MODE.LOGIN:
        respone = await wixClient.auth.login({
          email,
          password
        })
        break
        case MODE.REGISTER:
        respone = await wixClient.auth.register({
          email,
          password,
          profile:{nickname:userName}
        })
        break
        case MODE.RESET_PASSWORD:
        respone = await wixClient.auth.sendPasswordResetEmail(
          email,
          win11
        )
        setMessage("Password reset Email sent. Please chack Your Email")
        break
        case MODE.EMAIL_VERIFICATION:
        respone = await wixClient.auth.processVerification({
          verificationCode:emailCode
        })
        break
        
        default:break
      }
      console.log(respone)

      switch (respone?.loginState) {
        case LoginState.SUCCESS:
          setMessage("Successful")
          const tokens = await wixClient.auth.getMemberTokensForDirectLogin(respone.data.sessionToken!)

          Cookies.set("refreshToken", JSON.stringify(tokens.refreshToken), {expires:2})
          wixClient.auth.setTokens(tokens)
          router.push("/")
          break;
          case LoginState.FAILURE:
          if(respone.errorCode === "invalidEmail" || respone.errorCode === "invalidPassword") {
            setErorr("invalid Enail or Password")
          } else if(respone.errorCode === "emailAlreadyExists") {
            setErorr("Email allready exists")
          } else if(respone.errorCode === "resetPassword") {
            setErorr("You nees to reset your password")
          } else {
            setErorr("Something went Wrong")
          }
          case LoginState.EMAIL_VERIFICATION_REQUIRED:
            setMode(MODE.EMAIL_VERIFICATION)
            case LoginState.OWNER_APPROVAL_REQUIRED:
              setMessage("Your account pending approval")
        default:
          break;
      }

    } catch (err) {
      console.log(err)
      setErorr("Something went wrong!")
    } finally {
      setisLoading(false)
    }
  }
  return (
    <div className='h-[calc(100vh-80px)] px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 flex items-center justify-center'>
      <form className='flex flex-col gap-8' onSubmit={handleSubmit}>
        <h1 className='text-2xl font-semibold'>{fromTitle}</h1>
        {mode === MODE.REGISTER ? (
          <div className='flex flex-col gap-2'>
            <label className='text-sm text-gray-700'>Username</label>
            <input type="text" name='username' placeholder='john' onChange={e=>setUserName(e.target.value)}  className='ring-2 ring-gray-300 rounded-md p-4'/>
          </div>
        )
        : 
        null}
        {
          mode !== MODE.EMAIL_VERIFICATION ? (
            <div className='flex flex-col gap-2'>
              <label className='text-sm text-gray-700'>E-mail</label>
              <input type="email" name='email' placeholder='john@gmail.com' onChange={e=>setEmail(e.target.value)}  className='ring-2 ring-gray-300 rounded-md p-4'/>
            </div>
          ) : (
            <div className='flex flex-col gap-2'>
            <label className='text-sm text-gray-700'>Verification Code</label>
            <input type="text" name='emailCode' placeholder='Code' onChange={e=>setEmailCode(e.target.value)}  className='ring-2 ring-gray-300 rounded-md p-4'/>
          </div>
          )}
          {mode === MODE.LOGIN || mode === MODE.REGISTER ? (
            <div className='flex flex-col gap-2'>
            <label className='text-sm text-gray-700'>Password</label>
            <input type="password" name='password' placeholder='Enter your password' onChange={e=>setPassword(e.target.value)}  className='ring-2 ring-gray-300 rounded-md p-4'/>
          </div>
          ):null}
          {mode == MODE.LOGIN && <div className='text-sm underline cursor-pointer' onClick={() => setMode(MODE.RESET_PASSWORD)}>Forget Password?</div>}
          <button className='bg-lama text-white p-2 rounded-md disabled:bg-pink-200 disabled:cursor-not-allowed' disabled={isLoading} >{isLoading ? "is Loading" : buttonTitle}</button>
          
          {erorr && <div className='bg-red-600'>{erorr}</div>}
          {mode === MODE.LOGIN && (
            <div className='text-sm underline cursor-pointer' onClick={() => setMode(MODE.REGISTER)}>{"Dont"} have an account?</div>
          )}
          {mode === MODE.REGISTER && (
            <div className='text-sm underline cursor-pointer' onClick={() => setMode(MODE.LOGIN)}> Have an account?</div>
          )}
          {mode === MODE.RESET_PASSWORD && (
            <div className='text-sm underline cursor-pointer' onClick={() => setMode(MODE.LOGIN)}>Go back to Login</div>
          )}
          {message && <div className='text-green-600 text-sm'>{message}</div>}
      </form>
    </div>
  )
}

export default page