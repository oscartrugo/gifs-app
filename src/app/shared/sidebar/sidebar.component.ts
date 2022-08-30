import { Component, OnInit } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent{

  get historial(){
    return this.gifsService.historial; //Retornamos el historial de gifs
  }
  //Inyectamos al constructor el servicio
  constructor(private gifsService: GifsService) { }

  buscar(termino: string){ //Busca los gifs cuando se de click en el sidebar
    this.gifsService.buscarGifs(termino);
  }

}
