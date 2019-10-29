import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Area, Job, Jobs, Folder, IFolder, IUser, IPublication, IProfile, IContact, IEducation, IExperience } from '../models/models';
import { environment } from '../../environments/environment';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoadingController } from '@ionic/angular';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class IsilJobsService {

  url: any;
  loading: boolean = false;
  authState: any = null;

  //Usando firebase
  private usersCollection: AngularFirestoreCollection<IUser>;
  private users: Observable<IUser[]>;

  private publicationsCollection: AngularFirestoreCollection<IPublication>;
  private publications: Observable<IPublication[]>;

  private jobsCollection: AngularFirestoreCollection<IPublication>;
  private jobs: Observable<IPublication[]>;

  private foldersCollection: AngularFirestoreCollection<IFolder>;
  private folders: Observable<IFolder[]>;

  private profileCollection: AngularFirestoreCollection<IProfile>;
  private profiles: Observable<IProfile[]>;

  /*********************************/
  private contactCollection: AngularFirestoreCollection<IContact>;
  private contacts: Observable<IContact[]>;

  private educationCollection: AngularFirestoreCollection<IEducation>;
  private educations: Observable<IEducation[]>;

  private experienceCollection:AngularFirestoreCollection<IExperience>;
  private experiences: Observable<IExperience[]>;

  /********************************************/

  constructor(private http:HttpClient, 
              private db:AngularFirestore,
              private router:Router,
              private readonly loadingCtrl: LoadingController,
              private storage: AngularFireStorage,
              private fauth:AngularFireAuth) { 

    this.usersCollection = db.collection<IUser>('users');
    this.users = this.usersCollection.snapshotChanges().pipe(map(
      actions => {
        return actions.map(a=>{
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id,...data};
        });
      }
    ));

    this.foldersCollection = db.collection<IFolder>('folders');
    this.folders = this.foldersCollection.snapshotChanges().pipe(map(
      actions => {
        return actions.map(a=>{
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id , ... data};
        });
      }
    ));

    this.publicationsCollection = db.collection<IPublication>('publications');
    this.publications = this.publicationsCollection.snapshotChanges().pipe(map(
      actions => {
        return actions.map(a=>{
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id , ... data};
        });
      }
    ));

    this.jobsCollection = db.collection<IPublication>('publications');
    this.jobs = this.jobsCollection.snapshotChanges().pipe(map(
      actions => {
        return actions.map(a=>{
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id , ... data};
        });
      }
    ));

    this.profileCollection = db.collection<IProfile>('profile');
    this.profiles = this.profileCollection.snapshotChanges().pipe(map(
      actions => {
        return actions.map(a=>{
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id , ... data};
        });
      }
    ));
    /******************************************************** */
    this.contactCollection = db.collection<IContact>('contact');
    this.contacts = this.contactCollection.snapshotChanges().pipe(map(
      actions => {
        return actions.map(a=>{
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id , ... data};
        });
      }
    ));

    this.educationCollection = db.collection<IEducation>('education');
    this.educations = this.educationCollection.snapshotChanges().pipe(map(
      actions => {
        return actions.map(a=>{
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id , ... data};
        });
      }
    ));

    this.experienceCollection = db.collection<IExperience>('experience');
    this.experiences = this.experienceCollection.snapshotChanges().pipe(map(
      actions => {
        return actions.map(a=>{
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id , ... data};
        });
      }
    ));

  }

  registerUserFirebase(email:string,password:string,name:string,
                       document:string,type:number,rsocial:string, 
                       ruc:string, img:string){
    return new Promise((resolve, reject) => {
      this.fauth.auth.createUserWithEmailAndPassword(email , password).then(res=>{
        console.log(res.user.uid);
        const uid = res.user.uid;

        this.uploadImage(event, uid);

        this.db.collection('users').doc(res.user.uid).set({
          uid:uid,
          name: name,
          document:document,
          type:type,
          rsocial:rsocial,
          ruc:ruc,
          img:img,
        })
        resolve(res);
      }).catch(err => reject(err))
    })
  }

  datosUserFirebase(){
    this.fauth.authState.subscribe((usuario: firebase.User) => {
      if(usuario){
        //console.log(usuario.uid);
        //sessionStorage.setItem('uid', JSON.stringify(usuario.uid));
        //this.authState = usuario;
        console.log('El usuario esta logueado!');
        //this.router.navigate(['tabs/jobs']);

      }else{
        console.log('El usuario no esta logueado');
      }
      //return usuario;
    });
    //var user = this.fauth.auth.currentUser;
    //console.log(user);
  }

  currentUserFirebase(){
    var user = this.fauth.auth.currentUser;
    return user.uid;
  }

  getUser(id:string){
    return this.usersCollection.doc<IUser>(id).valueChanges();
  }

  getPublications(){
    return this.publications;
  }

  getPublication(id:string){
    return this.publicationsCollection.doc<IPublication>(id).valueChanges();
  }

  updatePublication(publication:IPublication, id:string){
    return this.publicationsCollection.doc(id).update(publication);
  }

  addPublication(publication:IPublication){
    return this.publicationsCollection.add(publication);
  }

  removePublication(id:string){
    return this.publicationsCollection.doc(id).delete();
  }


  getJobs(){
    return this.jobs;
  }

  getJob(id:string){
    return this.jobsCollection.doc<IPublication>(id).valueChanges();
  }

  updateJob(job:IPublication, id:string){
    return this.jobsCollection.doc(id).update(job);
  }

  addJob(job:IPublication){
    return this.jobsCollection.add(job);
  }

  getFolders(){
    return this.folders;
  }

  getFolder(id:string){
    return this.foldersCollection.doc<IFolder>(id).valueChanges();
  }

  updateFolder(folder:IFolder, id:string){
    return this.foldersCollection.doc(id).update(folder);
  }

  addFolder(folder:IFolder){
    return this.foldersCollection.add(folder);
  }

  removeFolder(id:string){
    return this.foldersCollection.doc(id).delete();
  }
  /* *********** */
  addProfile(profile:IProfile){
    return this.profileCollection.add(profile);
  }

  updateProfile(profile:IProfile,id:string){
    return this.profileCollection.doc(id).update(profile);
  }
  /* *********** */
  getEducatiom(id:string){
    return this.educationCollection.doc<IEducation>(id).valueChanges();
  }

  addEducation(education:IEducation){

    return this.db.collection('education').doc(education.id).set({
      
      id:education.id,
      tipoestudio:education.tipoestudio,
      estado:education.estado,
      titulo:education.titulo,
      area:education.area,
      institucion:education.institucion,
      uid:education.uid,

    })
    
    //return this.educationCollection.add(education);
  }

  updateExperience(experience:IExperience, id:string){
    return this.experienceCollection.doc(id).update(experience);
  }

  getExperience(id:string){
    return this.experienceCollection.doc<IExperience>(id).valueChanges();
  }

  addExperience(experience:IExperience){

    return this.db.collection('experience').doc(experience.id).set({
      
      id:experience.id,
      empresa:experience.empresa,
      actividadempresa:experience.actividadempresa,
      puesto:experience.puesto,
      nivelexperiencia:experience.nivelexperiencia,
      pais:experience.pais,
      areapuesto:experience.areapuesto,
      descripcionresp:experience.descripcionresp,
      personascargo:experience.personascargo

    })
    
    //return this.educationCollection.add(education);
  }

  updateEducation(education:IEducation, id:string){
    return this.educationCollection.doc(id).update(education);
  }

  getContact(id:string){
    return this.contactCollection.doc<IContact>(id).valueChanges();
  }

  addContact(contact:IContact){
    return this.contactCollection.add(contact);
  }

  updateContact(contact:IContact, id:string){
    return this.contactCollection.doc(id).update(contact);
  }

  /*************************************************/

  uploadImage(event, uid:string) {
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
      //const filePath = '/Image/' + this.newImage.id + '/' + 'Image' + (Math.floor(1000 + Math.random() * 9000) + 1);
      //const filePath = '/folder/' + this.newImage.id + '/' +(Math.floor(1000 + Math.random() * 9000) + 1);
       const filePath = '/users/' + uid + '/' +(Math.floor(1000 + Math.random() * 9000) + 1);
      console.log('filePath',filePath);
      //this.folder.images.push(filePath);
      //console.log(this.folder.images);
      /*
      const result = this.SaveImageRef(filePath, fileraw);
      const ref = result.ref;
      result.task.then(a => {
        ref.getDownloadURL().subscribe(a => {
          console.log(a);
          this.newImage.image = a;
          this.loading = false;
        });

        this.afs.collection('Folder').doc(this.newImage.id).set(this.newImage);
      });*/
      }, error => {
        alert("Error");
      }

    }
  }















  listArea(){
    return this.http.get<Area>('http://localhost:8080/api/areas');
  }

  listJobs(){
    //console.log(environment.url + 'api/jobs');
    return this.http.get<Job>('http://localhost:8080/api/jobs');
  }

  findByIdJob(id_job:number ){
    //console.log(environment.url + 'api/jobs');
    return this.http.get<Job>('http://localhost:8080/api/jobs/' + id_job);
  }

  listFolders(id_user:string){
    //console.log(environment.url + 'api/folders  ');
    return this.http.get<Folder>(`http://localhost:8080/api/folders?id_user=`+id_user);
  }

}
