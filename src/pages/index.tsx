import Stripe from "stripe"
import { GetStaticProps } from "next"
import Image from "next/future/image"
import {useKeenSlider} from 'keen-slider/react'
import { stripe } from "../lib/stripe"

import * as S from "../styles/pages/home"

import 'keen-slider/keen-slider.min.css'
import Link from "next/link"
import { Handbag } from "phosphor-react"
import { useShoppingCart, formatCurrencyString} from "use-shopping-cart"

interface ProductData {
  name: string
  id: string
  imageUrl: string
  price: number
  priceFormatted: string
  priceId: string
}
interface HomeProps {
  products: ProductData[]
}

export default function Home({ products }: HomeProps) {
  const { addItem, cartDetails } = useShoppingCart()
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 30,
    }
  })

  function handleAddItemToCart(product: ProductData) {
    if (cartDetails[product.id]) return () => {}
    
    addItem({
      currency: 'BRL',
      id: product.id,
      name: product.name,
      price: product.price,
      price_id: product.priceId,
      image: product.imageUrl,
    })
  }

  return (
    <S.HomeContainer ref={sliderRef} className="keen-slider">
      { products.map((product) => {
        return (
          <S.Product className="keen-slider__slide" key={product.id}>
            <Link href={`/product/${product.id}`} prefetch={false}>
              <Image src={product.imageUrl} width={520} height={480} alt="" />
            </Link>
            <footer>
              <div>
                <strong>{product.name}</strong>
                <span>{product.priceFormatted}</span>
              </div>
              <button onClick={() => handleAddItemToCart(product)}>
                <Handbag size={22} weight="bold" />
              </button>
            </footer>
          </S.Product>
        )
      })}
    </S.HomeContainer>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price']
  })

  const products = response.data.map(product => {
    const price = product.default_price as Stripe.Price

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: price.unit_amount,
      priceFormatted: formatCurrencyString({
        currency: 'BRL',
        value: price.unit_amount,
        language: 'pt-Br'
      }),
      priceId: price.id
    }
  })

  return {
    props: {
      products
    },
    revalidate: 60 * 60 * 2 // 2 horas
  }
}