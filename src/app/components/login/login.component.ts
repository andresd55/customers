import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { PopupRequest, RedirectRequest, AuthenticationResult, LogLevel } from '@azure/msal-browser';
import { PublicClientApplication } from '@azure/msal-browser';
import { ProfilesService } from 'src/app/core/services/profile/profiles.service';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import { MessageService } from 'src/app/shared/framework-ui/primeng/api/public_api';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  registerForm!: FormGroup;
  registerFormLogin: FormGroup;
  displayLogin = false;
  showError = false;
  showErrorText = "";
  titleLogin = "";

  userType = [
    {
      code: '1',
      name: 'Finotex customer'
    },
    {
      code: '2',
      name: 'Finotex team'
    }
  ]

  constructor(
    private profilesService: ProfilesService,
    private router: Router,
    private storageService: StorageService,
    private formBuilder: FormBuilder) { }

  get formControls() {
    return this.registerForm.controls;
  }

  ngOnInit(): void {
    this.getFormTypeUser();
    this.getFormLoginUser();
  }

  /*login(userFlowRequest?: RedirectRequest | PopupRequest) {

    let popupRequestScopeInterno: PopupRequest = {
      scopes: [],
    }
    if (this.formControls.user_type.value == '1') {
      this.authService.instance = new PublicClientApplication({
        auth: environment.authB2c
      });
      popupRequestScopeInterno = {
        scopes: ["https://FinotexB2C.onmicrosoft.com/e8529ad6-7364-454a-afac-6c74edc7d5d3/access_as_user"]
      }
    } else {
      this.authService.instance = new PublicClientApplication({
        auth: environment.auth
      });
      popupRequestScopeInterno = {
        scopes: ["api://98c68b8e-0d50-4961-b352-5cd5040b1e1e/access_as_user"],
      }
    }
    this.storageService.addUserType(this.formControls.user_type.value);

    this.loginPopup(popupRequestScopeInterno);
    
  }

  private loginPopup(popupRequest: PopupRequest) {
    this.authService.loginPopup(popupRequest)
    .subscribe((response: AuthenticationResult) => {
      this.authService.instance.setActiveAccount(response.account);
      this.storageService.addToken(response.accessToken);
      this.router.navigate(['profiles_roles']);
    },
    (error) => {
      this.storageService.logoutUser();
    });
  }*/

  private getFormTypeUser() {
    return (this.registerForm = this.formBuilder.group({
      user_type: ['', Validators.required]
    }));
  }

  private getFormLoginUser() {
    return (this.registerFormLogin = this.formBuilder.group({
      username: ['', Validators.pattern("^[aA-zZ0-9._%+-]+@[aA-zZ0-9.-]+\.[aA-zZ]{2,4}$")],
      password: ['', Validators.required]
    }));
  }

  onSubmitTypeUser(): void {
    this.displayLogin = true;
    this.titleLogin = this.formControls.user_type.value == 1 ? "Finotex customer" : "Finotex team";
  }

  onSubmitLogin(): void {
    if (this.formControls.user_type.value == '1') {
      // USER EXTERNAL
      this.callServiceB2c();
    } else if (this.formControls.user_type.value == '2') {
      // USER INTERNAL
      this.callServiceB2b();
    }
  }

  callServiceB2c(): void {
    this.showError = false;
    this.profilesService.loginB2cGetFinotex(this.registerFormLogin.value).subscribe(
      (response) => {
        if (response.status) {
          this.setInfoLoginUser(response.data.access_token, response.data);
        }
      },
      (error) => {
        this.showError = true;
        this.showErrorText = error.error.message;
      },
      () => { this.displayLogin = false; }
    );
  }

  callServiceB2b(): void {
    this.showError = false;
    this.profilesService.loginB2bGetFinotex(this.registerFormLogin.value).subscribe(
      (response) => {
        if (response.status) {
          this.setInfoLoginUser(response.data.access_token, response.data);
        }
      },
      (error) => {
        this.showError = true;
        this.showErrorText = error.error.message;
      },
      () => { this.displayLogin = false; }
    );
  }

  setInfoLoginUser(token: string, user: any) {
    this.storageService.addToken(token);
    this.storageService.addUserType(this.formControls.user_type.value);
    this.storageService.addUser(user)
    this.router.navigate(['profiles_roles']);
  }

}
