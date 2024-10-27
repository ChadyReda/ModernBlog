"use client"

import { useUser } from "../utils/authContext";
import Link from "next/link";


const Header = () => {
  const { user, setUser } = useUser()

  const handleLogout = async () => {
    localStorage.removeItem('token')
    setUser(null)
  }
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          {!user && (
            <li>
              <Link href="/login">Login</Link>
            </li>
          )}
          {!user && (
            <li>
              <Link href="/register">Register</Link>
            </li>
          )}
          {user && user.role === "admin" && (
            <li>
              <Link href="/admin">Admin</Link>
            </li>
          )}
          {user && (
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
