import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IProducto } from '@interfaces/IProducto';
import { ProductosService } from '@services/productos.service';


@Component({
    selector: 'app-form-productos',
    templateUrl: './form-productos.component.html',
    styleUrls: ['./form-productos.component.css']
})
export class FormProductosComponent implements OnInit {
    id?: number;
    form: FormGroup;

    constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, private fb: FormBuilder, private dialogRef: MatDialogRef<FormProductosComponent>, private _productoService: ProductosService) {
        this.id = data.id;
        this.form = this.createForm();
    }

    ngOnInit(): void {
        if (this.id) this.getProducto(this.id);
    }

    createForm() {
        return this.fb.group({
            nombre: ['', [Validators.required, Validators.maxLength(50)]],
            valorUnitario: ['', [Validators.required]],
        });
    }

    submit() {
        const data = this.form.value;
        this.id ? this.updateProducto(this.id, data) : this.insertProducto(data);
    }

    insertProducto(data: IProducto) {
        this._productoService.createProducto(data).subscribe({
            next: (res) => {
                this.dialogRef.close(true);
            },
            error: (err) => {
                console.log(err);
                this.dialogRef.close(false);
            },
        });
        this.dialogRef.close(true);

    }

    updateProducto(id: number, data: IProducto) {
        this._productoService.updateProducto(id, data).subscribe({
            next: (res) => {
                this.dialogRef.close(true);
            },
            error: (err) => {
                console.log(err);
                this.dialogRef.close(false);
            },
        });
        this.dialogRef.close(true);
    }

    getProducto(id: number) {
        this._productoService.getProducto(id).subscribe({
            next: (res) => {
                this.form.patchValue(res.data);
            },
            error: (err) => {
                console.log(err);
            },
        });
    }



}


export interface DialogData {
    id?: number;
}
