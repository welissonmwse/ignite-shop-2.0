import { GetStaticPaths, GetStaticProps } from 'next'
import Image from 'next/future/image'
import Stripe from 'stripe'
import { toast } from 'react-toastify'
import { useShoppingCart, formatCurrencyString } from 'use-shopping-cart'
import { stripe } from '../../lib/stripe'
import * as S from '../../styles/pages/product'
import { useRouter } from 'next/router'
import { ProductLoader } from '../../components/ProductLoader'

interface ProductData {
  id: string
  name: string
  imageUrl: string
  price: number
  priceFormatted: string
  priceId: string
  description: string
}
interface ProductProps {
  product: ProductData
}

export default function Product({product}:ProductProps) {
  const {cartDetails, addItem} = useShoppingCart()
  const { isFallback } = useRouter()

  function handleAddItemToCart(product: ProductData){
    if(cartDetails[product.id]) return () => {}

    toast.success('Produto adicionado com sucesso')

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      price_id: product.priceId,
      image: product.imageUrl,
      currency: 'BRL'
    })
  }

  if(isFallback){
    return <ProductLoader />
  }

  return (
    <S.ProductContainer>
      <S.ImageContainer>
        <Image src={product.imageUrl} width={520} height={480} alt=""/>
      </S.ImageContainer>
      <S.ProductDetails>
        <h1>{product.name}</h1>
        <span>{product.priceFormatted}</span>
        <p>{product.description}</p>
        <button 
          onClick={() => handleAddItemToCart(product)
        }>
          Colocar na sacola
        </button>
      </S.ProductDetails>
    </S.ProductContainer>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths:[],
    fallback: true
  }
}

export const getStaticProps: GetStaticProps<any, {id: string}> = async({params}) => {
  const productId = params.id

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price']
  })

  const price = product.default_price as Stripe.Price

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: price.unit_amount,
        priceFormatted: formatCurrencyString({
          currency: 'BRL',
          value: price.unit_amount,
          language: 'pt-Br'
        }),
        description: product.description,
        priceId: price.id
      }
    },
    revalidate: 60 * 60 * 1 // 1 hora
  }
}
