import type { Product } from '../models/Product';
import { ProductType } from '../models/Product';

/**
 * Datos de productos del menú gourmet (simulados)
 * En un caso real, esto vendría del backend
 */
export const MENU_PRODUCTS: Product[] = [
  // Bebidas Gourmet
  {
    id: '1',
    name: 'Gin Tonic Premium',
    type: ProductType.DRINK,
    description: 'Gin Hendricks con tónica Fever-Tree y pepino',
    image: '/src/assets/Gin Tonic Premium.jpg',
  },
  {
    id: '2',
    name: 'Vino Tinto Reserva',
    type: ProductType.DRINK,
    description: 'Rioja Gran Reserva 2015',
    image: '/src/assets/Vino Tinto Reserva.jpg',
  },
  {
    id: '3',
    name: 'Champagne Brut',
    type: ProductType.DRINK,
    description: 'Moët & Chandon Imperial',
    image: '/src/assets/Champagne Brut.jpg',
  },
  {
    id: '4',
    name: 'Martini Clásico',
    type: ProductType.DRINK,
    description: 'Vodka Grey Goose con vermut seco',
    image: '/src/assets/Martini Clásico.jpg',
  },
  {
    id: '5',
    name: 'Whisky Old Fashioned',
    type: ProductType.DRINK,
    description: 'Bourbon premium con angostura y naranja',
    image: '/src/assets/Whisky Old Fashioned.jpg',
  },
  {
    id: '6',
    name: 'Agua San Pellegrino',
    type: ProductType.DRINK,
    description: 'Agua mineral italiana con gas',
    image: '/src/assets/Agua San Pellegrino.jpg',
  },

  // Platos Calientes Gourmet
  {
    id: '7',
    name: 'Risotto de Trufa Negra',
    type: ProductType.HOT_DISH,
    description: 'Arroz carnaroli con trufa negra y parmigiano reggiano',
    image: '/src/assets/Risotto de Trufa Negra.jpg',
  },
  {
    id: '8',
    name: 'Solomillo Wellington',
    type: ProductType.HOT_DISH,
    description: 'Filete envuelto en hojaldre con foie gras',
    image: '/src/assets/Solomillo Wellington.jpg',
  },
  {
    id: '9',
    name: 'Lubina al Horno',
    type: ProductType.HOT_DISH,
    description: 'Con verduras mediterráneas y aceite de albahaca',
    image: '/src/assets/Lubina al Horno.jpg',
  },
  {
    id: '10',
    name: 'Magret de Pato',
    type: ProductType.HOT_DISH,
    description: 'Con reducción de frutos rojos y puré de manzana',
    image: '/src/assets/Magret de Pato.jpg',
  },
  {
    id: '11',
    name: 'Ravioli de Langosta',
    type: ProductType.HOT_DISH,
    description: 'Pasta fresca rellena con salsa de azafrán',
    image: '/src/assets/Ravioli de Langosta.jpg',
  },
  {
    id: '12',
    name: 'Costillar de Cordero',
    type: ProductType.HOT_DISH,
    description: 'Con hierbas provenzales y patatas confitadas',
    image: '/src/assets/Costillar de Cordero.jpg',
  },

  // Ensaladas Gourmet
  {
    id: '13',
    name: 'Ensalada de Burrata',
    type: ProductType.COLD_DISH,
    description: 'Con tomates heirloom, rúcula y reducción balsámica',
    image: '/src/assets/Ensalada de Burrata.jpg',
  },
  {
    id: '14',
    name: 'Carpaccio de Res',
    type: ProductType.COLD_DISH,
    description: 'Con parmesano, rúcula y aceite de trufa',
    image: '/src/assets/Carpaccio de Res.png',
  },
  {
    id: '15',
    name: 'Tartar de Atún',
    type: ProductType.COLD_DISH,
    description: 'Con aguacate, sésamo y salsa ponzu',
    image: '/src/assets/Tartar de Atún.png',
  },
  {
    id: '16',
    name: 'Ensalada Nicoise',
    type: ProductType.COLD_DISH,
    description: 'Con atún fresco, huevo, aceitunas y anchoas',
    image: '/src/assets/Ensalada Nicoise.png',
  },
  
];
