import ImageMock from "@assets/products/thumb-lighting.png";

export type Product = {
  id: string;
  thumbnail: string;
  condition: "NOVO" | "USADO";
  title: string;
  price: number;
  ative?: boolean;
};

const productMock: Product[] = [
  {
    id: '1',
    thumbnail: ImageMock,
    condition: 'NOVO',
    title: 'Luminária pendente moderna',
    price: 120.00,
    ative: true,
  },
  {
    id: '2',
    thumbnail: ImageMock,
    condition: 'USADO',
    title: 'Sofá retrátil cinza',
    price: 550.00,
    ative: true,
  },
  {
    id: '3',
    thumbnail: ImageMock,
    condition: 'NOVO',
    title: 'Mesa de jantar 4 lugares',
    price: 800.00,
    ative: false,
  },
  {
    id: '4',
    thumbnail: ImageMock,
    condition: 'USADO',
    title: 'TV LED 42 polegadas',
    price: 950.00,
    ative: true,
  },
  {
    id: '5',
    thumbnail: ImageMock,
    condition: 'NOVO',
    title: 'Geladeira frost free',
    price: 1800.00,
    ative: true,
  },
  {
    id: '6',
    thumbnail: ImageMock,
    condition: 'USADO',
    title: 'Cadeira de escritório ergonômica',
    price: 250.00,
    ative: false,
  },
  {
    id: '7',
    thumbnail: ImageMock,
    condition: 'NOVO',
    title: 'Notebook gamer 16GB RAM',
    price: 3500.00,
    ative: true,
  },
  {
    id: '8',
    thumbnail: ImageMock,
    condition: 'USADO',
    title: 'Smartphone Android 128GB',
    price: 1200.00,
    ative: true,
  },
  {
    id: '9',
    thumbnail: ImageMock,
    condition: 'NOVO',
    title: 'Cafeteira expresso automática',
    price: 499.00,
    ative: true,
  }
];

export default productMock;
