import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ClienteService } from './cliente.service';
import { environment } from 'src/environments/environment';
import { HttpService } from 'src/app/core/services/http.service';
import { HttpResponse } from '@angular/common/http';

describe('ClienteService', () => {
  let httpMock: HttpTestingController;
  let service: ClienteService;
  const apiEndpointClienteConsulta = `${environment.endpoint}/users`;
  const apiEndpointClientes = `${environment.endpoint}/users`;

  beforeEach(() => {
    const injector = TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ClienteService, HttpService]
    });
    httpMock = injector.inject(HttpTestingController);
    service = TestBed.inject(ClienteService);
  });

  it('should be created', () => {
    const productService: ClienteService = TestBed.inject(ClienteService);
    expect(productService).toBeTruthy();
  });

  it('deberia listar clientes', () => {
    const dummyClientes = {
      data: [
        { id: '1', email:'Cliente 1'}, { id:'2', email:'Cliente 2'}
      ]
    };
    service.consultar().subscribe(clientes => {
      expect(clientes.length).toBe(2);
      expect(clientes).toEqual(dummyClientes.data);
    });
    const req = httpMock.expectOne(apiEndpointClienteConsulta);
    expect(req.request.method).toBe('GET');
    req.flush(dummyClientes);
  });

  it('deberia crear un cliente', () => {
    const dummyCliente = { id: '1', email:'Cliente 1'};
    service.guardar(dummyCliente).subscribe((respuesta) => {
      expect(respuesta).toEqual(true);
    });
    const req = httpMock.expectOne(apiEndpointClientes);
    expect(req.request.method).toBe('POST');
    req.event(new HttpResponse<boolean>({ body: true }));
  });

  it('deberia eliminar un cliente', () => {
    const dummyCliente = { id: '1', email:'Cliente 1'};
    service.eliminar(dummyCliente).subscribe((respuesta) => {
      expect(respuesta).toEqual(true);
    });
    const req = httpMock.expectOne(`${apiEndpointClientes}/1`);
    expect(req.request.method).toBe('DELETE');
    req.event(new HttpResponse<boolean>({ body: true }));
  });
});
