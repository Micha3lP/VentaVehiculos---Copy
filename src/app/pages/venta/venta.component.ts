import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Venta } from 'src/app/models/venta';
import { VentaService } from 'src/app/services/venta.service';

@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.scss'],
  providers: [MessageService]
})
export class VentaComponent implements OnInit {
  ventas: Venta[] = [];
  ventasFiltrados: Venta[] = [];
  terminoBusqueda: string = '';
  atributoSeleccionado = '';
  displayDialog: boolean = false;
  venta: Venta = {} as Venta;
  editing: boolean = false;

  atributos: { value: string, label: string }[] = [
    { value: 'id', label: 'Id' },
{ value: 'fechaVenta', label: 'Fechaventa' },
{ value: 'precioVenta', label: 'Precioventa' }
  ];

  constructor(private _ventaService: VentaService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.getVenta();
  }

  getVenta() {
    this._ventaService.getAllVentas().subscribe(data => {
      this.ventas = data;
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
    this.venta = {} as Venta;
    this.displayDialog = true;
    this.editing = false;
  }

  mostrarDialogEditar(venta: Venta) {
    this.venta = { ...venta };
    this.displayDialog = true;
    this.editing = true;
  }

  cerrarDialog() {
    this.displayDialog = false;
  }

  guardarVenta() {
    if (this.editing) {
      this._ventaService.updateVenta(this.venta.id!, this.venta).subscribe(() => {
        this.messageService.add({ severity: 'success', summary: 'Venta actualizado', detail: 'El venta se ha actualizado correctamente.' });
        this.getVenta();
        this.cerrarDialog();
      });
    } else {
      this._ventaService.addVenta(this.venta).subscribe(() => {
        this.messageService.add({ severity: 'success', summary: 'Venta agregado', detail: 'El venta se ha agregado correctamente.' });
        this.getVenta();
        this.cerrarDialog();
      });
    }
  }

  eliminarVenta(venta: Venta) {
    if (confirm('¿Estás seguro de que quieres eliminar este venta?')) {
      this._ventaService.deleteVenta(venta.id!).subscribe(() => {
        this.messageService.add({ severity: 'success', summary: 'Venta eliminado', detail: 'El venta se ha eliminado correctamente.' });
        this.getVenta();
      });
    }
  }

}
