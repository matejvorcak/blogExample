import { FormGroup, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Component, Inject, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { MatDialog ,MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from "../../services/auth.service";
import { LoggedUser } from 'src/app/classes/LoggedUser';
import { equalPassValidator } from "src/app/validators"
import { ConfirmPasswordEStateMatcher, SubmittedErrorMatcher} from "src/app/error-matchers";
import { ServerSideError } from 'src/app/errors';


@Component({
  selector: 'app-auth-dialog',
  templateUrl: 'auth-dialog.component.html'
})
export class AuthDialogComponet {

  constructor(public dialog: MatDialog) {  
  }

  openDialog(): void {
    const dialog = this.dialog.open( AuthFormsComponent, {
      width: '300px',
      position: {top: "20px"}
    });
  }


}


@Component({
  selector: 'auth-forms',
  template: `
    <dialog-login 
      (logged)="onLogged($event)"
      [isVisible]="isVisibleLoginForm" > 
    </dialog-login>

    <dialog-register
      (registered)="onRegister($event)"
      [isVisible]="isVisibleRegisterForm" > 
    </dialog-register>
    <p>{{infotext[0]}} <span (click)="toggleForms()" color="primary">{{infotext[1]}}</span></p>
  `,
})
export class AuthFormsComponent {
  isVisibleLoginForm : boolean = true;
  isVisibleRegisterForm: boolean = false;
  infotext : String[] = this.isVisibleRegisterForm ? ["Have an account?", "login"]: ["New here?","register"];

  constructor(
    public dialogRef: MatDialogRef<AuthFormsComponent>
  ) {}

  toggleForms():void {
    this.isVisibleLoginForm = !this.isVisibleLoginForm;
    this.isVisibleRegisterForm = !this.isVisibleRegisterForm;
    this.infotext = this.isVisibleRegisterForm ? ["Have an account?", "login"] : ["New here?", "register"];
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onLogged(isLogged: boolean) {
    this.dialogRef.close()
  }

  onRegister() {
    this.dialogRef.close()
  }

}

@Component({
  selector: 'dialog-login',
  templateUrl: 'dialog-login.html',
})
export class LoginDialogComponent implements OnInit {
  loginForm: FormGroup
  isLogged: boolean
  @Input("isVisible") isVisible: boolean;
  @Output() logged = new EventEmitter<boolean>();

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      'login': new FormControl('', Validators.required ),
      'password': new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ])
    })

  } 
  constructor(public authService: AuthService, public loggedUser: LoggedUser) {}

  async login(){
    this.loginForm.markAllAsTouched()
    
    if(!this.loginForm.valid)
      return

    try {
      let res = await this.authService.login(
        this.loginForm.get('login').value,
        this.loginForm.get('password').value
      )
      this.logged.emit(true)
    } catch ( err) {
      
      if(err instanceof ServerSideError){  
        let errors = err.errors
        Object.keys(errors).forEach(prop => {
          const formControl = this.loginForm.get(prop);
          if (formControl) {
            // activate the error message
            formControl.setErrors({
              serverError: errors[prop]
            });
          }

        });
      }
    }  
    

    
      
    
  }  
  
}

@Component({
  selector: "dialog-register",
  templateUrl: 'dialog-register.html',
})
export class RegisterDialogComponent implements OnInit {
  registerForm : FormGroup
  matcher = new SubmittedErrorMatcher()
  confirmPasswordMatcher = new ConfirmPasswordEStateMatcher()
  submitted: boolean = false
  @Input("isVisible") isVisible: boolean;
  @Output() registered = new EventEmitter<void>();

  ngOnInit(): void {

    this.registerForm = new FormGroup({
      'email': new FormControl('',[ 
        Validators.required,
        Validators.email
      ]),
      'username': new FormControl('', [
        Validators.required,
      ]),
      'password': new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ]),
      'confirm_password': new FormControl('', [equalPassValidator('password')])
    })

  } 
  constructor(public authService: AuthService, public loggedUser: LoggedUser) { 
    
  }

  async register() {
    this.submitted = true
    this.registerForm.controls.confirm_password.updateValueAndValidity()
    this.registerForm.markAllAsTouched()
    if(this.registerForm.valid){
      const res = await this.authService.register(
        this.registerForm.get('email').value,
        this.registerForm.get('username').value,
        this.registerForm.get('password').value,
      )
      if (res["status"]== "ERROR") {
        let errors = res['errors']
        Object.keys(errors).forEach(prop => {
          const formControl = this.registerForm.get(prop);
          if (formControl) {
            // activate the error message
            formControl.setErrors({
              serverError: errors[prop]
            });
          }
          
        });
        
      } else {
        //login new user
        let res = await this.authService.login(
          this.registerForm.get('username').value,
          this.registerForm.get('password').value,
        )
        this.registered.emit()
      }
    }
  }

} 


