import Stripe from "stripe"
import { GetStaticProps } from "next"
import Image from "next/future/image"
import {useKeenSlider} from 'keen-slider/react'
import { stripe } from "../lib/stripe"

import * as S from "../styles/pages/home"

import 'keen-slider/keen-slider.min.css'
import Link from "next/link"

interface HomeProps {
  products: {
    id: string
    name: string
    imageUrl: string
    price: string
  }[]
}

export default function Home({ products }: HomeProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 30,
    }
  })

  return (
    <S.HomeContainer ref={sliderRef} className="keen-slider">
      { products.map((product) => {
        return (
          <Link href={`/product/${product.id}`} key={product.id} prefetch={false}>
            <S.Product className="keen-slider__slide">
              <Image src={product.imageUrl} width={520} height={480} alt="" />
              <footer>
                <strong>{product.name}</strong>
                <span>{product.price}</span>
              </footer>
            </S.Product>
          </Link>
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
      price: Intl.NumberFormat('pt-br', {
        style: 'currency',
        currency: 'BRL',
      }).format(price.unit_amount / 100),
    }
  })

  return {
    props: {
      products
    },
    revalidate: 60 * 60 * 2 // 2 horas
  }
}