import React, { useState, useEffect } from "react";
import { Button } from "./ui/cup-button";
import { Home, Menu, LogOut, User, UserRound } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "./ui/cup-dropdown";
import { Link, useNavigate } from "react-router-dom";

interface HeaderProps {
  onMenuClick?: () => void;
}

const Header = ({ onMenuClick = () => {} }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication status when component mounts or when localStorage changes
    const checkAuth = () => {
      const authStatus = localStorage.getItem("isAuthenticated") === "true";
      setIsAuthenticated(authStatus);
    };

    checkAuth();

    // Listen for storage events (in case another tab changes auth status)
    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
    onMenuClick();
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    setIsAuthenticated(false);
    navigate("/login");
    setIsMenuOpen(false);
  };

  const handleLogin = () => {
    navigate("/login");
    setIsMenuOpen(false);
  };

  return (
    <header className="flex items-center justify-between h-14 sm:h-16 px-4 sm:px-6 md:px-8 bg-background shadow-sm w-full max-w-[100vw] box-border">
      {/* Left side - Home link */}
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="icon"
          asChild
          className="h-9 w-9 sm:h-10 sm:w-10"
        >
          <Link to="/" aria-label="Home">
            <Home className="h-4 w-4 sm:h-5 sm:w-5" />
          </Link>
        </Button>
      </div>

      {/* Center - Logo */}
      <div className="absolute left-1/2 transform -translate-x-1/2">
        <Link to="/" className="flex items-center">
          <img
            src="https://i0.wp.com/www.reso.org/wp-content/uploads/2020/05/Douglas-Elliman-Logo.png?fit=1024%2C194&ssl=1"
            alt="Douglas Elliman Logo"
            className="h-8 sm:h-10"
          />
        </Link>
      </div>

      {/* Right side - Hamburger menu */}
      <div className="flex items-center">
        <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleMenuClick}
              aria-label="Menu"
              className="h-9 w-9 sm:h-10 sm:w-10"
            >
              <Menu className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="min-w-[200px] p-1.5">
            {isAuthenticated ? (
              <>
                <DropdownMenuItem className="h-10 py-2 px-3 text-sm cursor-pointer">
                  <Link to="/" className="w-full flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    <span>My Account</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="h-10 py-2 px-3 text-sm cursor-pointer"
                  onClick={handleLogout}
                >
                  <div className="w-full flex items-center">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </div>
                </DropdownMenuItem>
              </>
            ) : (
              <DropdownMenuItem
                className="h-10 py-2 px-3 text-sm cursor-pointer"
                onClick={handleLogin}
              >
                <div className="w-full flex items-center">
                  <User className="mr-2 h-4 w-4" />
                  <span>Login</span>
                </div>
              </DropdownMenuItem>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="h-10 py-2 px-3 text-sm cursor-pointer">
              <Link to="/help" className="w-full">
                Help & Support
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
