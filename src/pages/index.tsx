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
import { useState } from "react"
import { Arrow } from "../components/Arrow"

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
  const [currentSlide, setCurrentSlide] = useState(0)
  const [loaded, setLoaded] = useState(false)

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    slides: {
      perView: 3,
      spacing: 30,
    },
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
    created() {
      setLoaded(true)
    },
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
    <S.HomeContainer className="navigation-wrapper">
      <S.SliderContainer ref={sliderRef} className="keen-slider">
        { products.map((product, index) => {
          return (
            <S.Product className={`keen-slider__slide number-slide${index}`} number-slide key={product.id}>
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
      </S.SliderContainer>

      {loaded && instanceRef.current && (
        <>
          <Arrow
            left
            onClick={(e: any) =>
              e.stopPropagation() || instanceRef.current?.prev()
            }
            disabled={currentSlide === 0}
          />

          <Arrow
            onClick={(e: any) =>
              e.stopPropagation() || instanceRef.current?.next()
            }
            disabled={
              currentSlide === instanceRef.current.track.details.slides.length - 1
            }
          />
        </>
      )}
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