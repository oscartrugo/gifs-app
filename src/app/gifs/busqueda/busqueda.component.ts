import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html'
})

export class BusquedaComponent{

  @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>;

  constructor(private gifsSerivce: GifsService){}

  buscar(termino: string){
    const valor = this.txtBuscar.nativeElement.value;

    if(valor.trim().length === 0){ return;} //Si el valor del input es vacío, no hace nada

    this.gifsSerivce.buscarGifs(valor)
    this.txtBuscar.nativeElement.value = '';
  }

  limpiarHistorial(){
    localStorage.clear(); //Limpia el localStorage 
    window.location.reload(); //recarga la página
  }
}
