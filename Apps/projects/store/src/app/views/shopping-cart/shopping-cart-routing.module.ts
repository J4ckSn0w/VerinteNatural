import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShoppingCartComponent } from 'views/shopping-cart/shopping-cart.component';

const routes: Routes = [
    {
        path: '', component: ShoppingCartComponent, children: [

        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ShoppingCartRoutingModule { }