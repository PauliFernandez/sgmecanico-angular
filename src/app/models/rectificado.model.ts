export class Rectificado {
  id: number;
  cliente: {
    nombre: string;
  };
  operario: {
    nombre: string;
    apellido: string;
    dni: string;
    fecha: string;
  };
  motores: {
    nroMotorId: string;
    marca: string;
    modelo: string;
    fabricacion: string;
  }[];
  pedidos: {
    fecha: string;
    proveedor: {
      nombre: string
    };
    lineasDePedido: {
      cantidad: number;
      insumo: {
        nombre: string;
        stock: number;
        precio: number;
      };
    }[];
  }[];
  fecha: string;
  paraEnvio: boolean;
  estado: {
    descripcion: string;
  };
  total: number;

  constructor() {
    this.id = 0;
    this.cliente = {
      nombre: ''
    };
    this.operario = {
      nombre: '',
      apellido: '',
      dni: '',
      fecha: ''
    };
    this.motores = [
      {
        nroMotorId: '',
        marca: '',
        modelo: '',
        fabricacion: ''
      }
    ];
    this.pedidos = [{
      fecha: '',
      proveedor: {
        nombre: ''
      },
      lineasDePedido: [
        {
          cantidad: 0,
          insumo: {
            nombre: '',
            precio: 0,
            stock: 0
          }
        }
      ]
    }];
    this.fecha = '';
    this.paraEnvio = false;
    this.estado = {
      descripcion: ''
    };
    this.total = 0;
  }
}
