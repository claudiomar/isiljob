import { Component, OnInit, Input } from '@angular/core';
import { Job } from '../../models/models';
import { ModalController } from '@ionic/angular';
import { IsilJobsService } from 'src/app/services/isil-jobs.service';
import { AuthLoginService } from 'src/app/services/auth-login.service';
import { JobsInfoPage } from 'src/app/pages/jobs-info/jobs-info.page';

@Component({
  selector: 'app-trabajos',
  templateUrl: './trabajos.component.html',
  styleUrls: ['./trabajos.component.scss'],
})
export class TrabajosComponent implements OnInit {

  @Input() trabajos:Job;
  @Input() empleos:Job;
  constructor( private modalCtrl:ModalController, private isilJobService:IsilJobsService,
    private authLoginService:AuthLoginService) { }

  ngOnInit() {}


  async infoJob(id_job:number){
    const modal = await this.modalCtrl.create({
      component: JobsInfoPage ,
      componentProps:{
        id: id_job
      }
    });

    await modal.present();
  }

  

}
