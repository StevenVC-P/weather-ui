"use client";
import { useAuth } from '../../contexts/AuthContext';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/login');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="text-amber-600 hover:text-amber-800 dark:text-amber-500 dark:hover:text-amber-400 font-medium"
    >
      Sign out
    </button>
  );
} 