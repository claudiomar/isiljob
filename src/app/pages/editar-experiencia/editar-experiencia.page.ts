import { Component, OnInit, Input } from '@angular/core';
import { ModalController, LoadingController } from '@ionic/angular';
import { IExperience } from '../../models/models';
import { IsilJobsService } from '../../services/isil-jobs.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-editar-experiencia',
  templateUrl: './editar-experiencia.page.html',
  styleUrls: ['./editar-experiencia.page.scss'],
})
export class EditarExperienciaPage implements OnInit {

  experienciaId=null;
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

  arrActEmpresa = [
    { name:"Agro-Industrial", val: 1 , isChecked:false},
    { name:"Agropecuaria",val: 2 , isChecked:false},
    { name:"Alimenticia",val: 3 , isChecked:false},
    { name:"Arquitectura",val: 4 , isChecked:false},
    { name:"Artesanal",val: 5, isChecked:false},
    { name:"Automotriz",val: 6 , isChecked:false},
    { name:"Aérea",val: 7 , isChecked:false},
    { name:"Banca/Financiera",val: 8 , isChecked:false},
    { name:"Biotecnologíca",val: 9 , isChecked:false},
    { name:"Comercio",val: 10 , isChecked:false},
    { name:"Comercio exterior",val: 11 , isChecked:false},
    { name:"Comunicaciones",val: 12 , isChecked:false},
    { name:"Construcción",val: 13 , isChecked:false},
    { name:"Consultoría",val: 14 , isChecked:false},
    { name:"Consumo masivo",val: 15 , isChecked:false},
    { name:"Correo",val: 16, isChecked:false},
    { name:"Defensa",val: 17 , isChecked:false},
    { name:"Diseño",val: 18 , isChecked:false},
    { name:"Editorial",val: 19 , isChecked:false},
    { name:"Educación",val: 20 , isChecked:false},
    { name:"Energía",val: 21 , isChecked:false},
    { name:"Entretenimiento",val: 22 , isChecked:false},
    { name:"Farmacéutica",val: 23 , isChecked:false},
    { name:"Ferroviaria",val: 24 , isChecked:false},
    { name:"Financiera",val: 25 , isChecked:false},
    { name:"Forestal",val: 26, isChecked:false},
    { name:"Ganaderia",val: 27 , isChecked:false},
    { name:"Gastronomía",val: 28 , isChecked:false},
    { name:"Gobierno",val: 29 , isChecked:false},
    { name:"Higiene y Perfumeria",val: 30 , isChecked:false},
    { name:"Holding",val: 31 , isChecked:false},
    { name:"Hotelería",val: 32 , isChecked:false},
    { name:"Imprenta",val: 33 , isChecked:false},
    { name:"Información e investigación",val: 34 , isChecked:false},
    { name:"Informática / Tecnología",val: 35 , isChecked:false},
    { name:"Inmobiliaria",val: 36 , isChecked:false},
    { name:"Internet",val: 37 , isChecked:false},
    { name:"Jurídica",val: 38 , isChecked:false},
    { name:"Laboratorio",val: 39 , isChecked:false},
    { name:"Manufactura",val: 40 , isChecked:false},
    { name:"Medios",val: 41 , isChecked:false},
    { name:"Minería/Petróleo/Gas",val: 42 , isChecked:false},
    { name:"ONGs",val: 43 , isChecked:false},
    { name:"Otra",val: 44 , isChecked:false},
    { name:"Papelera",val: 45 , isChecked:false},
    { name:"Pesca",val: 46 , isChecked:false},
    { name:"Petroquímica",val: 47 , isChecked:false},
    { name:"Plásticos",val: 48 , isChecked:false},
    { name:"Publicidad/Marketing/RRPP",val: 49 , isChecked:false},
    { name:"Química",val: 50 , isChecked:false},
    { name:"Retail",val: 51 , isChecked:false},
    { name:"Salud",val: 52, isChecked:false},
    { name:"Sector público",val: 53, isChecked:false},
    { name:"Seguros",val: 54, isChecked:false},
    { name:"Servicios",val: 55, isChecked:false},
    { name:"Siderurgia",val: 56, isChecked:false},
    { name:"Supermercado / Hipermercado",val: 57, isChecked:false},
    { name:"Tabacalera",val: 58, isChecked:false},
    { name:"Telecomunicaciones",val: 59, isChecked:false},
    { name:"Textil",val: 60, isChecked:false},
    { name:"Transportadora",val: 61, isChecked:false},
    { name:"Transporte",val: 62, isChecked:false},
    { name:"Turismo",val: 63, isChecked:false}
  ];

  arrNivelExpe = [
    { name:"Training",val: 1, isChecked:false},
    { name:"Junior",val: 2, isChecked:false},
    { name:"SemiSenior",val: 3, isChecked:false},
    { name:"Senior",val: 4, isChecked:false}
  ]

  arrAreaPuesto = [
    { name:"Abastecimiento y Logística",val: 1, isChecked:false},
    { name:"Administración, Contabilidad y Finanzas",val: 2, isChecked:false},
    { name:"Aduana y Comercio Exterior",val: 3, isChecked:false},
    { name:"Atención al Cliente, Call Center y Telemarketing",val: 4, isChecked:false},
    { name:"Comercial, Ventas y Negocios",val: 5, isChecked:false},
    { name:"Comunicación, Relaciones Institucionales y Públicas",val: 6, isChecked:false},
    { name:"Diseño",val: 7, isChecked:false},
    { name:"Educación, Docencia e Investigación",val: 8, isChecked:false},
    { name:"Enfermería",val: 9, isChecked:false},
    { name:"Gastronomía y Turismo",val: 10, isChecked:false},
    { name:"Gerencia y Dirección General",val: 11, isChecked:false},
    { name:"Ingeniería Civil y Construcción",val: 12, isChecked:false},
    { name:"Ingenierías",val: 13, isChecked:false},
    { name:"Legales",val: 14, isChecked:false},
    { name:"Marketing y Publicidad",val: 15, isChecked:false},
    { name:"Minería, Petróleo y Gas",val: 16, isChecked:false},
    { name:"Oficios y Otros",val: 17, isChecked:false},
    { name:"Producción y Manufactura",val: 18, isChecked:false},
    { name:"Recursos Humanos y Capacitación",val: 19, isChecked:false},
    { name:"Salud, Medicina y Farmacia",val: 20, isChecked:false},
    { name:"Secretarias y Recepción",val: 21, isChecked:false},
    { name:"Seguros",val: 22, isChecked:false},
    { name:"Sociología / Trabajo Social",val: 23, isChecked:false},
    { name:"Tecnología, Sistemas y Telecomunicaciones",val: 24, isChecked:false},
  ]

  @Input() id;
  constructor(private modalCtrl:ModalController,
    private isilJobsService:IsilJobsService,
    private readonly loadingCtrl: LoadingController,
    private afs:AngularFirestore) { }

  ngOnInit() {

    this.experienciaId = sessionStorage.getItem('user');
    console.log(this.experienciaId);
    if(this.experienciaId){
      this.loadFolderExperience();
    }
  }

  async loadFolderExperience(){
    // loadFolder.. 
    const loading = await this.loadingCtrl.create({
      message: 'Cargando...'
    });
    await loading.present();
    this.isilJobsService.getExperience(this.experienciaId).subscribe(res => {
      loading.dismiss();
      console.log(res);
      this.experiencia = res;
    });
  }

  async guardarExperiencia(){

    console.log("guardar..");

    const loading = await this.loadingCtrl.create({
      message: 'Guardando...'
     });
     await loading.present();
     if(this.experienciaId){
       console.log(this.experienciaId);
      //update
      //this.uid = this.isilJobsService.currentUserFirebase();
      //this.uid = sessionStorage.getItem('user');
 
      //this.publication.uid = this.uid ;
 
      this.isilJobsService.updateExperience(this.experiencia, this.experienciaId).then(()=>{
      
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
      this.experienciaId = sessionStorage.getItem('user');
      this.experiencia.id = sessionStorage.getItem('user');

      console.log(this.experiencia.id)

      this.isilJobsService.addExperience(this.experiencia).then(()=>{
       loading.dismiss();
       this.modalCtrl.dismiss();
      })
     }

  }

  regresar() {
    this.modalCtrl.dismiss();
  }

  actEmpresa(event){
    this.experiencia.actividadempresa = event.detail.value.name;
  }

  nvlExperiencia(event){
    this.experiencia.nivelexperiencia = event.detail.value.name;
  }

  areaPuesto(event){
    this.experiencia.areapuesto = event.detail.value.name;
  }


}
