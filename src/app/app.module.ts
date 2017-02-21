import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { CategoriesPage } from '../pages/categories/categories';
import { CategoryPage } from '../pages/category/category';
import { ProductPage } from '../pages/product/product';
import { OrderPage } from '../pages/order/order';
import { PasswordPage } from '../pages/password/password';

@NgModule({
  declarations: [
    MyApp,
    CategoriesPage,
    CategoryPage,
    ProductPage,
    OrderPage,
    PasswordPage
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
    OrderPage,
    PasswordPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
