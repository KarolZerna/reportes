import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Titulados} from './tituladosClass'
@Injectable({
  providedIn: 'root'
})
export class RestTituladosService {

  constructor(private http : HttpClient) { }

  url : string = "http://localhost:3000/dbTitulados";

  getTitulados()
  {
    return this.http.get<Titulados[]>( this.url );
  }
}
