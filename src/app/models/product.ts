import { Especificacion } from './especificacion';

export class Product{
            uid: number;
            nombre: string;
            marca: string;
            descripcion: string;
            precio: number;
            existencia: number;
            especificacion: Especificacion[];

            constructor( uid:number,
                         nombre:string,
                         marca:string,
                         descripcion:string,
                         precio:number,
                         existencia:number,
                         especificacion: Especificacion[]){
            this.uid = uid;
            this.nombre = nombre;
            this.marca = marca;
            this.descripcion = descripcion;
            this.precio = precio;
            this.existencia = existencia;
            this.especificacion = especificacion;
            }
        }

        