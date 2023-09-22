import { Injectable } from '@angular/core';
import { HttpService } from '@core-service/http.service';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cliente } from '../model/cliente';


@Injectable()
export class ClienteService {

  constructor(protected http: HttpService) { }

  public consultar() {
    return this.http.doGet(`${environment.endpoint}/users`)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .pipe(map((response: any) => response.data as Cliente[]));
  }

  public guardar(cliente: Cliente) {
    return this.http.doPost<Cliente, boolean>(`${environment.endpoint}/users`, cliente);
  }

  public eliminar(cliente: Cliente) {
    return this.http.doDelete<boolean>(`${environment.endpoint}/users/${ cliente.id}`);
  }
}
