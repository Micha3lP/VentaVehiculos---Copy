import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss'],
  providers: [MessageService]
})
export class ClienteComponent implements OnInit {
  clientes: Cliente[] = [];
  clientesFiltrados: Cliente[] = [];
  terminoBusqueda: string = '';
  atributoSeleccionado = '';
  displayDialog: boolean = false;
  cliente: Cliente = {} as Cliente;
  editing: boolean = false;

  atributos: { value: string, label: string }[] = [
    { value: 'id', label: 'Id' },
{ value: 'nombre', label: 'Nombre' },
{ value: 'direccion', label: 'Direccion' },
{ value: 'telefono', label: 'Telefono' },
{ value: 'correoElectronico', label: 'Correoelectronico' }
  ];

  constructor(private _clienteService: ClienteService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.getCliente();
  }

  getCliente() {
    this._clienteService.getAllClientes().subscribe(data => {
      this.clientes = data;
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
    this.cliente = {} as Cliente;
    this.displayDialog = true;
    this.editing = false;
  }

  mostrarDialogEditar(cliente: Cliente) {
    this.cliente = { ...cliente };
    this.displayDialog = true;
    this.editing = true;
  }

  cerrarDialog() {
    this.displayDialog = false;
  }

  guardarCliente() {
    if (this.editing) {
      this._clienteService.updateCliente(this.cliente.id!, this.cliente).subscribe(() => {
        this.messageService.add({ severity: 'success', summary: 'Cliente actualizado', detail: 'El cliente se ha actualizado correctamente.' });
        this.getCliente();
        this.cerrarDialog();
      });
    } else {
      this._clienteService.addCliente(this.cliente).subscribe(() => {
        this.messageService.add({ severity: 'success', summary: 'Cliente agregado', detail: 'El cliente se ha agregado correctamente.' });
        this.getCliente();
        this.cerrarDialog();
      });
    }
  }

  eliminarCliente(cliente: Cliente) {
    if (confirm('¿Estás seguro de que quieres eliminar este cliente?')) {
      this._clienteService.deleteCliente(cliente.id!).subscribe(() => {
        this.messageService.add({ severity: 'success', summary: 'Cliente eliminado', detail: 'El cliente se ha eliminado correctamente.' });
        this.getCliente();
      });
    }
  }

}
