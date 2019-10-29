import { Component, OnInit, Input } from '@angular/core';
import { IsilJobsService } from 'src/app/services/isil-jobs.service';
import { Job } from 'src/app/models/models';
import { ModalController, LoadingController, ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { IPublication } from '../../models/models';

@Component({
  selector: 'app-jobs-info',
  templateUrl: './jobs-info.page.html',
  styleUrls: ['./jobs-info.page.scss'],
})
export class JobsInfoPage implements OnInit {

   job: IPublication = {
    name:'',
    description:'',
    requirements:'',
    benefits:'',
    type:'',
    uid:'',
    userName:'',
    userRSocial:'',
    userDocument:'',
    userRuc:'',
    imgUser:'',
  };

  jobId = null;

  @Input() id;
  constructor(private readonly http: HttpClient,
              private route:ActivatedRoute,
              private isilJobsService:IsilJobsService,
              private readonly loadingCtrl: LoadingController,
              private readonly toastCtrl: ToastController,
              private modalCtrl:ModalController,
              private afs: AngularFirestore, private storage: AngularFireStorage) { }

  ngOnInit() {
    console.log('id', this.id);
    //this.folderId = this.route.snapshot.params['id'];
    this.jobId = this.id;
    if(this.jobId){
      this.loadJob();
    }
    /*
    this.isilJobService.findByIdJob(this.id)
      .subscribe(resp => {
        console.log("findByIdJob", this.id);
        this.jobs = resp;
        //this.trabajos.push(resp);
        console.log("jobs-info.page" ,this.jobs);
      });
      */

  }

  async loadJob(){
    const loading = await this.loadingCtrl.create({
      message: 'Cargando...'
    });
    await loading.present();
    this.isilJobsService.getJob(this.jobId).subscribe(res => {
      loading.dismiss();
      this.job = res;
    });
  }

  regresar() {
    this.modalCtrl.dismiss();
  }
}
