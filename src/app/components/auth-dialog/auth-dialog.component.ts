import { ErrorStateMatcher } from '@angular/material/core';
import { FormGroup, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Component, Inject, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { MatDialog ,MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from "../../services/auth.service";
import { LoggedUser } from 'src/app/classes/LoggedUser';


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

  isDisabled(): boolean {
    return this.loginForm.status == "INVALID" 
  }

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
    let res = await this.authService.login(
      this.loginForm.get('login').value, 
      this.loginForm.get('password').value
    )

    if(res["errors"]){
      
    } else {
      this.logged.emit(true)
    }
  }  

}

@Component({
  selector: "dialog-register",
  templateUrl: 'dialog-register.html',
})
export class RegisterDialogComponent implements OnInit {
  registerForm : FormGroup
  matcher = new MyErrorStateMatcher();
  @Input("isVisible") isVisible: boolean;
  @Output() registered = new EventEmitter<void>();

  isDisabled() : boolean {
    return this.registerForm.status == "INVALID"
  }

  
  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    let pass = group.get('password').value;
    let confirmPass = group.get('confirm_password').value;
    return pass === confirmPass ? null : { notSame: true }
  }

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
      'confirm_password': new FormControl('')
    }, {validators: this.checkPasswords})

  } 
  constructor(public authService: AuthService, public loggedUser: LoggedUser) { 

  }

  async register() {
    const res = await this.authService.register(
      this.registerForm.get('email').value,
      this.registerForm.get('username').value,
      this.registerForm.get('password').value,
    )
    if (res["errors"]) {

    } else {
      this.registered.emit()
    }
  }

}


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidCtrl || invalidParent);
  }
}