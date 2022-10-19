import axios from 'axios'
import { GetStaticPaths, GetStaticProps } from 'next'
import Image from 'next/future/image'
import { useState } from 'react'
import Stripe from 'stripe'
import { stripe } from '../../lib/stripe'
import * as S from '../../styles/pages/product'

interface ProductProps {
  product: {
    id: string
    name: string
    imageUrl: string
    price: string
    description: string
    defaultPriceId: string
  }
}

export default function Product({product}:ProductProps) {
  const [isCreatingChechoutSession, setIsCreatingChechoutSession] = useState(false)

  async function handleBuyProduct(){
    try {
      setIsCreatingChechoutSession(true)

      const response = await axios.post('/api/checkout', {
        priceId: product.defaultPriceId
      })

      const {checkoutUrl} = response.data

      window.location.href = checkoutUrl
    } catch (err) {
      setIsCreatingChechoutSession(false)
      console.log(err)
    }
  }

  return (
    <S.ProductContainer>
      <S.ImageContainer>
        <Image src={product.imageUrl} width={520} height={480} alt=""/>
      </S.ImageContainer>
      <S.ProductDetails>
        <h1>{product.name}</h1>
        <span>{product.price}</span>
        <p>{product.description}</p>
        <button disabled={isCreatingChechoutSession} onClick={handleBuyProduct}>
          Comprar agora
        </button>
      </S.ProductDetails>
    </S.ProductContainer>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths:[],
    fallback: 'blocking'
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
        price: Intl.NumberFormat('pt-br', {
          style: 'currency',
          currency: 'BRL',
        }).format(price.unit_amount / 100),
        description: product.description,
        defaultPriceId: price.id
      }
    },
    revalidate: 60 * 60 * 1 // 1 hora
  }
}
