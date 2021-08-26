import React from 'react';
import styled from '@emotion/styled';

const Error = styled.h1`
    margin-top: 5rem;
    text-align: center;
`;

const Error404 = () => {
    return ( 
        <Error>Pagina no encontrado</Error>
    );
}
 
export default Error404;