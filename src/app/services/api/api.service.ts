import { Injectable } from '@angular/core';
import { HttpService } from '../common/http.service';
import { Observable } from 'rxjs';
import { Rectificado } from 'src/app/models/rectificado.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private httpService: HttpService) {}

  getAll(): Observable<Rectificado[]> {
    return this.httpService.get('Rectificados');
  }
  add(body: any): Observable<Rectificado> {
    return this.httpService.post('Rectificados', body);
  }
  delete(id: any): Observable<any> {
    return this.httpService.delete(`Rectificados/${id}`);
  }
  //Clientes
  getClientes(): Observable<[]> {
    return this.httpService.get('Clientes');
  }
  //Operarios
  getOperarios(): Observable<[]> {
    return this.httpService.get('Operarios');
  }
  addOperarios(body: any): Observable<void> {
    return this.httpService.post('Operarios', body);
  }
  editOperarios(id: string, body: any): Observable<void> {
    return this.httpService.put(`Operarios/${id}`, body);
  }
  deleteOperarios(id: string): Observable<void> {
    return this.httpService.delete(`Operarios/${id}`);
  }
  //Estados
  getEstados(): Observable<[]> {
    return this.httpService.get('Estados');
  }
}
