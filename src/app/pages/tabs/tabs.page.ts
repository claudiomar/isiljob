import { Component, OnInit } from '@angular/core';
import { IsilJobsService } from '../../services/isil-jobs.service';
import { IUser } from 'src/app/models/models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  user: IUser = {
    email:'',
    password:'',
    name:'',
    rsocial:'',
    document:'',
    ruc:'',
    type:0,
    img:'',
  };
  uid:string;

  constructor(private isilJobsService:IsilJobsService,private router:Router) { }

  ngOnInit() {
    this.isilJobsService.datosUserFirebase();

    if(this.uid != ''){
      // this.uid.. USER DE SSESION STORAGE
      this.uid = sessionStorage.getItem('user');
      console.log("this.uid:" + this.uid);
      this.isilJobsService.getUser(this.uid).subscribe(res => {
        console.log('res' ,res);
        this.user = res;
      });
    }else{
      this.router.navigate(['login']);
    }
    /*
    this.uid = this.isilJobsService.currentUserFirebase();
    
    console.log('tabsUid' , this.uid );

    this.isilJobsService.getUser(this.uid).subscribe(res => {
      console.log('res' ,res);
      this.user = res;
    });
    */

  }
  

}
