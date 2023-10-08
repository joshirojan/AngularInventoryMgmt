export type productModel = {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  categoryId: number;
  stock: number;
  // categoryName: string;
  category: {
    name: string;
  };
};
