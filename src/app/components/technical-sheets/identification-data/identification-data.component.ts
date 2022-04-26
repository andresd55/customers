import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { MasterProductService } from 'src/app/core/services/masterProduct/master-product.service';
import { TechinicalService } from 'src/app/core/services/technical-sheets/techinical.service';
import { MessageService } from 'src/app/shared/framework-ui/primeng/api/public_api';

@Component({
  selector: 'app-identification-data',
  templateUrl: './identification-data.component.html',
  styleUrls: ['./identification-data.component.css'],
  providers: [MessageService],
})
export class IdentificationDataComponent implements OnInit {
  @Input() paramCustomerId: string = '';
  @Output() paramLineId = new EventEmitter<number>();
  @Output() paramLongProduction = new EventEmitter<number>();

  registerFormSesionTwo: FormGroup;

  formOneIconStatusTwo = 2;
  formOneStatusTextTwo = '';

  ListLine = [];
  ListSubline = [];
  ListQuality = [];
  ListUrdimbre = [];
  ListShape = [];
  ListBroad = [];
  ListFinish = [];
  ListAdhesive = [];
  ListApplication = [];
  ListNumberColors = [];
  ListNumberStickers = [];
  ListNumberPapers = [];
  ListNumberAccessories = [];
  ListNumberFinishes = [];
  ListAuxiliaryNumbers = [];
  ListReductiveNumbers = [];

  Technical_origin: boolean;
  WMS_barcode: boolean;
  Urdimbre: boolean;
  Shape: boolean;
  Commercial_length: boolean;
  Length_front: boolean;
  Finish: boolean;
  Adhesive: boolean;
  Number_accessories: boolean;
  Reductive_numbers: boolean;
  Number_papers: boolean;
  Number_finishes: boolean;
  Auxiliary_numbers: boolean;
  Size: boolean;
  Number_stickers: boolean;
  Application: boolean;
  Quality: boolean;
  Number_colors: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private translate: TranslateService,
    private techinicalService: TechinicalService,
    private masterProductService: MasterProductService
  ) {}

  @ViewChild('Longproduction') myInputField: ElementRef;

  autoFocusLongproduction() {
    this.myInputField.nativeElement.focus();
  }

  ngOnInit(): void {
    this.showAllFieldsValidatorView();
    this.getFormSessionTwo();
    this.validateFormStatus();

    this.lineGetService();
    this.colourGetService();
    this.shapeTypeGetService();
    this.applicationGetService();

    this.setDataDropdown();
  }

  validateFormStatus(): void {
    this.formOneIconStatusTwo =
      this.registerFormSesionTwo.valid == true ? 1 : 2;
    this.formOneStatusTextTwo =
      this.registerFormSesionTwo.valid == true
        ? 'technical-sheets.session_form_completed'
        : 'technical-sheets.session_form_without_completed';

    this.registerFormSesionTwo.valueChanges.subscribe((value) => {
      this.formOneIconStatusTwo =
        this.registerFormSesionTwo.valid == true ? 1 : 2;
      this.formOneStatusTextTwo =
        this.registerFormSesionTwo.valid == true
          ? 'technical-sheets.session_form_completed'
          : 'technical-sheets.session_form_without_completed';
    });
  }

  parameterCheckAutomaticCode(indicator: boolean): void {
    if (indicator) {
      this.customerProductPrefixGetByCustomerIdService(this.paramCustomerId);
    } else {
      this.registerFormSesionTwo.patchValue({
        Item_code: null,
        Origin_code: null,
        Technical_origin: null,
        WMS_barcode: null,
      });
      this.registerFormSesionTwo.get('Item_code').enable();
      this.registerFormSesionTwo.get('Item_code').updateValueAndValidity();
    }
  }

  receiveParameterProductionPlan(paramProductionPlanId: number) {
    const data = { plantId: paramProductionPlanId };
    this.techinicalService.productionPlanGet(data).subscribe(
      (response) => {
        if (response) {
          if (response.status) {
            this.ListLine = response.data;
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: response.message,
            });
          }
        } else {
          this.translate
            .stream('general.msgDetailResponse')
            .subscribe((res: string) => {
              this.messageService.add({
                severity: 'info',
                summary: 'Info',
                detail: res,
              });
            });
        }
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error.message,
        });
      },
      () => {}
    );
  }

  getFormSessionTwo(): FormGroup {
    return (this.registerFormSesionTwo = this.formBuilder.group({
      Item_code: [
        '',
        [Validators.required, Validators.pattern('^[A-z]+[0-9]+$')],
      ],
      Origin_code: { value: null, disabled: true },
      Technical_origin: { value: null, disabled: true },
      WMS_barcode: ['', Validators.required],
      Item_name: ['', Validators.required],
      Line: ['', Validators.required],
      Subline: ['', Validators.required],
      Quality: ['', Validators.required],
      Urdimbre: ['', Validators.required],
      Shape: ['', Validators.required],
      Broad: ['', Validators.required],
      Long_production: [
        '',
        [Validators.required, Validators.pattern(/^([0-9]{1,9})$/)],
      ],
      Commercial_length: [
        '',
        [Validators.required, Validators.pattern(/^([0-9]{1,9})$/)],
      ],
      Length_front: [
        '',
        [Validators.required, Validators.pattern(/^([0-9]{1,9})$/)],
      ],
      Finish: ['', Validators.required],
      Adhesive: ['', Validators.required],
      Size: ['', Validators.required],
      Application: ['', Validators.required],
      Number_colors: ['', Validators.required],
      Number_stickers: ['', Validators.required],
      Number_papers: ['', Validators.required],
      Number_accessories: ['', Validators.required],
      Number_finishes: ['', Validators.required],
      Auxiliary_numbers: ['', Validators.required],
      Reductive_numbers: ['', Validators.required],
    }));
  }

  showAllFieldsValidatorView(): void {
    this.Technical_origin = true;
    this.WMS_barcode = true;
    this.Urdimbre = true;
    this.Shape = true;
    this.Commercial_length = true;
    this.Length_front = true;
    this.Finish = true;
    this.Adhesive = true;
    this.Number_accessories = true;
    this.Reductive_numbers = true;
    this.Number_papers = true;
    this.Number_finishes = true;
    this.Auxiliary_numbers = true;
    this.Size = true;
    this.Number_stickers = true;
    this.Application = true;
    this.Quality = true;
    this.Number_colors = true;
  }

  showAllFieldsValidatorRequire(): void {
    const listNotRequired = [
      {
        name: 'Technical_origin',
        require: Validators.required,
      },
      {
        name: 'WMS_barcode',
        require: Validators.required,
      },
      {
        name: 'Urdimbre',
        require: Validators.required,
      },
      {
        name: 'Shape',
        require: Validators.required,
      },
      {
        name: 'Commercial_length',
        require: Validators.required,
      },
      {
        name: 'Length_front',
        require: Validators.required,
      },
      {
        name: 'Finish',
        require: Validators.required,
      },
      {
        name: 'Adhesive',
        require: Validators.required,
      },
      {
        name: 'Number_accessories',
        require: Validators.required,
      },
      {
        name: 'Reductive_numbers',
        require: Validators.required,
      },
    ];
    this.showFormFields(listNotRequired);
  }

  showFormFields(data: any[]): void {
    data.forEach((currentValue, index) => {
      this.registerFormSesionTwo
        .get(currentValue.name)
        .setValidators([currentValue.require]);
      this.registerFormSesionTwo
        .get(currentValue.name)
        .updateValueAndValidity();
    });
  }

  customerProductPrefixGetByCustomerIdService(customerId: any): void {
    const data = { customerId: customerId };
    this.techinicalService.customerProductPrefixGetByCustomerId(data).subscribe(
      (response) => {
        if (response) {
          if (response.status) {
            this.registerFormSesionTwo.patchValue({
              Item_code: response.data.consecutiveCode,
              Origin_code: response.data.consecutiveCode,
              Technical_origin: response.data.consecutiveCode,
              WMS_barcode: this.barcodeFormat(response.data.consecutiveCode),
            });
            this.registerFormSesionTwo.get('Item_code').disable();
            this.registerFormSesionTwo
              .get('Item_code')
              .updateValueAndValidity();

            this.registerFormSesionTwo.get('WMS_barcode').disable();
            this.registerFormSesionTwo
              .get('WMS_barcode')
              .updateValueAndValidity();
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: response.message,
            });
          }
        } else {
          this.translate
            .stream('general.msgDetailResponse')
            .subscribe((res: string) => {
              this.messageService.add({
                severity: 'info',
                summary: 'Info',
                detail: res,
              });
            });
        }
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error.message,
        });
      },
      () => {}
    );
  }

  lineGetService(): void {
    this.techinicalService.lineGet().subscribe(
      (response) => {
        if (response) {
          if (response.status) {
            this.ListLine = response.data;
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: response.message,
            });
          }
        } else {
          this.translate
            .stream('general.msgDetailResponse')
            .subscribe((res: string) => {
              this.messageService.add({
                severity: 'info',
                summary: 'Info',
                detail: res,
              });
            });
        }
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error.message,
        });
      },
      () => {}
    );
  }

  colourGetService(): void {
    this.techinicalService.colourGet().subscribe(
      (response) => {
        if (response) {
          if (response.status) {
            this.ListUrdimbre = response.data;
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: response.message,
            });
          }
        } else {
          this.translate
            .stream('general.msgDetailResponse')
            .subscribe((res: string) => {
              this.messageService.add({
                severity: 'info',
                summary: 'Info',
                detail: res,
              });
            });
        }
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error.message,
        });
      },
      () => {}
    );
  }

  shapeTypeGetService(): void {
    this.techinicalService.shapeTypeGet().subscribe(
      (response) => {
        if (response) {
          if (response.status) {
            this.ListShape = response.data;
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: response.message,
            });
          }
        } else {
          this.translate
            .stream('general.msgDetailResponse')
            .subscribe((res: string) => {
              this.messageService.add({
                severity: 'info',
                summary: 'Info',
                detail: res,
              });
            });
        }
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error.message,
        });
      },
      () => {}
    );
  }

  applicationGetService(): void {
    this.techinicalService.applicationGet().subscribe(
      (response) => {
        if (response) {
          if (response.status) {
            this.ListApplication = response.data;
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: response.message,
            });
          }
        } else {
          this.translate
            .stream('general.msgDetailResponse')
            .subscribe((res: string) => {
              this.messageService.add({
                severity: 'info',
                summary: 'Info',
                detail: res,
              });
            });
        }
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error.message,
        });
      },
      () => {}
    );
  }

  changeLine(event: any): void {
    this.informationFillingDropdown(event.value);
    this.showAndHideFields(event.value);
    this.paramLineId.emit(event.value);
  }

  informationFillingDropdown(lineId: number): void {
    this.subLineGetByLineIdService(lineId);
    this.qualityLineGetByLineIdService(lineId);
    this.widthLineGetByLineIdService(lineId);
    this.finishLineGetByLineIdService(lineId);
    this.adhesiveLineGetByLineIdService(lineId);
  }

  subLineGetByLineIdService(lineId: number): void {
    const data = { lineId: lineId };
    this.techinicalService.subLineGetByLineId(data).subscribe(
      (response) => {
        if (response) {
          if (response.status) {
            this.ListSubline = response.data;
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: response.message,
            });
          }
        } else {
          this.translate
            .stream('general.msgDetailResponse')
            .subscribe((res: string) => {
              this.messageService.add({
                severity: 'info',
                summary: 'Info',
                detail: res,
              });
            });
        }
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error.message,
        });
      },
      () => {}
    );
  }

  qualityLineGetByLineIdService(lineId: number): void {
    const data = { lineId: lineId };
    this.techinicalService.qualityLineGetByLineId(data).subscribe(
      (response) => {
        if (response) {
          if (response.status) {
            this.ListQuality = response.data;
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: response.message,
            });
          }
        } else {
          this.translate
            .stream('general.msgDetailResponse')
            .subscribe((res: string) => {
              this.messageService.add({
                severity: 'info',
                summary: 'Info',
                detail: res,
              });
            });
        }
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error.message,
        });
      },
      () => {}
    );
  }

  widthLineGetByLineIdService(lineId: number): void {
    const data = { lineId: lineId };
    this.techinicalService.widthLineGetByLineId(data).subscribe(
      (response) => {
        if (response) {
          if (response.status) {
            this.ListBroad = response.data;
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: response.message,
            });
          }
        } else {
          this.translate
            .stream('general.msgDetailResponse')
            .subscribe((res: string) => {
              this.messageService.add({
                severity: 'info',
                summary: 'Info',
                detail: res,
              });
            });
        }
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error.message,
        });
      },
      () => {}
    );
  }

  finishLineGetByLineIdService(lineId: number): void {
    const data = { lineId: lineId };
    this.techinicalService.finishLineGetByLineId(data).subscribe(
      (response) => {
        if (response) {
          if (response.status) {
            this.ListFinish = response.data;
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: response.message,
            });
          }
        } else {
          this.translate
            .stream('general.msgDetailResponse')
            .subscribe((res: string) => {
              this.messageService.add({
                severity: 'info',
                summary: 'Info',
                detail: res,
              });
            });
        }
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error.message,
        });
      },
      () => {}
    );
  }

  adhesiveLineGetByLineIdService(lineId: number): void {
    const data = { lineId: lineId };
    this.techinicalService.adhesiveLineGetByLineId(data).subscribe(
      (response) => {
        if (response) {
          if (response.status) {
            this.ListAdhesive = response.data;
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: response.message,
            });
          }
        } else {
          this.translate
            .stream('general.msgDetailResponse')
            .subscribe((res: string) => {
              this.messageService.add({
                severity: 'info',
                summary: 'Info',
                detail: res,
              });
            });
        }
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error.message,
        });
      },
      () => {}
    );
  }

  showAndHideFields(lineId: number): void {
    switch (lineId) {
      // Heat transfer Rollo
      case 52:
        setTimeout(() => {
          this.showAllFieldsValidatorRequire();
          this.showAllFieldsValidatorView();
          this.showFormFieldsHeatTransferRollo();
        }, 3);

        break;

      // Estampados
      case 66:
        setTimeout(() => {
          this.showAllFieldsValidatorRequire();
          this.showAllFieldsValidatorView();
          this.showFormFieldsPrint();
        }, 3);

        break;

      // Thermal
      case 68:
        setTimeout(() => {
          this.showAllFieldsValidatorRequire();
          this.showAllFieldsValidatorView();
          this.showFormFieldsThermal();
        }, 3);
        break;

      // Reatas y pretinas
      case 64:
        setTimeout(() => {
          this.showAllFieldsValidatorRequire();
          this.showAllFieldsValidatorView();
          this.showFormFieldsReatasPretinas();
        }, 3);
        break;

      // Mascarillas Tejidas
      case 67:
        setTimeout(() => {
          this.showAllFieldsValidatorRequire();
          this.showAllFieldsValidatorView();
          this.showFormFieldsMascarillasTejidas();
        }, 3);
        break;

      // Estampación por Sublimación
      case 78:
        setTimeout(() => {
          this.showAllFieldsValidatorRequire();
          this.showAllFieldsValidatorView();
          this.showFormFieldsSublimationPrinting();
        }, 3);
        break;

      // Sintética Screen, Sintético, estampado Screen
      case 79:
      case 83:
        setTimeout(() => {
          this.showAllFieldsValidatorRequire();
          this.showAllFieldsValidatorView();
          this.showFormFieldsSyntheticScreen();
        }, 3);
        break;

      // Troquelado, Sintético Otros
      case 82:
      case 81:
        setTimeout(() => {
          this.showAllFieldsValidatorRequire();
          this.showAllFieldsValidatorView();
          this.showFormFieldsSyntheticScreen();
        }, 3);
        break;

      // Kits: Kit Offset, Kit Estampado + Sublimacion, Kit Orillo (pendiente Mexico)
      case 86:
      case 88:
      case 89:
        setTimeout(() => {
          this.showAllFieldsValidatorRequire();
          this.showAllFieldsValidatorView();
          this.showFormFieldsKits();
        }, 3);
        break;

      // Cortado,Kit Heat transfer,Kit Flexo (Mexico)
      case 87:
      case 91:
        setTimeout(() => {
          this.showAllFieldsValidatorRequire();
          this.showAllFieldsValidatorView();
          this.showFormFieldsKits();
        }, 3);
        break;

      default:
        this.showAllFieldsValidatorRequire();
        this.showAllFieldsValidatorView();
        break;
    }
  }

  showFormFieldsHeatTransferRollo(): void {
    // Origen Técnico
    const listNotRequired = [
      {
        name: 'Technical_origin',
        require: Validators.nullValidator,
      },
      {
        name: 'WMS_barcode',
        require: Validators.nullValidator,
      },
      {
        name: 'Urdimbre',
        require: Validators.nullValidator,
      },
      {
        name: 'Shape',
        require: Validators.nullValidator,
      },
      {
        name: 'Commercial_length',
        require: Validators.nullValidator,
      },
      {
        name: 'Length_front',
        require: Validators.nullValidator,
      },
      {
        name: 'Finish',
        require: Validators.nullValidator,
      },
      {
        name: 'Adhesive',
        require: Validators.nullValidator,
      },
      {
        name: 'Number_stickers',
        require: Validators.nullValidator,
      },
      {
        name: 'Number_accessories',
        require: Validators.nullValidator,
      },
      {
        name: 'Reductive_numbers',
        require: Validators.nullValidator,
      },
    ];
    this.showFormFields(listNotRequired);
    this.Technical_origin = false;
    this.WMS_barcode = false;
    this.Urdimbre = false;
    this.Shape = false;
    this.Commercial_length = false;
    this.Length_front = false;
    this.Finish = false;
    this.Adhesive = false;
    this.Number_accessories = false;
    this.Reductive_numbers = false;
    this.Number_stickers = false;
  }

  showFormFieldsPrint(): void {
    const listNotRequired = [
      {
        name: 'Technical_origin',
        require: Validators.nullValidator,
      },
      {
        name: 'WMS_barcode',
        require: Validators.nullValidator,
      },
      {
        name: 'Urdimbre',
        require: Validators.nullValidator,
      },
      {
        name: 'Shape',
        require: Validators.nullValidator,
      },
      {
        name: 'Finish',
        require: Validators.nullValidator,
      },
      {
        name: 'Adhesive',
        require: Validators.nullValidator,
      },
      {
        name: 'Number_papers',
        require: Validators.nullValidator,
      },
      {
        name: 'Number_accessories',
        require: Validators.nullValidator,
      },
      {
        name: 'Number_finishes',
        require: Validators.nullValidator,
      },
      {
        name: 'Auxiliary_numbers',
        require: Validators.nullValidator,
      },
      {
        name: 'Reductive_numbers',
        require: Validators.nullValidator,
      },
    ];
    this.showFormFields(listNotRequired);

    this.Technical_origin = false;
    this.WMS_barcode = false;
    this.Urdimbre = false;
    this.Shape = false;
    this.Finish = false;
    this.Adhesive = false;
    this.Number_papers = false;
    this.Number_accessories = false;
    this.Number_finishes = false;
    this.Auxiliary_numbers = false;
    this.Reductive_numbers = false;
  }

  showFormFieldsThermal(): void {
    const listNotRequired = [
      {
        name: 'WMS_barcode',
        require: Validators.nullValidator,
      },
      {
        name: 'Urdimbre',
        require: Validators.nullValidator,
      },
      {
        name: 'Adhesive',
        require: Validators.nullValidator,
      },
      {
        name: 'Size',
        require: Validators.nullValidator,
      },
      {
        name: 'Number_stickers',
        require: Validators.nullValidator,
      },
      {
        name: 'Number_papers',
        require: Validators.nullValidator,
      },
      {
        name: 'Number_accessories',
        require: Validators.nullValidator,
      },
      {
        name: 'Number_finishes',
        require: Validators.nullValidator,
      },
      {
        name: 'Auxiliary_numbers',
        require: Validators.nullValidator,
      },
      {
        name: 'Reductive_numbers',
        require: Validators.nullValidator,
      },
    ];
    this.showFormFields(listNotRequired);
    this.WMS_barcode = false;
    this.Urdimbre = false;
    this.Adhesive = false;
    this.Size = false;
    this.Number_stickers = false;
    this.Number_papers = false;
    this.Number_accessories = false;
    this.Number_finishes = false;
    this.Auxiliary_numbers = false;
    this.Reductive_numbers = false;
  }

  showFormFieldsReatasPretinas(): void {
    const listNotRequired = [
      {
        name: 'WMS_barcode',
        require: Validators.nullValidator,
      },
      {
        name: 'Urdimbre',
        require: Validators.nullValidator,
      },
      {
        name: 'Adhesive',
        require: Validators.nullValidator,
      },
      {
        name: 'Number_stickers',
        require: Validators.nullValidator,
      },
      {
        name: 'Number_papers',
        require: Validators.nullValidator,
      },
      {
        name: 'Number_accessories',
        require: Validators.nullValidator,
      },
      {
        name: 'Number_finishes',
        require: Validators.nullValidator,
      },
      {
        name: 'Auxiliary_numbers',
        require: Validators.nullValidator,
      },
      {
        name: 'Reductive_numbers',
        require: Validators.nullValidator,
      },
    ];
    this.showFormFields(listNotRequired);
    this.WMS_barcode = false;
    this.Urdimbre = false;
    this.Adhesive = false;
    this.Number_stickers = false;
    this.Number_papers = false;
    this.Number_accessories = false;
    this.Number_finishes = false;
    this.Auxiliary_numbers = false;
    this.Reductive_numbers = false;
  }

  showFormFieldsMascarillasTejidas(): void {
    const listNotRequired = [
      {
        name: 'WMS_barcode',
        require: Validators.nullValidator,
      },
      {
        name: 'Number_stickers',
        require: Validators.nullValidator,
      },
      {
        name: 'Number_papers',
        require: Validators.nullValidator,
      },
      {
        name: 'Number_finishes',
        require: Validators.nullValidator,
      },
      {
        name: 'Auxiliary_numbers',
        require: Validators.nullValidator,
      },
      {
        name: 'Reductive_numbers',
        require: Validators.nullValidator,
      },
    ];
    this.showFormFields(listNotRequired);
    this.WMS_barcode = false;
    this.Number_stickers = false;
    this.Number_papers = false;
    this.Number_finishes = false;
    this.Auxiliary_numbers = false;
    this.Reductive_numbers = false;
  }

  showFormFieldsSublimationPrinting(): void {
    const listNotRequired = [
      {
        name: 'WMS_barcode',
        require: Validators.nullValidator,
      },
      {
        name: 'Urdimbre',
        require: Validators.nullValidator,
      },
      {
        name: 'Number_stickers',
        require: Validators.nullValidator,
      },
      {
        name: 'Number_accessories',
        require: Validators.nullValidator,
      },
      {
        name: 'Number_finishes',
        require: Validators.nullValidator,
      },
      {
        name: 'Auxiliary_numbers',
        require: Validators.nullValidator,
      },
      {
        name: 'Reductive_numbers',
        require: Validators.nullValidator,
      },
    ];
    this.showFormFields(listNotRequired);
    this.WMS_barcode = false;
    this.Urdimbre = false;
    this.Number_stickers = false;
    this.Number_accessories = false;
    this.Number_finishes = false;
    this.Auxiliary_numbers = false;
    this.Reductive_numbers = false;
  }

  showFormFieldsSyntheticScreen(): void {
    const listNotRequired = [
      {
        name: 'Technical_origin',
        require: Validators.nullValidator,
      },
      {
        name: 'WMS_barcode',
        require: Validators.nullValidator,
      },
      {
        name: 'Urdimbre',
        require: Validators.nullValidator,
      },
      {
        name: 'Shape',
        require: Validators.nullValidator,
      },
      {
        name: 'Commercial_length',
        require: Validators.nullValidator,
      },
      {
        name: 'Length_front',
        require: Validators.nullValidator,
      },
      {
        name: 'Finish',
        require: Validators.nullValidator,
      },
      {
        name: 'Adhesive',
        require: Validators.nullValidator,
      },
      {
        name: 'Application',
        require: Validators.nullValidator,
      },
      {
        name: 'Number_stickers',
        require: Validators.nullValidator,
      },
      {
        name: 'Number_papers',
        require: Validators.nullValidator,
      },

      {
        name: 'Number_accessories',
        require: Validators.nullValidator,
      },
      {
        name: 'Number_finishes',
        require: Validators.nullValidator,
      },
      {
        name: 'Auxiliary_numbers',
        require: Validators.nullValidator,
      },
      {
        name: 'Reductive_numbers',
        require: Validators.nullValidator,
      },
    ];
    this.showFormFields(listNotRequired);
    this.Technical_origin = false;
    this.WMS_barcode = false;
    this.Urdimbre = false;
    this.Shape = false;
    this.Commercial_length = false;
    this.Length_front = false;
    this.Finish = false;
    this.Adhesive = false;
    this.Application = false;
    this.Number_stickers = false;
    this.Number_papers = false;
    this.Number_accessories = false;
    this.Number_finishes = false;
    this.Auxiliary_numbers = false;
    this.Reductive_numbers = false;
  }

  showFormFieldsKits(): void {
    const listNotRequired = [
      {
        name: 'Quality',
        require: Validators.nullValidator,
      },
      {
        name: 'Urdimbre',
        require: Validators.nullValidator,
      },
      {
        name: 'Shape',
        require: Validators.nullValidator,
      },
      {
        name: 'Length_front',
        require: Validators.nullValidator,
      },
      {
        name: 'Finish',
        require: Validators.nullValidator,
      },
      {
        name: 'Adhesive',
        require: Validators.nullValidator,
      },
      {
        name: 'Size',
        require: Validators.nullValidator,
      },
      {
        name: 'Application',
        require: Validators.nullValidator,
      },
      {
        name: 'Number_colors',
        require: Validators.nullValidator,
      },
      {
        name: 'Number_stickers',
        require: Validators.nullValidator,
      },
      {
        name: 'Number_papers',
        require: Validators.nullValidator,
      },
      {
        name: 'Number_accessories',
        require: Validators.nullValidator,
      },
      {
        name: 'Number_finishes',
        require: Validators.nullValidator,
      },
      {
        name: 'Auxiliary_numbers',
        require: Validators.nullValidator,
      },
      {
        name: 'Reductive_numbers',
        require: Validators.nullValidator,
      },
    ];
    this.showFormFields(listNotRequired);
    this.Quality = false;
    this.Urdimbre = false;
    this.Shape = false;
    this.Length_front = false;
    this.Finish = false;
    this.Adhesive = false;
    this.Size = false;
    this.Application = false;
    this.Number_colors = false;
    this.Number_stickers = false;
    this.Number_papers = false;
    this.Number_accessories = false;
    this.Number_finishes = false;
    this.Auxiliary_numbers = false;
    this.Reductive_numbers = false;
  }

  setDataDropdown(): void {
    this.ListNumberColors = this.dataGetDropdown(1, 16);
    this.ListNumberStickers = this.dataGetDropdown(1, 16);
    this.ListNumberPapers = this.dataGetDropdown(1, 5);
    this.ListNumberAccessories = this.dataGetDropdown(1, 16);
    this.ListNumberFinishes = this.dataGetDropdown(1, 16);
    this.ListAuxiliaryNumbers = this.dataGetDropdown(1, 16);
    this.ListReductiveNumbers = this.dataGetDropdown(1, 16);
  }

  dataGetDropdown(initialAmount: number, finalAmount: number): any[] {
    let filesData = [];
    for (let i = initialAmount; i < finalAmount; i++) {
      filesData.push({
        code: i,
        name: i,
      });
    }
    return filesData;
  }

  onFocusOutEvent(event: any) {
    if (event.target.value.trim() != '') {
      this.registerFormSesionTwo.patchValue({
        Origin_code: event.target.value,
        Technical_origin: event.target.value,
        WMS_barcode: this.barcodeFormat(event.target.value),
      });
      this.registerFormSesionTwo.get('WMS_barcode').disable();
      this.registerFormSesionTwo.get('WMS_barcode').updateValueAndValidity();
    }
  }

  barcodeFormat(data: String): String {
    let lineaCode = '';
    for (let i = data.length; i < 15; i++) {
      lineaCode += '-';
    }
    return lineaCode + data;
  }

  onFocusOutEventLarge(event: any) {
    if (event.target.value.trim() != '') {
      this.paramLongProduction.emit(parseInt(event.target.value));
    }
  }

  updateLargeProduction(newValueLarge: number) {
    this.registerFormSesionTwo.patchValue({
      Long_production: newValueLarge,
    });
  }
}
