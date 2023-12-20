import { Component, ViewChild, ElementRef } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { RectificadosService } from 'src/app/services/rectificado/rectificados.service';

@Component({
  selector: 'app-modulo-operario',
  templateUrl: './modulo-operario.component.html',
  styleUrls: ['./modulo-operario.component.scss'],
})
export class ModuloOperarioComponent {
  operarios: any[] = [];
  operarioForm!: FormGroup;
  @ViewChild('addOperarioModal') addOperarioModal!: ElementRef;
  editOperarioId: string = '';
  deleteOperarioId: string = '';

  constructor(
    private rectificadosService: RectificadosService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.getOperariosList();
    this.initForm();
  }

  initForm() {
    this.operarioForm = this.fb.group({
      nombre: new FormControl(null, Validators.required),
      apellido: new FormControl(null, Validators.required),
      dni: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(9),
        Validators.pattern(/^\d+$/),
        this.customDniValidator.bind(this),
      ]),
      fechaIngreso: new FormControl(null, Validators.required),
    });
  }

  customDniValidator(control: AbstractControl): ValidationErrors | null {
    const dniExists = this.operarios.some(
      (operario) => control.value === operario.dni
    );
    return dniExists ? { dniTaken: true } : null;
  }

  // Patch values of selected operario
  selectedOperario(operario: any) {
    this.editOperarioId = operario.id;
    this.operarioForm.patchValue({
      nombre: operario.nombre,
      apellido: operario.apellido,
      dni: operario.dni,
      fechaIngreso: this.formatDate(operario.fecha),
    });
  }

  addOperario(body: any) {
    try {
      this.rectificadosService.addOperario(body).subscribe({
        next: () => {
          this.operarioForm.reset();
          this.closeModal();
          this.getOperariosList();
        },
      });
    } catch (error) {}
  }

  deleteOperario(id: string) {
    this.deleteOperarioId = id;
  }

  onConfirmDeleteClick() {
    try {
      this.rectificadosService.deleteOperario(this.deleteOperarioId).subscribe({
        next: () => {
          this.getOperariosList();
        },
      });
    } finally {
      this.deleteOperarioId = '';
    }
  }

  onConfirmCancelClick() {
    this.deleteOperarioId = '';
  }

  getOperariosList() {
    try {
      this.rectificadosService.getAllOperarios().subscribe({
        next: (response) => {
          this.operarios = response;
        },
      });
    } catch (error) {}
  }

  onSubmit() {
    var body = {
      Id: this.editOperarioId,
      Nombre: this.operarioForm.value.nombre,
      Apellido: this.operarioForm.value.apellido,
      Dni: this.operarioForm.value.dni,
      Fecha: this.operarioForm.value.fechaIngreso,
    };
    if (this.editOperarioId) {
      this.editOperario(body);
      this.editOperarioId = '';
    } else {
      this.addOperario(body);
    }
  }

  editOperario(body: any) {
    try {
      this.rectificadosService
        .editOperario(this.editOperarioId, body)
        .subscribe({
          next: () => {
            this.operarioForm.reset();
            this.closeModal();
            this.getOperariosList();
          },
        });
    } catch (error) {}
  }

  closeModal() {
    const modalElement = this.addOperarioModal.nativeElement;
    modalElement.classList.remove('show');
    modalElement.setAttribute('aria-hidden', 'true');
    modalElement.style.display = 'none';

    const modalBackdrop = document.querySelector('.modal-backdrop');
    if (modalBackdrop && modalBackdrop.parentNode) {
      modalBackdrop.parentNode.removeChild(modalBackdrop);
    }
  }

  private formatDate(date: string) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  }
}
