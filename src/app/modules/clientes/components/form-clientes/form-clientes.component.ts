import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ICliente } from '@interfaces/ICliente';
import { ClientesService } from '@services/clientes.service';

@Component({
    selector: 'app-form-clientes',
    templateUrl: './form-clientes.component.html',
    styleUrls: ['./form-clientes.component.css']
})
export class FormClientesComponent implements OnInit {

    id?: number;
    form: FormGroup;

    constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, private fb: FormBuilder, private dialogRef: MatDialogRef<FormClientesComponent>, private _clientesService: ClientesService) {
        this.id = data.id;
        this.form = this.createForm();
    }

    ngOnInit(): void {
        if (this.id) this.getCliente(this.id);
    }

    createForm() {
        return this.fb.group({
            nombre: ['', [Validators.required, Validators.maxLength(50)]],
            apellido: ['', [Validators.required, Validators.maxLength(50)]],
            cedula: ['', [Validators.required, Validators.maxLength(15)]],
            telefono: ['', [Validators.required, Validators.maxLength(15)]],
        });
    }

    submit() {
        if (this.form.valid) {
            const data = this.form.value;
            this.id ? this.updateCliente(this.id, data) : this.insertCliente(data);
        }

    }

    insertCliente(data: ICliente) {
        this._clientesService.createCliente(data).subscribe({
            next: (res) => {
                this.dialogRef.close(true);
            },
            error: (err) => {
                console.log(err);
                this.dialogRef.close(false);
            },
        });

    }

    updateCliente(id: number, data: ICliente) {
        this._clientesService.updateCliente(id, data).subscribe({
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

    getCliente(id: number) {
        this._clientesService.getCliente(id).subscribe({
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
