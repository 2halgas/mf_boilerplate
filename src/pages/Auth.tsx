import React from "react";
import { LoginForm } from "../components/blocks/authentication-01";
import "tailwindcss/tailwind.css";
export default function AuthPage() {
  return (
    <div className="flex w-screen h-screen justify-center items-center">
      <LoginForm />
    </div>
  );
}
