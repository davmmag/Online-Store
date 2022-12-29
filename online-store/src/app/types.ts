interface ProductDescription {
  id: number;
  title: string;
  price: number;
  rating: number;
  category: string;
  thumbnail: string;
  images: string[];
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
}

interface ProductFilters {
  price?: number;
  rating?: number;
  brand?: string;
  country?: string;
}
type productsArrayType = [ProductDescription];

interface checkedCategory {
    [key: string]: string;
}
type checkedArrayType = [checkedCategory];

export { ProductDescription, productsArrayType, checkedArrayType, ProductFilters }