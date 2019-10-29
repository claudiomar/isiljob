import { Component, OnInit } from '@angular/core';
import { IsilJobsService } from '../../services/isil-jobs.service';
import { ModalController, LoadingController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';

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
  selector: 'app-register-user',
  templateUrl: './register-user.page.html',
  styleUrls: ['./register-user.page.scss'],
})
export class RegisterUserPage implements OnInit {

  email: string;
  password: string;

  usuario:Usuario=new Usuario();
  uid:string='';

  
  typesUsers = [
    { name:"Alumno", val: 1 , isChecked:false},
    { name:"Empresa",val: 2 , isChecked:false},
    { name:"Externo",val: 3 , isChecked:false}
  ];

  url: any;
  loading: boolean = false;

  newImage: Image = {
    id: this.afs.createId(), 
    image: ''
  }
  constructor(private isilJobsService:IsilJobsService,
              private router:Router,
              private modalCtrl:ModalController,
              private readonly loadingCtrl: LoadingController,
              private afs: AngularFirestore, 
              private storage: AngularFireStorage) { }

  ngOnInit() {
    this.uid = this.isilJobsService.currentUserFirebase();
  }

  registerUserFirebase(){
    console.log(this.usuario.img);

    this.isilJobsService.registerUserFirebase(
      this.usuario.email, this.usuario.password, 
      this.usuario.name, this.usuario.document, 
      this.usuario.type,
      this.usuario.rsocial, this.usuario.ruc,
      this.usuario.img).then( auth =>{
      //console.log(auth);
      this.router.navigate(['login']);
      
    }).catch(err=> console.log(err))
  }

  checkValue(event){ 
    //console.log(event.detail.value)
    this.usuario.name = '';
    this.usuario.document = '';
    this.usuario.rsocial = '';
    this.usuario.ruc = '';

    this.usuario.type = event.detail.value.val;
  }

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
      
      const filePath = '/users/' + this.newImage.id + '/' + (Math.floor(1000 + Math.random() * 9000) + 1);

      //const filePath = '/folder/' + this.newImage.id + '/' +(Math.floor(1000 + Math.random() * 9000) + 1);
      //this.folder.images.push(filePath);
      //console.log(this.folder.images);
      
      const result = this.SaveImageRef(filePath, fileraw);
      const ref = result.ref;
      result.task.then(a => {
        ref.getDownloadURL().subscribe(a => {
          console.log(a);
          this.newImage.image = a;
          this.usuario.img = a;
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


}
