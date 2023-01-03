import { Component, OnInit } from '@angular/core';
import {faEye } from '@fortawesome/free-solid-svg-icons';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { faRemove } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { IReservation, Reservation } from '../reservation.model';
import { ReservationService } from '../service/reservation.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css'],
})
export class ReservationComponent implements OnInit {
  faEye = faEye;
  faPen = faPen;
  faDeleteLeft = faRemove;
  faPlus = faPlus;
  public reserves: IReservation[] | any;
  public join: IReservation[] | any;
  public waaa: IReservation[] | any;
  constructor(private reserve: ReservationService) {}

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): void {
    this.reserve.list().subscribe((data) => {
      this.reserves = data;
      console.log(this.reserves);
    });
  }

  
  delete(id: number): void {
    this.reserve.delete(id).subscribe((data) => {
      this.loadAll();
    });
  }
}
