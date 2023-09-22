import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { ListarClienteComponent } from './listar-cliente.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { ClienteService } from '../../shared/service/cliente.service';
import { Cliente } from '../../shared/model/cliente';
import { HttpService } from 'src/app/core/services/http.service';

describe('ListarClienteComponent', () => {
  let component: ListarClienteComponent;
  let fixture: ComponentFixture<ListarClienteComponent>;
  let clienteService: ClienteService;
  const listaClientes: Cliente[] = [{id: '1',  email:'Cliente 1'}, {id: '2',  email:'Cliente 2'}];

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ListarClienteComponent],
      imports: [
        CommonModule,
        HttpClientModule,
        RouterTestingModule
      ],
      providers: [ClienteService, HttpService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarClienteComponent);
    component = fixture.componentInstance;
    clienteService = TestBed.inject(ClienteService);
    spyOn(clienteService, 'consultar').and.returnValue(
      of(listaClientes)
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    component.listaClientes.subscribe(resultado => {
      expect(2).toBe(resultado.length);
    });
  });

});
