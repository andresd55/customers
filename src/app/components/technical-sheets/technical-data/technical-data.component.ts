import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ViewChild,
  AfterViewInit,
  EventEmitter,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'src/app/shared/framework-ui/primeng/api/messageservice';
import { Table } from 'src/app/shared/framework-ui/primeng/tablafinotex/public_api';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import { environment } from 'src/environments/environment';
import { ProductionMastersService } from 'src/app/core/services/production-masters/production-masters.service';
import { TechinicalService } from 'src/app/core/services/technical-sheets/techinical.service';
@Component({
  selector: 'app-technical-data',
  templateUrl: './technical-data.component.html',
  styleUrls: ['./technical-data.component.css'],
  providers: [MessageService],
})
export class TechnicalDataComponent implements OnInit, AfterViewInit {
  @ViewChild('tablaFinotex') someInput: Table;
  @Output() paramLongProductionUpdate = new EventEmitter<string>();
  technicalDataForm: FormGroup;
  formTechnicalIconStatus = 2;
  formStatusText = '';
  expandedRows: {} = {};
  showModalProductionLarge: boolean = false;
  lblNumberLargeProduct: number = 0;
  updateNumberLargeProduct: number = 0;
  validateLargeproduction: boolean = false;
  linesIdShow = environment.technicalDataLines;
  btnDisplaying: boolean = false;
  countTechnicalData: number = 0;
  lineIdGet: number = 0;
  lineIdGetValid: boolean = false;
  displayInvalidForm: boolean = false;
  totalPicksHilo: number = 0;
  totalPicksColor: number = 0;
  listComponentsValidating = [
    {
      control: 'resourceModel',
      show: true,
      required: false,
      lines:
        this.linesIdShow.heattranferRollo +
        ',' +
        this.linesIdShow.tejidoOrilloCortado +
        ',' +
        this.linesIdShow.estampados +
        ',' +
        this.linesIdShow.flexoPapelTextil +
        ',' +
        this.linesIdShow.flexoPapelNoTextil +
        ',' +
        this.linesIdShow.heatTranferPiezas +
        ',' +
        this.linesIdShow.heatTransferLaser +
        ',' +
        this.linesIdShow.thermal +
        ',' +
        this.linesIdShow.reatasyPretinas +
        ',' +
        this.linesIdShow.mascarillasTejidas +
        ',' +
        this.linesIdShow.estampaciónSublimacion +
        ',' +
        this.linesIdShow.sinteticaScreen +
        ',' +
        this.linesIdShow.sintetico +
        ',' +
        this.linesIdShow.estampadoScreen +
        ',' +
        this.linesIdShow.troquelado +
        ',' +
        this.linesIdShow.sinteticoOtros +
        ',' +
        this.linesIdShow.kitOffset +
        ',' +
        this.linesIdShow.kitEstampadoSublimacion +
        ',' +
        this.linesIdShow.kitOrilloMexico +
        ',' +
        this.linesIdShow.cortado +
        ',' +
        this.linesIdShow.kitHeattransfer +
        ',' +
        this.linesIdShow.kitFlexoMexico +
        ',' +
        this.linesIdShow.offSet +
        ',' +
        this.linesIdShow.telas,
    },
    {
      control: 'alternalResourceModel',
      show: true,
      required: true,
      lines:
        this.linesIdShow.heattranferRollo +
        ',' +
        this.linesIdShow.tejidoOrilloCortado +
        ',' +
        this.linesIdShow.mascarillasTejidas +
        ',' +
        this.linesIdShow.telas,
    },
    { control: 'resourceId', show: true, required: true, lines: '' },
    {
      control: 'speed',
      show: true,
      required: true,
      lines: this.linesIdShow.heatTransferLaser,
    },
    {
      control: 'standarTime',
      show: true,
      required: true,
      lines:
        this.linesIdShow.heattranferRollo +
        ',' +
        this.linesIdShow.tejidoOrilloCortado +
        ',' +
        this.linesIdShow.heatTranferPiezas +
        ',' +
        this.linesIdShow.mascarillasTejidas +
        ',' +
        this.linesIdShow.telas,
    },
    {
      control: 'stationNumber',
      show: true,
      required: true,
      lines:
        this.linesIdShow.heattranferRollo +
        ',' +
        this.linesIdShow.flexoPapelTextil +
        ',' +
        this.linesIdShow.flexoPapelNoTextil +
        ',' +
        this.linesIdShow.heatTranferPiezas,
    },
    {
      control: 'picks',
      show: true,
      required: false,
      lines:
        this.linesIdShow.tejidoOrilloCortado +
        ',' +
        this.linesIdShow.reatasyPretinas +
        ',' +
        this.linesIdShow.mascarillasTejidas +
        ',' +
        this.linesIdShow.telas,
    },
    {
      control: 'totalPicks',
      show: true,
      required: false,
      lines:
        this.linesIdShow.tejidoOrilloCortado +
        ',' +
        this.linesIdShow.reatasyPretinas +
        ',' +
        this.linesIdShow.mascarillasTejidas +
        ',' +
        this.linesIdShow.telas,
    },
    {
      control: 'cameraPicks',
      show: true,
      required: false,
      lines:
        this.linesIdShow.tejidoOrilloCortado +
        ',' +
        this.linesIdShow.reatasyPretinas +
        ',' +
        this.linesIdShow.mascarillasTejidas +
        ',' +
        this.linesIdShow.telas,
    },
    {
      control: 'machinePicks',
      show: true,
      required: false,
      lines:
        this.linesIdShow.heattranferRollo +
        ',' +
        this.linesIdShow.tejidoOrilloCortado +
        ',' +
        this.linesIdShow.heatTranferPiezas +
        ',' +
        this.linesIdShow.reatasyPretinas +
        ',' +
        this.linesIdShow.mascarillasTejidas +
        ',' +
        this.linesIdShow.telas,
    },
    {
      control: 'defaultModel',
      show: true,
      required: false,
      lines:
        this.linesIdShow.heattranferRollo +
        ',' +
        this.linesIdShow.tejidoOrilloCortado +
        ',' +
        this.linesIdShow.estampados +
        ',' +
        this.linesIdShow.flexoPapelTextil +
        ',' +
        this.linesIdShow.flexoPapelNoTextil +
        ',' +
        this.linesIdShow.heatTranferPiezas +
        ',' +
        this.linesIdShow.heatTransferLaser +
        ',' +
        this.linesIdShow.thermal +
        ',' +
        this.linesIdShow.reatasyPretinas +
        ',' +
        this.linesIdShow.mascarillasTejidas +
        ',' +
        this.linesIdShow.estampaciónSublimacion +
        ',' +
        this.linesIdShow.sinteticaScreen +
        ',' +
        this.linesIdShow.sintetico +
        ',' +
        this.linesIdShow.estampadoScreen +
        ',' +
        this.linesIdShow.troquelado +
        ',' +
        this.linesIdShow.sinteticoOtros +
        ',' +
        this.linesIdShow.kitOffset +
        ',' +
        this.linesIdShow.kitEstampadoSublimacion +
        ',' +
        this.linesIdShow.kitOrilloMexico +
        ',' +
        this.linesIdShow.cortado +
        ',' +
        this.linesIdShow.kitHeattransfer +
        ',' +
        this.linesIdShow.kitFlexoMexico +
        ',' +
        this.linesIdShow.mezclasyTintas +
        ',' +
        this.linesIdShow.offSet +
        ',' +
        this.linesIdShow.telas,
    },
    {
      control: 'stampCylinderId',
      show: true,
      required: true,
      lines:
        this.linesIdShow.estampados +
        ',' +
        this.linesIdShow.flexoPapelTextil +
        ',' +
        this.linesIdShow.flexoPapelNoTextil,
    },
    {
      control: 'repetitionNumber',
      show: true,
      required: true,
      lines:
        this.linesIdShow.heattranferRollo +
        ',' +
        this.linesIdShow.estampados +
        ',' +
        this.linesIdShow.flexoPapelTextil +
        ',' +
        this.linesIdShow.flexoPapelNoTextil +
        ',' +
        this.linesIdShow.heatTranferPiezas +
        ',' +
        this.linesIdShow.heatTransferLaser +
        ',' +
        this.linesIdShow.estampaciónSublimacion +
        ',' +
        this.linesIdShow.sinteticaScreen +
        ',' +
        this.linesIdShow.sintetico +
        ',' +
        this.linesIdShow.estampadoScreen +
        ',' +
        this.linesIdShow.troquelado +
        ',' +
        this.linesIdShow.sinteticoOtros +
        ',' +
        this.linesIdShow.offSet,
    },
    {
      control: 'sheettype',
      show: true,
      required: false,
      lines:
        this.linesIdShow.heatTransferLaser +
        ',' +
        this.linesIdShow.estampaciónSublimacion +
        ',' +
        this.linesIdShow.offSet,
    },
    { control: 'perforationType', show: true, required: true, lines: '' },
    { control: 'perforationDiameter', show: true, required: true, lines: '' },
    { control: 'engravedType', show: true, required: true, lines: '' },
    {
      control: 'sheetTypeId',
      show: true,
      required: true,
      lines: this.linesIdShow.heatTranferPiezas,
    },
    {
      control: 'paperWidth',
      show: true,
      required: true,
      lines:
        this.linesIdShow.heattranferRollo +
        ',' +
        this.linesIdShow.flexoPapelTextil +
        ',' +
        this.linesIdShow.flexoPapelNoTextil +
        ',' +
        this.linesIdShow.heatTranferPiezas +
        ',' +
        this.linesIdShow.heatTransferLaser,
    },
    {
      control: 'paperRealease',
      show: true,
      required: true,
      lines:
        this.linesIdShow.heattranferRollo +
        ',' +
        this.linesIdShow.heatTranferPiezas +
        ',' +
        this.linesIdShow.estampaciónSublimacion,
    },
    {
      control: 'quantitySheet',
      show: true,
      required: false,
      lines:
        this.linesIdShow.heattranferRollo +
        ',' +
        this.linesIdShow.heatTransferLaser,
    },
    {
      control: 'advance',
      show: true,
      required: true,
      lines: this.linesIdShow.heattranferRollo,
    },
    {
      control: 'squeegeeTravel',
      show: true,
      required: false,
      lines: this.linesIdShow.heattranferRollo,
    },
    {
      control: 'screenPeelOff',
      show: true,
      required: false,
      lines: this.linesIdShow.heattranferRollo,
    },
    { control: 'offCont', show: true, required: false, lines: '' },
    { control: 'numberOfOutputs', show: true, required: false, lines: '' },
    {
      control: 'deweed',
      show: true,
      required: false,
      lines: this.linesIdShow.heatTransferLaser,
    },
    {
      control: 'buclecontrol',
      show: true,
      required: false,
      lines: this.linesIdShow.heatTransferLaser,
    },
    {
      control: 'power',
      show: true,
      required: false,
      lines: this.linesIdShow.heatTransferLaser,
    },
    {
      control: 'frequency',
      show: true,
      required: false,
      lines: this.linesIdShow.heatTransferLaser,
    },
    {
      control: 'bladetype',
      show: true,
      required: false,
      lines: this.linesIdShow.heatTransferLaser,
    },
    {
      control: 'viscositystandard',
      show: true,
      required: true,
      lines: this.linesIdShow.mezclasyTintas,
    },
  ];
  resourceModelLineList = [];
  shapeTypeList = [];
  sheetTypeList = [];
  bladeTypeList = [];
  stampCilinderList = [];

  perforationTypeList = [
    {
      value: 'I',
      name: this.storageService.getLanguage() == 'es' ? 'Izquierda' : 'Left',
    },
    {
      value: 'D',
      name: this.storageService.getLanguage() == 'es' ? 'Derecha' : 'right',
    },
    {
      value: 'C',
      name: this.storageService.getLanguage() == 'es' ? 'Centro' : 'Center',
    },
    {
      value: 'N',
      name: 'N/A',
    },
  ];

  engravedTypeList = [
    {
      value: 'N',
      name: 'N/A',
    },
    {
      value: 'R',
      name:
        this.storageService.getLanguage() == 'es'
          ? 'Desprendible'
          : 'Detachable',
    },
    {
      value: 'D',
      name: this.storageService.getLanguage() == 'es' ? 'Dobles' : 'Doubles',
    },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private ref: ChangeDetectorRef,
    private messageService: MessageService,
    private translate: TranslateService,
    private productionMastersService: ProductionMastersService,
    private techinicalService: TechinicalService,
    private storageService: StorageService
  ) {}

  ngAfterViewInit(): void {
    const thisRef = this;
    this.technicalFormCall.value.forEach(function (car) {
      thisRef.someInput.expandedRowKeys[car.id] = false;
    });
    this.expandedRows = Object.assign({}, this.expandedRows);
  }

  ngOnInit(): void {
    this._InitForms();
    this.technicalFormCall.push(
      this.itemCartSet2({ id: '1', defaultModel: true })
    );
    this.getshapeType();
    this.validateFormStatus();
    this.getshapeType();
  }

  getResourceModelByLineId(line: any) {
    const data = {
      lineId: line,
    };
    this.productionMastersService.getResourceModelByLineId(data).subscribe(
      (response) => {
        if (response) {
          this.resourceModelLineList = response.data;
          if (response.data.length > 1) {
            this.btnDisplaying = true;
            this.countTechnicalData = response.data.length;
          } else {
            this.btnDisplaying = true;
            this.countTechnicalData = response.data.length;
          }
        } else {
          this.resourceModelLineList = [];
        }
      },
      (error) => {
        console.log(error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error.message,
        });
      },
      () => {}
    );
  }

  getshapeType() {
    this.techinicalService.shapeTypeGet().subscribe(
      (response) => {
        if (response) {
          this.shapeTypeList = response.data;
        } else {
          this.shapeTypeList = [];
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

  getSheetTypeByLineId(line: any) {
    const data = {
      lineId: line,
    };
    this.productionMastersService.getSheetTypeByLineId(data).subscribe(
      (response) => {
        if (response) {
          this.sheetTypeList = response.data;
        } else {
          this.sheetTypeList = [];
        }
      },
      (error) => {
        console.log(error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error.message,
        });
      },
      () => {}
    );
  }

  getBladeTypeByLineId(line: any) {
    const data = {
      lineId: line,
    };
    this.productionMastersService.getBladeTypeByLineId(data).subscribe(
      (response) => {
        if (response) {
          this.bladeTypeList = response.data;
        } else {
          this.bladeTypeList = [];
        }
      },
      (error) => {
        console.log(error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error.message,
        });
      },
      () => {}
    );
  }

  getStampCylinderByLineId(line: any) {
    const data = {
      lineId: line,
    };
    this.productionMastersService.getStampCylinderByLineId(data).subscribe(
      (response) => {
        if (response) {
          this.stampCilinderList = response.data;
        } else {
          this.stampCilinderList = [];
        }
      },
      (error) => {
        console.log(error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error.message,
        });
      },
      () => {}
    );
  }

  private _InitForms() {
    this.technicalDataForm = this.formBuilder.group({
      header: this.formBuilder.array([], this.itemHeader()),
    });
  }

  private itemHeader(): FormGroup {
    return this.formBuilder.group({
      id: ['', Validators.nullValidator],
      resourceModel: ['', Validators.nullValidator],
      alternalResourceModel: ['', Validators.required],
      resourceId: ['', Validators.required],
      speed: ['', Validators.required],
      standarTime: ['', Validators.required],
      stationNumber: ['', Validators.required],
      picks: { value: null, disabled: this.validateRolAdmonDesigner() },
      totalPicks: { value: null, disabled: this.validateRolAdmonDesigner() },
      cameraPicks: ['', Validators.nullValidator],
      machinePicks: ['', Validators.nullValidator],
      defaultModel: ['', Validators.nullValidator],
      stampCylinderId: ['', Validators.required],
      repetitionNumber: ['', Validators.required],
      sheettype: ['', Validators.nullValidator],
      perforationType: ['', Validators.required],
      perforationDiameter: ['', Validators.required],
      engravedType: ['', Validators.required],
      sheetTypeId: ['', Validators.required],
      paperWidth: ['', Validators.required],
      paperRealease: ['', Validators.required],
      quantitySheet: ['', Validators.nullValidator],
      advance: ['', Validators.required],
      squeegeeTravel: ['', Validators.nullValidator],
      screenPeelOff: ['', Validators.nullValidator],
      offCont: ['', Validators.nullValidator],
      numberOfOutputs: ['', Validators.nullValidator],
      deweed: ['', Validators.nullValidator],
      buclecontrol: ['', Validators.nullValidator],
      power: ['', Validators.nullValidator],
      frequency: ['', Validators.nullValidator],
      bladetype: ['', Validators.nullValidator],
      viscositystandard: ['', Validators.required],
    });
  }

  validateFormStatus(): void {
    this.formTechnicalIconStatus = this.technicalFormCall.valid == true ? 1 : 2;
    this.formStatusText =
      this.technicalFormCall.valid == true
        ? 'technical-sheets.session_form_completed'
        : 'technical-sheets.session_form_without_completed';

    this.technicalDataForm.valueChanges.subscribe((value) => {
      this.formTechnicalIconStatus =
        this.technicalFormCall.valid == true ? 1 : 2;
      this.formStatusText =
        this.technicalFormCall.valid == true
          ? 'technical-sheets.session_form_completed'
          : 'technical-sheets.session_form_without_completed';
    });
  }

  get technicalFormCall() {
    return this.technicalDataForm.get('header') as FormArray;
  }

  private itemCartSet2(data: any): FormGroup {
    return this.formBuilder.group({
      id: [data.id, Validators.nullValidator],
      resourceModel: ['', Validators.nullValidator],
      alternalResourceModel: ['', Validators.required],
      resourceId: ['', Validators.required],
      speed: ['', Validators.required],
      standarTime: ['', Validators.required],
      stationNumber: ['', Validators.required],
      picks: { value: null, disabled: this.validateRolAdmonDesigner() },
      totalPicks: { value: null, disabled: this.validateRolAdmonDesigner() },
      cameraPicks: ['', Validators.nullValidator],
      machinePicks: ['', Validators.nullValidator],
      defaultModel: [data.defaultModel, Validators.nullValidator],
      stampCylinderId: ['', Validators.required],
      repetitionNumber: ['', Validators.required],
      sheettype: ['', Validators.nullValidator],
      perforationType: ['', Validators.required],
      perforationDiameter: ['', Validators.required],
      engravedType: ['', Validators.required],
      sheetTypeId: ['', Validators.required],
      paperWidth: ['', Validators.required],
      paperRealease: ['', Validators.required],
      quantitySheet: ['', Validators.nullValidator],
      advance: ['', Validators.required],
      squeegeeTravel: ['', Validators.nullValidator],
      screenPeelOff: ['', Validators.nullValidator],
      offCont: ['', Validators.nullValidator],
      numberOfOutputs: ['', Validators.nullValidator],
      deweed: ['', Validators.nullValidator],
      buclecontrol: ['', Validators.nullValidator],
      power: ['', Validators.nullValidator],
      frequency: ['', Validators.nullValidator],
      bladetype: ['', Validators.nullValidator],
      viscositystandard: ['', Validators.required],
    });
  }

  onItemClick(rowData: any, dt: any) {
    if (dt.expandedRowKeys[rowData.id]) {
      dt.expandedRowKeys[rowData.id] = false;
    } else {
      dt.expandedRowKeys[rowData.id] = true;
    }
  }

  public showHideForm(paramLineId: number) {
    try {
      let lineValidating = false;
      let linesIds = JSON.parse(JSON.stringify(this.linesIdShow));
      for (const line in linesIds) {
        if (linesIds[line] == paramLineId) {
          lineValidating = true;
          break;
        }
      }

      this.lineIdGet = paramLineId;
      this.lineIdGetValid = lineValidating;
      this.showFormFields(paramLineId, lineValidating);
      this.getBladeTypeByLineId(paramLineId);
      this.getResourceModelByLineId(paramLineId);
      this.getSheetTypeByLineId(paramLineId);
      this.getStampCylinderByLineId(paramLineId);
      this.largeProductionValidate(paramLineId);
    } catch (error) {
      console.log(error);
    }
  }

  showFormFields(paramLineId: number, lineIdValidating: boolean): void {
    this.listComponentsValidating.forEach((Value, index) => {
      this.technicalFormCall.controls.forEach((element, ind) => {
        if (
          element.get(Value.control) !== null &&
          element.get(Value.control) !== undefined
        ) {
          if (lineIdValidating) {
            if (String(Value.lines).includes(String(paramLineId))) {
              Value.show = true;
              element
                .get(Value.control)
                .setValidators([
                  Value.required
                    ? Validators.required
                    : Validators.nullValidator,
                ]);
              element.get(Value.control).updateValueAndValidity();
            } else {
              Value.show = false;
              if (Value.required) {
                element
                  .get(Value.control)
                  .setValidators([Validators.nullValidator]);
                element.get(Value.control).updateValueAndValidity();
              }
            }
          } else {
            Value.show = true;
            element
              .get(Value.control)
              .setValidators([
                Value.required ? Validators.required : Validators.nullValidator,
              ]);
            element.get(Value.control).updateValueAndValidity();
          }
        }
      });
    });
  }

  validateRolAdmonDesigner(): Boolean {
    if (
      this.storageService.getProfiles().role == 5 ||
      this.storageService.getProfiles().role == 9
    ) {
      return false;
    } else {
      return true;
    }
  }

  onFocusOutEventPicks(event: any) {
    try {
      if (event.target.value.trim().toUpperCase() != '') {
        if (this.validateLargeproduction) {
          this.technicalFormCall.controls.forEach((element, ind) => {
            let picks;
            let cameraPicks;
            let largoProduccion;
            if (
              element.get('picks') !== null &&
              element.get('picks') !== undefined
            ) {
              picks = element.get('picks').value;
            }

            if (
              element.get('cameraPicks') !== null &&
              element.get('cameraPicks') !== undefined
            ) {
              cameraPicks = element.get('cameraPicks').value;
            }

            if (picks && cameraPicks) {
              largoProduccion = (picks / cameraPicks) * 10;
              if (largoProduccion) {
                this.updateNumberLargeProduct = parseInt(largoProduccion);
                if (parseInt(largoProduccion) != this.lblNumberLargeProduct) {
                  this.showModalProductionLarge = true;
                }
              }
            }
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  getLargoProduccion(largoProduccion: any) {
    this.lblNumberLargeProduct = largoProduccion;
  }

  largeProductionValidate(paramLineId: any) {
    if (
      this.linesIdShow.tejidoOrilloCortado == paramLineId ||
      this.linesIdShow.telas == paramLineId ||
      this.linesIdShow.mascarillasTejidas == paramLineId
    ) {
      this.validateLargeproduction = true;
    } else {
      this.validateLargeproduction = true;
    }
  }

  btnSelectNo() {
    this.paramLongProductionUpdate.emit(
      this.updateNumberLargeProduct + '-false'
    );
    this.lblNumberLargeProduct = this.updateNumberLargeProduct;
    this.showModalProductionLarge = false;
  }

  btnSelectSi() {
    this.paramLongProductionUpdate.emit(' -true');
    this.showModalProductionLarge = false;
  }

  btnAddTechnical() {
    let AuxCountItem = this.countTechnicalData - this.technicalFormCall.length;
    const idItem = this.technicalFormCall.length + 1;
    if (AuxCountItem > 1 && this.technicalFormCall.length < AuxCountItem) {
      this.technicalFormCall.push(this.itemCartSet2({ id: idItem }));
    } else if ((AuxCountItem = 1)) {
      this.btnDisplaying = false;
      this.technicalFormCall.push(this.itemCartSet2({ id: idItem }));
    }

    this.showFormFields(this.lineIdGet, this.lineIdGetValid);
  }

  removeItem(index: any) {
    this.technicalFormCall.controls.splice(index, 1);
  }

  showHideActions() {
    if (this.technicalFormCall.length > 1) {
      return true;
    } else {
      return false;
    }
  }

  getTotalPicksHilo(paramTotalPickHilo: any) {
    this.totalPicksHilo = paramTotalPickHilo;
  }

  getTotalPicksColor(paramTotalPickcolor: any) {
    this.totalPicksColor = paramTotalPickcolor;
  }

  validatingTotalPicks(event: any, rowIndex: any) {
    if (event.target.value.trim().toUpperCase() != '') {
      let totalPicksParam = parseInt(event.target.value.trim().toUpper);
      if (totalPicksParam != this.totalPicksHilo) {
        this.displayInvalidForm = true;
        this.technicalFormCall.controls[rowIndex].patchValue({
          totalPicks: '',
        });
      }
    }
  }
}
