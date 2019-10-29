import { Component, OnInit, ViewChild } from '@angular/core';
import { Job, Area, IPublication } from '../../models/models';
import { IsilJobsService } from '../../services/isil-jobs.service';
import { IonSegment, ModalController } from '@ionic/angular';
import { AuthLoginService } from 'src/app/services/auth-login.service';
import { JobsInfoPage } from '../jobs-info/jobs-info.page';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.page.html',
  styleUrls: ['./jobs.page.scss'],
})
export class JobsPage implements OnInit {

  trabajos:Job;
  areas:Area;

  publicationsJobs:IPublication[]; 
  uid:string;


  areasList = [
    { name:"Area de Diseño", val: 1 , isChecked:false},
    { name:"Area de Software",val: 2 , isChecked:false},
    { name:"Area de Comunicación",val: 3 , isChecked:false},
    { name:"Area de Marketing",val: 4 , isChecked:false}

  ];

  @ViewChild(IonSegment,{static:true}) segment: IonSegment;
  constructor(private modalCtrl:ModalController, 
              private isilJobService:IsilJobsService,
              private authLoginService:AuthLoginService) { }

  ngOnInit() {
    console.log('Trabajos');

    //this.isilJobService.datosUserFirebase();
    /*
    this.isilJobService.listArea()
      .subscribe(resp=>{
        console.log('areas',resp);
        this.areas = resp;
      });

    this.isilJobService.listJobs()
      .subscribe(resp => {
        console.log('jobs',resp);
        this.trabajos = resp;
        //this.trabajos.push(resp);
        console.log(this.trabajos);
      });
      */

     this.isilJobService.getJobs().subscribe(res => {
      console.log('jobs', res  );
      this.publicationsJobs = res;
    });
  }

  ionViewDidLoad(){

  }

  segmento(value:number){
    console.log(value);
  }

  async jobInfoModal(id:string){
    const modal = await this.modalCtrl.create({
      component: JobsInfoPage ,
      componentProps:{
        id
      }
    });
    await modal.present();
  }

 

}
