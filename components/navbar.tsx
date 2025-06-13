"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { useAuth } from "@/hooks/use-auth"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Menu, X, User, LogOut, Settings, FileText, RefreshCw } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function Navbar() {
  const { user, logout, isAuthenticated, isPremium, isAdmin } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Teachers", href: "/teachers" },
    { name: "Notes", href: "/notes" },
    { name: "Section Swap", href: "/section-swap" },
  ]

  const userNavigation = isAdmin
    ? [
        { name: "Dashboard", href: "/admin", icon: Settings },
        { name: "Profile", href: "/profile", icon: User },
        { name: "Referrals", href: "/referrals", icon: RefreshCw },
      ]
    : [
        { name: "Profile", href: "/profile", icon: User },
        { name: "My Reviews", href: "/my-reviews", icon: FileText },
        { name: "Referrals", href: "/referrals", icon: RefreshCw },
      ]

  // Generate initials from name
  const getInitials = (name: string) => {
    return (
      name
        ?.split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase() || "U"
    )
  }

  return (
    <nav className="sci-fi-header sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold text-primary sci-fi-text-glow">KIIT{"{ease}"}</span>
          </Link>

          <div className="hidden md:flex items-center space-x-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`px-3 py-2 text-sm rounded-md transition-colors ${
                  pathname === link.href ? "text-primary font-medium" : "text-muted-foreground hover:text-primary"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="sci-fi-button">
                  <Avatar className="h-6 w-6 mr-2">
                    <AvatarImage src={user?.image || ""} alt={user?.name || "User"} />
                    <AvatarFallback className="bg-primary/10 text-primary text-xs">
                      {getInitials(user?.name || "")}
                    </AvatarFallback>
                  </Avatar>
                  <span className="mr-2">{user?.name?.split(" ")[0]}</span>
                  {isPremium && <span className="h-2 w-2 rounded-full bg-primary"></span>}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col">
                    <span>{user?.name}</span>
                    <span className="text-xs text-muted-foreground">{user?.email}</span>
                    <span className="text-xs mt-1 font-medium text-primary">
                      {user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1)} User
                    </span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {userNavigation.map((item) => (
                  <DropdownMenuItem key={item.name} asChild>
                    <Link href={item.href} className="flex items-center cursor-pointer">
                      <item.icon className="mr-2 h-4 w-4" />
                      <span>{item.name}</span>
                    </Link>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => logout()}
                  className="text-destructive focus:text-destructive cursor-pointer"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden md:flex items-center gap-4">
              <Button className="sci-fi-button" asChild>
                <Link href="/login">Sign in with Google</Link>
              </Button>
            </div>
          )}

          <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur-sm">
          <div className="space-y-1 px-4 py-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  pathname === link.href
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:bg-primary/5 hover:text-primary"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            {!isAuthenticated && (
              <Link
                href="/login"
                className="block px-3 py-2 rounded-md text-base font-medium text-primary hover:bg-primary/5"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign in with Google
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
