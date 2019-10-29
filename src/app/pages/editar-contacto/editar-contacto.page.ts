import { Component, OnInit, Input } from '@angular/core';
import { ModalController, LoadingController } from '@ionic/angular';
import { IsilJobsService } from '../../services/isil-jobs.service';
import { IProfile, IPublication, IContact, IEducation } from '../../models/models';

@Component({
  selector: 'app-editar-contacto',
  templateUrl: './editar-contacto.page.html',
  styleUrls: ['./editar-contacto.page.scss'],
})
export class EditarContactoPage implements OnInit {

  profileId = null;
  contactId = null;
  educationId= null;
  uid:string;

  education: IEducation = {
    tipoestudio:'',
    estado:'',
    titulo:'',
    area:'',
    institucion:'',
    uid:'',
  };

  contact: IContact = {
    telcelular:'',
    telfijo:'',
    email:'',
    calle:'',
    uid:'',
  };


  @Input() id;
  constructor(private modalCtrl:ModalController,
              private isilJobsService:IsilJobsService,
              private readonly loadingCtrl: LoadingController) { }

  ngOnInit() {

    this.uid = sessionStorage.getItem('user');
    console.log(this.id);

    
    this.contactId = sessionStorage.getItem('user');
    console.log(this.contactId);
    if(this.contactId){
      this.loadFolderContact();
    }

    this.educationId = sessionStorage.getItem('user');
    console.log(this.educationId);
    if(this.educationId){
      this.loadFolderEducation();
    }

    /*
    this.isilJobService.getJobs().subscribe(res => {
      console.log('jobs', res  );
      this.publicationsJobs = res;
    });
    */

  }

  regresar() {
    this.modalCtrl.dismiss();
  }

  async loadFolderContact(){
    console.log("loadFolder");
    console.log("contactId" , this.contactId);
    const loading = await this.loadingCtrl.create({
      message: 'Cargando...'
    });
    await loading.present();
    this.isilJobsService.getContact(this.contactId).subscribe(res => {
      loading.dismiss();
      console.log(res);
      this.contact = res;
    });
  }

  async loadFolderEducation(){
    // loadFolder.. 
    const loading = await this.loadingCtrl.create({
      message: 'Cargando...'
    });
    await loading.present();
    this.isilJobsService.getEducatiom(this.educationId).subscribe(res => {
      loading.dismiss();
      console.log(res);
      this.education = res;
    });
  }


  async guardarContacto(){
    console.log("guardar..");

    const loading = await this.loadingCtrl.create({
      message: 'Guardando...'
     });
     await loading.present();
     if(this.contactId){
       console.log(this.contactId);
      //update
      //this.uid = this.isilJobsService.currentUserFirebase();
      //this.uid = sessionStorage.getItem('user');
 
      //this.publication.uid = this.uid ;
 
      this.isilJobsService.updateContact(this.contact, this.contactId).then(()=>{
      
        loading.dismiss();
        this.modalCtrl.dismiss();
  
       })
     }else{
      //new
      
      //this.uid = this.isilJobsService.currentUserFirebase();
      this.uid = sessionStorage.getItem('user');
      //console.log('this.user ' ,this.user);
      //this.publication.imgUser = this.user.img;
      //console.log(this.publication.imgUser);
      //this.publication.uid = this.uid ;
      //this.isilJobsService.addProfile(this.pro)
      this.contact.uid = sessionStorage.getItem('user');
      this.isilJobsService.addContact(this.contact).then(()=>{
       loading.dismiss();
       this.modalCtrl.dismiss();
      })
     }
  }

  async savePublication(){
    const loading = await this.loadingCtrl.create({
     message: 'Guardando...'
    });
    await loading.present();
    if(this.uid){
     //update
     //this.uid = this.isilJobsService.currentUserFirebase();
     //this.uid = sessionStorage.getItem('user');

     //this.publication.uid = this.uid ;

     this.isilJobsService.updateContact(this.contact, this.contactId).then(()=>{
      
      loading.dismiss();
      this.modalCtrl.dismiss();

     })
    }else{
     //new
     
     //this.uid = this.isilJobsService.currentUserFirebase();
     //console.log('this.user ' ,this.user);
     //this.publication.imgUser = this.user.img;
     //console.log(this.publication.imgUser);
     //this.publication.uid = this.uid ;
     //this.isilJobsService.addProfile(this.pro)
     this.contact.uid = sessionStorage.getItem('user');
     this.isilJobsService.addContact(this.contact).then(()=>{
      loading.dismiss();
      this.modalCtrl.dismiss();
     })
    }
  }

}
