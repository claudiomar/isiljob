import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthLoginService {

  private _user:User;
  private _token:string;

  constructor(private http:HttpClient) { }

  public get user():User{
    if(this._user != null){
      return this._user;
    }else if(this._user == null && sessionStorage.getItem('user') != null ){
      this._user = JSON.parse(sessionStorage.getItem('user')) as User;
      return this._user;
    }
    return new User;
  }

  public get token():string{
    if(this._token != null){
      return this._token;
    }else if(this._token == null && sessionStorage.getItem('token') != null ){
      this._token = JSON.parse(sessionStorage.getItem('token'));
      return this._token;
    }
    return null;
  }

  login(user:User):Observable<any>{

    const urlEndPoint = 'http://localhost:8080/oauth/token';
    const credenciales = btoa('isiljob' + ':' + '12345');
    const httpHeaders = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded',
                                        'Authorization':'Basic ' + credenciales});
    let params = new URLSearchParams();
    params.set('grant_type','password');
    params.set('username', user.username);
    params.set('password', user.password);

    return this.http.post<any>(urlEndPoint, params.toString(), {headers:httpHeaders});

  }

  saveUser(accessToken:string):void{
    let payload = this.getToken(accessToken);
    //let payload = JSON.parse(atob(accessToken.split(".")[1]));
    console.log(payload);
    this._user = new User();
    this._user.username = payload.user_name;
    console.log("this._user.username" , this._user.username);
    this._user.roles = payload.authorities;
    this._user.id_user = payload.id_user;
    this._user.name = payload.name;
    console.log("this._user.roles" , this._user.roles);

    sessionStorage.setItem('user', JSON.stringify(this._user));
  }

  saveToken(accessToken:string):void{
    this._token = accessToken;
    sessionStorage.setItem('token',accessToken);

  }

  getToken(accessToken:string):any{
    console.log("...getToken()");
    if(accessToken != null){
      //console.log(JSON.parse(atob(accessToken.split(".")[1])));
      return JSON.parse(atob(accessToken.split(".")[1]));
    }

    return null;
  }
}
