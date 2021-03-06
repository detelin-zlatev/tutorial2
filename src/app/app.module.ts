import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { MyApp } from './app.component';
import { CategoriesPage } from '../pages/categories/categories';
import { CategoryPage } from '../pages/category/category';
import { ProductPage } from '../pages/product/product';
import { EmailPage } from '../pages/email/email';
import { BasketPage } from '../pages/basket/basket';
import { PasswordPage } from '../pages/password/password';

@NgModule({
  declarations: [
    MyApp,
    CategoriesPage,
    CategoryPage,
    ProductPage,
    EmailPage,
    BasketPage,
    PasswordPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    CategoriesPage,
    CategoryPage,
    ProductPage,
    EmailPage,
    BasketPage,
    PasswordPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, Storage]
})
export class AppModule {}
