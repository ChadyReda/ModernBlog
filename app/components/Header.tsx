"use client";

import { useUser } from "../utils/authContext";
import Link from "next/link";

const Header = () => {
  const { user, setUser } = useUser();
  const handleLogout = async () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <header className="flex items-center justify-between h-[80px] bg-gray-900 w-full md:px-[200px] px-10">
      <Link href="/" className="text-green-400 text-3xl uppercase font-bold">Hi</Link>
      <nav>
        <Link className="tracking-widest text-neutral-300 mx-3" href="/login">nav1</Link>
        <Link className="tracking-widest text-neutral-300 mx-3" href="/login">nav2</Link>
        <Link className="tracking-widest text-neutral-300 mx-3" href="/login">nav3</Link>
        {!user ? (
          <>
            <Link title="dont have an account yet ?" className="tracking-widest text-yellow-400 mx-3" href="/register">register</Link>
            <Link title="welcome back" className="tracking-widest text-purple-400 mx-3" href="/login">login</Link>
          </>
        ): (
          <button onClick={handleLogout} className="tracking-widest text-red-400 mx-3">logout</button>
        )}
      </nav>
    </header>
  );
};

export default Header;
