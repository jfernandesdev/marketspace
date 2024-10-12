import { PaymentMethodsDto } from "./PaymentMethods";
import { ProductImagesDto } from "./ProductImages";

export type ProductDto = {
  id?: string;
  name: string;
  description?: string;
  price: number;
  is_new: boolean;
  accept_trade: boolean;
  is_active: boolean;
  payment_methods: PaymentMethodsDto[];
  product_images: ProductImagesDto[]; // imagens do banco ou as imagens selecionadas
  user_id?: string;
  user?: {
    avatar?: string;
    name?: string;
    tel?: string;
  }
}
