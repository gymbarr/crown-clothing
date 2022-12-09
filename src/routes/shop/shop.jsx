// import SHOP_DATA from '../../shop-data.json'

// import { ProductsProvider } from "../../contexts/product"
import { useContext } from 'react'
import { ProductsContext } from '../../contexts/products'


const Shop = () => {
  const { products } = useContext(ProductsContext)
  
  return (
    <div>
      <h1>The Shop</h1>
      {products.map(({id, name}) => (
        <div key={id}>
          <h1>{name}</h1>
        </div>
      ))}
    </div>
  )
}

export default Shop
