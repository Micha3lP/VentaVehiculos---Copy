import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Venta } from '../models/venta';

@Injectable({
  providedIn: 'root'
})
export class VentaService {
  private apiBaseUrl = 'http://localhost:8080/api/ventas';

  constructor(private http: HttpClient) {
  }

  getAllVentas(): Observable<Venta[]> {
    return this.http.get<Venta[]>(this.apiBaseUrl+"/todos");
  }

  getVentaById(ventaId: number): Observable<Venta> {
    return this.http.get<Venta>(`${this.apiBaseUrl}/${ ventaId }`);
  }

  addVenta(venta: Venta): Observable<Venta> {
    return this.http.post<Venta>(`${this.apiBaseUrl}/guardar`, venta);
  }

  updateVenta(ventaId: number, venta: Venta): Observable<Venta> {
    return this.http.put<Venta>(`${this.apiBaseUrl}/${ ventaId }`, venta);
  }

  deleteVenta(ventaId: number): Observable<any> {
    return this.http.delete(`${this.apiBaseUrl}/eliminar/${ ventaId }`);
  }
}
