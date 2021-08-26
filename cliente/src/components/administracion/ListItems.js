import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import { Link } from 'react-router-dom';




export const mainListItems = (

  <div>
    <ListItem button  className="mb-2 mt-2">
      <Link to="/administracion" className="adminMenuItem flex">
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              Dashboard
      </Link>
    </ListItem>
    <ListItem button  className="mb-2 mt-2">
      <Link to="/administracion/ordenes" className="adminMenuItem flex">
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        Ordenes
      </Link>
    </ListItem>
    <ListItem button  className="mb-2 mt-2">
      <Link to="/administracion/usuarios" className="adminMenuItem flex">
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        Clientes
      </Link>
    </ListItem>
    <ListItem button  className="mb-2 mt-2">
      <Link to="/administracion/productos" className="adminMenuItem flex">
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        Productos
      </Link>
    </ListItem>
  </div>
);
