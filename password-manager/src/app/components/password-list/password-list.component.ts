import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PasswordManagerService } from '../../password-manager.service';
import { Observable } from 'rxjs';
import { CommonModule, NgFor } from '@angular/common';

import {AES, enc} from 'crypto-js';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-password-list',
  standalone: true,
  imports: [FormsModule, CommonModule, NgFor, NavbarComponent],
  templateUrl: './password-list.component.html',
  styleUrl: './password-list.component.css'
})
export class PasswordListComponent {

  siteId !: string;
  siteName!: string;
  siteUrl!: string;
  siteImgUrl !: string;

  passwordList !: Array<any>;

  email !:string;
  username !:string;
  password !:string;
  passwordId!:string;

  formState: string = "Add New"

  isSuccess: boolean = false;
  successMessage !: string

  constructor(private route: ActivatedRoute, private PasswordManagerService: PasswordManagerService) { 
    this.route.queryParams.subscribe((val:any)=>{
        this.siteId = val.id
        this.siteName = val.siteName
        this.siteUrl = val.siteUrl
        this.siteImgUrl = val.siteImgUrl
    });
    this.loadPassword();
  }

  showAlert(message: string){
    this.isSuccess = true;
    this.successMessage = message;
  }
  //form reset after edit completed, call it in success state of the form 
  resetform(){
    this.email='';
    this.username='';
    this.password='';
    this.formState = "Add New"
    this.passwordId = '';
  }

  onSubmit(values: any){
    const encryptedPassword = this.encryptPassword(values.password);
    values.password = encryptedPassword;

    if(this.formState == 'Add New'){
      this.PasswordManagerService.addPassword(values, this.siteId)
      .then(()=>{
        this.showAlert('Data Added Successfully!');
        this.resetform();
      })
      .catch ((err)=>{
        console.log("Error saving password: ", err);
      })
    }

    else if(this.formState=='Edit'){
      this.PasswordManagerService.updatePassword(this.siteId, this.passwordId, values)
      .then(()=>{
        this.showAlert('Data Updated Successfully!');
        this.resetform();
      })
      .catch ((err)=>{
        console.log("Error updating password: ", err);
      })
    }

    
  } 

  loadPassword(){
    this.PasswordManagerService.loadPassword(this.siteId).subscribe(val=> {
      this.passwordList = val;

    })

  }
  editPassword(email:string, username:string, password:string, passwordId:string){
    this.email = email;
    this.username = username;
    this.password =  password;
    this.passwordId =  passwordId;
    this.formState = "Edit"
  }

  deletePassword(passwordId:string){
    this.PasswordManagerService.deletePassword(this.siteId, passwordId)
    .then(()=>{
      this.showAlert('Data Deleted Successfully!');
    })
    .catch ((err)=>{
      console.log("Error deleting password: ", err);
    })
  }

  encryptPassword(password: string){
    const secretKey = 'KLx1k6rmtZwwuNhbqg4iFDJryU8YbYXmnDVBP8x0T0McyUP/oXc+Q6dWBgtevfyF';
    const ecryptedPassword = AES.encrypt(password, secretKey).toString();
    return ecryptedPassword
  }

  decryptPassword(password: string){
    const secretKey = 'KLx1k6rmtZwwuNhbqg4iFDJryU8YbYXmnDVBP8x0T0McyUP/oXc+Q6dWBgtevfyF';
    const decPassword = AES.decrypt(password, secretKey).toString(enc.Utf8);
    return decPassword
  }

  onDecrypt(password: string, index: number){
    const decryptPassword = this.decryptPassword(password);
    this.passwordList[index].password = decryptPassword;
  }
}