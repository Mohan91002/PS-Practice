import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http:HttpClient) { }

  apiurl='http://localhost:3000/user';

  getAll(){
    return this.http.get(this.apiurl)
  }

  getByCode(code: any){
    return this.http.get(this.apiurl + '/' + code);
  }

  proceedRegister(inputData: any){
    return this.http.post(this.apiurl, inputData)
  }

  updateUser(code: any, inputData:any){
    return this.http.put(this.apiurl + '/' + code, inputData);
  }

  isLoggedIn(){
    return sessionStorage.getItem('userName')!=null;
  }

  getUserRole(){
    return sessionStorage.getItem('userRole')!=null?sessionStorage.getItem('userRole')?.toString():'';
  }

  getAllRole(){
    return this.http.get('http://localhost:3000/role');
  }


}