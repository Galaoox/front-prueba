import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ICliente } from '@interfaces/ICliente';
import { IProducto } from '@interfaces/IProducto';
import { IVenta } from '@interfaces/IVenta';
import { ClientesService } from '@services/clientes.service';
import { ProductosService } from '@services/productos.service';
import { VentasService } from '@services/ventas.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
}


@Component({
    selector: 'app-form-ventas',
    templateUrl: './form-ventas.component.html',
    styleUrls: ['./form-ventas.component.css'],
    providers: [VentasService, ProductosService, ClientesService]
})
export class FormVentasComponent implements OnInit {
    form: FormGroup;
    listClientes: Array<ICliente> = [];
    listProductos: Array<IProducto> = [];

    matcher = new MyErrorStateMatcher();

    constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<FormVentasComponent>, private _ventasService: VentasService,
        private _productosService: ProductosService, private _clientesService: ClientesService) {
        this.form = this.createForm();
    }

    ngOnInit(): void {
        this.getListClientes();
        this.getListProductos();
    }

    createForm() {
        return this.fb.group({
            idProducto: ['', [Validators.required]],
            idCliente: ['', [Validators.required]],
            cantidad: ['', [Validators.required]],
        });
    }

    getListClientes() {
        this._clientesService.getClientes().subscribe({
            next: (res) => {
                this.listClientes = res.data;
            },
            error: (err) => {
                console.log(err);
            },
        });
    }

    getListProductos() {
        this._productosService.getProductos().subscribe({
            next: (res) => {
                this.listProductos = res.data;
            },
            error: (err) => {
                console.log(err);
            },
        });
    }

    submit() {
        if (this.form.valid) {
            const data = this.form.value;
            this.insertVenta(data);
        }

    }

    insertVenta(data: IVenta) {
        this._ventasService.createVenta(data).subscribe({
            next: (res) => {
                this.dialogRef.close(true);
            },
            error: (err) => {
                console.log(err);
                this.dialogRef.close(false);
            },
        });

    }

}


