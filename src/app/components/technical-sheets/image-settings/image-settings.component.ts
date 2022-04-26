import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MasterProductService } from 'src/app/core/services/masterProduct/master-product.service';
import { MessageService } from 'src/app/shared/framework-ui/primeng/api/public_api';
import { FileUpload } from 'src/app/shared/models/fileUpload';
import { environment } from 'src/environments/environment';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import { TechinicalService } from 'src/app/core/services/technical-sheets/techinical.service';
import * as moment from 'moment';

declare var $: any;

@Component({
  selector: 'app-image-settings',
  templateUrl: './image-settings.component.html',
  styleUrls: ['./image-settings.component.css'],
  providers: [MessageService],
})
export class ImageSettingsComponent implements OnInit {
  lang = 'en';
  registerFormSesionthree: FormGroup;
  designerList: any = [];
  palleteTypeList: any = [];
  locationDesign: any = [];
  customerReferenceForm: FormGroup;

  @Input() paramCustomerId: string = '';
  @Input() paramLineId: string = '';

  formThreeIconStatusThree = 2;
  formThreeStatusTexThree = '';

  cut: boolean;
  winding_sense: boolean;
  drawing: boolean;
  drawingDate: boolean;
  designedby: boolean;
  designDate: boolean;
  equal_color: boolean;
  standar_production: boolean;
  sample_location: boolean;
  graphicFile: boolean;
  locationDate: boolean;
  fileList: FileUpload[] = new Array<FileUpload>();
  hideErrorType: boolean;
  hideErrorSize: boolean;
  displayConfirmCreate: boolean;
  maxSize: string;
  displayInvalidateFileMessage: boolean;
  displayCutType = false;
  displayRewindings = false;
  cutTypes = [];
  rewindings = [];
  lineId: number;
  urlCutImg: string = "../../../../assets/images/imgDefault.png";
  urlRewindingImg: string = "../../../../assets/images/imgDefault.png";

  constructor(
    private formBuilder: FormBuilder,
    private storageService: StorageService,
    private masterProductService: MasterProductService,
    private messageService: MessageService,
    private techinicalService: TechinicalService
  ) {
    
  }

  ngOnInit(): void {
    moment.locale(this.storageService.getLanguage());
    this.lang = this.storageService.getLanguage();
    this.showAllFieldsValidatorView();
    this.getFormSessionThree();
    this.validateFormStatus();
    this.getDesignerList();
    this.getAllPalleteType();
    this.getAllLocationDesign();
  }

  validateFormStatus(): void {
    this.formThreeIconStatusThree =
      this.registerFormSesionthree.valid == true ? 1 : 2;
    this.formThreeStatusTexThree =
      this.registerFormSesionthree.valid == true
        ? 'technical-sheets.session_form_completed'
        : 'technical-sheets.session_form_without_completed';

    this.registerFormSesionthree.valueChanges.subscribe((value) => {
      this.formThreeIconStatusThree =
        this.registerFormSesionthree.valid == true ? 1 : 2;
      this.formThreeStatusTexThree =
        this.registerFormSesionthree.valid == true
          ? 'technical-sheets.session_form_completed'
          : 'technical-sheets.session_form_without_completed';
    });
  }

  public showHideForm(paramLineId: number) {
    switch (paramLineId) {
      // Flexo Papel - Textil-No Textil
      case 74:
      case 76:
        {
          this.showAllFieldsValidatorRequire();
          this.showAllFieldsValidatorView();
          this.showFormFlexoPapel();
        }

        break;

      // Heat Transfer Laser
      case 84:
        {
          this.showAllFieldsValidatorRequire();
          this.showAllFieldsValidatorView();
          this.showFormHeatTransferLaser();
        }
        break;

      // Thermal,Reatas y pretinas
      case 64:
      case 68:
        {
          this.showAllFieldsValidatorRequire();
          this.showAllFieldsValidatorView();
          this.showFormThermal();
        }
        break;

      // Estampación por Sublimación
      case 78:
        {
          this.showAllFieldsValidatorRequire();
          this.showAllFieldsValidatorView();
          this.showFormEstampacion();
        }
        break;

      // Sintética Screen, Sintético, estampado Screen,Troquelado, Sintético Otros
      case 79:
      case 83:
      case 81:
      case 82:
        {
          this.showAllFieldsValidatorRequire();
          this.showAllFieldsValidatorView();
          this.showFormSintetico();
        }
        break;

      // Kits: Kit Offset, Kit Estampado + Sublimacion, Kit Orillo (pendiente Mexico)
      // Cortado,Kit Heat transfer,Kit Flexo (Mexico)
      case 86:
      case 88:
      case 89:
      case 87:
      case 91:
        {
          this.showAllFieldsValidatorRequire();
          this.showAllFieldsValidatorView();
          this.showFormKits();
        }
        break;

      case 30:
        {
          this.showAllFieldsValidatorRequire();
          this.showAllFieldsValidatorView();
          this.showFormMezclas();
        }
        break;
      default:
        this.showAllFieldsValidatorRequire();
        this.showAllFieldsValidatorView();
        break;
    }
  }

  getFormSessionThree() {
    return (this.registerFormSesionthree = this.formBuilder.group({
      cut: ['', Validators.required],
      winding_sense: ['', Validators.required],
      drawing: ['', Validators.nullValidator],
      drawingDate: ['', Validators.nullValidator],
      designedby: ['', Validators.nullValidator],
      designDate: ['', Validators.nullValidator],
      equal_color: ['', Validators.nullValidator],
      standar_production: ['', [Validators.nullValidator,Validators.pattern(/^([0-9]{1,16})(\.\d{1,5})?$/)]],
      sample_location: ['', Validators.nullValidator],
      graphicFile: ['', Validators.nullValidator],
      locationDate: ['', Validators.nullValidator],
    }));
  }

  showAllFieldsValidatorRequire(): void {
    const listNotRequired = [
      {
        name: 'cut',
        require: Validators.required,
      },
      {
        name: 'winding_sense',
        require: Validators.required,
      },
    ];
    this.showFormFields(listNotRequired);
  }

  showFormFields(data: any[]): void {
    data.forEach((currentValue, index) => {
      this.registerFormSesionthree
        .get(currentValue.name)
        .setValidators([currentValue.require]);
      this.registerFormSesionthree
        .get(currentValue.name)
        .updateValueAndValidity();
    });
  }

  showAllFieldsValidatorView(): void {
    this.cut = true;
    this.winding_sense = true;
    this.drawing = true;
    this.drawingDate = true;
    this.designedby = true;
    this.designDate = true;
    this.equal_color = true;
    this.standar_production = true;
    this.sample_location = true;
    this.graphicFile = true;
    this.locationDate = true;
  }

  showFormFlexoPapel() {
    const listNotRequired = [
      {
        name: 'cut',
        require: Validators.nullValidator,
      },
      {
        name: 'equal_color',
        require: Validators.nullValidator,
      },
      {
        name: 'standar_production',
        require: Validators.nullValidator,
      },
    ];
    this.showFormFields(listNotRequired);
    this.cut = false;
    this.equal_color = false;
    this.standar_production = false;
  }

  showFormHeatTransferLaser() {
    const listNotRequired = [
      {
        name: 'winding_sense',
        require: Validators.nullValidator,
      },
      {
        name: 'standar_production',
        require: Validators.nullValidator,
      },
      {
        name: 'equal_color',
        require: Validators.nullValidator,
      },
    ];
    this.showFormFields(listNotRequired);
    this.winding_sense = false;
    this.standar_production = false;
    this.equal_color = false;
  }

  showFormThermal() {
    const listNotRequired = [
      {
        name: 'winding_sense',
        require: Validators.nullValidator,
      },
      {
        name: 'equal_color',
        require: Validators.nullValidator,
      },
    ];
    this.showFormFields(listNotRequired);
    this.winding_sense = false;
    this.equal_color = false;
  }

  showFormEstampacion() {
    const listNotRequired = [
      {
        name: 'winding_sense',
        require: Validators.nullValidator,
      },
      {
        name: 'sample_location',
        require: Validators.nullValidator,
      },
      {
        name: 'locationDate',
        require: Validators.nullValidator,
      },
      {
        name: 'equal_color',
        require: Validators.nullValidator,
      },
    ];
    this.showFormFields(listNotRequired);
    this.winding_sense = false;
    this.sample_location = false;
    this.locationDate = false;
    this.equal_color = false;
  }

  showFormSintetico() {
    const listNotRequired = [
      {
        name: 'winding_sense',
        require: Validators.nullValidator,
      },
      {
        name: 'sample_location',
        require: Validators.nullValidator,
      },
      {
        name: 'locationDate',
        require: Validators.nullValidator,
      },
      {
        name: 'equal_color',
        require: Validators.nullValidator,
      },
      {
        name: 'standar_production',
        require: Validators.nullValidator,
      },
    ];
    this.showFormFields(listNotRequired);
    this.winding_sense = false;
    this.sample_location = false;
    this.locationDate = false;
    this.equal_color = false;
    this.standar_production = false;
  }

  showFormKits() {
    const listNotRequired = [
      {
        name: 'cut',
        require: Validators.nullValidator,
      },
      {
        name: 'drawing',
        require: Validators.nullValidator,
      },
      {
        name: 'drawingDate',
        require: Validators.nullValidator,
      },
      {
        name: 'designedby',
        require: Validators.nullValidator,
      },
      {
        name: 'designDate',
        require: Validators.nullValidator,
      },
      {
        name: 'standar_production',
        require: Validators.nullValidator,
      },
      {
        name: 'sample_location',
        require: Validators.nullValidator,
      },
      {
        name: 'locationDate',
        require: Validators.nullValidator,
      },
      {
        name: 'equal_color',
        require: Validators.nullValidator,
      },
    ];
    this.showFormFields(listNotRequired);
    this.cut = false;
    this.drawing = false;
    this.drawingDate = false;
    this.designedby = false;
    this.designDate = false;
    this.standar_production = false;
    this.sample_location = false;
    this.locationDate = false;
    this.equal_color = false;
  }

  showFormMezclas() {
    const listNotRequired = [
      {
        name: 'cut',
        require: Validators.nullValidator,
      },
      {
        name: 'winding_sense',
        require: Validators.nullValidator,
      },
      {
        name: 'drawing',
        require: Validators.nullValidator,
      },
      {
        name: 'drawingDate',
        require: Validators.nullValidator,
      },
      {
        name: 'designedby',
        require: Validators.nullValidator,
      },
      {
        name: 'designDate',
        require: Validators.nullValidator,
      },
      {
        name: 'standar_production',
        require: Validators.nullValidator,
      },
      {
        name: 'sample_location',
        require: Validators.nullValidator,
      },
      {
        name: 'locationDate',
        require: Validators.nullValidator,
      },
      {
        name: 'equal_color',
        require: Validators.nullValidator,
      },
      {
        name: 'graphicFile',
        require: Validators.nullValidator,
      },
    ];
    this.showFormFields(listNotRequired);
    this.cut = false;
    this.winding_sense = false;
    this.drawing = false;
    this.drawingDate = false;
    this.designedby = false;
    this.designDate = false;
    this.standar_production = false;
    this.sample_location = false;
    this.locationDate = false;
    this.equal_color = false;
    this.graphicFile = false;
 
  }

  resetFiles(indicator: boolean) {
    indicator == false
      ? this.registerFormSesionthree.controls.graphicFile.setValue('')
      : null;
    this.fileList.forEach((item, index) => {
      if (indicator) {
        delete this.fileList[index];
      } else {
        delete this.fileList[index];
      }
    });
  }

  updateFileList(isMain: boolean) {
    let filesUpload: string = '';
    this.fileList.forEach((item, index) => {
      if (item.isMain == isMain) {
        filesUpload = item.fileName;
      }
    });
    if (isMain) {
      // OJO falda definir funcionalidad
    } else {
      this.registerFormSesionthree.controls.graphicFile.setValue(filesUpload);
    }
  }

  async fileChanged(event: any) {
    let isMain = false;
    await this.upload(
      event.target.files[0].name,
      event.target.files[0],
      isMain
    );
  }

  async upload(fileName: string, fileContent: any, isMain: any) {
    if (await this.validateUploadedFile(fileContent)) {
      await this.convertFileToBase64(fileContent, isMain);
    }
  }

  async validateUploadedFile(fileContent: any) {
    this.hideErrorType = true;
    this.hideErrorSize = true;
    this.displayInvalidateFileMessage = false;

    this.maxSize = environment.max_file_size + 'MB';
    if (
      fileContent.size > environment.max_file_size * 1000000 ||
      fileContent.size == 0
    ) {
      this.hideErrorSize = false;
    }
    this.displayInvalidateFileMessage =
      !this.hideErrorSize || !this.hideErrorType;
    return !this.displayInvalidateFileMessage;
  }

  async convertFileToBase64(file, isMain) {
    var self = this;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      let fileImageDesigner: FileUpload = {
        fileName: file.name,
        fileType: file.type,
        isMain: isMain,
        fileUrl: 'Finotex',
        fileTemporal: reader.result.toString().split(',')[1],
        IsDesignerFile: false,
      };
      self.fileList.push(fileImageDesigner);
      self.updateFileList(isMain);
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

  getCustomerReferenceForm(): FormGroup {
    return this.formBuilder.group({
      CustomerReference: ['', Validators.nullValidator],
      Description: ['', Validators.nullValidator],
      Color: ['', Validators.nullValidator],
      SKU: ['', Validators.nullValidator],
    });
  }

  getDesignerList(): void {
    this.masterProductService.getAllDesigner().subscribe(
      (response) => {
        if (response && response.status) {
          this.designerList = response.data;
        }
      },
      (error) => {
        this.makeToastError(error.error.message);
      },
      () => {}
    );
  }

  getAllPalleteType(): void {
    this.masterProductService.getAllPalleteType().subscribe(
      (response) => {
        if (response && response.status) {
          this.palleteTypeList = response.data;
        }
      },
      (error) => {
        this.makeToastError(error.error.message);
      },
      () => {}
    );
  }

  getAllLocationDesign(): void {
    this.masterProductService.getAllLocationDesign().subscribe(
      (response) => {
        if (response && response.status) {
          this.locationDesign = response.data;
        }
      },
      (error) => {
        this.makeToastError(error.error.message);
      },
      () => {}
    );
  }

  makeToastError(message: string): void {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: message,
    });
  }

  openModalCutType() {
    this.cutTypes = [];
    this.displayCutType = true;
    this.getCutType(this.lineId);
  }

  openModalRewinding() {
    this.rewindings = [];
    this.displayRewindings = true;
    this.getRewindings();
  }

  selectCutType() {
    const cutTypeName = Number($("input[name='rdCutType']:checked").val());
    if (cutTypeName) {
      let objCut = this.cutTypes.find((obj) => {
        return obj.cutId === cutTypeName;
      });
      this.registerFormSesionthree.patchValue({
        cut: objCut.cutName,
        cutId: objCut.cutId,
      });
      this.urlCutImg = objCut.fileTemporal;
      this.displayCutType = false;
    }
  }

  selectRewindings() {
    const rewindingName = Number($("input[name='rdRewinding']:checked").val());
    if (rewindingName != null && rewindingName != undefined) {
      let objRewinding = this.rewindings.find((obj) => {
        return obj.rewindingId === rewindingName;
      });
      this.registerFormSesionthree.patchValue({
        winding_sense: objRewinding.rewindingName,
        rewindingId: objRewinding.rewindingId,
      });
      this.urlRewindingImg = objRewinding.rewindingUrl;
      this.displayRewindings = false;
    }
  }

  getCutType(idLine: number) {
    const body = {
      lineId: idLine,
    };
    this.techinicalService.cutByLineIdGet(body).subscribe(
      (response) => {
        if (response.status) {
          this.cutTypes = response.data;
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: response.message,
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

  getRewindings() {
    this.techinicalService.rewindingGetGet().subscribe(
      (response) => {
        if (response.status) {
          this.rewindings = response.data;
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: response.message,
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

  public cutByLineId(paramLineId: number) {
    this.lineId = paramLineId;
  }

}
