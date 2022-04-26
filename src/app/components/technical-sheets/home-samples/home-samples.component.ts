import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { MessageService } from 'src/app/shared/framework-ui/primeng/api/public_api';
import { IdentificationDataComponent } from '../identification-data/identification-data.component';
import { ImageSettingsComponent } from '../image-settings/image-settings.component';
import { AdditionalPropertiesComponent } from '../additional-properties/additional-properties.component';
import { InventoryTweaksComponent } from '../inventory-tweaks/inventory-tweaks.component';
import { MaterialsComponent } from '../materials/materials.component';
import { TechnicalDataComponent } from '../technical-data/technical-data.component';

@Component({
  selector: 'app-home-samples',
  templateUrl: './home-samples.component.html',
  styleUrls: ['./home-samples.component.css'],
  providers: [MessageService],
})
export class HomeSamplesComponent implements OnInit {
  itemsBreadcrumb = [
    { label: 'menu.Home', url: '/home' },
    { label: 'menu.CustomersHistory', url: '/home/home_samples' },
    {
      label: 'technical-sheets.general_sales',
      url: '/home/home_samples',
      current: true,
    },
  ];

  paramCustomerId = '';
  @ViewChild(IdentificationDataComponent)
  identificationDataComponent: IdentificationDataComponent;
  @ViewChild(ImageSettingsComponent)
  imageSettingsComponent: ImageSettingsComponent;
  @ViewChild(AdditionalPropertiesComponent)
  additionalPropertiesComponent: AdditionalPropertiesComponent;
  @ViewChild(InventoryTweaksComponent)
  inventoryTweaksComponent: InventoryTweaksComponent;
  @ViewChild(MaterialsComponent) materialsComponent: MaterialsComponent;
  @ViewChild(TechnicalDataComponent)
  technicalDataComponent: TechnicalDataComponent;
  activeIndex: number = 0;
  parameterCheckAutomaticCode: Observable<boolean>;
  showHideForm: Observable<boolean>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.paramCustomerId = params.get('action');
    });
  }

  automaticCode(response: any) {
    this.identificationDataComponent.parameterCheckAutomaticCode(response);
  }

  receiveLineId(paramLineId: any) {
    this.imageSettingsComponent.showHideForm(paramLineId);
    this.additionalPropertiesComponent.optionLineByLineIdService(paramLineId);
    this.imageSettingsComponent.cutByLineId(paramLineId);
    this.inventoryTweaksComponent.showHideForm(paramLineId);
    this.materialsComponent.materialCategoryByLineIdService(paramLineId);
    this.materialsComponent.showHideForm(paramLineId);
    this.technicalDataComponent.showHideForm(paramLineId);
  }

  receiveLargeProduction(paramLongProduction: any) {
    this.technicalDataComponent.getLargoProduccion(paramLongProduction);
  }

  receiveLargeProductionUpdate(paramLongProductionUpdate: any) {
    let validating = paramLongProductionUpdate.split('-');
    this.identificationDataComponent.updateLargeProduction(validating[0]);

    if (validating[1] === 'true') {
      this.activeIndex = 0;
      this.identificationDataComponent.autoFocusLongproduction();
    }
  }

  receiveTotalPickHilo(paramTotalPickHilo: any) {
    this.technicalDataComponent.getTotalPicksHilo(paramTotalPickHilo);
  }

  receiveTotalPickcolor(paramTotalPickcolor: any) {
    this.technicalDataComponent.getTotalPicksColor(paramTotalPickcolor);
  }

  receiveProductionPlanId(paramProductionPlanId: number) {
    this.identificationDataComponent.receiveParameterProductionPlan(
      paramProductionPlanId
    );
  }

  getZoneName(paramZoneName: string) {
    this.inventoryTweaksComponent.zoneName.next(paramZoneName);
  }
}
