import React, { useContext, useEffect} from 'react';
import { Link } from 'react-router-dom';
import Alert from '../../util/Alert';
import AuthContext from '../../context/auth/authContext';
import { useFormik } from 'formik';
import * as Yup from 'yup';


const Login = (props) => {

    // extraer los valores del context
    const authContext = useContext(AuthContext);
    const { autenticado, logIn } = authContext; 

    // Formulario y Validacion con formik y yup
    const formik = useFormik({
        initialValues: {
            email:'test1@test.com',
            password:'1234567',
        },

        validationSchema: Yup.object({
            email   : Yup.string().email('El email no es valido').required('El email es obligatorio'),
            password: Yup.string().required('El password no puede ir vacio').min(6,'El password debe contener al menos 6 caracteres'),
        }),     

        onSubmit: (info)=> {
            logIn(info);
        }
    });

    useEffect(()=> {
        if(autenticado) {
            props.history.push('/');
        }
        // eslint-disable-next-line
    },[ autenticado, props.history]);

    return ( 
        <div className="form-usuario">

            <div className="contenedor-form sombra-dark">
                <h1>Iniciar Sesion</h1>

                <form
                    onSubmit={formik.handleSubmit}
                >
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
                    { formik.touched.name && formik.errors.name ? <Alert mensaje={formik.errors.name}/>: null }

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
                    { formik.touched.password && formik.errors.password ? <Alert mensaje={formik.errors.password}/>: null }

                    <div className="campo-form">
                        <input 
                            type="submit"
                            className="btn btn-primario btn-block"
                            value="Iniciar Sesion"
                        />
                    </div>

                </form>

                <Link to={'/nueva-cuenta'} className="enlace-cuenta">
                    Obtener Cuenta
                </Link>

            </div>
        </div>
     );
}
 
export default Login;