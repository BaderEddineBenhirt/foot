import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IClub } from '../../club/club.model';
import { IReservation } from '../reservation.model';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  private baseURL = 'http://localhost:4900/reservations';
  constructor(private httpClient: HttpClient) {}

  list(): Observable<IReservation[]> {
    return this.httpClient.get<IReservation[]>(`${this.baseURL}`);
  }

  find(id: number): Observable<IReservation[]> {
    return this.httpClient.get<IReservation[]>(`${this.baseURL}/${id}`);
  }

  availableTeam(): Observable<IReservation[]> {
    return this.httpClient.get<IReservation[]>(`${this.baseURL}/join`);
  }
  
  assoc(id: number , nbrjoueur : number): Observable<IReservation[]> {
    return this.httpClient.post<IReservation[]>(`${this.baseURL}/gg`, {
      id,
      nbrjoueur,
    });
  }

  add(matiere: IReservation): Observable<IReservation> {
    return this.httpClient.post(`${this.baseURL}`, matiere);
  }
  update(id: number, club: IReservation): Observable<IReservation> {
    return this.httpClient.put(`${this.baseURL}/${id}`, club);
  }
  delete(id: number): Observable<IReservation> {
    return this.httpClient.get(`${this.baseURL}/delete/${id}`);
  }
}
