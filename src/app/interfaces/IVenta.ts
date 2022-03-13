import { IProducto } from './IProducto';
import { ICliente } from './ICliente';
export interface IVenta {
    idProducto: number;
    cantidad?: 0;
    valorUnitario?: 0;
    valorTotal?: 0;
    idUsuario: 0;
    producto: IProducto;
    cliente: ICliente;
}
