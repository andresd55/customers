import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../login/login.component';
import { HomeComponent } from '../home/home.component';
import { BrowserModule } from '@angular/platform-browser';
import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarComponent } from '../ui/sidebar/sidebar.component';
import { FooterComponent } from '../ui/footer/footer.component';
import { NavbarComponent } from '../ui/navbar/navbar.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { ArtworksHistoryComponent } from '../artworks/artworks-history/artworks-history.component';
import { ArtworksNewComponent } from '../artworks/artworks-new/artworks-new.component';
import { ButtonModule } from 'src/app/shared/framework-ui/primeng/button/button';
import { CoreModule } from 'src/app/core/core/core.module';
import { CardModule } from 'src/app/shared/framework-ui/primeng/card/public_api';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TableModule } from 'src/app/shared/framework-ui/primeng/table/public_api';
import { SamplesListComponent } from '../samples/samples-list/samples-list.component';
import { InputTextModule } from 'src/app/shared/framework-ui/primeng/inputtext/inputtext';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { DropdownModule } from 'src/app/shared/framework-ui/primeng/dropdown/public_api';
import { DatepickerComponentModule } from 'src/app/shared/framework-ui/custom/datepicker/datepicker.component';
import { TooltipModule } from 'src/app/shared/framework-ui/primeng/tooltip/tooltip';
import { DialogModule } from 'src/app/shared/framework-ui/primeng/dialog/public_api';
import { InputTextareaModule } from 'src/app/shared/framework-ui/primeng/inputtextarea/public_api';
import { MultiSelectModule } from 'src/app/shared/framework-ui/primeng/multiselect/public_api';
import { RippleModule } from 'src/app/shared/framework-ui/primeng/ripple/public_api';
import { PurchaseOrderComponent } from '../samples/purchase-order/purchase-order.component';
import { ArtworksDetailsComponent } from '../artworks/artworks-details/artworks-details.component';
import { ShoppingCartComponent } from '../products/shopping-cart/shopping-cart.component';
import { ProductDetailComponent } from '../products/product-detail/product-detail.component';
import { AccordionModule } from 'src/app/shared/framework-ui/primeng/accordion/accordion';
import {
  InteractionType,
  IPublicClientApplication,
  PublicClientApplication,
} from '@azure/msal-browser';
import { ProfilesComponent } from '../login/profiles/profiles.component';
import { CheckboxModule } from 'src/app/shared/framework-ui/primeng/checkbox/public_api';
import { ToastModule } from 'src/app/shared/framework-ui/primeng/toast/public_api';
import {
  MsalService,
  MsalModule,
  MSAL_INSTANCE,
  MsalRedirectComponent,
  MsalInterceptorConfiguration,
  MsalInterceptor,
  MSAL_INTERCEPTOR_CONFIG,
} from '@azure/msal-angular';
import { AppComponent } from 'src/app/app.component';
import { environment } from 'src/environments/environment';
import { BrandProductsListComponent } from '../brand-products/brand-products-list/brand-products-list.component';
import { BrandProductsDetailComponent } from '../brand-products/brand-products-detail/brand-products-detail.component';
import { PuchaseOrderComponent } from '../brand-products/puchase-order/puchase-order.component';
import { CheckoutComponent } from '../samples/checkout/checkout.component';
import { RadioButtonModule } from 'src/app/shared/framework-ui/primeng/radiobutton/public_api';
import { ArtworksEditComponent } from '../artworks/artworks-edit/artworks-edit.component';
import { PaginatorModule } from 'src/app/shared/framework-ui/primeng/paginator/paginator';
import { ProductsListComponent } from '../products/products-list/products-list.component';
import { CheckoutComponentProduct } from '../products/checkout/checkout.component';
import { BrandProductsNewComponent } from '../brand-products/brand-products-new/brand-products-new.component';
import { InterceptorsTokenService } from 'src/app/core/services/interceptors/interceptors-token.service';
import { BrandProductsEditComponent } from '../brand-products/brand-products-edit/brand-products-edit.component';
import { CustomersListComponent } from '../customers/customers-list/customers-list.component';
import { CustomersCardsComponent } from '../customers/customers-cards/customers-cards.component';
import { BreadcrumbModule } from 'src/app/shared/framework-ui/primeng/breadcrumb/public_api';
import { TimelineModule } from 'src/app/shared/framework-ui/primeng/timeline/public_api';
import { ContextMenuModule } from 'src/app/shared/framework-ui/primeng/contextmenu/contextmenu';
import { BasicInformationComponent } from '../customers/basic-information/basic-information.component';
import { GeneralDataOfSampleComponent } from '../technical-sheets/general-data-of-sample/general-data-of-sample.component';
import { IdentificationDataComponent } from '../technical-sheets/identification-data/identification-data.component';
import { InventoryTweaksComponent } from '../technical-sheets/inventory-tweaks/inventory-tweaks.component';
import { TechnicalDataComponent } from '../technical-sheets/technical-data/technical-data.component';
import { HomeSamplesComponent } from '../technical-sheets/home-samples/home-samples.component';
import { ImageSettingsComponent } from '../technical-sheets/image-settings/image-settings.component';
import { InputNumberModule } from 'src/app/shared/framework-ui/primeng/inputnumber/public_api';
import { AdditionalPropertiesComponent } from '../technical-sheets/additional-properties/additional-properties.component';
import { CustomerReferenceComponent } from '../technical-sheets/customer-reference/customer-reference.component';
import { ImageDirective } from 'src/app/shared/framework-ui/custom/appImage/appImage.directive';
import { ButtonFinotexModule } from 'src/app/shared/framework-ui/custom/button-finotex/button-finotex.component';
import { SearchSelectorFinotexModule } from 'src/app/shared/framework-ui/custom/search-selector/search-selector.component';
import { ShoppingCartModule } from 'src/app/shared/framework-ui/custom/shopping-cart-finotex/shopping-cart-finotex.component';
import { CalendarModule } from 'src/app/shared/framework-ui/primeng/calendar/calendar';
import { TabMenuModule } from 'src/app/shared/framework-ui/primeng/tabmenu/public_api';
import { TabViewModule } from 'src/app/shared/framework-ui/primeng/tabview/public_api';
import { TableModuleFinotex } from 'src/app/shared/framework-ui/primeng/tablafinotex/public_api';
import { MaterialsComponent } from '../technical-sheets/materials/materials.component';
import { MallasComponent } from '../technical-sheets/mallas/mallas.component';

export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: environment.authB2c,
  });
}

export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  const protectedResourceMap = new Map<string, Array<string>>();
  protectedResourceMap.set('https://graph.microsoft.com/v1.0/me', [
    'user.read',
  ]);
  protectedResourceMap.set(
    'https://FinotexB2C.onmicrosoft.com/e8529ad6-7364-454a-afac-6c74edc7d5d3/access_as_user',
    ['access_as_user']
  );

  return {
    interactionType: InteractionType.Popup,
    protectedResourceMap,
  };
}

@NgModule({
  declarations: [
    LoginComponent,
    HomeComponent,
    SidebarComponent,
    FooterComponent,
    NavbarComponent,
    DashboardComponent,
    ArtworksHistoryComponent,
    ArtworksNewComponent,
    SamplesListComponent,
    PurchaseOrderComponent,
    ArtworksDetailsComponent,
    ImageDirective,
    ProfilesComponent,
    BrandProductsListComponent,
    BrandProductsDetailComponent,
    BrandProductsNewComponent,
    BrandProductsEditComponent,
    PuchaseOrderComponent,
    CheckoutComponent,
    ArtworksEditComponent,
    ProductDetailComponent,
    ShoppingCartComponent,
    ProductsListComponent,
    CheckoutComponent,
    CheckoutComponentProduct,
    CustomersListComponent,
    CustomersCardsComponent,
    BasicInformationComponent,
    GeneralDataOfSampleComponent,
    IdentificationDataComponent,
    HomeSamplesComponent,
    ImageSettingsComponent,
    AdditionalPropertiesComponent,
    InventoryTweaksComponent,
    TechnicalDataComponent,
    CustomerReferenceComponent,
    MaterialsComponent,
    MallasComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    RouterModule,
    CoreModule,
    ButtonModule,
    CardModule,
    InputTextModule,
    AutocompleteLibModule,
    DropdownModule,
    DialogModule,
    InputTextareaModule,
    MultiSelectModule,
    TooltipModule,
    RippleModule,
    AccordionModule,
    CheckboxModule,
    ToastModule,
    RadioButtonModule,
    TableModule,
    PaginatorModule,
    TooltipModule,
    MsalModule,
    BreadcrumbModule,
    TimelineModule,
    ContextMenuModule,
    InputNumberModule,
    ButtonFinotexModule,
    SearchSelectorFinotexModule,
    ShoppingCartModule,
    DatepickerComponentModule,
    CalendarModule,
    TabMenuModule,
    TabViewModule,
    TableModuleFinotex,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true,
    },
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory,
    },
    {
      provide: MSAL_INTERCEPTOR_CONFIG,
      useFactory: MSALInterceptorConfigFactory,
    },
    MsalService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorsTokenService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent, MsalRedirectComponent],
})
export class AplicationModule {}
