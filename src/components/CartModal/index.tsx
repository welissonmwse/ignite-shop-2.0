import * as Dialog from '@radix-ui/react-dialog'
import axios from 'axios'
import ReactLoading from 'react-loading'
import Image from 'next/future/image'
import { X } from 'phosphor-react'
import { useShoppingCart } from 'use-shopping-cart'
import * as S from './styles'
import { useState } from 'react'

export function CartModal(){
  const [isRedirectUserToCheckout, setIsRedirectUserToCheckout] = useState(false)

  const { 
    totalPrice, 
    cartDetails, 
    cartCount, 
    removeItem, 
    redirectToCheckout
  } = useShoppingCart()

  const products = Object.keys(cartDetails).map(key => cartDetails[key])

  async function handleRedirectUserToCheckout() {
    setIsRedirectUserToCheckout(true)
    try {
      const response = await axios.post('/api/checkout', {
        items: cartDetails
      })

      const { checkoutSessionId } = response.data
      const result = await redirectToCheckout(checkoutSessionId)
      if (result?.error) {
        console.error('Result error: ', result)
      }

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Dialog.Portal>
      <S.Content>
        <S.CloseButton>
          <X size={24} />
        </S.CloseButton>
        <Dialog.Title >Sacola de compras</Dialog.Title>
        <S.ModalBody>
          <S.CardContainer>
            {products.map(product => (
              <S.CardItem key={product.id}>
                <S.ImageContainer>
                  <Image src={product.image} width={102} height={93} alt="" />
                </S.ImageContainer>
                <S.InfoContainer>
                  <strong>{product.name}</strong>
                  <span>{product.formattedPrice}</span>
                  <button onClick={() => removeItem(product.id)}>
                    Remover
                  </button>
                </S.InfoContainer>
              </S.CardItem>

            ))}
            
          </S.CardContainer>
          <S.ModalFooter>
            <div>
              <span>Quantidade</span>
              <span>{cartCount} itens</span>
            </div>
            <div>
              <p>Valor total</p>
              <strong>
                { Intl.NumberFormat('pt-br', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(totalPrice / 100) }
            </strong>
            </div>
            <button onClick={handleRedirectUserToCheckout} disabled={isRedirectUserToCheckout}>
              {isRedirectUserToCheckout ? (
                <ReactLoading type={'spinningBubbles'} color="#FFF" width={18} height={18}/>
              ) : (
                <>Finalizar Compra</>
              )}
            </button>
          </S.ModalFooter>
        </S.ModalBody>
      </S.Content>
    </Dialog.Portal>
  )
}

