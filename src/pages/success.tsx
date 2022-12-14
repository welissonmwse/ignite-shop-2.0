import { GetServerSideProps } from 'next'
import Image from 'next/future/image'
import Link from 'next/link'
import { useEffect } from 'react'
import Stripe from 'stripe'
import { useShoppingCart } from 'use-shopping-cart'
import { stripe } from '../lib/stripe'
import * as S from '../styles/pages/success'

interface SuccessProps {
  customerName: string
  imageUrls: string[]
}

export default function Success({customerName, imageUrls = []}: SuccessProps) {
  const {clearCart} = useShoppingCart()

  useEffect(() => {
    clearCart()
  },[])

  return (
    <S.SuccessContainer>
      <S.ImageContainer>
        {imageUrls.map((imageUrl) => (
          <div key={imageUrl}>
            <Image src={imageUrl} width={120} height={110} alt=""/>
          </div>
        ))}
        
      </S.ImageContainer>

      <h1>Compra efetuada!</h1>

      <p>
        Uhuul <strong>{customerName}</strong>, sua compra de {imageUrls.length} camisetas já está a caminho da sua casa.
      </p>
      <Link href="/">
        <a>
          Voltar ao catálago
        </a>
      </Link>
    </S.SuccessContainer>
  )
}

export const getServerSideProps: GetServerSideProps = async ({query}) => {
  if(!query.session_id){
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }
  
  const sessionId = String(query.session_id)

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product']
  })

  const customerName = session.customer_details.name
  const imageUrls = session.line_items.data.map(data => {
    const product = data.price.product as Stripe.Product

    return product.images[0]
  })

  return {
    props: {
      customerName,
      imageUrls
    }
  }
}