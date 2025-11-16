import { auth } from "@/auth"
import { redirect } from "next/navigation"
import LoginPage from "./login/page"

export default async function HomePage() {
  const session = await auth()
  
  // If user is already logged in, redirect to dashboard
  if (session?.user) {
    redirect("/dashboard")
  }

  // Show login page for non-authenticated users
  return <LoginPage />
}
