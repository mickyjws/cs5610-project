import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {LoginComponent} from './components/user/login/login.component';
import {RegisterComponent} from './components/user/register/register.component';
import {ProfileComponent} from './components/user/profile/profile.component';
import {AuthGuard} from './services/auth-guard.service';
import {ItemNewComponent} from './components/item/item-new/item-new.component';
import {ItemEditComponent} from './components/item/item-edit/item-edit.component';
import {ItemGalleryViewComponent} from './components/item/item-list/item-gallery-view/item-gallery-view.component';
import {ItemListViewComponent} from './components/item/item-list/item-list-view/item-list-view.component';
import {RegisterAdminComponent} from './components/user/register/register-admin/register-admin.component';
import {RegisterBuyerComponent} from './components/user/register/register-buyer/register-buyer.component';
import {RegisterSellerComponent} from './components/user/register/register-seller/register-seller.component';
import {ItemTableViewComponent} from './components/item/item-list/item-table-view/item-table-view.component';
import {ItemDetailLoggedinComponent} from './components/item/item-detail/item-detail-loggedin/item-detail-loggedin.component';
import {ItemDetailGuestComponent} from './components/item/item-detail/item-detail-guest/item-detail-guest.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {UserTableViewComponent} from './components/user/user-list/user-table-view/user-table-view.component';
import {HomeGuestComponent} from './components/home/home-guest/home-guest.component';
import {HomeLoggedinComponent} from './components/home/home-loggedin/home-loggedin.component';
import {ItemWatchlistComponent} from './components/item/item-list/item-watchlist/item-watchlist.component';

const APP_ROUTES: Routes = [
    {path: '', component: HomeGuestComponent},
    {path: 'home', component: HomeLoggedinComponent, canActivate: [AuthGuard]},
    {path: 'default', component: LoginComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'register/admin', component: RegisterAdminComponent},
    {path: 'register/buyer', component: RegisterBuyerComponent},
    {path: 'register/seller', component: RegisterSellerComponent},
    {path: 'user', component: ProfileComponent, canActivate: [AuthGuard]},
    {path: 'user/item/new', component: ItemNewComponent, canActivate: [AuthGuard]},
    {path: 'user/item/:itemId', component: ItemEditComponent, canActivate: [AuthGuard]},
    {path: 'item/:itemId/detail', component: ItemDetailGuestComponent},
    {path: 'user/item/:itemId/detail', component: ItemDetailLoggedinComponent, canActivate: [AuthGuard]},
    {path: 'gallery', component: ItemGalleryViewComponent},
    {path: 'user/item-table', component: ItemTableViewComponent, canActivate: [AuthGuard]},
    {path: 'user/item-list', component: ItemListViewComponent, canActivate: [AuthGuard]},
    {path: 'user/item-watchlist', component: ItemWatchlistComponent, canActivate: [AuthGuard]},
    {path: 'user/dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
    {path: 'user/user-table', component: UserTableViewComponent, canActivate: [AuthGuard]},
];

// Export the routes as module providers
export const routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);
