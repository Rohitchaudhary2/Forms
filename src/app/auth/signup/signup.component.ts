import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

function equalValues(control1: string, control2: string){
  return (control: AbstractControl) => {
    const val1 = control.get(control1)?.value
    const val2 = control.get(control2)?.value

    if(val1 === val2) return null

    return {
      'valuesNotEqual': true
    }
  }
}
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email]
    }),
    passwords: new FormGroup({
      password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6)]
    }),
    confirmPassword: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6)]
    }),
    }, {validators: [equalValues('password', 'confirmPassword')]}),
    
    firstName: new FormControl('', {validators: [Validators.required]}),
    lastName: new FormControl('', {validators: [Validators.required]}),
    address: new FormGroup({
      street: new FormControl('', {validators: [Validators.required]}),
      number: new FormControl('', {validators: [Validators.required]}),
      postalCode: new FormControl('', {validators: [Validators.required]}),
      city: new FormControl('', {validators: [Validators.required]}),
    }),
    role: new FormControl<
      'student' | 'teacher' | 'employee' | 'founder' | 'other'
    >('student', { validators: [Validators.required] } ),
    source: new FormArray([
      new FormControl(false),
      new FormControl(false),
      new FormControl(false)
    ]),
    agree: new FormControl(false, {validators: Validators.required})
  })

  get isValidEmail(){
    return (this.form.controls.email.touched && this.form.controls.email.dirty && this.form.controls.email.invalid)
  }

  get isValidPassword(){
    return (this.form.controls.passwords.controls.password.touched && this.form.controls.passwords.controls.password.dirty && this.form.controls.passwords.controls.password.invalid)
  }

  onSubmit(){
    if(this.form.invalid || !this.form.value.agree) {
      console.log('Invalid')
      return;
    }
    console.log(this.form.value)
    console.log(this.form.value.email)
    console.log(this.form.value.passwords?.password)
    this.form.reset()
    this.form.controls.role.setValue("student")
  }

  onReset() {
    this.form.reset()
  }
}
