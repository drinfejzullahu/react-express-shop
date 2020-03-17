import React, { useEffect, useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MailIcon from "@material-ui/icons/Mail";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import PeopleIcon from "@material-ui/icons/People";
import LockIcon from "@material-ui/icons/Lock";
import SettingsApplicationsIcon from "@material-ui/icons/SettingsApplications";
import CategoryIcon from "@material-ui/icons/Category";
import RoomIcon from "@material-ui/icons/Room";
import { useDispatch, useSelector } from "react-redux";
import * as serviceActions from "../../store/service";
import * as productActions from "../../store/product";
import * as productServiceActions from "../../store/product-service";
import * as soldActions from "../../store/sold";
import * as shopActions from "../../store/shop";
import * as userActions from "../../store/user";
import * as customerActions from "../../store/customer";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import Table from "./Table";
import axios from "axios";
import { Link } from "react-router-dom";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  appBar: {
    backgroundColor: "#222423",
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth
    }
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  toolbar: theme.mixins.toolbar,

  drawerPaper: {
    width: drawerWidth
  },
  listitem: {
    cursor: "pointer"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  }
}));

export default function AdminMainPage(props) {
  const dispatch = useDispatch();
  const users = useSelector(state => state.usersReducer.users);
  const products = useSelector(state => state.productsReducer.products);
  const services = useSelector(state => state.servicesReducer.services);
  const shops = useSelector(state => state.shopsReducer.shops);
  const customers = useSelector(state => state.customersReducer.customers);
  const sold = useSelector(state => state.soldReducer.sold);

  useEffect(() => {
    dispatch(userActions.getUsersAsync());
    dispatch(productActions.getProductsAsync());
    dispatch(serviceActions.getServicesAsync());
    dispatch(shopActions.getShopsAsync());
    dispatch(customerActions.getCustomersAsync());
    dispatch(soldActions.getSoldProductsAsync());
  }, []);

  const { container } = props;
  const classes = useStyles();
  const theme = useTheme();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [data, setData] = useState([]);
  const [type, setType] = useState("");

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const deleteRow = (type, data) => {
    // axios
    //   .delete(`http://localhost:5000/api/${type}/delete-${type}`, data)
    //   .then(res => {
    //     console.log(res);
    //     axios
    //       .get(`http://localhost:5000/api/${type}/get-all`)
    //       .then(res => {
    //         setData(res.data);
    //       })
    //       .catch(err => {
    //         console.log(err);
    //       });
    //   })
    //   .catch(err => console.log(err));
  };

  const editRow = (oldData, newData) => {
    console.log(oldData, newData);
    const newDatas = {
      ...newData,
      id: oldData.id ? oldData.id : oldData.p_id
    };
    axios
      .put(`http://localhost:5000/api/${type}/update-${type}`, newDatas)
      .then(res => {
        axios
          .get(`http://localhost:5000/api/${type}/get-all`)
          .then(res => {
            setData(res.data);
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => console.log(err));
  };

  const handleProducts = () => {
    if (data.length > 0) {
      setData([]);
    }
    if (type) {
      setType("");
    }
    setType("product");
    setData(products);
  };

  const handleServices = () => {
    if (data.length > 0) {
      setData([]);
    }
    if (type) {
      setType("");
    }
    setType("service");
    setData(services);
  };

  const handleUsers = () => {
    if (data.length > 0) {
      setData([]);
    }
    if (type) {
      setType("");
    }
    setType("user");
    setData(users);
  };

  const handleCustomers = () => {
    if (data.length > 0) {
      setData([]);
    }
    if (type) {
      setType("");
    }
    setType("customer");
    setData(customers);
  };

  const handleShops = () => {
    if (data.length > 0) {
      setData([]);
    }
    if (type) {
      setType("");
    }
    setType("shop");
    setData(shops);
  };

  const handleSold = () => {
    if (data.length > 0) {
      setData([]);
    }
    if (type) {
      setType("");
    }
    setType("sold");
    setData(sold);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Typography variant="h6" noWrap>
        <Link
          to="/"
          style={{
            color: "black",
            textDecoration: "none",
            marginLeft: "10px"
          }}
        >
          Home
        </Link>
      </Typography>

      <Divider />

      <List>
        <ListItem className={classes.listitem} onClick={handleUsers}>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText>Users</ListItemText>
        </ListItem>
        <ListItem className={classes.listitem} onClick={handleServices}>
          <ListItemIcon>
            <SettingsApplicationsIcon />
          </ListItemIcon>
          <ListItemText>Services</ListItemText>
        </ListItem>
        <ListItem className={classes.listitem} onClick={handleProducts}>
          <ListItemIcon>
            <CategoryIcon />
          </ListItemIcon>
          <ListItemText>Products</ListItemText>
        </ListItem>

        <ListItem className={classes.listitem} onClick={handleCustomers}>
          <ListItemIcon>
            <MailIcon />
          </ListItemIcon>
          <ListItemText>Customers</ListItemText>
        </ListItem>

        <ListItem className={classes.listitem} onClick={handleShops}>
          <ListItemIcon>
            <RoomIcon />
          </ListItemIcon>
          <ListItemText>Shops</ListItemText>
        </ListItem>
        <ListItem className={classes.listitem} onClick={handleSold}>
          <ListItemIcon>
            <AccountBalanceIcon />
          </ListItemIcon>
          <ListItemText>Sold</ListItemText>
        </ListItem>
      </List>

      <Divider />
      {/* 
      <List>
        <ListItem className={classes.listitem} onClick={handleLogOut}>
          <ListItemIcon>
            <LockIcon />
          </ListItemIcon>
          <ListItemText>Log Out</ListItemText>
        </ListItem>
      </List> */}
    </div>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      {/* <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Admin Page
          </Typography>
        </Toolbar>
      </AppBar> */}
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper
            }}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Table
          editRow={editRow}
          deleteRow={deleteRow}
          type={type}
          data={data}
        />
      </main>
    </div>
  );
}
