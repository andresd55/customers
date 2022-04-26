import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArtworksDetailsComponent } from './components/artworks/artworks-details/artworks-details.component';
import { ArtworksEditComponent } from './components/artworks/artworks-edit/artworks-edit.component';
import { ArtworksHistoryComponent } from './components/artworks/artworks-history/artworks-history.component';
import { ArtworksNewComponent } from './components/artworks/artworks-new/artworks-new.component';
import { BrandProductsDetailComponent } from './components/brand-products/brand-products-detail/brand-products-detail.component';
import { BrandProductsListComponent } from './components/brand-products/brand-products-list/brand-products-list.component';
import { PuchaseOrderComponent } from './components/brand-products/puchase-order/puchase-order.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ProfilesComponent } from './components/login/profiles/profiles.component';
import { ProductsListComponent } from './components/products/products-list/products-list.component';
import { CheckoutComponent } from './components/samples/checkout/checkout.component';
import { CheckoutComponentProduct } from './components/products/checkout/checkout.component';
import { PurchaseOrderComponent } from './components/samples/purchase-order/purchase-order.component';
import { SamplesListComponent } from './components/samples/samples-list/samples-list.component';
import { BrandProductsNewComponent } from './components/brand-products/brand-products-new/brand-products-new.component';
import { BrandProductsEditComponent } from './components/brand-products/brand-products-edit/brand-products-edit.component';
import { CustomersListComponent } from './components/customers/customers-list/customers-list.component';
import { CustomersCardsComponent } from './components/customers/customers-cards/customers-cards.component';
import { BasicInformationComponent } from './components/customers/basic-information/basic-information.component';
import { HomeSamplesComponent } from './components/technical-sheets/home-samples/home-samples.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'profiles_roles', component: ProfilesComponent },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'artworks_history', component: ArtworksHistoryComponent },
      { path: 'artworks_history/:customerId', component: ArtworksHistoryComponent },
      { path: 'artworks_new/:action', component: ArtworksNewComponent },
      { path: 'artworks_new/:action/:customerId', component: ArtworksNewComponent },
      { path: 'samples_list/:action', component: SamplesListComponent },
      { path: 'samples_by_customer/:action/:customerId', component: SamplesListComponent },
      { path: 'puchase_order', component: PurchaseOrderComponent },
      { path: 'sample_checkout', component: CheckoutComponent },
      { path: 'artworks_details', component: ArtworksDetailsComponent },
      { path: 'artworks_details/:sketchId', component: ArtworksDetailsComponent },
      { path: 'artworks_edit', component: ArtworksEditComponent },
      { path: 'artworks_edit/:sketchId', component: ArtworksEditComponent },
      { path: 'brandProducts', component: BrandProductsListComponent,  data: { } },
      { path: 'brandProducts/:customerId', component: BrandProductsListComponent,  data: { } },
      { path: 'brandProductsDetail', component: BrandProductsDetailComponent,  data: { } },
      { path: 'brandProductsNew', component: BrandProductsNewComponent,  data: { } },
      { path: 'brandProductsEdit', component: BrandProductsEditComponent,  data: { } },
      { path: 'brandProduct_puchase', component: PuchaseOrderComponent,  data: { } },
      { path: 'all_product', component: ProductsListComponent },
      { path: 'product_checkout', component: CheckoutComponentProduct },
      { path: 'customers_list', component: CustomersListComponent },
      { path: 'customers_cards', component: CustomersCardsComponent },
      { path: 'customers_cards/:action/:customerName', component: CustomersCardsComponent },
      { path: 'home_samples', component: HomeSamplesComponent },
      { path: 'home_samples/:action', component: HomeSamplesComponent },
      { path: 'basic_information/:action', component: BasicInformationComponent }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
