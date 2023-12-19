import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
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

  constructor(
    private rectificadosService: RectificadosService,
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.getRectificadosList();
    this.getClientesList();
    this.getOperariosList();
    this.getEstadosList();
    this.initForm();
  }

  // Function to open the modal
  openModal() {
    this.modalService.open('addRectificadoModal', { centered: true }); // 'addRectificadoModal' is the modal ID
  }

  // Function to close the modal
  closeModal() {
    this.modalService.dismissAll(); // Close all open modals
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
    this.openModal();
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

    console.log(this.clienteForm.value.motores);

    var body = {
      clienteID: this.clienteForm.value.cliente.id,
      operarioID: this.clienteForm.value.operario.id,
      motores: this.clienteForm.value.motores,
      paraEnvio: this.clienteForm.value.paraEnvio,
    };

    try {
      this.rectificadosService.addRectificado(body).subscribe({
        next: (response) => {
          console.log(response);
          this.clienteForm.reset();
          this.closeModal();
          this.getRectificadosList();
        },
        error: (error) => {
          console.log(error);
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

  onDelete(id: number) {
    try {
      this.rectificadosService.deleteRectificado(id).subscribe({
        next: (response) => {
          console.log(response);
          this.getRectificadosList();
        },
        error: (error) => {
          console.log(error);
        },
      });
    } catch (error) {}
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
      cliente: this.clientes.find((c) => c.id === datos.cliente.id),
      operario: this.operarios.find((c) => c.id === datos.operario.id),
      paraEnvio: datos.paraEnvio,
      estado: this.estados.find((c) => c.id === datos.estado.id),
    });
  }
}
