import { afterNextRender, Component, DestroyRef, inject, viewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private form = viewChild.required<NgForm>('form')
  private destroyRef = inject(DestroyRef)

  
  
  constructor(){
    afterNextRender(() => {
      const savedItem = window.localStorage.getItem('saved-login-form')
      if(savedItem){
        const loadedFormData = JSON.parse(savedItem)
        const savedEmail = loadedFormData.email

        setTimeout(() => {
          this.form().controls['email'].setValue(savedEmail)
        }, 1)
      }
      
      const subscription = this.form().valueChanges?.pipe(debounceTime(500)).subscribe({
        next: (value) => window.localStorage.setItem('saved-login-form', JSON.stringify({email: value.email}))
      })
      this.destroyRef.onDestroy(() => subscription?.unsubscribe())
    })

  }

  onSubmit(formData: NgForm){
    if(formData.form.invalid) return;

    const enteredEmail = formData.form.value.email
    const enteredPassword = formData.form.value.password
    console.log(enteredEmail, enteredPassword)
  }
}
