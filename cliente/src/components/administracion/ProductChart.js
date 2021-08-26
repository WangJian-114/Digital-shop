import { useEffect, useContext } from 'react';
import pedidoContext from '../../context/order/orderContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';



const GraficoProducto = () => {

    const PedidoContext = useContext(pedidoContext);
    const {  productosMasVendido, getProductosMasVendido } = PedidoContext;
    // console.log(productosMasVendido);
    useEffect (() => {
      getProductosMasVendido(); 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    return (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={productosMasVendido}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="vendido" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      );
}
 
export default GraficoProducto;