import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import { LoadingController, ToastController, NavController, ModalController } from '@ionic/angular';
import {catchError, finalize} from 'rxjs/operators';
import {throwError} from 'rxjs';

import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { IFolder } from '../../models/models';
import { ActivatedRoute, Router } from '@angular/router';
import { IsilJobsService } from '../../services/isil-jobs.service';

export interface Image {
  id: string;
  image: string;
}

export class Usuario {
  email: string;
  password: string;
  name:string='';
  document:string='';
  rsocial:string='';
  ruc:string='';
  type:number; //type: 1(alumno),2(empresa),3(externo)
  img:string='';
}

@Component({
  selector: 'app-folder-info',
  templateUrl: './folder-info.page.html',
  styleUrls: ['./folder-info.page.scss'],
})
export class FolderInfoPage implements OnInit {

  imageURI:any;
  imageFileName:any;

  public myPhoto: any;
  public error: string;
  //private loading: any;

  url: any;
  newImage: Image = {
    id: this.afs.createId(), image: ''
  }
  loading: boolean = false;

  folder: IFolder = {
    name:'',
    description:'',
    languages:[],
    frameworks:[],
    images:'',
    freelance:false,
    uid:'',
  };
  folderId = null;
  userId:string;

  usuario:Usuario=new Usuario();

  imgFolder:string = '';

  @Input() id;
  constructor(private readonly http: HttpClient,
              private route:ActivatedRoute,
              private router: Router,
              private nav: NavController,
              private isilJobsService:IsilJobsService,
              private readonly loadingCtrl: LoadingController,
              private readonly toastCtrl: ToastController,
              private modalCtrl:ModalController,
              private afs: AngularFirestore, private storage: AngularFireStorage) { }

  ngOnInit() {
    console.log('id', this.id);
    //this.folderId = this.route.snapshot.params['id'];
    this.userId = this.isilJobsService.currentUserFirebase();

    this.folderId = this.id;
    if(this.folderId){
      this.loadFolder();
    }
  }

  guardarFolder(form:NgForm){

  }

  async loadFolder(){
    const loading = await this.loadingCtrl.create({
      message: 'Cargando...'
    });
    await loading.present();
    this.isilJobsService.getFolder(this.folderId).subscribe(res => {
      loading.dismiss();
      this.folder = res;
    });
  }

  async saveFolder(){
     const loading = await this.loadingCtrl.create({
      message: 'Guardando...'
     });
     await loading.present();
     if(this.folderId){

       this.folder.uid = this.userId;
       this.folder.images = this.imgFolder;
       console.log("update" ,this.folder.images);
      //update
      this.isilJobsService.updateFolder(this.folder, this.folderId).then(()=>{
        loading.dismiss();
        this.modalCtrl.dismiss();

      })
     }else{
      //new
      this.folder.uid = this.userId;
      this.folder.images = this.imgFolder;
      console.log("new" , this.folder.images);
      this.isilJobsService.addFolder(this.folder).then(()=>{
        loading.dismiss();
        this.modalCtrl.dismiss();
        //this.uploadImage(event, this.folderId);

      })
     }
  }

  onRemove(folder:string){
    console.log(folder);
  }

  /*
  takePhoto() {
    const camera: any = navigator['camera'];
    camera.getPicture(imageData => {
      this.myPhoto = this.convertFileSrc(imageData);
      console.log(this.myPhoto);
      this.uploadPhoto(imageData);
    }, error => this.error = JSON.stringify(error), {
      quality: 100,
      destinationType: camera.DestinationType.FILE_URI,
      sourceType: camera.PictureSourceType.CAMERA,
      encodingType: camera.EncodingType.JPEG
    });
  }

  private convertFileSrc(url: string): string {
    if (!url) {
      console.log(url);
      return url;
    }
    if (url.startsWith('/')) {
      console.log('../assets/' + url);
      return window['WEBVIEW_SERVER_URL'] + '/_app_file_' + url;
    }
    if (url.startsWith('file://')) {
      console.log(window['WEBVIEW_SERVER_URL'] + url.replace('file://', '/_app_file_'));
      console.log('../assets/' + url);

      return window['WEBVIEW_SERVER_URL'] + url.replace('file://', '/_app_file_');
    }
    if (url.startsWith('content://')) {
      console.log(window['WEBVIEW_SERVER_URL'] + url.replace('content:/', '/_app_content_'));

      return window['WEBVIEW_SERVER_URL'] + url.replace('content:/', '/_app_content_');
    }
    return url;
  }

  selectPhoto(): void {
    const camera: any = navigator['camera'];
    camera.getPicture(imageData => {
      this.myPhoto = this.convertFileSrc(imageData);
      console.log(this.myPhoto);  
      this.uploadPhoto(imageData);
    }, error => this.error = JSON.stringify(error), {
      sourceType: camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: camera.DestinationType.FILE_URI,
      quality: 100,
      encodingType: camera.EncodingType.JPEG,
    });
  }

  private async uploadPhoto(imageFileUri: any) {
    this.error = null;
    this.loading = await this.loadingCtrl.create({
      message: 'Uploading...'
    });

    this.loading.present();

    window['resolveLocalFileSystemURL'](imageFileUri,
      entry => {
        entry['file'](file => this.readFile(file));
      });
  }

  private readFile(file: any) {
    const reader = new FileReader();
    reader.onloadend = () => {
      const formData = new FormData();
      const imgBlob = new Blob([reader.result], {type: file.type});
      formData.append('file', imgBlob, file.name);
      this.postData(formData);
    };
    reader.readAsArrayBuffer(file);
  }

  private postData(formData: FormData) {
    this.http.post<boolean>('http://192.168.1.6:8080/api/upload', formData)
      .pipe(
        catchError(e => this.handleError(e)),
        finalize(() => this.loading.dismiss())
      )
      .subscribe(ok => this.showToast(ok));
  }

  private async showToast(ok: boolean | {}) {
    if (ok === true) {
      const toast = await this.toastCtrl.create({
        message: 'Upload successful',
        duration: 3000,
        position: 'top'
      });
      toast.present();
    } else {
      const toast = await this.toastCtrl.create({
        message: 'Upload failed',
        duration: 3000,
        position: 'top'
      });
      toast.present();
    }
  }

  private handleError(error: any) {
    const errMsg = error.message ? error.message : error.toString();
    this.error = errMsg;
    return throwError(errMsg);
  }

  */

 uploadImage(event) {
  this.loading = true;
  if (event.target.files && event.target.files[0]) {
    var reader = new FileReader();
  
  reader.readAsDataURL(event.target.files[0]);
  // For Preview Of Image
  reader.onload = (e:any) => { // called once readAsDataURL is completed
    this.url = e.target.result;
    console.log('URL: ' , this.url);
  
    // For Uploading Image To Firebase
    const fileraw = event.target.files[0];
    console.log(fileraw)
    
    const filePath = '/folders/' + this.newImage.id + '/' + (Math.floor(1000 + Math.random() * 9000) + 1);

    //const filePath = '/folder/' + this.newImage.id + '/' +(Math.floor(1000 + Math.random() * 9000) + 1);
    //this.folder.images.push(filePath);
    //console.log(this.folder.images);
    
    const result = this.SaveImageRef(filePath, fileraw);
    const ref = result.ref;
    result.task.then(a => {
      ref.getDownloadURL().subscribe(a => {
        console.log(a);
        this.newImage.image = a;
        this.imgFolder = a;
        this.loading = false;
      });

      //this.afs.collection('Folder').doc(this.newImage.id).set(this.newImage);
    });
    }, error => {
      alert("Error");
    }

  }
}

SaveImageRef(filePath, file) {
  return {
    task: this.storage.upload(filePath, file)
    , ref: this.storage.ref(filePath)
  };
}

  regresar(){
    console.log('regresar..');
    this.modalCtrl.dismiss();
  }
}
