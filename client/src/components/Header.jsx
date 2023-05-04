import React, { useEffect, useState, useRef } from "react";
import {
  Box,
  Badge,
  Stack,
  Typography,
  Button,
  AppBar,
  Toolbar,
  ListItem,
  ListItemText,
  ListItemButton,
  Drawer,
  List,
  Grid,
} from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { getData } from "../services/NodeService";
import Login from "./auth/Login";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Home from "@mui/icons-material/Home";
import ListIcon from "@mui/icons-material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Logout from "@mui/icons-material/Logout";
import Dropdown from "./general/Dropdown";
import { logout } from "../store/reducers/auth";
import { stringToColor } from "../utils/utils";
import Logo from "../assets/logo.png";
import useDataFetch from "../hooks/useDataFetch";

const drawerWidth = 260;

const AccountMenu = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { name, mobileNumber } = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const menuItems = [
    { label: "My Profile", icon: AccountCircle, path: "myaccount/profile" },
    { label: "Orders", icon: ListIcon, path: "myaccount/orders" },
    { label: "Wishlist", icon: FavoriteIcon, path: "myaccount/wishlist" },
    { label: "Address", icon: Home, path: "myaccount/address" },
  ];

  return (
    <React.Fragment>
      <Dropdown
        open={open}
        onOpen={handleOpen}
        onClose={handleClose}
        position="right"
        trigger={
          <IconButton size="small">
            <Avatar
              src="#"
              sx={{ width: 32, height: 32, bgcolor: stringToColor(name) }}
              alt={name}
            />
          </IconButton>
        }
      >
        <MenuItem sx={{ display: "block" }} onClick={handleClose}>
          <Typography fontSize={16} fontWeight={700}>
            Hey {name?.split(" ")[0]}
          </Typography>
          <Typography fontSize={12}>{mobileNumber}</Typography>
        </MenuItem>
        <Divider />
        {menuItems.map(({ label, icon: Icon, path }) => (
          <MenuItem
            key={label}
            onClick={() => {
              handleClose();
              navigate(path);
            }}
          >
            <ListItemIcon>
              <Icon fontSize="small" />
            </ListItemIcon>
            {label}
          </MenuItem>
        ))}
        <MenuItem
          onClick={() => {
            handleClose();
            dispatch(logout());
          }}
        >
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Dropdown>
    </React.Fragment>
  );
};

const CategoryDropdown = ({ category, subcategories, index }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dropdown
      open={open}
      onOpen={handleOpen}
      onClose={handleClose}
      position={index === 0 ? "left" : "center"}
      disableArrow
      transitionProps={{ timeout: 50 }}
      trigger={
        <Typography
          sx={{
            textTransform: "uppercase",
            fontSize: "14px",
            padding: "8px 14px",
            fontWeight: "500",
            "&:hover": {
              bgcolor: "primary.main",
              cursor: "pointer",
            },
          }}
        >
          {category}
        </Typography>
      }
    >
      <Box width={subcategories.length > 10 ? 350 : 175} px={2}>
        <Grid container>
          {subcategories.map((subcategory) => (
            <Grid
              item
              key={subcategory.id}
              xs={subcategories.length > 10 ? 6 : 12}
            >
              <MenuItem
                sx={{
                  textTransform: "capitalize",
                  ":hover": { color: "secondary.main" },
                }}
                onClick={() => {
                  handleClose();
                  navigate(`/products/${category}/${subcategory.name}`);
                }}
              >
                {subcategory.name}
              </MenuItem>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Dropdown>
  );
};

const Header = (props) => {
  const [categories, setCategories] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [open, setOpen] = useState(false);

  const searchRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  const cartItemsNumber = useSelector((state) => state.cart.items.length);

  const getCategories = async () => {
    const result = await getData("product/category");
    if (result) {
      setCategories(
        result.map((item, index) => ({ id: item.id, name: item.name }))
      );
    }
  };

  const { data: subcategories } = useDataFetch("product/subcategory", []);

  const auth = useSelector((state) => state.auth);

  const handleClose = () => {
    setOpen(false);
  };

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Box py={2}>
        <img src={Logo} alt="Ultimate Garments" width={150} />
      </Box>
      <Divider />
      <List>
        {categories.map((category) => (
          <Link
            style={{ color: "black", textDecoration: "none" }}
            key={category.id}
            to={`/products/${category.name.replace(/\s+/g, "-")}`}
          >
            <ListItem key={category.id} disablePadding>
              <ListItemButton sx={{ textAlign: "center" }}>
                <ListItemText primary={category.name} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <Box bgcolor="white" position="sticky" top={0} zIndex={100}>
      <Box mx={8} height="62px" bgcolor="white">
        <AppBar component="nav" color="inherit">
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <Stack
              direction="row"
              alignItems="center"
              spacing={{ xs: 0, sm: 4 }}
            >
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { sm: "none" } }}
              >
                <MenuIcon />
              </IconButton>
              <Link to="/">
                <img src={Logo} alt="Ultimate Garments" width={80} />
              </Link>
              <Box sx={{ display: { xs: "none", sm: "flex" } }}>
                {categories.map((category, index) => (
                  <CategoryDropdown
                    key={category.id}
                    index={index}
                    category={category.name}
                    subcategories={subcategories.filter(
                      (item) => item.category_id === category.id
                    )}
                  />
                ))}
              </Box>
            </Stack>
            <Box
              sx={{
                marginLeft: { xs: 6, sm: 20 },
                position: "relative",
                display: "flex",
                listStyle: "none",
                alignItems: "center",
                columnGap: 2,
              }}
            >
              <SearchIcon
                onClick={(e) => {
                  setShowSearch(!showSearch);
                }}
                sx={{
                  color: "black",
                  fontSize: { xs: 20, sm: 24 },
                  cursor: "pointer",
                }}
              />

              <Link to="myaccount/wishlist">
                <FavoriteIcon
                  sx={{
                    color: "black",
                    fontSize: { xs: 20, sm: 24 },
                  }}
                />
              </Link>
              <Link to="/checkout/cart">
                <Badge badgeContent={cartItemsNumber} color="secondary">
                  <ShoppingCartIcon
                    sx={{
                      color: "black",
                      fontSize: { xs: 20, sm: 24 },
                    }}
                  />
                </Badge>
              </Link>
              {auth.isLoggedIn ? (
                <AccountMenu />
              ) : (
                <Button
                  color="inherit"
                  sx={{
                    fontSize: { xs: 16, sm: 20 },
                    visibility:
                      location.pathname === "/login" ? "hidden" : "visible",
                  }}
                  onClick={() => setOpen(true)}
                >
                  Login
                </Button>
              )}
              {showSearch && (
                <Box
                  sx={{
                    position: "absolute",
                    right: { xs: "-16px", sm: 0 },
                    padding: "10px",
                    display: "flex",
                    background: "whitesmoke",
                    top: "100%",
                    width: { xs: "95vw", sm: 340 },
                  }}
                >
                  <TextField
                    sx={{
                      padding: "10px 10px",
                      width: "100%",
                      border: "1px solid black",
                      borderRadius: 0,
                      outline: "none",
                    }}
                    type="text"
                    ref={searchRef}
                    placeholder="Search entire store here..."
                  />
                  <Button
                    sx={{
                      padding: "10px 20px",
                      background: "black",
                      color: "white",
                      border: "1px solid black",
                      outline: "none",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      navigate("/search/" + searchRef.current.value);
                      setShowSearch(false);
                    }}
                  >
                    Search
                  </Button>
                </Box>
              )}
            </Box>
          </Toolbar>
        </AppBar>
        <Box component="nav">
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
        </Box>
      </Box>
      <Login open={open} handleClose={handleClose} />
    </Box>
  );
};

export default Header;
