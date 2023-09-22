import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../shared/service/cliente.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

const LONGITUD_MINIMA_PERMITIDA_TEXTO = 3;
const LONGITUD_MAXIMA_PERMITIDA_TEXTO = 20;

@Component({
  selector: 'app-crear-cliente',
  templateUrl: './crear-cliente.component.html',
  styleUrls: ['./crear-cliente.component.scss']
})
export class CrearClienteComponent implements OnInit {
  clienteForm: FormGroup;

  constructor(protected clienteServices: ClienteService) { }

  ngOnInit() {
    this.construirFormularioCliente();
  }

  crear() {
    if(this.clienteForm.valid){
      this.clienteServices.guardar(this.clienteForm.value).subscribe(()=>window.alert('usuario creado'));
    }
  }

  private construirFormularioCliente() {
    this.clienteForm = new FormGroup({
      id: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.minLength(LONGITUD_MINIMA_PERMITIDA_TEXTO),
        Validators.maxLength(LONGITUD_MAXIMA_PERMITIDA_TEXTO)])
    });
  }

}
