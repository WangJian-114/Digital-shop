import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Alert from '../../util/Alert';
import AuthContext from '../../context/auth/authContext';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const NuevaCuenta = (props) => {

    // extraer los valores del context
    const authContext = useContext(AuthContext);
    const { autenticado, registerUser } = authContext; 

    const formik = useFormik({
        initialValues: {
            name:'',
            email:'',
            password:'',
            address:''
        },

        validationSchema: Yup.object({
            name    : Yup.string().required('El nombre es obligatorio'),
            email   : Yup.string().email('El email no es valido').required('El email es obligatorio'),
            password: Yup.string().required('El password no puede ir vacio').min(6,'El password debe contener al menos 6 caracteres'),
            address    : Yup.string().required('La direccion es obligatoria'),
        }),     

        onSubmit: (info)=> {
            registerUser(info);
        }
    });

    // En caso de que el usuario se haya autenticado o registrado o sea un registro duplicado
    useEffect(()=> {
        if(autenticado) {
            props.history.push('/');
        }

 
        // eslint-disable-next-line
    },[autenticado, props.history]);

    return ( 
        <div className="form-usuario">
            <div className="contenedor-form sombra-dark">
                <h1>Obtener una cuenta</h1>
                <form
                    onSubmit={formik.handleSubmit}
                >
                    <div className="campo-form">
                        <label htmlFor="text">Nombre:</label>
                        <input 
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Tu Nombre"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                    </div>
                    { formik.touched.name && formik.errors.name ? <Alert mensaje={formik.errors.name}/>: null }

                    <div className="campo-form">
                        <label htmlFor="email">Email:</label>
                        <input 
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Tu Email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                    </div>
                    { formik.touched.name && formik.errors.email ? <Alert mensaje={formik.errors.email}/>: null }

                    <div className="campo-form">
                        <label htmlFor="password">Password:</label>
                        <input 
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Tu Password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                    </div>
                    { formik.touched.name && formik.errors.password ? <Alert mensaje={formik.errors.password}/>: null }

                    <div className="campo-form">
                        <label htmlFor="address">Direccion:</label>
                        <input 
                            type="text"
                            id="address"
                            name="address"
                            placeholder="Agrega una direccion"
                            value={formik.values.address}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                    </div>
                    { formik.touched.name && formik.errors.address ? <Alert mensaje={formik.errors.address}/>: null }

                    <div className="campo-form">
                        <input 
                            type="submit"
                            className="btn btn-primario btn-block"
                            value="Registrarme"
                        />
                    </div>
                </form>

                <Link to={'/'} className="enlace-cuenta">
                    Volver a Iniciar Sesion
                </Link>

            </div>
        </div>
     );
}
 
export default NuevaCuenta;