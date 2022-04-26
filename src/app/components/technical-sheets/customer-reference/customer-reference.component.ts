import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/core/services/product/product.service';
import { MessageService } from 'src/app/shared/framework-ui/primeng/api/public_api';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-customer-reference',
  templateUrl: './customer-reference.component.html',
  styleUrls: ['./customer-reference.component.css'],
  providers: [MessageService],
})
export class CustomerReferenceComponent implements OnInit {
  @Input() paramCustomerId: string = '';

  customerReferenceForm: FormGroup;
  customerReferenceFormIconStatus = 0;
  customerReferenceFormStatusText = '';
  errorMessageText = '';

  lang = 'en';

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private messageService: MessageService,
    private translateService: TranslateService,
  ) {}

  ngOnInit(): void {
    this.customerReferenceForm = this.getCustomerReferenceForm();
    this.validateFormStatus();
    this.translateService.stream('technical-sheets.error_message_search_customer_reference').subscribe((res: string) => {
      this.errorMessageText = res;
    });
  }

  getCustomerReferenceForm(): FormGroup {
    return this.formBuilder.group({
      CustomerReference: ['', Validators.nullValidator],
      Description: ['', Validators.nullValidator],
      Color: ['', Validators.nullValidator],
      SKU: ['', Validators.nullValidator],
    });
  }

  validateFormStatus(): void {
    this.customerReferenceFormIconStatus = this.validateFormData() ? 1 : 0;
    this.customerReferenceFormStatusText = this.validateFormData()
      ? 'technical-sheets.session_form_completed'
      : 'technical-sheets.session_form_optional';

    this.customerReferenceForm.valueChanges.subscribe((value) => {
      this.customerReferenceFormIconStatus = this.validateFormData() ? 1 : 0;
      this.customerReferenceFormStatusText = this.validateFormData()
        ? 'technical-sheets.session_form_completed'
        : 'technical-sheets.session_form_optional';
    });
  }

  validateFormData(): boolean {
    return (
      this.customerReferenceForm.controls.CustomerReference.value != '' &&
      this.customerReferenceForm.controls.Description.value != '' &&
      this.customerReferenceForm.controls.Color.value != '' &&
      this.customerReferenceForm.controls.SKU.value != ''
    );
  }

  onCustomerReferenceChange($event: any): void {
    const body = {
      customerId: this.paramCustomerId,
      productId: this.customerReferenceForm.controls.CustomerReference.value,
    };

    this.productService.getCustomerReference(body).subscribe(
      (response) => {
        if (response && response.status) {
          this.mapDataToFieldEntries(response.data);
        } else {
          this.showErrorMessage(this.paramCustomerId, this.customerReferenceForm.controls.CustomerReference.value);
        }
      },
      (error) => {
        this.showErrorMessage(this.paramCustomerId, this.customerReferenceForm.controls.CustomerReference.value);
      }
    );
  }
  showErrorMessage(customerId:string, productId:string): void {
    let message: string = this.errorMessageText;
    message = message.replace("{0}", productId);
    message = message.replace("{1}", customerId);
    this.messageService.add({
      severity: 'info',
      summary: 'Info',
      detail: message,
    });
  }
  mapDataToFieldEntries(data: any): void {
    this.customerReferenceForm.controls.Description.setValue(
      data.referenceName
    );
    if (data.referenceColor) {
      this.customerReferenceForm.controls.Color.setValue(
        data.referenceColor
      );
    }
    this.customerReferenceForm.controls.SKU.setValue(
      data.sku1 ? data.sku1 : data.referenceId
    );
  }

  onCustomerReferenceKeyUp($event: any): void {
    this.customerReferenceForm.controls.SKU.setValue(
      this.customerReferenceForm.controls.CustomerReference.value
    );
  }
}
