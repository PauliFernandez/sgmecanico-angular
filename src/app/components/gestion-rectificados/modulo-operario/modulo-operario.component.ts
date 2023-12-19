import { Component, ViewChild, ElementRef } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
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
  isEditing: boolean = false;

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
      ]),
      fechaIngreso: new FormControl(null, Validators.required),
    });
  }

  // Patch values of selected operario
  selectedOperario(operario: any) {
    this.isEditing = true;
    this.operarioForm.patchValue({
      nombre: operario.nombre,
      apellido: operario.apellido,
      dni: operario.dni,
      fechaIngreso: operario.fecha,
    });
  }

  addOperario(body: any) {
    try {
      this.rectificadosService.addOperario(body).subscribe({
        next: (response) => {
          this.operarioForm.reset();
          this.closeModal();
          this.getOperariosList();
        },
      });
    } catch (error) {}
  }

  deleteOperario(id: number) {
    try {
      this.rectificadosService.deleteOperario(id).subscribe({
        next: (response) => {
          this.getOperariosList();
        },
        error: (error) => {
          console.log(error);
        },
      });
    } catch (error) {}
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
      nombre: this.operarioForm.value.nombre,
      apellido: this.operarioForm.value.apellido,
      dni: this.operarioForm.value.dni,
      fecha: this.operarioForm.value.fechaIngreso,
    };
    if (this.isEditing) {
      this.isEditing = false;
      this.editOperario(body);
    } else {
      this.addOperario(body);
    }
  }

  editOperario(body: any) {
    try {
      this.rectificadosService.addRectificado(body).subscribe({
        next: () => {
          this.operarioForm.reset();
          this.closeModal();
          this.getOperariosList();
        },
        error: (error) => {
          console.log(error);
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

    // para resetear el scroll
    // document.body.classList.remove('modal-open');
    // document.body.style.paddingRight = '';
  }
}
