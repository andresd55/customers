import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'src/app/shared/framework-ui/primeng/api/messageservice';
import { Table } from 'src/app/shared/framework-ui/primeng/tablafinotex/public_api';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import { environment } from 'src/environments/environment';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-mallas',
  templateUrl: './mallas.component.html',
  styleUrls: ['./mallas.component.css'],
  providers: [MessageService],
})
export class MallasComponent implements OnInit, AfterViewInit {
  @ViewChild('tablaFinotex') someInput: Table;
  mallasDataForm: FormGroup;
  expandedRows: {} = {};
  linesIdShow = environment.technicalDataLines;
  showOutletHeat: boolean = false;
  showMiddleHeat: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private ref: ChangeDetectorRef,
    private messageService: MessageService,
    private translate: TranslateService,
    private storageService: StorageService
  ) {}

  get mallasFormCall() {
    return this.mallasDataForm.get('header') as FormArray;
  }

  ngAfterViewInit(): void {
    const thisRef = this;
    this.mallasFormCall.value.forEach(function (car) {
      thisRef.someInput.expandedRowKeys[car.id] = false;
    });
    this.expandedRows = Object.assign({}, this.expandedRows);
  }

  ngOnInit(): void {
    this._InitForms();
  }

  receiveParamsMaterials(params: any) {
    try {
      let data = params;
      if (data != null && data != undefined) {
        for (let index = 0; index < data.length; index++) {
          const idProcessSettings = index + 1;
          const element = data[index];
          this.mallasFormCall.push(
            this.itemMaterials({
              id: idProcessSettings,
              typeMaterial: element.positionMaterial,
              description: element.description,
            })
          );
        }
      } else {
        this.mallasFormCall.push(this.itemMaterials({ id: '1' }));
      }
    } catch (error) {
      console.log(error);
    }
  }

  private _InitForms() {
    this.mallasDataForm = this.formBuilder.group({
      header: this.formBuilder.array([], this.itemHeader()),
    });
  }

  private itemHeader(): FormGroup {
    return this.formBuilder.group({
      id: ['', Validators.nullValidator],
      typeMaterial: ['', [Validators.nullValidator]],
      description: ['', [Validators.nullValidator]],
      meshId: ['', [Validators.nullValidator]],
      frameNumber: ['', [Validators.nullValidator]],
      pressure: ['', [Validators.nullValidator]],
      light: ['', [Validators.nullValidator]],
      squeegeeSpeed: ['', [Validators.nullValidator]],
      squeegeePressure: ['', [Validators.nullValidator]],
      squeegeAngle: ['', [Validators.nullValidator]],
      floodBarPressure: ['', [Validators.nullValidator]],
      fpmSpeed: ['', [Validators.nullValidator]],
      outletHeat: ['', [Validators.nullValidator]],
      middleHeat: ['', [Validators.nullValidator]],
      inletHeat: ['', [Validators.nullValidator]],
      commnets: ['', [Validators.nullValidator]],
    });
  }

  private itemMaterials(data: any): FormGroup {
    return this.formBuilder.group({
      id: [data.id, Validators.nullValidator],
      typeMaterial: [data.typeMaterial, Validators.nullValidator],
      description: [data.description, Validators.nullValidator],
      meshId: ['', [Validators.nullValidator]],
      frameNumber: ['', [Validators.nullValidator]],
      pressure: ['', [Validators.nullValidator]],
      light: ['', [Validators.nullValidator]],
      squeegeeSpeed: ['', [Validators.nullValidator]],
      squeegeePressure: ['', [Validators.nullValidator]],
      squeegeAngle: ['', [Validators.nullValidator]],
      floodBarPressure: ['', [Validators.nullValidator]],
      fpmSpeed: ['', [Validators.nullValidator]],
      outletHeat: ['', [Validators.nullValidator]],
      middleHeat: ['', [Validators.nullValidator]],
      inletHeat: ['', [Validators.nullValidator]],
      commnets: ['', [Validators.nullValidator]],
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
    if (
      paramLineId == this.linesIdShow.heattranferRollo ||
      paramLineId == this.linesIdShow.heatTranferPiezas
    ) {
      this.showMiddleHeat = true;
      this.showOutletHeat = true;
    } else {
      this.showMiddleHeat = false;
      this.showOutletHeat = false;
    }
  }
}
