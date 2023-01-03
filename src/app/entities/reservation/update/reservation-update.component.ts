
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IClient } from '../../client/client.model';
import { ClientService } from '../../client/service/client.service';
import { Creneau, ICreneau } from '../../creneau/creneau.model';
import { CreneauService } from '../../creneau/service/creneau.service';
import { TerrainService } from '../../terrain/service/terrain.service';
import { ITerrain } from '../../terrain/terrain.model';
import { IReservation, Reservation } from '../reservation.model';
import { ReservationService } from '../service/reservation.service';


import * as moment from 'moment';
@Component({
  selector: 'app-reservation-update',
  templateUrl: './reservation-update.component.html',
  styleUrls: ['./reservation-update.component.css'],
})
export class ReservationUpdateComponent implements OnInit {
  public selectedValue: string = '';
  public dateres: Date | any;
  public availablecreneau?: ICreneau[];
  public terre: ITerrain[] | any;
  public selectedterrain: number = 1;
  public creneau: ICreneau[] | any;
  public reserv: IReservation | any;
  public client: IClient[] | any;
  public pending: boolean | any;
  public currentuser: IClient | any;
  public listTerrain: ITerrain[] | any;
  public reserve: IReservation|any;
  public datesx  : string|any;

  public id!: number;
  public reservation: Reservation = new Reservation();
  constructor(
    private reservationService: ReservationService,
    private creneauService: CreneauService,
    private terrainService: TerrainService,
    private clientService: ClientService,
    protected fb: FormBuilder,
    protected activatedRoute: ActivatedRoute
  ) {}

  editForm = this.fb.group({
    id: [],
    nbrjoueur: [],
    reservedBy: [],
    terrain: [],
    creneau: [],
    date: [],
    etat: [],
  });
  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    if(this.id != undefined){
      this.loadOne(); 
    }

    this.reservationService.find(this.id).subscribe((data) => {
      this.reserv = data;
    });

    this.getListTerrains();
  }

  getClient(): void {
    this.clientService.find(this.reservation.reservedBy!.id).subscribe((data) => {
      this.currentuser = data;
    });
  }

  getTerrain(): void {
    this.terrainService
      .get(this.editForm.get(['terrain'])!.value)
      .subscribe((data) => {
        this.terre = data;
      });
  }
  change(): void {
    this.getCrenneau();
  }
  changeterain(): void {
    this.getTerrain();

    this.loadCreneau();
  }

  getListTerrains(): void {
    this.terrainService.list().subscribe((data) => {
      this.listTerrain = data;
    });
  }

  getCrenneau(): void {
    this.creneauService
      .find(this.editForm.get(['creneau'])!.value)
      .subscribe((data) => {
        this.creneau = data;
      });
  }
  loadCreneau(): void {
    const date: any = this.reservation.date?.split('-');
    let year = date[0];
    let month = date[1];
    let day = date[2];

    let terrains: any = this.reservation.terrain;
    let dateValue: any = new Date(+year, +month - 1, +day);
    dateValue = moment(dateValue).format('YYYY-MM-DD');
    this.creneauService.findDispo(terrains, dateValue).subscribe((data) => {
      this.availablecreneau = data;
      console.log('creanaux' + data);
    });
  }
  etatique(): void {
    if (this.reservation.nbrjoueur == 10) {
      this.pending = true;
    } else {
      this.pending = false;
    }
  }
  save(): void {
    this.reservation.creneau = this.creneau;
    this.reservation.terrain = this.terre;
    this.reservation.reservedBy = this.currentuser;
    if (this.id === undefined) {
      this.reservationService.add(this.reservation).subscribe(
        (data) => {
          console.log(data);
        },
        (error) => console.log(error)
      );
    } else {
      alert('before update' + this.id);
      this.reservationService.update(Number(this.id), this.reservation);
      alert('after update');
    }
  }

  loadOne(): void {
    this.datesx = moment().format('YYYY/MM/DD');
    this.reservationService.find(this.id).subscribe((data) => {
      this.reserve = data;
       
      console.log(this.reserve);
    });
  }

  protected updateForm(reservation: IReservation): void {
    this.editForm.patchValue({
      id: reservation.id,
      nbrjoueur: reservation.nbrjoueur,
      reservedBy: reservation.reservedBy,
      terrain: reservation.terrain,
      creneau: reservation.creneau,
      date: reservation.date,
      etat: this.pending,
    });
  }
}
