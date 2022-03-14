import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientesRoutingModule } from './clientes-routing.module';
import { ClientesComponent } from './components/clientes/clientes.component';
import { ListClientesComponent } from './components/list-clientes/list-clientes.component';
import { FormClientesComponent } from './components/form-clientes/form-clientes.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClientesService } from '@services/clientes.service';


const MaterialComponents = [
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatMenuModule,
    MatDialogModule,
    MatInputModule,
    MatGridListModule,
]

@NgModule({
    declarations: [
        ClientesComponent,
        ListClientesComponent,
        FormClientesComponent
    ],
    imports: [
        CommonModule,
        ClientesRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialComponents
    ],
    providers: [ClientesService]
})
export class ClientesModule { }
