//Modules
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Guard
import { AuthGuard } from './_guard/auth.guard';
import { PaymentGuard } from './_guard/payment.guard';
import { CheckoutGuard } from './_guard/checkout.guard';

//Components
import { AppComponent } from './app.component';
import { UserloginComponent } from './pages/User/userlogin/userlogin.component';
import { UserregisterComponent } from './pages/User/userregister/userregister.component';
import { MainpageComponent } from './pages/mainpage/mainpage.component';
import { UserInfoComponent } from './pages/User/Profile/user-info/user-info.component';
import { EditInfoComponent } from './pages/User/Edit profile/edit-info/edit-info.component';
import { EditPasswordComponent } from './pages/User/Edit profile/edit-password/edit-password.component';
import { ForgotpasswordComponent } from './pages/User/forgotpassword/forgotpassword.component';
import { EditProfileComponent } from './pages/User/Edit profile/edit-profile/edit-profile.component';
import { EditPictureComponent } from './pages/User/Edit profile/edit-picture/edit-picture.component';
import { UserProfileComponent } from './pages/User/Profile/user-profile/user-profile.component';
import { UserCartInfoComponent } from './pages/User/Profile/user-cart-info/user-cart-info.component';
import { NotFoundComponent } from './pages/not_found/not-found.component';
import { UserCartComponent } from './pages/User/Cart/user-cart/user-cart.component';
import { UserCheckoutComponent } from './pages/User/Cart/user-checkout/user-checkout.component';
import { ProductDetailComponent } from './pages/Products/product-detail/product-detail.component';
import { ProductCategoryComponent } from './pages/Products/product-category/product-category.component';
import { AboutComponent } from './pages/about/about.component';
import { ReceiptComponent } from './pages/User/payment/receipt/receipt.component';
import { PaymentComponent } from './pages/User/payment/payment-layout/payment-layout.component';
import { PaymentSuccessComponent } from './pages/User/payment/payment-success/payment-success.component';
import { PaymentFailComponent } from './pages/User/payment/payment-fail/payment-fail.component';
import { PaymentInfoComponent } from './pages/User/payment/payment-info/payment-info.component';
import { PaymentMobileComponent } from './pages/User/payment/payment-mobile/payment-mobile.component';
import { PostListComponent } from './pages/post/post-list/post-list.component';
import { PostDetailComponent } from './pages/post/post-detail/post-detail.component';
import { MapComponent } from './pages/map/map.component';

const routes: Routes = [
  { path: '', redirectTo: 'mainpage', pathMatch: 'full' },
  { path: 'user_login', component: UserloginComponent },
  { path: 'user_register', component: UserregisterComponent },
  {
    path: 'profile', component: UserInfoComponent,
    children: [
      { path: '', redirectTo: 'yourprofile', pathMatch: 'full' },
      { path: 'yourprofile', component: UserProfileComponent },
      { path: 'yourcart', component: UserCartInfoComponent }
    ],
    canActivate: [AuthGuard]
  },
  {
    path: 'editProfile', component: EditInfoComponent,
    children: [
      { path: '', redirectTo: 'profile', pathMatch: 'full' },
      { path: 'profile', component: EditProfileComponent },
      { path: 'picture', component: EditPictureComponent },
      { path: 'password', component: EditPasswordComponent }
    ],
    canActivate: [AuthGuard]
  },
  { path: 'forgotpassword', component: ForgotpasswordComponent },
  { path: 'homepage', component: AppComponent },
  { path: 'cart', component: UserCartComponent },
  { path: 'checkout', component: UserCheckoutComponent, canActivate: [AuthGuard, CheckoutGuard] },
  { path: 'receipt/:bill_id', component: ReceiptComponent, canActivate: [AuthGuard, PaymentGuard] },
  {
    path: 'payment', component: PaymentComponent,
    children: [
      { path: '', redirectTo: '/404', pathMatch: 'full' },
      { path: 'info', component: PaymentInfoComponent },
      { path: 'success', component: PaymentSuccessComponent },
      { path: 'cancel', component: PaymentFailComponent },
      { path: 'mobile/:session_id', component: PaymentMobileComponent }
    ]
  },
  {
    path: 'post',
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: PostListComponent },
      { path: 'detail/:id', component: PostDetailComponent }
    ]
  },
  { path: 'mainpage', component: MainpageComponent },
  { path: 'product/:id', component: ProductDetailComponent },
  { path: 'category/:filter', component: ProductCategoryComponent },
  { path: 'about', component: AboutComponent },
  { path: 'map', component: MapComponent },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
