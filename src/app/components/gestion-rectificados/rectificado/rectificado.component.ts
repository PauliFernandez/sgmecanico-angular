import { DatePipe } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Rectificado } from 'src/app/models/rectificado.model';
import { RectificadosService } from 'src/app/services/rectificado/rectificados.service';

@Component({
  selector: 'app-rectificado',
  templateUrl: './rectificado.component.html',
  styleUrls: ['./rectificado.component.scss'],
})
export class RectificadoComponent {
  rectificados: Rectificado[] = [];
  clientes: any[] = [];
  operarios: any[] = [];
  estados: any[] = [];
  clienteForm!: FormGroup;
  editForm!: FormGroup;
  curDate = new Date();
  selectedRectificado: any;
  deleteRectificadoId: number | null = null;
  @ViewChild('addRectificadoModal') addRectificadoModal!: ElementRef;
  @ViewChild('editRectificadoModal') editRectificadoModal!: ElementRef;

  constructor(
    private rectificadosService: RectificadosService,
    private fb: FormBuilder,
    private datePipe: DatePipe
  ) {}

  ngOnInit() {
    this.getRectificadosList();
    this.getClientesList();
    this.getOperariosList();
    this.getEstadosList();
    this.initForm();
  }

  closeModal(edits: boolean) {
    let modalElement;
    if (edits) {
      modalElement = this.editRectificadoModal.nativeElement;
    } else {
      modalElement = this.addRectificadoModal.nativeElement;
    }
    modalElement.classList.remove('show');
    modalElement.setAttribute('aria-hidden', 'true');
    modalElement.style.display = 'none';

    const modalBackdrop = document.querySelector('.modal-backdrop');
    if (modalBackdrop && modalBackdrop.parentNode) {
      modalBackdrop.parentNode.removeChild(modalBackdrop);
    }
  }

  initForm() {
    const firstEstadoDescripcion = this.estados[0]?.descripcion || '';
    this.clienteForm = this.fb.group({
      cliente: new FormControl(null),
      estado: new FormControl({ value: firstEstadoDescripcion }),
      operario: new FormControl(null),
      paraEnvio: new FormControl(false),
      motores: this.fb.array([
        this.fb.group({
          nroMotor: [''],
          marca: [''],
          modelo: [''],
          fabricacion: [new Date()],
        }),
      ]),
    });
    this.editForm = this.fb.group({
      cliente: new FormControl(null),
      estado: new FormControl(null),
      operario: new FormControl(null),
      paraEnvio: new FormControl(false),
      motores: this.fb.array([
        this.fb.group({
          nroMotor: [''],
          marca: [''],
          modelo: [''],
          fabricacion: [new Date()],
        }),
      ]),
    });
  }

  getRectificadosList() {
    try {
      this.rectificadosService.getAllRectificados().subscribe({
        next: (response) => {
          this.rectificados = response;
        },
        error: (error) => {},
      });
    } catch (error) {}
  }
  getClientesList() {
    try {
      this.rectificadosService.getAllClientes().subscribe({
        next: (response) => {
          this.clientes = response;
        },
        error: (error) => {},
      });
    } catch (error) {}
  }
  getOperariosList() {
    try {
      this.rectificadosService.getAllOperarios().subscribe({
        next: (response) => {
          this.operarios = response;
        },
        error: (error) => {},
      });
    } catch (error) {}
  }
  getEstadosList() {
    try {
      this.rectificadosService.getAllEstados().subscribe({
        next: (response) => {
          this.estados = response;
        },
        error: (error) => {},
      });
    } catch (error) {}
  }
  onSubmit() {
    for (
      let index = 0;
      index < this.clienteForm.value.motores.length;
      index++
    ) {
      const element = this.clienteForm.value.motores[index];
      element.fabricacion = this.datePipe.transform(
        element.fabricacion,
        'yyyy-MM-dd'
      );
    }

    var body = {
      clienteID: this.clienteForm.value.cliente.id,
      operarioID: this.clienteForm.value.operario.id,
      motores: this.clienteForm.value.motores,
      paraEnvio: this.clienteForm.value.paraEnvio,
    };

    try {
      this.rectificadosService.addRectificado(body).subscribe({
        next: () => {
          this.closeModal(false);
          this.clienteForm.reset();
          this.getRectificadosList();
        },
      });
    } catch (error) {}
  }

  get motores() {
    return this.clienteForm.get('motores') as FormArray;
  }

  addMotor() {
    if (this.motores.length < 3) {
      this.motores.push(
        this.fb.group({
          nroMotor: [''],
          marca: [''],
          modelo: [''],
          fabricacion: [new Date()],
        })
      );
    }
  }

  onConfirmDeleteClick() {
    try {
      this.rectificadosService
        .deleteRectificado(this.deleteRectificadoId)
        .subscribe({
          next: () => {
            this.getRectificadosList();
          },
        });
    } finally {
      this.deleteRectificadoId = null;
    }
  }

  onConfirmCancelClick() {
    this.deleteRectificadoId = null;
  }

  onDelete(id: number) {
    this.deleteRectificadoId = id;
  }

  onEdit(datos: any): void {
    this.selectedRectificado = datos;
    // Clear the form array
    const motoresArray = this.editForm.get('motores') as FormArray;
    motoresArray.clear();

    // Add a group for each motor
    datos.motores.forEach((motor: any) => {
      motoresArray.push(
        this.fb.group({
          nroMotor: [motor.nroMotor],
          marca: [motor.marca],
          modelo: [motor.modelo],
          fabricacion: [new Date(motor.fabricacion)],
        })
      );
    });

    this.editForm.patchValue({
      cliente: this.clientes.find((c) => c.dni === datos.cliente.dni),
      operario: this.operarios.find((c) => c.dni === datos.operario.dni),
      paraEnvio: datos.paraEnvio,
      estado: this.estados.find((c) => c.id === datos.estado.id),
    });
  }

  onModify() {
    var body = {
      ClienteId: this.editForm.value.cliente.dni,
      OperarioId: this.editForm.value.operario.id,
      EstadoId: this.editForm.value.estado.id,
      ParaEnvio: this.editForm.value.paraEnvio,
    };
    var id = this.selectedRectificado.id.toString();
    try {
      this.rectificadosService.editRectificado(id, body).subscribe({
        next: () => {
          this.closeModal(true);
          this.editForm.reset();
          this.getRectificadosList();
        },
      });
    } catch (error) {}
  }
}
