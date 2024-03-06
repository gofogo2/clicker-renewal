"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from 'react';

export default function Navigation() {
  const path = usePathname();

  return (
    <nav className="bg-blue-100" >
      <ul className="grid grid-flow-col auto-cols-fr" >
        <li className="flex justify-center items-center h-10">
          <Link href="/">Home</Link> {path === "/" ? "🔥" : ""}
        </li>
        <li className="flex justify-center items-center h-10">
          <Link href="/enter">Enter</Link>
          {path === "/enter" ? "🔥" : ""}
        </li>
        <li className="flex justify-center items-center h-10">
          <Link href="/exit">Exit</Link>
          {path === "/exit" ? "🔥" : ""}
        </li>
        <li className="flex justify-center items-center h-10">
          <Link href="/dashboard">Dashboard</Link>
          {path === "/dashboard" ? "🔥" : ""}
        </li>
        <li className="flex justify-center items-center h-10">
          <Link href="/admin">Admin</Link>
          {path === "/admin" ? "🔥" : ""}
        </li>
      </ul>
    </nav>
  );
}