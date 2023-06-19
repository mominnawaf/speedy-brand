import React, { useContext, useState } from 'react';
import { Menu, MenuItem, Avatar, AppBar, Toolbar, CssBaseline, Typography } from "@mui/material";
import UserContext from "../../context/UserContext"

const NavBar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | EventTarget & Element>(null);
    const { logout, user } = useContext(UserContext)

    const handleMenuOpen = (event: React.MouseEvent) => {
        setAnchorEl(event.currentTarget);
        setMenuOpen(true);
    };

    const handleLogout = () => {
        handleMenuClose()
        logout()
    }

    const MenuItems = () => {
        return (
            <Menu
                anchorEl={anchorEl}
                open={menuOpen}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={handleMenuClose}>Alex Major</MenuItem>
                <MenuItem onClick={handleMenuClose}>{user?.email && user.email}</MenuItem>
                <MenuItem onClick={handleLogout} sx={{ color: "red" }}>
                    Logout
                </MenuItem>
            </Menu>
        );
    };

    const handleMenuClose = () => {
        setMenuOpen(false);
    };

    return (
        <React.Fragment>
            <CssBaseline />
            {menuOpen && <MenuItems />}
            <AppBar>
                <Toolbar>
                    <Typography color="inherit" sx={{ flexGrow: 1 }}>
                        Welcome Alex Major
                    </Typography>
                    <Avatar
                        sx={{ width: 40, height: 40 }}
                        src='https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
                        onClick={handleMenuOpen}
                    />
                </Toolbar>
            </AppBar>
            <Toolbar />
        </React.Fragment>
    );
};

export default NavBar;