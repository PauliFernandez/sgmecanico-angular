import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.scss']
})
export class PedidoComponent {
  constructor(private router: Router) { }

  navigateToAltaPedido() {
    this.router.navigate(['/alta-pedido']);
  }
}
