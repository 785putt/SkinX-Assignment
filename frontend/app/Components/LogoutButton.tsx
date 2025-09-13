'use client'

import { useRouter } from 'next/navigation'

export default function LogoutButton() {
  const router = useRouter()

  const handleLogout = () => {
    // 🧹 Clear token from localStorage
    localStorage.removeItem('token')

    // 🧹 Clear cookie manually
    document.cookie = 'token=; path=/; max-age=0'

    // 🔁 Redirect to login page
    router.push('/login')
  }

  return (
    <button
      onClick={handleLogout}
      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
    >
      Log Out
    </button>
  )
}
