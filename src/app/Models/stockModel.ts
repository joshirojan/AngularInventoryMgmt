export type stockModel = {
  id: number;
  productId: number;
  productName: string;
  productImage: string;
  quantity: number;
  createdDate: Date;
  product: {
    name: string;
    imageUrl: string;
  };
};
