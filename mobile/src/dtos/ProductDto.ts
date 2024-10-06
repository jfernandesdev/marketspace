export type ProductDto = {
  id?: string;
  name: string;
  description: string;
  price: number;
  is_new: boolean;
  accept_trade: boolean;
  is_active: boolean;
  user_id: string;
}