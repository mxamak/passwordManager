import { Component } from '@angular/core';
import { PasswordManagerService } from '../../password-manager.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  isError:boolean = false;

  constructor(private passwordManagerService: PasswordManagerService, private router: Router) {

  }
  onSubmit(values: any){
    this.passwordManagerService.login(values.email, values.password)
    .then(()=>{
      console.log("Log In Successful");
      this.router.navigate(['site-list'])
    })
    .catch(err=>{
        this.isError=true;
    })

  }
}
