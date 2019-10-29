import { Component, OnInit, Input } from '@angular/core';
import { ModalController, LoadingController } from '@ionic/angular';
import { IEducation } from 'src/app/models/models';
import { IsilJobsService } from '../../services/isil-jobs.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-editar-educacion',
  templateUrl: './editar-educacion.page.html',
  styleUrls: ['./editar-educacion.page.scss'],
})
export class EditarEducacionPage implements OnInit {

  educationId = null;

  education: IEducation = {
    id:'',
    tipoestudio:'',
    estado:'',
    titulo:'',
    area:'',
    institucion:'',
    uid:'',
  };

  typeEducation = [
    { name:"Secundario", val: 1 , isChecked:false},
    { name:"Superior técnico",val: 2 , isChecked:false},
    { name:"Universitario",val: 3 , isChecked:false},
    { name:"Posgrado",val: 4 , isChecked:false},
    { name:"Master",val: 5 , isChecked:false},
    { name:"Doctorado",val: 6 , isChecked:false},
    { name:"Otros",val: 7 , isChecked:false}
  ];

  arrEstado = [
    { name:"En curso", val: 1 , isChecked:false},
    { name:"Graduado",val: 2 , isChecked:false},
    { name:"Abandonado",val: 3 , isChecked:false}
  ];

  arrAreaEstudio = [
    { name:"Diseño de Medios Interactivos (UX)", val: 1, isChecked:false},
    { name:"Diseño Gráfico" , val: 2, isChecked:false},
    { name:"Diseño de Interiores" , val: 3, isChecked:false},
    { name:"Animación Digital y Diseño 3D" , val: 4, isChecked:false},
    { name:"Diseño y Desarrollo de Videojuegos" , val: 5, isChecked:false},
    { name:"Fotografía y Producción de Imagen" , val: 6, isChecked:false},
    { name:"Comunicación Audiovisual" , val: 7, isChecked:false},
    { name:"Comunicación Integral" , val: 8, isChecked:false},
    { name:"Periodismo y Nuevos Medios" , val: 9, isChecked:false},
    { name:"Periodismo Deportivo" , val: 10, isChecked:false},
    { name:"Marketing y Gestión de Moda" , val: 11, isChecked:false},
    { name:"Marketing" , val: 12, isChecked:false},
    { name:"Publicidad y Medios Digitales" , val: 13, isChecked:false},
    { name:"Gestión Comercial y Negocios Digitales" , val: 14, isChecked:false},
    { name:"Administración de Empresas" , val: 15, isChecked:false},
    { name:"Negocios Internacionales" , val: 16, isChecked:false},
    { name:"Administración y Finanzas" , val: 17, isChecked:false},
    { name:"Recursos Humanos" , val: 18, isChecked:false},
    { name:"Administración Bancaria" , val: 19, isChecked:false},
    { name:"Gestión Logística Integral" , val: 20, isChecked:false},
    { name:"Desarrollo de Software" , val: 21, isChecked:false},
    { name:"Redes y Comunicaciones" , val: 22, isChecked:false},
    { name:"Sistemas de Información" , val: 23, isChecked:false},
    { name:"Hotelería" , val: 24, isChecked:false},
    { name:"Turismo" , val: 25, isChecked:false}
  ]


  @Input() id;
  constructor(private modalCtrl:ModalController,
              private isilJobsService:IsilJobsService,
              private readonly loadingCtrl: LoadingController,
              private afs:AngularFirestore) { }

  ngOnInit() {

    this.educationId = sessionStorage.getItem('user');
    console.log(this.educationId);
    if(this.educationId){
      this.loadFolderEducation();
    }

  }


  regresar() {
    this.modalCtrl.dismiss();
  }

  checkValue(event){ 
    this.education.tipoestudio = event.detail.value.name;
    console.log(this.education.tipoestudio);
  }
  
  estado(event){
    this.education.estado = event.detail.value.name;
  }

  areaEstudio(event){
    this.education.area = event.detail.value.name;
  }

  async guardarEducacion(){
    console.log("guardar..");

    const loading = await this.loadingCtrl.create({
      message: 'Guardando...'
     });
     await loading.present();
     if(this.educationId){
       console.log(this.educationId);
      //update
      //this.uid = this.isilJobsService.currentUserFirebase();
      //this.uid = sessionStorage.getItem('user');
 
      //this.publication.uid = this.uid ;
 
      this.isilJobsService.updateEducation(this.education, this.educationId).then(()=>{
      
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
      this.educationId = sessionStorage.getItem('user');
      this.education.id = sessionStorage.getItem('user');

      console.log(this.education.id)

      this.isilJobsService.addEducation(this.education).then(()=>{
       loading.dismiss();
       this.modalCtrl.dismiss();
      })
     }
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

}
