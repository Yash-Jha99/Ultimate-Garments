import React, { useState, useRef } from "react";
import {
  Box,
  Badge,
  Stack,
  Typography,
  Button,
  AppBar,
  Toolbar,
  ListItem,
  Drawer,
  Grid,
  Paper,
  Tabs,
  Tab,
} from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
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
import categories from "../data/categories.json"
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from '@mui/icons-material/LightMode';
import { toggleDarkMode } from "../store/reducers/theme";

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
      <IconButton disableRipple sx={{ display: { xs: "initial", sm: "none" } }} size="small" onClick={() => navigate("/myaccount")}>
        <Avatar
          src="#"
          sx={{ width: 32, height: 32, bgcolor: stringToColor(name) }}
          alt={name}
        />
      </IconButton>
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
        <Paper sx={{ py: 2, px: 1 }} elevation={2}>
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
        </Paper>
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
              color: "black",
              cursor: "pointer",
            },
          }}
        >
          {category}
        </Typography>
      }
    >
      <Paper elevation={2}>
        <Box width={subcategories.length > 10 ? 350 : 175} p={2}>
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
      </Paper>
    </Dropdown>
  );
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


const Header = (props) => {
  // const [categories, setCategories] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = React.useState(0);
  const searchRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  const cartItemsNumber = useSelector((state) => state.cart.items.length);
  const { darkMode } = useSelector((state) => state.theme);
  const { name } = useSelector((state) => state.auth.user);
  const dispatch = useDispatch()

  const { data: subcategories } = useDataFetch("product/subcategory", []);

  const auth = useSelector((state) => state.auth);

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Paper>
      <Box bgcolor="background.paper" position="sticky" top={0} zIndex={20}>
        <Link to="/myaccount">
          <Box
            onClick={handleDrawerToggle}
            px={4}
            py={2}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Avatar
              src="#"
              sx={{
                width: 40,
                height: 40,
                fontSize: 28,
                fontWeight: 500,
                bgcolor: stringToColor(name),
              }}
              alt={name}
            />

            <Typography variant="h5">
              {name}
            </Typography>
          </Box>
        </Link>
        <Divider />
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs variant="fullWidth" value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab disableRipple label="Men" {...a11yProps(0)} />
            <Tab disableRipple label="Women" {...a11yProps(1)} />
          </Tabs>
        </Box>
      </Box>
      <TabPanel value={value} index={0}>
        {subcategories.filter(
          (item) => item.category_id === "1"
        ).map(subcategory => <Link key={subcategory.id} to={`/products/men/${subcategory.name}`}> <ListItem onClick={handleDrawerToggle} sx={{ textTransform: "capitalize" }}>{subcategory.name}</ListItem></Link>)
        }
      </TabPanel>
      <TabPanel value={value} index={1}>
        {subcategories.filter(
          (item) => item.category_id === "2"
        ).map(subcategory => <Link key={subcategory.id} to={`/products/women/${subcategory.name}`}> <ListItem onClick={handleDrawerToggle} sx={{ textTransform: "capitalize" }}>{subcategory.name}</ListItem></Link>)
        }
      </TabPanel>
    </Paper>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  // useEffect(() => {
  //   getCategories();
  // }, []);

  return (
    <Box position="sticky" top={0} zIndex={100} height="62px">
      <Paper >
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
                sx={{ mr: 1.5, display: { sm: "none" } }}
              >
                <MenuIcon />
              </IconButton>
              <Link to="/">
                <img src={Logo} alt="Ultimate Garments" width={76} />
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
                marginLeft: { xs: 5, sm: 20 },
                position: "relative",
                display: "flex",
                listStyle: "none",
                alignItems: "center",
                columnGap: 2,
              }}
            >
              <IconButton onClick={() => dispatch(toggleDarkMode())}>
                {!darkMode ? <DarkModeIcon /> : <LightModeIcon />}
              </IconButton>
              <SearchIcon
                onClick={(e) => {
                  setShowSearch(!showSearch);
                }}
                sx={{
                  fontSize: { xs: 20, sm: 24 },
                  cursor: "pointer",
                }}
              />
              <Link to="myaccount/wishlist">
                <FavoriteIcon
                  sx={{
                    color: "inherit",
                    fontSize: { xs: 20, sm: 24 },
                  }}
                />
              </Link>
              <Link to="/checkout/cart">
                <Badge badgeContent={cartItemsNumber} color="secondary">
                  <ShoppingCartIcon
                    sx={{
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
                    fontSize: { xs: 16, sm: 18 },
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
                  <input
                    style={{
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
                      padding: "6px 20px",
                      background: "black",
                      color: "white",
                      borderRadius: "none",
                      border: "1px solid black",
                      outline: "none",
                      cursor: "pointer",
                      ":hover": { bgcolor: "black" }
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
      </Paper>
      <Login open={open} handleClose={handleClose} />
    </Box>
  );
};

export default Header;
