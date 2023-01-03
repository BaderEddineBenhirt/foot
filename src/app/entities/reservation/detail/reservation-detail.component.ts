import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IReservation } from '../reservation.model';
import { ReservationService } from '../service/reservation.service';

@Component({
  selector: 'app-reservation-detail',
  templateUrl: './reservation-detail.component.html',
  styleUrls: ['./reservation-detail.component.css'],
})
export class ReservationDetailComponent implements OnInit {
  public reserve: IReservation | any;
  public id: number | any;
  constructor(
    private service: ReservationService,

    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.load();
  }

  load(): void {
    this.service.find(this.id).subscribe((data) =>{ 
     
      this.reserve = data;
     console.log(this.reserve);});
  }
}
