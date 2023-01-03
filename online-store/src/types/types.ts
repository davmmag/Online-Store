interface ProductTable {
  brand: string,
  country: string,
  size: string,
  surface: string,
  application: string,
  drawing: string,
  rectified: string,
  packaging: string,
  count: string,
  weight: string,
}

interface ProductDescription {
  id: number;
  title: string;
  price: number;
  rating: number;
  brand: string;
  country: string;
  size: {
    width: number;
    height: number;
  };
  surface: string;
  application: string;
  drawing: string;
  rectified: string;
  packaging: string;
  count: number;
  weight: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export { ProductTable, ProductDescription };