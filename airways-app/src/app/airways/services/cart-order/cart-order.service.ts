import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUserDataCopy } from 'src/app/shared/models/interfaces/user-response-interface';
import { IRecieveUserData } from 'src/app/shared/models/interfaces/user-response-interface';

@Injectable({
  providedIn: 'root',
})
export class CartOrderService {
  private readonly url = 'https://angular-final-task-server.onrender.com';
  constructor(private http: HttpClient) {}

  // register(user: IUserDataCopy) {
  //   return this.http.post<IUserDataCopy>(this.url + '/auth/register', user);
  // }
  // getUserById(id: string) {
  //   return this.http.get<IRecieveUserData>(this.url + id);
  // }
  // login(username:string, password:string){
  //   return this.http.post(this.url+'auth/login',{username,password})
  // }
}
