import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = 'jIQtzSZXvr5olbl6SlGlA5uN88GvDiXI';
  private _historial: string[] = [];
  private servicioUrl: string = 'https://api.giphy.com/v1/gifs';
  public resultados: Gif[] = []; //TODO cambiar any por su tipo

  get historial() {
    return [...this._historial];
  }

  constructor(private http: HttpClient){
    if(localStorage.getItem('historial')){
      this._historial = JSON.parse( localStorage.getItem('historial')! ) || [];
      this.resultados = JSON.parse( localStorage.getItem('resultados')! ) || [];

    }
  } //Inyectamos el HttpClient

  buscarGifs(query: string = '') { //Recibimos el query de busqueda

    query = query.trim().toUpperCase();

    if (!this._historial.includes(query)) { //Si el historial no incluye el nuevo registro...
      this._historial.unshift(query); //Insertamos al final del historial el query
      this._historial = this._historial.splice(0, 10);

      localStorage.setItem('historial', JSON.stringify(this._historial));
    }

    const params = new HttpParams()
          .set('api_key', this.apiKey)
          .set('limit', '10')
          .set('q', query);

    console.log(params.toString())

    this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`, { params } )
      .subscribe((resp) => {
        this.resultados = resp.data;
        localStorage.setItem('resultados', JSON.stringify(this.resultados))
      })
  }
}
