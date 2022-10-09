import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import {ContatoModel} from './contato.model'
@Injectable({
  providedIn: 'root'
})
export class ContatoService {

  constructor(private http: HttpClient) { }

  CadastrarContato(contato: ContatoModel): Observable<any>{
   return this.http.post("https://localhost:3000/api/UsuariosContato/", contato);
  }
}
