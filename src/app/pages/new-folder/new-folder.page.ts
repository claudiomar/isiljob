import { Component, OnInit } from '@angular/core';
import { IFolder } from '../../models/models';
import { IsilJobsService } from '../../services/isil-jobs.service';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-new-folder',
  templateUrl: './new-folder.page.html',
  styleUrls: ['./new-folder.page.scss'],
})
export class NewFolderPage implements OnInit {

  folder:IFolder = {
    name:'',
    description: '',
    languages:[],
    frameworks:[],
    images:'',
    freelance:false,
    uid:'',
  };

  folderId = null;

  constructor( ) { }

  ngOnInit() {
  }

  saveFolder(){

  }

}
