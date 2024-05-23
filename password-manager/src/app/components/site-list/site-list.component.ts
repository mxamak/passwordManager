import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PasswordManagerService } from '../../password-manager.service';
import { Observable } from 'rxjs';
import { CommonModule, NgFor } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-site-list',
  standalone: true,
  imports: [FormsModule, CommonModule, NgFor, RouterModule, NavbarComponent],
  templateUrl: './site-list.component.html',
  styleUrl: './site-list.component.css'
})
export class SiteListComponent {

  allSites !: Observable<Array<any>>;
  siteName!: string;
  siteUrl!: string;
  siteImgUrl !: string;
  id!: string;

  //making the form titles dynamic 
  formState: string = "Add a New"

  isSuccess: boolean = false;
  successMessage !: string


  constructor(private passwordManagerService: PasswordManagerService){
    this.loadSites();
  }

  showAlert(message: string){
    this.isSuccess = true;
    this.successMessage = message;
  }

  onSubmit(values:object){
    if(this.formState == "Add a New"){
      console.log(values);
    this.passwordManagerService.addSite(values)
    .then(()=> {
      this.showAlert('Data Saved Successfully');
    })
    .catch(err => {
      console.error("Error adding site: ", err)
    })
    }

    else if (this.formState == "Edit"){
      this.passwordManagerService.updateSite(this.id, values)
      .then(()=> {
        this.showAlert('Data updated Successfully');
      })
      .catch(err => {
        console.error("Error updating site: ", err)
      })
    }


    
  }

  loadSites(){
    this.allSites = this.passwordManagerService.loadSites()
  }

  editSite(siteName: string, siteUrl: string, siteImgUrl: string, id: string){
    this.siteName = siteName;
    this.siteUrl = siteUrl;
    this.siteImgUrl = siteImgUrl;
    this.id = id;
    this.formState ="Edit"
  }
  
  deleteSite(id: string){
    this.passwordManagerService.deleteSite(id)
   .then(()=> {
    this.showAlert('Site Deleted Successfully');
   })
   .catch(err => {
     console.error("Error deleting site: ", err)
   })
  }
}
