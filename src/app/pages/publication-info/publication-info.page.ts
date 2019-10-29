import { Component, OnInit, Input } from '@angular/core';
import { IPublication, IUser, User } from '../../models/models';
import { IsilJobsService } from '../../services/isil-jobs.service';
import { LoadingController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-publication-info',
  templateUrl: './publication-info.page.html',
  styleUrls: ['./publication-info.page.scss'],
})
export class PublicationInfoPage implements OnInit {

  publication: IPublication = {
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

  publicationId = null;
  uid:string='';

  typePub = [
    { name:"FullTime", val: 1 , isChecked:false},
    { name:"PartTime",val: 2 , isChecked:false},
    { name:"Practicante",val: 3 , isChecked:false}
  ];

  @Input() id;
  constructor(private isilJobsService:IsilJobsService,
              private readonly loadingCtrl: LoadingController,
              private modalCtrl:ModalController) { }

  ngOnInit() {
    console.log('id', this.id);
    //this.folderId = this.route.snapshot.params['id'];
    this.publicationId = this.id;
    if(this.publicationId){
      this.loadFolder();
    }

    this.uid = this.isilJobsService.currentUserFirebase();
    this.isilJobsService.getUser(this.uid).subscribe(res=>{
      console.log('res ',res);
      
      this.user = res;
      this.publication.userName = res.name;
      this.publication.userRSocial = res.rsocial;
      this.publication.userDocument = res.document;
      this.publication.userRuc = res.ruc;
      this.publication.imgUser = res.img;
     });
  }

  async loadFolder(){
    const loading = await this.loadingCtrl.create({
      message: 'Cargando...'
    });
    await loading.present();
    this.isilJobsService.getPublication(this.publicationId).subscribe(res => {
      loading.dismiss();
      this.publication = res;
    });
  }

  async savePublication(){
    const loading = await this.loadingCtrl.create({
     message: 'Guardando...'
    });
    await loading.present();
    if(this.publicationId){
     //update
     this.uid = this.isilJobsService.currentUserFirebase();
     this.publication.uid = this.uid ;

     this.isilJobsService.updatePublication(this.publication, this.publicationId).then(()=>{
      
      loading.dismiss();
      this.modalCtrl.dismiss();

     })
    }else{
     //new
     this.uid = this.isilJobsService.currentUserFirebase();

     //console.log('this.user ' ,this.user);
     //this.publication.imgUser = this.user.img;
     //console.log(this.publication.imgUser);
     this.publication.uid = this.uid ;

     this.isilJobsService.addPublication(this.publication).then(()=>{
      
      loading.dismiss();
      this.modalCtrl.dismiss();
      //this.uploadImage(event, this.folderId);

     })
    }
  }

 regresar(){
    console.log('regresar..');
    this.modalCtrl.dismiss();
  }

  addRequeriment(event){
    console.log(event);
    //this.publication.requirements.push();
  }


   checkValue(event){ 
    //console.log(event.detail.value)
    this.publication.type = event.detail.value.val;
  }

}
