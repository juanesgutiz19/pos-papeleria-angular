import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ClienteService } from '@cliente/shared/service/cliente.service';
import { Cliente } from '@cliente/shared/model/cliente';

@Component({
  selector: 'app-listar-cliente',
  templateUrl: './listar-cliente.component.html',
  styleUrls: ['./listar-cliente.component.scss']
})
export class ListarClienteComponent implements OnInit {
  public listaClientes: Observable<Cliente[]>;

  constructor(protected clienteService: ClienteService) { }

  ngOnInit() {
    this.listaClientes = this.clienteService.consultar();
  }

}
