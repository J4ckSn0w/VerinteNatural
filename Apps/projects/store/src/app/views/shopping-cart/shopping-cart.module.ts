import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'

// Tools
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

// Routes
import { ShoppingCartRoutingModule } from 'views/shopping-cart/shopping-cart-routing.module';

// View
import { ShoppingCartComponent } from 'views/shopping-cart/shopping-cart.component'

// Components
import { ShoppingCartProductListComponent } from 'components/shopping-cart/shopping-cart-product-list/shopping-cart-product-list.component';
import { ShoppingCartProductComponent } from 'components/shopping-cart/shopping-cart-product/shopping-cart-product.component';
import { OrderStepsComponent } from 'components/shopping-cart/order-steps/order-steps.component';


@NgModule({
    imports: [
        CommonModule,
        ShoppingCartRoutingModule,
        ReactiveFormsModule,
        FormsModule
    ],
    declarations: [
        ShoppingCartComponent,
        ShoppingCartProductListComponent,
        ShoppingCartProductComponent,
        OrderStepsComponent
    ]
})
export class ShoppingCartModule { }