export type issueProductModel = {
  id:number;
  user: {
    fullName: string;
  };
  userId: number;
  product: {
    name: string;
  };
  productId: number;
  quantity: number;
  createdDate: Date;
};
