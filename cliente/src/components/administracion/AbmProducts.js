import React, { useContext, useEffect } from 'react';
import { useHistory, Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';

import ProductoContext from "../../context/products/productContext";

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function AbmProducts() {

  const history = useHistory();
  const productosContext = useContext(ProductoContext);
  const { productos, getProducts, removeProduct, productSelected } = productosContext;

  const classes = useStyles();

  const eliminarProducto = (idProducto) => {
    // console.log("Eliminando el producto: ", idProducto);
    removeProduct(idProducto);
  }

  const editarProducto = (producto) => {
    productSelected(producto);
    history.push(`/administracion/editar-producto/${producto._id}`)
  }

  useEffect(() => {
    getProducts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  return (
    <React.Fragment>
      <Title>Todos Los Productos</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell>Precio</TableCell>
            <TableCell>Imagen</TableCell>
            <TableCell>Stock</TableCell>
            <TableCell align="right">Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {productos.map((producto) => (
            <TableRow key={producto._id}>
              <TableCell>{producto.name}</TableCell>
              <TableCell>{producto.price}</TableCell>
              <TableCell><img src={`${process.env.REACT_APP_BACKEND_URL_IMG}/${producto.img}`} alt="" className="imagen-products"/></TableCell>
              <TableCell>{producto.stock}</TableCell>
              <TableCell align="right">
                <button 
                  className="btn-borrar"
                  onClick={() => editarProducto(producto)}
                ><i className="far fa-edit"></i></button>

                <button 
                  className="btn-borrar"
                  onClick={() => eliminarProducto(producto._id)}
                ><i className="far fa-trash-alt"></i></button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link to="/administracion/agregar-producto">
          Agregar Producto
        </Link>
      </div>
    </React.Fragment>
  );
}