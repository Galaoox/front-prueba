import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ICliente } from '@interfaces/ICliente';
import { ClientesService } from '@services/clientes.service';
import { FormClientesComponent } from '../form-clientes/form-clientes.component';

@Component({
    selector: 'app-list-clientes',
    templateUrl: './list-clientes.component.html',
    styleUrls: ['./list-clientes.component.css'],
    providers: [ClientesService]
})
export class ListClientesComponent implements OnInit, AfterViewInit {
    displayedColumns: string[] = ['nombre', 'apellido', "cedula", 'telefono', 'acciones'];
    dataSource = new MatTableDataSource<ICliente>([]);

    @ViewChild(MatPaginator)
    paginator!: MatPaginator;
    constructor(private _clientesService: ClientesService, private dialog: MatDialog) { }

    ngOnInit(): void {
        this.getData();
    }


    getData() {
        this._clientesService.getClientes().subscribe({
            next: (res) => {
                this.dataSource.data = res.data;
            },
            error: (err) => {
                console.log(err);
            }
        });
    }




    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

    add() {
        this.openDialogFormProducto();
    }

    edit(id: number) {
        this.openDialogFormProducto(id);
    }



    delete(id: number) {
        this._clientesService.deleteCliente(id).subscribe({
            next: (res) => {
                this.getData();
            },
            error: (err) => {
                console.log(err);
            }
        });
    }

    openDialogFormProducto(id?: number) {
        const dialogRef = this.dialog.open(FormClientesComponent, {
            data: {
                id,
            },
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) this.getData();
        });
    }

}
