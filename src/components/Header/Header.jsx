import React, { useEffect, useState, useRef } from "react";
import useStyles from "./HeaderCss";
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
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { getData } from "../../Services/NodeService";
import Login from "../Auth/Login";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Logout from "@mui/icons-material/Logout";
import {
  AccountCircle,
  Favorite,
  Home,
  List as ListIcon,
} from "@mui/icons-material";
import Dropdown from "../General/Dropdown";
import { logout } from "../../store/reducers/auth";
import { stringToColor } from "../../utils/utils";
import Logo from "../../images/logo.png";

const drawerWidth = 260;

const AccountMenu = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { name, mobile_number: mobileNumber } = useSelector(
    (state) => state.auth.user
  );

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
    { label: "Wishlist", icon: Favorite, path: "myaccount/wishlist" },
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

const Header = (props) => {
  const [categories, setCategories] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [open, setOpen] = useState(false);

  const searcto = useRef();
  const classes = useStyles();
  const cartItemsNumber = useSelector((state) => state.cart.items.length);

  const getCategories = async () => {
    const result = await getData("product/category");
    if (result.result) {
      setCategories(
        result.result.map((item, index) => ({ id: item.id, name: item.name }))
      );
    }
  };

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
            style={{ color: "black" }}
            key={category.id}
            className={classes.category}
            to={`/category/${category.name.replace(/\s+/g, "-")}`}
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
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    className={classes.category}
                    to={`/category/${category.name.replace(/\s+/g, "-")}`}
                  >
                    <Typography
                      sx={{
                        textTransform: "uppercase",
                        fontSize: "14px",
                        padding: "8px 14px",
                        fontWeight: "500",
                        color: "black !important",
                        textDecoration: "initial",
                        "&:hover": {
                          bgcolor: "primary.main",
                        },
                      }}
                    >
                      {category.name}
                    </Typography>
                  </Link>
                ))}
              </Box>
            </Stack>
            <div className={classes.right}>
              <Link onClick={() => setShowSearch(!showSearch)}>
                <SearchIcon
                  sx={{
                    color: "black",
                    fontSize: { xs: 20, sm: 24 },
                  }}
                />
              </Link>
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
                  sx={{ fontSize: { xs: 16, sm: 20 } }}
                  onClick={() => setOpen(true)}
                >
                  Login
                </Button>
              )}
              {showSearch && (
                // <Box width={{ xs: "100vw", sm: "100%" }}>
                <div className={classes.search}>
                  <input
                    type="text"
                    ref={searcto}
                    placeholder="Search entire store here..."
                  />
                  <button>Search</button>
                </div>
                // </Box>
              )}
            </div>
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
