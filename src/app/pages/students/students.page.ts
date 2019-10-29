import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IsilJobsService } from '../../services/isil-jobs.service';
import { AuthLoginService } from '../../services/auth-login.service';
import { IFolder } from '../../models/models';

@Component({
  selector: 'app-students',
  templateUrl: './students.page.html',
  styleUrls: ['./students.page.scss'],
})
export class StudentsPage implements OnInit {

  folders:IFolder[];

  constructor(private modalCtrl:ModalController, private isilJobService:IsilJobsService,
    private authLoginService:AuthLoginService) { }

  ngOnInit() {
    this.isilJobService.getFolders().subscribe(res => {
      console.log('folders', res  );
      this.folders = res;

    });
  }

}
