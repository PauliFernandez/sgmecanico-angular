import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Rectificado } from 'src/app/models/rectificado.model';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';

@Injectable({
  providedIn: 'root',
})
export class RectificadosService {
  constructor(private apiService: ApiService) {}

  // Rectificados
  getAllRectificados(): Observable<Rectificado[]> {
    return this.apiService.getAll().pipe(
      catchError((error) => {
        console.error('Error:', error);
        return of([]);
      })
    );
  }
  addRectificado(body: any): Observable<any> {
    return this.apiService.add(body).pipe(
      catchError((error) => {
        console.error('Error:', error);
        return of();
      })
    );
  }
  deleteRectificado(id: any): Observable<any> {
    return this.apiService.delete(id).pipe(
      catchError((error) => {
        console.error('Error:', error);
        return of();
      })
    );
  }
  // Clientes
  getAllClientes(): Observable<Rectificado[]> {
    return this.apiService.getClientes().pipe(
      catchError((error) => {
        console.error('Error:', error);
        return of([]);
      })
    );
  }
  // Estados
  getAllEstados(): Observable<Rectificado[]> {
    return this.apiService.getEstados().pipe(
      catchError((error) => {
        console.error('Error:', error);
        return of([]);
      })
    );
  }
  // Operarios
  getAllOperarios(): Observable<Rectificado[]> {
    return this.apiService.getOperarios().pipe(
      catchError((error) => {
        console.error('Error:', error);
        return of([]);
      })
    );
  }
  addOperario(body: any): Observable<any> {
    return this.apiService.addOperarios(body).pipe(
      catchError((error) => {
        console.error('Error:', error);
        return of();
      })
    );
  }
  editOperario(id: string, body: any): Observable<any> {
    return this.apiService.editOperarios(id, body).pipe(
      catchError((error) => {
        console.error('Error:', error);
        return of();
      })
    );
  }
  deleteOperario(id: any): Observable<any> {
    return this.apiService.deleteOperarios(id).pipe(
      catchError((error) => {
        console.error('Error:', error);
        return of();
      })
    );
  }
}
