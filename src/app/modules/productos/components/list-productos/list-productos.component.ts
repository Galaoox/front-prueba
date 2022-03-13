import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { IProducto } from '@interfaces/IProducto';
import { ProductosService } from '@services/productos.service';
import { FormProductosComponent } from '../form-productos/form-productos.component';

@Component({
    selector: 'app-list-productos',
    templateUrl: './list-productos.component.html',
    styleUrls: ['./list-productos.component.css'],
    providers: [ProductosService]
})
export class ListProductosComponent implements OnInit, AfterViewInit {
    displayedColumns: string[] = ['nombre', 'valorUnitario', "acciones"];
    dataSource = new MatTableDataSource<IProducto>([]);

    @ViewChild(MatPaginator)
    paginator!: MatPaginator;
    constructor(private _productosService: ProductosService, private dialog: MatDialog) { }

    ngOnInit(): void {
        this.getData();
    }


    getData() {
        this._productosService.getProductos().subscribe({
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
        this._productosService.deleteProducto(id).subscribe({
            next: (res) => {
                this.getData();
            },
            error: (err) => {
                console.log(err);
            }
        });
    }

    openDialogFormProducto(id?: number) {
        const dialogRef = this.dialog.open(FormProductosComponent, {
            data: {
                id,
            },
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) this.getData();
        });
    }


}
