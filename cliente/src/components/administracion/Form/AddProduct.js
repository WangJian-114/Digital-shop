import React, { useState, useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Title from '../Title';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Alerta from '../../../util/Alert';

import productContext from '../../../context/products/productContext';

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },

  title: {
    margin: theme.spacing(0, 3, 3),
  },

  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },

  submit: {
    width: 'auto',
    margin: theme.spacing(5, 2, 2),
  },

  campo: {
    margin: theme.spacing(0, 3, 3),
  },

}));

export default function AddProduct() {
  const classes = useStyles();

  const [archivo, guardarArchivo] = useState('');
  
  const [preview, setPreview] = useState('');

  const ProductContext = useContext(productContext);
  const {  addProduct } = ProductContext;

   // Formulario y Validacion con formik y yup
  const formik = useFormik({
    initialValues: {
      name:'',
      price:'',
      stock:0,
      description:'',
    },

    validationSchema: Yup.object({
        name  : Yup.string().required('El nombre del producto es obligatorio'),
        price: Yup.number().required('El precio no puede ir vacio').positive('No se aceptan números negativos'),
        stock: Yup.number().required('El stock no puede ir vacio').positive('No se aceptan números negativos')
    }),

    onSubmit: (info)=> {
      console.log('pase por aca');
      // console.log(archivo);
      // console.log(info);
      const formData = new FormData();
      formData.append('name', info.name);
      formData.append('price', info.price);
      formData.append('stock', info.stock);
      formData.append('description', info.description);
      formData.append('img', archivo);
      addProduct(formData);

    },
    
  });

  
  // Coloca la imagen en el state
  const leerArchivo = e => {
    const reader  = new FileReader();

    reader.onloadend = function () {
      setPreview(reader.result);
    }
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
      guardarArchivo(e.target.files[0]);
    }
  }



  return (
    <React.Fragment>
      <Title>Agrega Un Producto</Title>
      {formik.touched.price && formik.errors.price ? <Alerta mensaje={formik.errors.price} />: null }
      {formik.touched.name && formik.errors.name ? <Alerta mensaje={formik.errors.name} />: null }
      {formik.touched.stock && formik.errors.stock ? <Alerta mensaje={formik.errors.stock} />: null }
      <form className={classes.root} noValidate
        onSubmit={formik.handleSubmit}
      >
        <Grid container spacing={1}>
          <Grid container item lg={6} md={6} spacing={1}>
            <TextField 
              id="standard-basic" 
              label="Nombre Producto"
              required 
              type="string"
              className={classes.campo} 
              name = "name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            /> 
            <TextField 
              id="standard-basic" 
              type="Number"
              label="Precio"
              className={classes.campo} 
              name = "price"
              value={formik.values.price}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />          
            <TextField 
              id="standard-basic" 
              type="Number"
              label="Stock"
              display="inline"
              className={classes.campo} 
              name = "stock"
              value={formik.values.stock}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          
            <div className="">
              <label 
                htmlFor="descrition"
                className="label-textArea"
              >Descripcion</label>
            
              <textarea 
                name="description" 
                cols="40"  
                rows="10"
                className="form-textarea"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              ></textarea>

              <input 
                type="file"
                className="input-archivo"
                name = "img"
                value={formik.values.image}
                onChange={leerArchivo}
                onBlur={formik.handleBlur}
              />
            </div>

          </Grid>

          <Grid container item lg={6} md={6} spacing={1}>
              <p className="preview-text">Imagen de producto preview</p>
              { preview.length !== 0 ? <img src={preview}  alt=""  className="preview" /> : null}
          </Grid>
        </Grid>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Agregar
        </Button>
      </form>
    </React.Fragment>
  );
}