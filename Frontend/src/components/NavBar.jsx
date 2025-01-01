import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaBars, FaTimes } from "react-icons/fa";
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Typography,
  Box,
  Menu,
  MenuItem,
} from "@mui/material";
import { AccountCircle } from "@mui/icons-material";

function Navbar() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation(); 
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const isActiveLink = (path) => location.pathname === path; 

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "#00695c" }}>
      <Toolbar>
        
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link
            to="/dashboard"
            style={{
              color: "white",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            Expense Manager
          </Link>
        </Typography>

      
        <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}>
          <Button
            color="inherit"
            component={Link}
            to="/dashboard"
            sx={{ fontWeight: isActiveLink("/dashboard") ? "bold" : "normal" }}
          >
            Dashboard
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/add-transaction"
            sx={{
              fontWeight: isActiveLink("/add-transaction") ? "bold" : "normal",
            }}
          >
            Add Transaction
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/transaction-history"
            sx={{
              fontWeight: isActiveLink("/transaction-history")
                ? "bold"
                : "normal",
            }}
          >
            Transaction History
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/manage-categories"
            sx={{
              fontWeight: isActiveLink("/manage-categories")
                ? "bold"
                : "normal",
            }}
          >
            Manage Categories
          </Button>
          {user ? (
            <>
              <IconButton
                edge="end"
                color="inherit"
                onClick={handleMenuClick}
                sx={{ marginLeft: 2 }}
              >
                <AccountCircle />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem disabled>{user?.name}</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
          )}
        </Box>

        {/* Mobile Menu */}
        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          <IconButton color="inherit" onClick={toggleMenu}>
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </IconButton>
        </Box>

        
        {isMenuOpen && (
          <Box
            sx={{
              position: "absolute",
              top: "64px",
              right: "0",
              backgroundColor: "#00695c",
              width: "100%",
              display: { xs: "block", md: "none" },
              padding: 2,
            }}
          >
            <Link
              to="/dashboard"
              style={{
                display: "block",
                color: isActiveLink("/dashboard") ? "#ffeb3b" : "white",
                padding: "10px",
              }}
            >
              Dashboard
            </Link>
            <Link
              to="/add-transaction"
              style={{
                display: "block",
                color: isActiveLink("/add-transaction") ? "#ffeb3b" : "white",
                padding: "10px",
              }}
            >
              Add Transaction
            </Link>
            <Link
              to="/transaction-history"
              style={{
                display: "block",
                color: isActiveLink("/transaction-history")
                  ? "#ffeb3b"
                  : "white",
                padding: "10px",
              }}
            >
              Transaction History
            </Link>
            <Link
              to="/manage-categories"
              style={{
                display: "block",
                color: isActiveLink("/manage-categories") ? "#ffeb3b" : "white",
                padding: "10px",
              }}
            >
              Manage Categories
            </Link>
            {user ? (
              <>
                <span
                  style={{ display: "block", color: "white", padding: "10px" }}
                >
                  {user?.name}
                </span>
                <button
                  onClick={handleLogout}
                  style={{
                    width: "100%",
                    padding: "10px",
                    backgroundColor: "#004d40",
                    color: "white",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "center",
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                style={{
                  display: "block",
                  backgroundColor: "#004d40",
                  padding: "10px",
                  color: "white",
                  textAlign: "center",
                  borderRadius: "4px",
                  textDecoration: "none",
                }}
              >
                Login
              </Link>
            )}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
