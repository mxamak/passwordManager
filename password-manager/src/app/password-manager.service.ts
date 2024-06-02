import { Injectable } from '@angular/core';
import firebase from 'firebase/app';

import { Firestore, collection, addDoc, collectionData, doc, updateDoc, deleteDoc, setDoc, query, where } from '@angular/fire/firestore';
import {Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from '@angular/fire/auth';
import { Observable, switchMap } from 'rxjs';
import 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class PasswordManagerService {
  // private db = firebase.firestore();


  constructor(private firestore: Firestore, private auth: Auth) { }

  // addSite(data: object){
  //   const dbInstance = collection(this.firestore, 'sites');
  //   return addDoc(dbInstance, data);
  // }
  //current working addSite
  addSite(data: object) {
    const userId = this.auth.currentUser?.uid;
    if (userId) {
      console.log('inside the if');
      const dbInstance = collection(this.firestore, 'sites');
      return addDoc(dbInstance, { ...data, userId });
      
    }
    else{
      return Promise.reject('User not authenticated');
    }
  }

  //merge attempt of addSite
  
  

  // loadSites(){
  //   const dbInstance = collection(this.firestore, 'sites');
  //   return collectionData(dbInstance, {idField: 'id'})
  // }
  loadSites() {
    const userId = this.auth.currentUser?.uid;
    if (userId) {
      const dbInstance = collection(this.firestore, 'sites');
      const q = query(dbInstance, where("userId", "==", userId));
      return collectionData(q, { idField: 'id' });
    }
    return new Observable<any[]>();
  }
  


  updateSite(id: string, data: object){
    const docInstance = doc(this.firestore, 'sites', id);
    return updateDoc(docInstance, data);

  }

  deleteSite(id: string){
    const docInstance = doc(this.firestore, 'sites', id);
    return deleteDoc(docInstance);
  }

  //password queries
  // addPassword(data: object, siteId: string){
  //   const dbInstance = collection(this.firestore, `sites/${siteId}/passwords`);
  //   return addDoc(dbInstance, data);
  // }
  addPassword(data: object, siteId: string) {
    const userId = this.auth.currentUser?.uid;
    if (userId) {
      const dbInstance = collection(this.firestore, `sites/${siteId}/passwords`);
      return addDoc(dbInstance, { ...data, userId });
    } else {
      return Promise.reject('User not authenticated');
    }
  }

  loadPassword(siteId: string){
    const dbInstance = collection(this.firestore, `sites/${siteId}/passwords`);
    return collectionData(dbInstance, {idField: 'id'})
  }
  
  updatePassword(siteId:string, passwordId:string, data:object){
    const docInstance = doc(this.firestore, `sites/${siteId}/passwords`, passwordId);
    return updateDoc(docInstance, data);
  }

  deletePassword(siteId:string, passwordId:string){
    const docInstance = doc(this.firestore, `sites/${siteId}/passwords`, passwordId);
    return deleteDoc(docInstance);
  }
  // login
  login(email:string, password:string){
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  // Register
  register(email: string, password: string, name: string) {
    return createUserWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        // Here you can also add user details to Firestore or other services
        return user;
      });
  }

  submitContactForm(formData: any) {
    const contactsCollection = collection(this.firestore, `contacts`);
    return addDoc(contactsCollection, formData);
  }

  // addPassword(data: object, siteId: string) {
  //   const userId = this.auth.currentUser?.uid;
  //   if (userId) {
  //     const dbInstance = collection(this.firestore, `sites/${siteId}/passwords`);
  //     return addDoc(dbInstance, { ...data, userId });
  //   } else {
  //     return Promise.reject('User not authenticated');
  //   }
  // }

  // addSite(data: object) {
  //   const userId = this.auth.currentUser?.uid;
  //   if (userId) {
  //     const dbInstance = collection(this.firestore, 'sites');
  //     return addDoc(dbInstance, { ...data, userId });
  //   }
  //   else{
  //     return Promise.reject('User not authenticated');
  //   }
  // }
  // addSiteAndPassword(siteName: string, email: string, username: string, password: string): Observable<any> {
  //   const site = { siteName: siteName };
  //   return this.addSite(site).pipe(
  //     switchMap(response => {
  //       const siteId = response.id; // Assuming the response contains the site ID
  //       const passwordData = {
  //         siteId: siteId,
  //         email: email,
  //         username: username,
  //         password: password
  //       };
  //       return this.addPassword(passwordData);
  //     })
  //   );
  // }
}
