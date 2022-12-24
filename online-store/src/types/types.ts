interface Features {
    brand: string,
    country: string,
    size: string,
    surface: string,
    application: string,
    drawing: string,
    rectified: string,
    packaging: string,
    count: number | string,
    weight: string,
}

interface DataCart {
  name: string,
  picture: string[],
  price: string,
  features: Features,
}

interface CartTable {
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

export { CartTable,DataCart,Features };