import { Component, Inject, Input } from '@angular/core';
import { MatDialog ,MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-auth-dialog',
  templateUrl: 'auth-dialog.component.html'
})
export class AuthDialogComponet {

  animal: string;
  name: string;

  constructor(public dialog: MatDialog) {  
  }

  openDialog(): void {
    const dialogRef = this.dialog.open( AuthFormsComponent, {
      width: '250px',
      position: {top: "20px"},
      data: { name: this.name, animal: this.animal }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.animal = result;
    });
  }

}


@Component({
  selector: 'auth-forms',
  template: `
    <dialog-login 
      [isVisible]="isVisibleLoginForm" > 
    </dialog-login>

    <dialog-register
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
    public dialogRef: MatDialogRef<AuthFormsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  toggleForms():void {
    this.isVisibleLoginForm = !this.isVisibleLoginForm;
    this.isVisibleRegisterForm = !this.isVisibleRegisterForm;
    this.infotext = this.isVisibleRegisterForm ? ["Have an account?", "login"] : ["New here?", "register"];
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}



@Component({
  selector: 'dialog-login',
  templateUrl: 'dialog-login.html',
})
export class LoginDialogComponent {
  @Input("isVisible") isVisible: boolean;
  
}

@Component({
  selector: "dialog-register",
  templateUrl: 'dialog-register.html',
})
export class RegisterDialogComponent {
  @Input("isVisible") isVisible: boolean;

}