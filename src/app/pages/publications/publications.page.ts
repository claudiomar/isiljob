import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, IonList } from '@ionic/angular';
import { IsilJobsService } from '../../services/isil-jobs.service';
import { PublicationInfoPage } from '../publication-info/publication-info.page';
import { IPublication } from '../../models/models';

@Component({
  selector: 'app-publications',
  templateUrl: './publications.page.html',
  styleUrls: ['./publications.page.scss'],
})
export class PublicationsPage implements OnInit {

  publications:IPublication[]; 
  uid:string;

  @ViewChild('lista', {static:true}) lista:IonList;
  constructor(private modalCtrl:ModalController, private isilJobService:IsilJobsService) { }

  ngOnInit() {
    console.log('Publicaciones..');
    this.uid = this.isilJobService.currentUserFirebase();

    this.isilJobService.getPublications().subscribe(res => {
      console.log('publications', res  );
      this.publications = res;
    });
  }

  async pubInfoModal(id:string){
    const modal = await this.modalCtrl.create({
      component: PublicationInfoPage ,
      componentProps:{
        id
      }
    });

    await modal.present();
  }

  async newpubInfoModal(){
    const modal = await this.modalCtrl.create({
      component: PublicationInfoPage ,
      componentProps:{
        
      }
    });

    await modal.present();
  }

  removePublication(id:string){
    this.isilJobService.removePublication(id);
    this.lista.closeSlidingItems();
  }

}
