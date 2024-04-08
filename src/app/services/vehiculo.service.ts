import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Vehiculo } from '../models/vehiculo';

@Injectable({
  providedIn: 'root'
})
export class VehiculoService {
  private apiBaseUrl = 'http://localhost:8080/api/vehiculos';

  constructor(private http: HttpClient) {
  }

  getAllVehiculos(): Observable<Vehiculo[]> {
    return this.http.get<Vehiculo[]>(this.apiBaseUrl+"/todos");
  }

  getVehiculoById(vehiculoId: number): Observable<Vehiculo> {
    return this.http.get<Vehiculo>(`${this.apiBaseUrl}/${ vehiculoId }`);
  }

  addVehiculo(vehiculo: Vehiculo): Observable<Vehiculo> {
    return this.http.post<Vehiculo>(`${this.apiBaseUrl}/guardar`, vehiculo);
  }

  updateVehiculo(vehiculoId: number, vehiculo: Vehiculo): Observable<Vehiculo> {
    return this.http.put<Vehiculo>(`${this.apiBaseUrl}/${ vehiculoId }`, vehiculo);
  }

  deleteVehiculo(vehiculoId: number): Observable<any> {
    return this.http.delete(`${this.apiBaseUrl}/eliminar/${ vehiculoId }`);
  }
}
