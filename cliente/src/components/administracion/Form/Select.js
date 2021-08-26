import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


import usuarioContext from '../../../context/user/userContext';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export default function DialogSelect({ uid }) {

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [rol, setRol] = React.useState('');

  const UsuarioContext = useContext(usuarioContext);
  const { assignRole } = UsuarioContext;

  const handleChange = (event) => {
    setRol((event.target.value) || '');
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const asignarRol = () => {
    handleClose();
    if(rol!== ''){
        assignRole( uid, rol);
    }

  }

  return (
    <div>
      <Button onClick={handleClickOpen}><i className="fas fa-caret-down"></i></Button>
      <Dialog disableBackdropClick disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogTitle>Selecciona un Rol</DialogTitle>
        <DialogContent>
          <form 
            className={classes.container}
        >
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="demo-dialog-native">SELECCIONA</InputLabel>
              <Select
                native
                onChange={handleChange}
                input={<Input id="demo-dialog-native" />}
              >
                <option aria-label="None" value="" />
                <option value={'USER_ROLE'}>USER</option>
                <option value={'ADMIN_ROLE'}>ADMIN</option>
                <option value={'VENTA_ROLE'}>VENTA</option>
              </Select>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={asignarRol} color="primary">
            Confirmar
          </Button>
          <Button onClick={handleClose} color="primary">
            Cancelar 
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
