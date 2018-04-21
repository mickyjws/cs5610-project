import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {routing} from './app.routing';
import {QuillEditorModule} from 'ngx-quill-editor';

import {AppComponent} from './app.component';
import {LoginComponent} from './components/user/login/login.component';
import {ProfileComponent} from './components/user/profile/profile.component';
import {RegisterComponent} from './components/user/register/register.component';
// import services
import {UserService} from './services/user.service.client';
import {ItemService} from './services/item.service.client';
import {HttpModule} from '@angular/http';
import {SharedService} from './services/shared.service';
import {AuthGuard} from './services/auth-guard.service';

import {ItemEditComponent} from './components/item/item-edit/item-edit.component';
import {ItemNewComponent} from './components/item/item-new/item-new.component';
import {ItemGalleryViewComponent} from './components/item/item-list/item-gallery-view/item-gallery-view.component';
import {ItemListViewComponent} from './components/item/item-list/item-list-view/item-list-view.component';
import {ProfileAdminComponent} from './components/user/profile/profile-admin/profile-admin.component';
import {ProfileSellerComponent} from './components/user/profile/profile-seller/profile-seller.component';
import {ProfileBuyerComponent} from './components/user/profile/profile-buyer/profile-buyer.component';
import {RegisterAdminComponent} from './components/user/register/register-admin/register-admin.component';
import {RegisterBuyerComponent} from './components/user/register/register-buyer/register-buyer.component';
import {RegisterSellerComponent} from './components/user/register/register-seller/register-seller.component';
import {ItemTableViewComponent} from './components/item/item-list/item-table-view/item-table-view.component';
import {ItemDetailGuestComponent} from './components/item/item-detail/item-detail-guest/item-detail-guest.component';
import {ItemDetailLoggedinComponent} from './components/item/item-detail/item-detail-loggedin/item-detail-loggedin.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {DashboardAdminComponent} from './components/dashboard/dashboard-admin/dashboard-admin.component';
import {DashboardBuyerComponent} from './components/dashboard/dashboard-buyer/dashboard-buyer.component';
import {DashboardSellerComponent} from './components/dashboard/dashboard-seller/dashboard-seller.component';
import {ItemGalleryViewDisplayComponent} from './components/item/item-list/item-gallery-view/item-gallery-view-display/item-gallery-view-display.component';
import {UserTableViewComponent} from './components/user/user-list/user-table-view/user-table-view.component';
import {HomeGuestComponent} from './components/home/home-guest/home-guest.component';
import {HomeLoggedinComponent} from './components/home/home-loggedin/home-loggedin.component';
import {ItemWatchlistComponent} from './components/item/item-list/item-watchlist/item-watchlist.component';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        ProfileComponent,
        RegisterComponent,
        ItemEditComponent,
        ItemNewComponent,
        ItemGalleryViewComponent,
        ItemListViewComponent,
        ProfileAdminComponent,
        ProfileSellerComponent,
        ProfileBuyerComponent,
        RegisterAdminComponent,
        RegisterBuyerComponent,
        RegisterSellerComponent,
        ItemTableViewComponent,
        ItemDetailGuestComponent,
        ItemDetailLoggedinComponent,
        DashboardComponent,
        DashboardAdminComponent,
        DashboardBuyerComponent,
        DashboardSellerComponent,
        ItemGalleryViewDisplayComponent,
        UserTableViewComponent,
        HomeGuestComponent,
        HomeLoggedinComponent,
        ItemWatchlistComponent
    ],
    imports: [
        BrowserModule,
        routing,
        FormsModule,
        HttpModule,
        QuillEditorModule
    ],
    providers: [UserService, SharedService, AuthGuard, ItemService],
    bootstrap: [AppComponent]
})

export class AppModule {
}
