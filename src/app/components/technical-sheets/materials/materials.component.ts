import {
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  AfterViewInit,
  ElementRef,
  ViewChild,
  EventEmitter,
  Output,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MasterProductService } from 'src/app/core/services/masterProduct/master-product.service';
import { MessageService } from 'src/app/shared/framework-ui/primeng/api/public_api';
import { TranslateService } from '@ngx-translate/core';
import { Table } from 'src/app/shared/framework-ui/primeng/tablafinotex/public_api';
import { environment } from 'src/environments/environment';
import { MallasComponent } from '../mallas/mallas.component';
import { StorageService } from 'src/app/core/services/storage/storage.service';

@Component({
  selector: 'app-materials',
  templateUrl: './materials.component.html',
  styleUrls: ['./materials.component.css'],
  providers: [MessageService],
})
export class MaterialsComponent implements OnInit, AfterViewInit {
  @Input() paramLineId: string = '';
  @Output() paramTotalPickHilo = new EventEmitter<number>();
  @Output() paramTotalPickcolor = new EventEmitter<number>();
  materialsForm: FormGroup;
  @ViewChild('tablaFinotex') someInput: Table;
  @ViewChild(MallasComponent) mallasComponent: MallasComponent;
  showModalMallas: boolean = false;
  linesIdShow = environment.technicalDataLines;
  btnDisplaying: boolean = false;

  baseType = [
    {
      baseId: '0',
      baseName: 'N/A',
    },
    {
      baseId: '1',
      baseName: 'Estandar',
    },
    {
      baseId: '2',
      baseName: 'Trama',
    },
    {
      baseId: '3',
      baseName: 'Teñida',
    },
  ];

  printout = [
    {
      printoutId: 'F',
      printoutName: 'Frente/Tiro',
    },
    {
      printoutId: 'R',
      printoutName: 'Post/Retiro',
    },
    {
      printoutId: 'C',
      printoutName: 'Cuerpo',
    },
    {
      printoutId: 'N',
      printoutName: ' N/A ',
    },
  ];

  expandedRows: {} = {};
  formMaterialsIconStatus = 2;
  formStatusText = '';
  listMaterialCategory = [];
  positionMaterial: boolean;
  category: boolean;
  material: boolean;
  nameItem: boolean;
  pick_hilo: boolean;
  description: boolean;
  color: boolean;
  print_run_by_color: boolean;
  print: boolean;
  specialty: boolean;
  border: boolean;
  base: boolean;
  standard_quantity: boolean;
  real_quantity: boolean;
  unit_code: boolean;
  formula: boolean;
  formula_quantity: boolean;
  listTransferSpecialty = [];
  listMaterialPosition = [];
  listMaterialCode = [];

  constructor(
    private formBuilder: FormBuilder,
    private ref: ChangeDetectorRef,
    private storageService: StorageService,
    private masterProductService: MasterProductService,
    private messageService: MessageService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this._InitForms();
    this.showAllFieldsValidatorView();
    this.validateFormStatus();
    this.transferSpecialty();
  }

  ngAfterViewInit(): void {
    const thisRef = this;
    this.materialsFormCall.value.forEach(function (car) {
      thisRef.someInput.expandedRowKeys[car.id] = false;
    });
    this.expandedRows = Object.assign({}, this.expandedRows);
  }

  private _InitForms() {
    this.materialsForm = this.formBuilder.group({
      header: this.formBuilder.array([], this.itemHeader()),
    });
  }

  private itemHeader(): FormGroup {
    return this.formBuilder.group({
      id: ['', Validators.nullValidator],
      positionMaterial: ['', [Validators.nullValidator]],
      category: ['', [Validators.nullValidator]],
      material: ['', [Validators.nullValidator]],
      listMaterials: this.formBuilder.array([], this.listControlDrop({})),
      nameItem: ['', [Validators.nullValidator]],
      pick_hilo: ['', [Validators.nullValidator]],
      description: ['', [Validators.nullValidator]],
      color: ['', [Validators.nullValidator]],
      print_run_by_color: ['', [Validators.nullValidator]],
      print: ['', [Validators.nullValidator]],
      specialty: ['', [Validators.nullValidator]],
      border: ['', [Validators.nullValidator]],
      base: ['', [Validators.nullValidator]],
      standard_quantity: ['', [Validators.nullValidator]],
      real_quantity: ['', [Validators.nullValidator]],
      unit_code: ['', [Validators.nullValidator]],
      formula: ['', [Validators.nullValidator]],
      formula_quantity: ['', [Validators.nullValidator]],
    });
  }

  private itemMaterials(data: any): FormGroup {
    return this.formBuilder.group({
      id: [data.materialPositionId, Validators.nullValidator],
      positionMaterial: [data.positionName, [Validators.nullValidator]],
      category: ['', [Validators.required]],
      material: [data.productName, [Validators.required]],
      listMaterials: this.formBuilder.array([], this.listControlDrop({})),
      nameItem: ['', [Validators.nullValidator]],
      pick_hilo: ['', [Validators.nullValidator]],
      description: ['', [Validators.nullValidator]],
      color: ['', [Validators.required]],
      print_run_by_color: ['', [Validators.nullValidator]],
      print: ['', [Validators.nullValidator]],
      specialty: ['', [Validators.nullValidator]],
      border: ['', [Validators.nullValidator]],
      base: ['', [Validators.nullValidator]],
      standard_quantity: { value: null, disabled: true },
      real_quantity: { value: null, disabled: true },
      unit_code: { value: null, disabled: true },
      formula: ['', [Validators.nullValidator]],
      formula_quantity: { value: null, disabled: true },
    });
  }

  private listControlDrop(data: any): FormGroup {
    return this.formBuilder.group({
      materialId: [data.materialId, [Validators.nullValidator]],
      productName: [data.productName, [Validators.nullValidator]],
      colourName: [data.colourName, [Validators.nullValidator]],
      unitMeasureId: [data.unitMeasureId, [Validators.nullValidator]],
      materialName: [data.materialName, [Validators.nullValidator]],
    });
  }

  get materialsFormCall() {
    return this.materialsForm.get('header') as FormArray;
  }

  proccessSettings(paramLineId: number) {
    if (
      paramLineId == this.linesIdShow.heattranferRollo ||
      paramLineId == this.linesIdShow.heatTranferPiezas ||
      paramLineId == this.linesIdShow.sinteticaScreen ||
      paramLineId == this.linesIdShow.sintetico ||
      paramLineId == this.linesIdShow.estampadoScreen ||
      paramLineId == this.linesIdShow.troquelado ||
      paramLineId == this.linesIdShow.sinteticoOtros
    ) {
      return true;
    }
    return false;
  }

  onItemClick(rowData: any, dt: any) {
    if (dt.expandedRowKeys[rowData.id]) {
      dt.expandedRowKeys[rowData.id] = false;
    } else {
      dt.expandedRowKeys[rowData.id] = true;
    }
  }

  validateFormStatus(): void {
    this.formMaterialsIconStatus = this.materialsFormCall.valid == true ? 1 : 2;
    this.formStatusText =
      this.materialsFormCall.valid == true
        ? 'technical-sheets.session_form_completed'
        : 'technical-sheets.session_form_without_completed';

    this.materialsForm.valueChanges.subscribe((value) => {
      this.formMaterialsIconStatus =
        this.materialsFormCall.valid == true ? 1 : 2;
      this.formStatusText =
        this.materialsFormCall.valid == true
          ? 'technical-sheets.session_form_completed'
          : 'technical-sheets.session_form_without_completed';
    });
  }

  materialCategoryByLineIdService(paramLineId: number): void {
    const data = { lineId: paramLineId };
    this.masterProductService.getMaterialCategoryByLineId(data).subscribe(
      (response) => {
        if (response) {
          if (response.status) {
            this.listMaterialCategory = response.data;
            this.materialPositionByLineId(paramLineId);
          } else {
            this.listMaterialCategory = [];
            this.messageService.add({
              severity: 'ifnfo',
              summary: 'Info',
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
        this.listMaterialCategory = [];
      },
      () => {}
    );
  }

  changeCategory(event: any, rowIndex): void {
    this.materialsFormCall.at(rowIndex).get('nameItem').setValue('');
    event.value == undefined
      ? this.materialCodeByCategory(event, rowIndex)
      : this.materialCodeByCategory(event.value, rowIndex);
  }

  changeMaterialCode(event: any, rowIndex2): void {
    let nameItem = this.materialsFormCall
      .at(rowIndex2)
      .get('listMaterials')
      .value.filter((item) => item.materialId == event.value)[0];
    this.materialsFormCall
      .at(rowIndex2)
      .get('nameItem')
      .setValue(nameItem.productName);
  }

  materialCodeByCategory(materialCategoryId: number, rowIndex: number): void {
    const data = { materialCategoryId: materialCategoryId };
    this.masterProductService.getMaterialCode(data).subscribe(
      (response) => {
        if (response) {
          if (response.status) {
            (
              this.materialsFormCall
                .at(rowIndex)
                .get('listMaterials') as FormArray
            ).clear();
            response.data.forEach((element) => {
              (
                this.materialsFormCall
                  .at(rowIndex)
                  .get('listMaterials') as FormArray
              ).push(this.listControlDrop(element));
            });
            this.getSumTotalPicks();
          } else {
            this.messageService.add({
              severity: 'info',
              summary: 'Info',
              detail: response.message,
            });
          }
        } else {
          (
            this.materialsFormCall
              .at(rowIndex)
              .get('listMaterials') as FormArray
          ).clear();
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
        this.listMaterialCode = [];
      },
      () => {}
    );
  }

  transferSpecialty(): void {
    this.masterProductService.getAllTransferSpecialty().subscribe(
      (response) => {
        if (response) {
          if (response.status) {
            this.listTransferSpecialty = response.data;
          } else {
            this.messageService.add({
              severity: 'info',
              summary: 'Info',
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
        this.listTransferSpecialty = [];
      },
      () => {}
    );
  }

  materialPositionByLineId(paramLineId: number): void {
    let data = { LineId: paramLineId };
    this.masterProductService.getMaterialPositionByLineId(data).subscribe(
      (response) => {
        if (response) {
          if (response.status) {
            this.materialsFormCall.clear();
            response.data.forEach((_element, _i) => {
              this.materialsFormCall.push(this.itemMaterials(_element));
              this.materialsFormCall
                .at(_i)
                .get('category')
                .setValue(_element.materialCategoryIdDefault);
              if (_element.materialCategoryIdDefault != '') {
                this.changeCategory(_element.materialCategoryIdDefault, _i);
              }
            });
            this.getSumTotalPicks();
          } else {
            this.messageService.add({
              severity: 'info',
              summary: 'Info',
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
        this.listMaterialCategory = [];
      },
      () => {}
    );
  }

  showAllFieldsValidatorView(): void {
    this.positionMaterial = true;
    this.category = true;
    this.material = true;
    this.nameItem = true;
    this.pick_hilo = true;
    this.description = true;
    this.color = true;
    this.print_run_by_color = true;
    this.print = true;
    this.specialty = true;
    this.border = true;
    this.base = true;
    this.standard_quantity = true;
    this.real_quantity = true;
    this.unit_code = true;
    this.formula = true;
    this.formula_quantity = true;
  }

  public showHideForm(paramLineId: number) {
    this.btnDisplaying = this.proccessSettings(paramLineId);
    this.mallasComponent.showHideForm(paramLineId);
    switch (paramLineId) {
      //Heat transfer rollo
      case 52:
        this.showAllFieldsValidatorRequire();
        this.showAllFieldsValidatorView();
        this.showFormHeartRollo();

        break;

      // Tejido/orillo cortado - mascarilla tejida
      case 60:
      case 67:
        this.showAllFieldsValidatorRequire();
        this.showAllFieldsValidatorView();
        this.showFormTejido();
        break;

      //Estampados
      case 66:
        this.showAllFieldsValidatorRequire();
        this.showAllFieldsValidatorView();
        this.showFormEstampado();
        break;

      //Flexo Papel Textil/No Textil
      case 74:
      case 76:
        this.showAllFieldsValidatorRequire();
        this.showAllFieldsValidatorView();
        this.showFormFlexoPapel();
        break;

      //Heat Tranfer Piezas
      case 56:
        this.showAllFieldsValidatorRequire();
        this.showAllFieldsValidatorView();
        this.showFormTranferPiezas();

        break;

      //Heat Tranfer Laser
      case 84:
        this.showAllFieldsValidatorRequire();
        this.showAllFieldsValidatorView();
        this.showFormTranferLaser();

        break;

      //Thermal
      case 68:
        this.showAllFieldsValidatorRequire();
        this.showAllFieldsValidatorView();
        this.showFormThermal();

        break;

      //Reatas y Pretinas
      case 64:
        this.showAllFieldsValidatorRequire();
        this.showAllFieldsValidatorView();
        this.showFormReatas();

        break;

      //Reatas y Pretinas
      case 78:
        this.showAllFieldsValidatorRequire();
        this.showAllFieldsValidatorView();
        this.showFormEstampacion();

        break;

      case 79:
      case 81:
      case 82:
      case 83:
        this.showAllFieldsValidatorRequire();
        this.showAllFieldsValidatorView();
        this.showFormSinteticoScreen();

        break;

      case 30:
      case 86:
      case 87:
      case 88:
      case 89:
      case 91:
        this.showAllFieldsValidatorRequire();
        this.showAllFieldsValidatorView();
        this.showFormKits();

        break;

      default:
        this.showAllFieldsValidatorRequire();
        this.showAllFieldsValidatorView();
        break;
    }
  }

  showAllFieldsValidatorRequire(): void {
    const listNotRequired = [
      {
        name: 'category',
        required: Validators.nullValidator,
      },
      {
        name: 'material',
        required: Validators.nullValidator,
      },
      {
        name: 'nameItem',
        required: Validators.nullValidator,
      },
      {
        name: 'pick_hilo',
        required: Validators.nullValidator,
      },
      {
        name: 'description',
        required: Validators.nullValidator,
      },
      {
        name: 'color',
        required: Validators.nullValidator,
      },
      {
        name: 'print_run_by_color',
        required: Validators.nullValidator,
      },
      {
        name: 'print',
        required: Validators.nullValidator,
      },
      {
        name: 'specialty',
        required: Validators.nullValidator,
      },
      {
        name: 'border',
        required: Validators.nullValidator,
      },
      {
        name: 'base',
        required: Validators.nullValidator,
      },
      {
        name: 'standard_quantity',
        required: Validators.nullValidator,
      },
      {
        name: 'real_quantity',
        required: Validators.nullValidator,
      },
      {
        name: 'unit_code',
        required: Validators.nullValidator,
      },
      {
        name: 'formula',
        required: Validators.nullValidator,
      },
      {
        name: 'formula_quantity',
        required: Validators.nullValidator,
      },
    ];
    this.showFormFields(listNotRequired);
  }

  showFormFields(data: any[]): void {
    data.forEach((Value, index) => {
      this.materialsFormCall.controls.forEach((element, ind) => {
        element.get(Value.name).setValidators([Value.required]);
        element.get(Value.name).updateValueAndValidity();
      });
    });
  }

  showFormHeartRollo() {
    const listRequired = [
      {
        name: 'category',
        required: Validators.required,
      },
      {
        name: 'material',
        required: Validators.required,
      },
    ];
    this.showFormFields(listRequired);
    this.pick_hilo = false;
    this.description = false;
    this.color = false;
    this.border = false;
    this.base = false;
  }

  showFormTejido() {
    const listNotRequired = [
      {
        name: 'category',
        required: Validators.required,
      },
      {
        name: 'material',
        required: Validators.required,
      },
      {
        name: 'pick_hilo',
        required: Validators.required,
      },
    ];
    this.showFormFields(listNotRequired);
    this.description = false;
    this.color = false;
    this.print = false;
    this.specialty = false;
    this.border = false;
    this.base = false;
    this.formula = false;
    this.formula_quantity = false;
  }

  showFormEstampado() {
    const listNotRequired = [
      {
        name: 'category',
        required: Validators.required,
      },
      {
        name: 'material',
        required: Validators.required,
      },
    ];
    this.showFormFields(listNotRequired);
    this.pick_hilo = false;
    this.description = false;
    this.color = false;
    this.print_run_by_color = false;
    this.specialty = false;
    this.border = false;
    this.base = false;
    this.formula = false;
    this.formula_quantity = false;
  }

  showFormFlexoPapel() {
    const listNotRequired = [
      {
        name: 'category',
        required: Validators.required,
      },
      {
        name: 'material',
        required: Validators.required,
      },
    ];
    this.showFormFields(listNotRequired);
    this.pick_hilo = false;
    this.description = false;
    this.color = false;
    this.print_run_by_color = false;
    this.specialty = false;
    this.border = false;
    this.base = false;
  }

  showFormTranferPiezas() {
    const listNotRequired = [
      {
        name: 'category',
        required: Validators.required,
      },
      {
        name: 'material',
        required: Validators.required,
      },
    ];
    this.showFormFields(listNotRequired);
    this.pick_hilo = false;
    this.description = false;
    this.color = false;
    this.border = false;
    this.base = false;
  }

  showFormTranferLaser() {
    const listNotRequired = [
      {
        name: 'category',
        required: Validators.required,
      },
      {
        name: 'material',
        required: Validators.required,
      },
    ];
    this.showFormFields(listNotRequired);
    this.pick_hilo = false;
    this.description = false;
    this.color = false;
    this.print_run_by_color = false;
    this.print = false;
    this.specialty = false;
    this.border = false;
    this.base = false;
    this.formula = false;
    this.formula_quantity = false;
  }

  showFormThermal() {
    const listNotRequired = [
      {
        name: 'category',
        required: Validators.required,
      },
      {
        name: 'material',
        required: Validators.required,
      },
    ];
    this.showFormFields(listNotRequired);
    this.pick_hilo = false;
    this.description = false;
    this.color = false;
    this.print_run_by_color = false;
    this.specialty = false;
    this.border = false;
    this.base = false;
    this.formula = false;
    this.formula_quantity = false;
  }

  showFormReatas() {
    const listNotRequired = [
      {
        name: 'category',
        required: Validators.required,
      },
      {
        name: 'material',
        required: Validators.required,
      },
      {
        name: 'pick_hilo',
        required: Validators.required,
      },
    ];
    this.showFormFields(listNotRequired);
    this.print_run_by_color = false;
    this.specialty = false;
    this.border = false;
    this.base = false;
    this.formula = false;
    this.formula_quantity = false;
    this.unit_code = false;
  }

  showFormEstampacion() {
    const listNotRequired = [
      {
        name: 'category',
        required: Validators.required,
      },
      {
        name: 'material',
        required: Validators.required,
      },
    ];
    this.showFormFields(listNotRequired);
    this.pick_hilo = false;
    this.description = false;
    this.color = false;
    this.print_run_by_color = false;
    this.print = false;
    this.specialty = false;
    this.border = false;
    this.base = false;
    this.formula = false;
    this.formula_quantity = false;
  }

  showFormSinteticoScreen() {
    const listNotRequired = [
      {
        name: 'category',
        required: Validators.required,
      },
    ];
    this.showFormFields(listNotRequired);
    this.pick_hilo = false;
    this.print = false;
    this.specialty = false;
    this.border = false;
    this.base = false;
    this.standard_quantity = false;
    this.real_quantity = false;
    this.unit_code = false;
    this.formula = false;
    this.formula_quantity = false;
  }

  showFormKits() {
    const listNotRequired = [
      {
        name: 'category',
        required: Validators.required,
      },
      {
        name: 'material',
        required: Validators.required,
      },
    ];
    this.showFormFields(listNotRequired);
    this.description = false;
    this.color = false;
    this.print_run_by_color = false;
    this.pick_hilo = false;
    this.print = false;
    this.specialty = false;
    this.border = false;
    this.base = false;
  }

  showPanelDialog(): void {
    try {
      this.showModalMallas = true;
      let getValueMaterials = [];
      this.materialsFormCall.controls.forEach((element, ind) => {
        let positionMaterial = 'Posicion Material';
        let description = '';
        if (
          element.get('description') !== null &&
          element.get('description') !== undefined
        ) {
          description = element.get('description').value;
        }
        getValueMaterials.push({
          positionMaterial: positionMaterial,
          description: description,
        });
      });
      this.mallasComponent.receiveParamsMaterials(getValueMaterials);
      this.getSumTotalPicks();
    } catch (error) {
      console.error(error);
    }
  }

  getSumTotalPicks() {
    let totalPicksforHilo = 0;
    let totalPicksforColor = 0;
    this.materialsFormCall.controls.forEach((element, ind) => {
      if (
        element.get('pick_hilo') !== null &&
        element.get('pick_hilo') !== undefined
      ) {
        let pick_hilo_value = 0;
        if (
          element.get('pick_hilo').value != null &&
          element.get('pick_hilo').value != ''
        ) {
          pick_hilo_value = isNaN(parseInt(element.get('pick_hilo').value))
            ? 0
            : parseInt(element.get('pick_hilo').value);
        }
        totalPicksforHilo += pick_hilo_value;
      }

      if (
        element.get('print_run_by_color') !== null &&
        element.get('print_run_by_color') !== undefined
      ) {
        let print_run_by_color = 0;
        if (
          element.get('print_run_by_color').value != null &&
          element.get('print_run_by_color').value != ''
        ) {
          print_run_by_color = isNaN(
            parseInt(element.get('print_run_by_color').value)
          )
            ? 0
            : parseInt(element.get('print_run_by_color').value);
        }
        totalPicksforColor += print_run_by_color;
      }
    });
    this.paramTotalPickHilo.emit(totalPicksforHilo);
    this.paramTotalPickcolor.emit(totalPicksforColor);
  }
}
