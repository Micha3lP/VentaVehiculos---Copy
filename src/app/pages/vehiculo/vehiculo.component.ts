import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Vehiculo } from 'src/app/models/vehiculo';
import { VehiculoService } from 'src/app/services/vehiculo.service';

@Component({
  selector: 'app-vehiculo',
  templateUrl: './vehiculo.component.html',
  styleUrls: ['./vehiculo.component.scss'],
  providers: [MessageService]
})
export class VehiculoComponent implements OnInit {
  vehiculos: Vehiculo[] = [];
  vehiculosFiltrados: Vehiculo[] = [];
  terminoBusqueda: string = '';
  atributoSeleccionado = '';
  displayDialog: boolean = false;
  vehiculo: Vehiculo = {} as Vehiculo;
  editing: boolean = false;

  atributos: { value: string, label: string }[] = [
    { value: 'id', label: 'Id' },
{ value: 'color', label: 'Color' },
{ value: 'placa', label: 'Placa' },
{ value: 'marca', label: 'Marca' },
{ value: 'modelo', label: 'Modelo' },
{ value: 'tipoVehiculo', label: 'Tipovehiculo' },
{ value: 'cargaMaxima', label: 'Cargamaxima' },
{ value: 'capacidad', label: 'Capacidad' }
  ];

  constructor(private _vehiculoService: VehiculoService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.getVehiculo();
  }

  getVehiculo() {
    this._vehiculoService.getAllVehiculos().subscribe(data => {
      this.vehiculos = data;
    });
  }

  filtrarDatos(datos: any[], terminoBusqueda: string, atributoSeleccionado: string): any[] {
    if (!terminoBusqueda || !atributoSeleccionado) {
      return datos;
    }

    const terminoBusquedaLower = terminoBusqueda.toLowerCase();

    return datos.filter(item => {
      if (item.hasOwnProperty(atributoSeleccionado)) {
        const atributoValor = item[atributoSeleccionado].toString().toLowerCase();
        return atributoValor.includes(terminoBusquedaLower);
      }
      return false;
    });
  }

  mostrarDialogAgregar() {
    this.vehiculo = {} as Vehiculo;
    this.displayDialog = true;
    this.editing = false;
  }

  mostrarDialogEditar(vehiculo: Vehiculo) {
    this.vehiculo = { ...vehiculo };
    this.displayDialog = true;
    this.editing = true;
  }

  cerrarDialog() {
    this.displayDialog = false;
  }

  guardarVehiculo() {
    if (this.editing) {
      this._vehiculoService.updateVehiculo(this.vehiculo.id!, this.vehiculo).subscribe(() => {
        this.messageService.add({ severity: 'success', summary: 'Vehiculo actualizado', detail: 'El vehiculo se ha actualizado correctamente.' });
        this.getVehiculo();
        this.cerrarDialog();
      });
    } else {
      this._vehiculoService.addVehiculo(this.vehiculo).subscribe(() => {
        this.messageService.add({ severity: 'success', summary: 'Vehiculo agregado', detail: 'El vehiculo se ha agregado correctamente.' });
        this.getVehiculo();
        this.cerrarDialog();
      });
    }
  }

  eliminarVehiculo(vehiculo: Vehiculo) {
    if (confirm('¿Estás seguro de que quieres eliminar este vehiculo?')) {
      this._vehiculoService.deleteVehiculo(vehiculo.id!).subscribe(() => {
        this.messageService.add({ severity: 'success', summary: 'Vehiculo eliminado', detail: 'El vehiculo se ha eliminado correctamente.' });
        this.getVehiculo();
      });
    }
  }

}
