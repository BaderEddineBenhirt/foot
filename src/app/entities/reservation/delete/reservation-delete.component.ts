import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { TerrainService } from '../../terrain/service/terrain.service';
import { ITerrain } from '../../terrain/terrain.model';
import { IReservation } from '../reservation.model';
import { ReservationService } from '../service/reservation.service';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClientService } from '../../client/service/client.service';
import { IClient } from '../../client/client.model';
import { PanierService } from '../../panier/service/panier.service';
import { Panier } from '../../panier/panier.model';
@Component({
  selector: 'app-reservation-delete',
  templateUrl: './reservation-delete.component.html',
  styleUrls: ['./reservation-delete.component.css'],
})
export class ReservationDeleteComponent implements OnInit {
  public join: IReservation[] | any;
  public limited : number |any;
  public idres!: number;
  public res: IReservation | any;
  public numberofJoin: number | any;

  public friend: number | any;

  public terrains: ITerrain[] = [];
  public comp: number | any;
  public dispo: IReservation[] = [];

  constructor(
    private reserve: ReservationService,
    private terrainService: TerrainService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadjoin();
   
    
 
  }

  loadjoin(): void {
    this.reserve.availableTeam().subscribe((daya) => {
      this.join = daya; 
      console.log(this.join);
    });
  }

  loadreserve(): void {
    this.join = [];

    this.reserve.availableTeam().subscribe((daya) => {
      this.dispo = daya;
      for (let ter of this.dispo) {
        let toto: number | any = ter.terrain?.nbrJoueurs;
        let tat: number | any = ter.nbrjoueur;
        this.comp = toto - tat;
        if (this.comp >= this.numberofJoin) {
          this.join.push(ter);
          console.log(this.join);
        }
      }
    });
  }
  

  openDialog(id: number): void {
    let dialogRef = this.dialog.open(DialogMat, {
      data: {
        friend: this.friend,
        res: id,
      },
      panelClass: 'custom-dialog-container',
      height: '400px',
      width: '700px',
    });

    dialogRef.afterClosed().subscribe((e) => (this.friend = e));
  }
}

@Component({
  selector: 'pop-up1',
  templateUrl: './pop-up.html',
  encapsulation: ViewEncapsulation.None,
})
export class DialogMat {
  public currentRes: IReservation | any;
  public userId: number | any;
  public currentUser: IReservation | any;

  public limited: number | any;

  constructor(
    public dialogRef: MatDialogRef<DialogMat>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: ReservationService,
    private clientService: ClientService
  ) {}

  ngOnInit(): void {
    console.log('friend' + this.data.friend);
    console.log('res' + this.data.res);
    this.findUse();
  }
  closeDialog(): void {
    this.dialogRef.close();
  }

  findUse(): void {
    this.service.find(this.data.res).subscribe((data) => {
      this.currentUser = data;
      this.limited = Number(this.currentUser.terrain.nbrJoueurs) - Number(this.currentUser.nbrjoueur);
    });
  }

  modif(): void {
    this.service.find(this.data.res).subscribe((data) => {
      this.currentRes = data;
      console.log('curent ' + this.currentRes);
      this.currentRes.nbrjoueur = Number(this.currentRes.nbrjoueur) + Number(this.data.friend);

      this.service.update(this.data.res, this.currentRes).subscribe((data) => {
        console.log('updated');
        this.service
          .assoc(Number(this.data.res), Number(this.data.friend))
          .subscribe((data) => {
            console.log('assoc added');
          });
      });
    });
  }
}
