import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSegment, LoadingController, ModalController } from '@ionic/angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { IsilJobsService } from '../../services/isil-jobs.service';
import { IUser, IEducation, IContact, IExperience } from '../../models/models';
import { EditarContactoPage } from '../editar-contacto/editar-contacto.page';
import { EditarEducacionPage } from '../editar-educacion/editar-educacion.page';
import { EditarExperienciaPage } from '../editar-experiencia/editar-experiencia.page';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  
  segment:string;

  user: IUser ={
    email: '',
    password: '',
    name:'',
    document:'',
    rsocial:'',
    ruc:'',
    type:0, //type: 1(alumno),2(empresa),3(externo)
    img:'',
   };

   education: IEducation = {
    id:'',
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

  experiencia: IExperience = {
    id:'',
    empresa:'',
    actividadempresa:'',
    puesto:'',
    nivelexperiencia:'',
    pais:'',
    areapuesto:'',
    descripcionresp:'',
    personascargo:''
  }
  
  uid:string;
  profileId = null;
  contactId = null;

  educationId = null;
  experienceId = null;

  //@ViewChild(IonSegment) segment:IonSegment;
  constructor(public fAuth: AngularFireAuth,
              private router:Router,
              private isilJobsService:IsilJobsService,
              private readonly loadingCtrl: LoadingController,
              private modalCtrl: ModalController,
              ){

    //this.uid = this.isilJobsService.currentUserFirebase();
    // this.uid -- usuario de sessionStorage
    this.uid = sessionStorage.getItem('user');
    this.isilJobsService.getUser(this.uid).subscribe(res=>{
      console.log('res ',res);
      this.user = res;
     });

    this.contactId = sessionStorage.getItem('user');
    this.isilJobsService.getContact(this.contactId).subscribe(res=>{
      console.log('res',res);
      this.contact = res;
    });

    this.educationId = sessionStorage.getItem('user');
    this.isilJobsService.getEducatiom(this.educationId).subscribe(res=>{
      console.log('res',res);
      this.education = res;
    });

    this.experienceId = sessionStorage.getItem('user');
    this.isilJobsService.getExperience(this.experienceId).subscribe(res=>{
      console.log('res',res);
      this.experiencia = res;
    });
}

  ngOnInit() {
    //ngOnInit PROFILE
    this.uid = sessionStorage.getItem('user');
    this.profileId = this.uid;
    if(this.profileId){
      this.loadFolder();
    }

    this.contactId = sessionStorage.getItem('user');
    if(this.contactId){
      this.loadContact();
    }

    this.educationId = sessionStorage.getItem('user');
    if(this.educationId){
      this.loadEducation();
    }

    this.experienceId = sessionStorage.getItem('user');
    if(this.experienceId){
      this.loadExperience();
    }

  }

  async loadFolder(){
    // loadFolder.. 
    const loading = await this.loadingCtrl.create({
      message: 'Cargando...'
    });
    await loading.present();
    this.isilJobsService.getUser(this.profileId).subscribe(res => {
      loading.dismiss();
      console.log(res);
      this.user = res;
    });
  }

  async loadContact(){
    // loadFolder.. 
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

  async loadEducation(){
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

  async loadExperience(){
    // loadFolder.. 
    const loading = await this.loadingCtrl.create({
      message: 'Cargando...'
    });
    await loading.present();
    this.isilJobsService.getExperience(this.experienceId).subscribe(res => {
      loading.dismiss();
      console.log(res);
      this.experiencia = res;
    });
  }

  ionViewWillEnter(){
    this.segment = "perfil";
  }

  segmentChanged(event:any){
    //console.log('Segment changed' , event);
    console.log(event.detail.value);
    this.segment = event.detail.value;
  }

  logout() {
    console.log("click")
    this.fAuth.auth.signOut();
    this.router.navigate(['login']);

  }

  editContacto(){
    console.log("editar Contacto");
  }

  async modalEditarContacto(id:string){
    const modal = await this.modalCtrl.create({
      component: EditarContactoPage ,
      componentProps:{
        id
      }
    });

    await modal.present();
  }

  async modalEditarEducacion(id:string){
    const modal = await this.modalCtrl.create({
      component: EditarEducacionPage ,
      componentProps:{
        id
      }
    });

    await modal.present();
  }

  async modalEditarExperiencia(id:string){
    const modal = await this.modalCtrl.create({
      component: EditarExperienciaPage ,
      componentProps:{
        id
      }
    });

    await modal.present();
  }

}
