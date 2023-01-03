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

interface ProductFilters {
  price: number[];
  rating?: number[];
  country?: CountryFilter;
  brand?: BrandFilter;
}
type PriceFilter = number [];
type RatingFilter = number [];
type CountryFilter = string [];
type BrandFilter = string [];

type productsArrayType = [ProductDescription];

interface checkedCategory {
    [key: string]: string;
}
type checkedArrayType = [checkedCategory];

export { ProductTable, ProductDescription, productsArrayType, checkedArrayType, ProductFilters, CountryFilter, BrandFilter };