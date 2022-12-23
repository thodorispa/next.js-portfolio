import React from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { signIn, sign } from "next-auth/react"

export default function Login() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [referral, setReferral] = useState('')
  const [error, setError] = useState('')

  const [segment, setSegment] = useState('login')
  const url = process.env.NODE_ENV === 'production' ? "https://anna-papadopoulou-6bt9.vercel.app" : "http://localhost:3000"

  async function handleSubmit(e) {
    e.preventDefault()
    try {


      if (segment === 'register') {
        let data = await axios.post('/api/account/register', { username, password, referral })
      }

      signIn('credentials', {
        username,
        password,
        redirect: 'false',
        callbackUrl: url
      }).then(response => {
        if (response.ok) {
          router.push("/admin")
        } else {
        }
      }).catch(error => {
        console.log(error)
      })


    } catch (error) {
      setError(error.response.data)
      console.log(error)
    }


  }


  return (
    <>
      <main className={'w-full flex flex-col p-4 min-h-[100vh] justify-center items-center'} >

        {/* Segments */}
        <div className={'flex'}>
          <h5
            style={{ cursor: 'pointer', textDecoration: segment === 'login' ? 'underline' : 'none' }}
            onClick={() => setSegment('login')}
          >
            Login
          </h5>

          <div className={'p-2'} />

          <h5
            style={{
              cursor: 'pointer',
              textDecoration: segment === 'register' ? 'underline' : 'none'
            }}
            onClick={() => setSegment('register')}
          >
            Sign Up
          </h5>
        </div>

        <div className={'p-2'} />

        {/* Form */}
        <form
          className={'w-full flex flex-col justify-center items-center max-w-[400px]'}
          onSubmit={handleSubmit}
        >

          <input
            style={{ backgroundColor: 'white !important' }}
            type={'username'}
            className={'border-2 rounded-md p-2 outline-none w-full  bg-white'}
            placeholder={'Username...'}
            value={username}
            onChange={e => setUsername(e.target.value)}
          />

          <div className={'p-1'} />

          <input
            style={{ backgroundColor: 'white !important' }}
            type={'password'}
            className={'border-2 rounded-md p-2 outline-none w-full  bg-white'}
            placeholder={'Password...'}
            value={password}
            onChange={e => setPassword(e.target.value)}
          />

          <div className={'p-1'} />

          {segment === 'register' ? (
            <input
              style={{ backgroundColor: 'white !important' }}
              type={'password'}
              className={'border-2 rounded-md p-2 outline-none w-full bg-white'}
              placeholder={'Referral...'}
              value={referral}
              onChange={e => setReferral(e.target.value)}
            />
          ) : null}

          <div className={'p-1'} />

          <button
            disabled={username == '' || password == ''}
            type={'submit'}
            className={username != '' && password != '' ? 'bg-indigo-600 p-2 rounded-md text-white w-full' : 'bg-red-500 p-2 rounded-md text-white w-full'}
          >
            {segment === 'login' ? 'Login' : 'Sign Up'}
          </button>

          <h5 className={'text-red-600'}>{error}</h5>

        </form>
      </main>
    </>


  )
}


