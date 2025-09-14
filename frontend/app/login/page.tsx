'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import type { AxiosError } from 'axios';

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // useEffect(() => {
  //   const token = document.cookie
  //     .split('; ')
  //     .find(row => row.startsWith('token='))
  //     ?.split('=')[1]

  //   if (!token) {
  //     router.push('/login')
  //   }
  // }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await axios.post('http://localhost:8080/login', {
        email,
        password,
      }, { withCredentials: true }) // ensure cookies are included

      console.log('Login response:', res.data)

      if (res.data.success) {
        console.log('Login success:', res.data)
        router.push('/')
      } else {
        setError('Login failed')
      }
    } catch (err: unknown) {
      const axiosError = err as AxiosError<{ error: string }>;
      setError(axiosError.response?.data?.error || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="max-w-md mx-auto p-6 mt-12 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full px-4 py-2 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full px-4 py-2 border rounded"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Log In
        </button>
        {error && <p className="text-red-600 text-sm">{error}</p>}
      </form>
      <div className="mt-6 text-center">
        <p className="text-sm">
          Don’t have an account?{' '}
          <a href="/register" className="text-blue-600 hover:underline">
            Register
          </a>
        </p>
      </div>
    </main>
  )
}