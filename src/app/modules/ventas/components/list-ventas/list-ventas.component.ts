import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { IVenta } from '@interfaces/IVenta';
import { VentasService } from '@services/ventas.service';
import { FormVentasComponent } from '../form-ventas/form-ventas.component';

@Component({
    selector: 'app-list-ventas',
    templateUrl: './list-ventas.component.html',
    styleUrls: ['./list-ventas.component.css'],
    providers: [VentasService]
})
export class ListVentasComponent implements OnInit, AfterViewInit {

    displayedColumns: string[] = ['cliente', 'producto', 'cantidad', 'valorUnitario', "valorTotal", 'acciones'];
    dataSource = new MatTableDataSource<IVenta>([]);

    @ViewChild(MatPaginator)
    paginator!: MatPaginator;
    constructor(private _ventasService: VentasService, private dialog: MatDialog) { }

    ngOnInit(): void {
        this.getData();
    }


    getData() {
        this._ventasService.getVentas().subscribe({
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
        this._ventasService.deleteVenta(id).subscribe({
            next: (res) => {
                this.getData();
            },
            error: (err) => {
                console.log(err);
            }
        });
    }

    openDialogFormProducto(id?: number) {
        const dialogRef = this.dialog.open(FormVentasComponent, {
            data: {
                id,
            },
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) this.getData();
        });
    }
}
