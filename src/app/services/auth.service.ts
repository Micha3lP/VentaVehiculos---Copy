import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = 'http://localhost:8080/api/auth/login';
  private authToken: string | null = null;

  constructor(private http: HttpClient) {
    this.checkAndSetToken();
  }

  // Método para iniciar sesión
  login(usuario: Usuario): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.loginUrl, usuario, { headers: headers, observe: 'response' });
  }


  checkAndSetToken() {
    var token = localStorage.getItem('authToken');
    if (token) {
      this.setToken(token);
    }
  }

  setToken(token: string) {
    this.authToken = token;
    localStorage.setItem('authToken', token); // Almacenar el token en Local Storage
  }

  // Método para obtener el token
  getToken(): string | null {
    return this.authToken;
  }
  
  deleteToken() {
    this.authToken = null;
    localStorage.removeItem('authToken'); // Eliminar el token del Local Storage
  }
}
