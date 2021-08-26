import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import { Link } from 'react-router-dom';




export const mainListItems = (

  <div>
    <ListItem button  className="mb-2 mt-2">
      <Link to="/usuario/compras" className="adminMenuItem flex">
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        Mis Compras
      </Link>
    </ListItem>
  </div>

);
