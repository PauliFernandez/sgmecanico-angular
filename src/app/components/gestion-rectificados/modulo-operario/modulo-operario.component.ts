import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Rectificado } from 'src/app/models/rectificado.model';
import { RectificadosService } from 'src/app/services/rectificado/rectificados.service';

@Component({
  selector: 'app-modulo-operario',
  templateUrl: './modulo-operario.component.html',
  styleUrls: ['./modulo-operario.component.scss']
})
export class ModuloOperarioComponent {
  rectificados: Rectificado[] = [];

  constructor(private router: Router, private rectificadosService: RectificadosService) { }

  ngOnInit() {
    this.getRectificadosList();
  }

  navigateToUpdateMotor() {
    this.router.navigate(['/updateMotor']);
  }

  getRectificadosList() {
    try {
      this.rectificadosService.getAllRectificados().subscribe({
        next: (response) => {
          console.log(response);
          
          this.rectificados = response;
        },
        error: (error) => {
          // Handle error here
        }
      });
    } catch (error) {

    }
  }
}
