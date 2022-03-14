import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductosRoutingModule } from './productos-routing.module';
import { ProductosComponent } from './components/productos/productos.component';
import { ListProductosComponent } from './components/list-productos/list-productos.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { ProductosService } from '@services/productos.service';
import { MatDialogModule } from '@angular/material/dialog';
import { FormProductosComponent } from './components/form-productos/form-productos.component';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



const MaterialComponents = [
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatMenuModule,
    MatDialogModule,
    MatInputModule,
]

@NgModule({
    declarations: [
        ProductosComponent,
        ListProductosComponent,
        FormProductosComponent
    ],
    imports: [
        CommonModule,
        ProductosRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialComponents
    ],
    providers: [ProductosService]
})
export class ProductosModule { }
