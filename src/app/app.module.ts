import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { CategoriesPage } from '../pages/categories/categories';
import { CategoryPage } from '../pages/category/category';
import { ProductPage } from '../pages/product/product';
import { OrderPage } from '../pages/order/order';

@NgModule({
  declarations: [
    MyApp,
    CategoriesPage,
    CategoryPage,
    ProductPage,
    OrderPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    CategoriesPage,
    CategoryPage,
    ProductPage,
    OrderPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
