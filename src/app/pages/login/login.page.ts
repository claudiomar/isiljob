import { Component, OnInit } from '@angular/core';
import { User, IUser } from '../../models/models';
import { NgForm } from '@angular/forms';
import { AuthLoginService } from '../../services/auth-login.service';
import { Router } from '@angular/router';
import { ToastController, LoadingController } from '@ionic/angular';
import { AngularFireAuth } from 'angularfire2/auth';

export class Usuario {
  email: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user:User;
  loading:any;

  email:string;
  token:string;

  usuario:Usuario=new Usuario();

  constructor(private authLoginService:AuthLoginService,
              private router:Router,
              private toast:ToastController,
              private loadingCtrl:LoadingController,
              public fAuth: AngularFireAuth) {
    this.user = new User();

    this.fAuth.auth;

    this.fAuth.authState.subscribe((usuario: firebase.User) => {
      if(usuario){
        console.log('The user is logged in!');
      }else{
        console.log('The user is not logged in');
      }
      return;
    });


   }

  ngOnInit() {

  }

  async loginFirebase(){
    try{  
      var r = await this.fAuth.auth.signInWithEmailAndPassword(
        this.usuario.email,
        this.usuario.password
      );
      console.log('r' , r);
      if(r){

        /* setteamos los valores de id y token en el sessionStorage */
        sessionStorage.setItem('user',r.user.uid);
        sessionStorage.setItem('token',r.user.refreshToken);

        console.log('loginFirebase.. Login');
        
      }
    
      /**** router *****/
      this.router.navigate(['tabs/profile']);

    }catch(err){
      console.log(err);
    }
  }

  recoverFirebase(){

    this.fAuth.auth.sendPasswordResetEmail(this.usuario.email)
      .then(data => {
        console.log(data);
        this.presentToast('Password reset email sent');
        this.router.navigate(['login']);
      })
      .catch(err =>{
        console.log(`failed ${err}`);
      })
  }


  login(form:NgForm):void{
    console.log(form.value.username);
    console.log(form.value.password);
    console.log(this.user);

    this.user.username = form.value.username;
    this.user.password = form.value.password;

    if(this.user.username == null || this.user.password == null ){
      console.log("Usuario no identificado");
    }

    this.authLoginService.login(this.user).subscribe(response=>{
      console.log(response);

      this.authLoginService.saveUser(response.access_token);
      this.authLoginService.saveToken(response.access_token);

      let user = this.authLoginService.user;
      console.log("username", user.username)

      //this.presentToast(user.username);
      this.presentLoading('Espere');
      setTimeout(()=>{
        this.loading.dismiss();
        this.router.navigate(['tabs/profile']);
      },1500);

    })
  }

  async presentLoading(message:string){
     this.loading = await this.loadingCtrl.create({
      message
    });
    return  this.loading.present();
  }

  async presentToast(user:string) {
    const toast = await this.toast.create({
      message: user,
      //duration: 2000
    });
    toast.present();
  }

}
