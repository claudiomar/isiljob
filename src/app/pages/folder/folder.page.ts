import { Component, OnInit, ViewChild } from '@angular/core';
import { IonList, ModalController } from '@ionic/angular';
import { FolderInfoPage } from '../folder-info/folder-info.page';
import { IsilJobsService } from '../../services/isil-jobs.service';
import { Folder, IFolder } from '../../models/models';
import { AuthLoginService } from '../../services/auth-login.service';
import { NewFolderPage } from '../new-folder/new-folder.page';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {

  @ViewChild('lista', {static:true}) lista:IonList;
  data = Array(100);
  folders:IFolder[];
  uid:string = '';
  folderId = null;

 

  constructor(private modalCtrl:ModalController, private isilJobService:IsilJobsService,
              private authLoginService:AuthLoginService,
              private afs: AngularFirestore, 
              private storage: AngularFireStorage) { }

  ngOnInit() {

    this.uid = this.isilJobService.currentUserFirebase();

    /*
    console.log(this.authLoginService.user.username);

    this.isilJobService.listFolders('1')
      .subscribe(resp => {
        console.log('folders',resp);
        this.folders = resp;
        //this.trabajos.push(resp);
      });

      */

      this.isilJobService.getFolders().subscribe(res => {
        console.log('folders', res  );
        this.folders = res;
      });
  }

  eliminarFolder(id:string){
    this.isilJobService.removeFolder(id);
    this.lista.closeSlidingItems();
  }

  async folderModalInfo(id:string){
    const modal = await this.modalCtrl.create({
      component: FolderInfoPage ,
      componentProps:{
        id
      }
    });

    await modal.present();
  }

  async newFolderModal(){
    const modal = await this.modalCtrl.create({
      component: FolderInfoPage ,
      componentProps:{
        
      }
    });

    await modal.present();
  }


}
