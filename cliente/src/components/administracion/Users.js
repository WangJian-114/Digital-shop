import React, { useContext, useEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import Select from './Form/Select';

import usuarioContext from '../../context/user/userContext';

export default function Users() {

  const UsuarioContext = useContext(usuarioContext);
  const { usuarios, getAllUsers, deleteUser  } = UsuarioContext;

  const eliminarUsuario = async (usuarioId) => {
    await deleteUser(usuarioId) 
  }

  useEffect (() => {
    getAllUsers();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])


  
  return (
    <React.Fragment>
      <Title>Todos los Usuarios</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Direccion</TableCell>
            <TableCell>Rol</TableCell>
            <TableCell>Asignar Rol</TableCell>
            <TableCell align="right">Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {usuarios.map((usuario) => (
            <TableRow key={usuario.uid}>
              <TableCell>{usuario.name}</TableCell>
              <TableCell>{usuario.email}</TableCell>
              <TableCell>{usuario.address}</TableCell>
              <TableCell>{usuario.rol}</TableCell>
              <TableCell>
                <Select uid ={usuario.uid} /></TableCell>
              <TableCell align="right">                                     
                <button 
                  className="btn-borrar"
                  onClick={() => eliminarUsuario(usuario.uid)}
                ><i className="far fa-trash-alt"></i></button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}