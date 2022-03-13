import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'productos',
    loadChildren: () => import("@modules/productos/productos.module").then(m => m.ProductosModule)
  },
  {
    path: 'clientes',
    loadChildren: () => import('@modules/clientes/clientes.module').then(m => m.ClientesModule)
  },
  {
    path: 'ventas',
    loadChildren: () => import('@modules/ventas/ventas.module').then(m => m.VentasModule)
  },
  {
    path: '',
    redirectTo: 'productos',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
