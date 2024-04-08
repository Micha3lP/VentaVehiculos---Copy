import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private apiBaseUrl = 'http://localhost:8080/api/clientes';

  constructor(private http: HttpClient) {
  }

  getAllClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.apiBaseUrl+"/todos");
  }

  getClienteById(clienteId: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.apiBaseUrl}/${ clienteId }`);
  }

  addCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(`${this.apiBaseUrl}/guardar`, cliente);
  }

  updateCliente(clienteId: number, cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.apiBaseUrl}/${ clienteId }`, cliente);
  }

  deleteCliente(clienteId: number): Observable<any> {
    return this.http.delete(`${this.apiBaseUrl}/eliminar/${ clienteId }`);
  }
}
