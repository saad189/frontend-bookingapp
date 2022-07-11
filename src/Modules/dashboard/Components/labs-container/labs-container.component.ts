import { Component, OnInit } from '@angular/core';
import { Lab } from 'src/Models/lab';
import { MatDialog } from '@angular/material/dialog';
import { LabService } from 'src/Services/Lab-Service/lab.service';
import { LabDetailsComponent } from '../lab-details/lab-details.component';
import { MODULE_ADDRESS } from 'src/Models/modules';
import { Router } from '@angular/router';
import { NotificationCardComponent } from 'src/Modules/shared/Components/notification-card/notification-card.component';

@Component({
  selector: 'app-labs-container',
  templateUrl: './labs-container.component.html',
  styleUrls: ['./labs-container.component.scss']
})
export class LabsContainerComponent implements OnInit {

  labs: Lab[] = [
    { name: 'Library', id: 1, labId: 'library', details: '', imageUrl: 'assets/images/library.jpg' },
    {
      name: 'CCNA Lab', id: 2, labId: 'ccna',
      details: `Cisco certified network associate lab provides hand on skills on 
        building simple LAN, configuring of routers and switches, and Configuring and troubleshooting 
        connectivity of a small network, using security best-practices.`, imageUrl: 'assets/ccna_lab/ccna_lab_detail.jpg'
    },
    { name: 'Comp Lab', id: 3, labId: 'comp', details: '', imageUrl: 'assets/images/comp_lab.jpg' },
    { name: 'Bio. Lab', id: 4, labId: 'bio', details: '', imageUrl: 'assets/images/bio_lab.jpg' },
    { name: 'Comm Lab', id: 5, labId: 'comm', details: '', imageUrl: 'assets/images/com_lab.jpg' },
    { name: 'CAD Lab', id: 6, labId: 'cad', details: '', imageUrl: 'assets/images/cad_lab.jpg' },
    { name: 'Server Room', id: 7, labId: 'server', details: '', imageUrl: 'assets/images/server.jpg' },
    { name: 'Mech. Lab', id: 8, labId: 'mech', details: '', imageUrl: 'assets/images/mech_lab.jpg' }
  ];
  isDialogOpen = false;

  constructor(public dialog: MatDialog, private labService: LabService, private router: Router) { }

  ngOnInit(): void {
  }

  showLab(labId: string) {

    if (labId !== 'ccna') {
      this.dialog.open(NotificationCardComponent, {
        width: "700px",
        height: '450px',
        panelClass: 'custom-container'
      });
    } else {

      const dialogRef = this.dialog.open(LabDetailsComponent, {
        width: "80vw",
        minWidth: "80rem",
        data: this.labs.find(lab => lab.labId == labId)
      });

      dialogRef.afterClosed().subscribe(result => {
        this.isDialogOpen = false;
        if (result) {
          this.router.navigate([`/${MODULE_ADDRESS.BOOKING}/calender/${labId}`]);
        }
      });
    }



  }
}
