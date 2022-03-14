import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VentasRoutingModule } from './ventas-routing.module';
import { VentasComponent } from './components/ventas/ventas.component';
import { ListVentasComponent } from './components/list-ventas/list-ventas.component';
import { FormVentasComponent } from './components/form-ventas/form-ventas.component';
import { VentasService } from '@services/ventas.service';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';


const MaterialComponents = [
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatMenuModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
]

@NgModule({
    declarations: [
        VentasComponent,
        ListVentasComponent,
        FormVentasComponent
    ],
    imports: [
        CommonModule,
        VentasRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialComponents
    ],
    providers: [
        VentasService
    ]
})
export class VentasModule { }
