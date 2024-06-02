import { Component } from '@angular/core';
import { PasswordManagerService } from '../../password-manager.service';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule, NavigationExtras } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  formData = {
    name: '',
    email: '',
    message: ''
  };

  isError: boolean = false;
  isLogin: boolean = true;
  showForm: boolean = false;

  constructor(private passwordManagerService: PasswordManagerService, private router: Router) { }

  onSubmit(values: any) {
    if (this.isLogin) {
      this.passwordManagerService.login(values.email, values.password)
        .then(() => {
          console.log("Log In Successful");
          this.router.navigate(['site-list']);
        })
        .catch(err => {
          this.isError = true;
        });
    } else {
      this.passwordManagerService.register(values.email, values.password, values.name)
        .then(() => {
          console.log("Registration Successful");
          const navigationExtras: NavigationExtras = {
            state: { userName: values.name }
          };
          this.router.navigate(['site-list'], navigationExtras);
        })
        .catch(err => {
          this.isError = true;
        });
    }
  }

  toggleForm() {
    this.isLogin = !this.isLogin;
  }
  toggleForm2(){
    this.showForm = !this.showForm;
  }
  // uponSubmit() {
  //   this.passwordManagerService.submitContactForm(this.formData).then(() => {
  //     console.log('Form submitted successfully!');
  //     // Optionally, reset the form or show a success message
  //     this.formData = { name: '', email: '', message: '' };
  //   }).catch(error => {
  //     console.error('Error submitting form:', error);
  //   });
  // }

  // uponSubmit(contactForm: NgForm): void {
  //   this.passwordManagerService.submitContactForm(this.formData).then(() => {
  //     console.log('Form submitted successfully!');
  //     // Reset form data
  //     this.formData = { name: '', email: '', message: '' };
  //     // Reset form controls
  //     contactForm.resetForm();
  //   }).catch(error => {
  //     console.error('Error submitting form:', error);
  //   });
  // }


  uponSubmit(contactForm: NgForm): void {
    this.passwordManagerService.submitContactForm(this.formData).then(() => {
      console.log('Form submitted successfully!');
      // Reset form data
      this.formData = { name: '', email: '', message: '' };
      // Reset form controls
      contactForm.resetForm();
      // Show success popup
      Swal.fire({
        title: 'Success!',
        text: 'Your message has been sent successfully.',
        icon: 'success',
        confirmButtonText: 'OK'
      });
    }).catch(error => {
      console.error('Error submitting form:', error);
      // Show error popup
      Swal.fire({
        title: 'Error!',
        text: 'There was an error submitting your message. Please try again later.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    });
  }
}
