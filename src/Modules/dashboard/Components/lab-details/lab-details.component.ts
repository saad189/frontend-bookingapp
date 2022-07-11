import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Lab } from 'src/Models/lab';
import { LabFeatures } from 'src/Models/lab-features';
import { AppService } from 'src/Services/app-Service/app.service';

@Component({
  selector: 'app-lab-details',
  templateUrl: './lab-details.component.html',
  styleUrls: ['./lab-details.component.scss']
})
export class LabDetailsComponent implements OnInit {
  urlPrefix = 'assets/ccna_lab';
  labFeatures: LabFeatures[] = [
    {
      name: 'Computers',
      url: `${this.urlPrefix}/computers.png`,
      count: 30
    },
    {
      name: 'Network',
      url: `${this.urlPrefix}/5g.png`,
      count: '5G'
    },
    {
      name: 'Routers',
      url: `${this.urlPrefix}/routers.png`,
      count: 15
    },
    {
      name: 'Chairs',
      url: `${this.urlPrefix}/chairs.png`,
      count: 38
    },
    {
      name: 'Servers',
      url: `${this.urlPrefix}/servers.png`,
      count: '02'
    },
    {
      name: 'Connectors',
      url: `${this.urlPrefix}/connector.png`,
      count: 40
    }

  ];

  colorMode = this.appService.currentColorMode;

  constructor(public dialogRef: MatDialogRef<LabDetailsComponent>, @Inject(MAT_DIALOG_DATA) public lab: Lab, private appService: AppService) {
  }


  ngOnInit(): void {
  }

  closeDialog(data: any): void {
    this.dialogRef.close(data);
  }

}
