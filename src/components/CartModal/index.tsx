import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'phosphor-react'
import * as S from './styles'
export function CartModal(){
  return (
    <Dialog.Portal>
      <S.Content>
        <S.CloseButton>
          <X size={24} />
        </S.CloseButton>
        <Dialog.Title >Sacola de compras</Dialog.Title>
        <S.ModalBody>
          <S.CardContainer>
            <S.CardItem>
              <S.ImageContainer>

              </S.ImageContainer>
              <S.InfoContainer>
                <strong>Camiseta Explorer</strong>
                <span>R$ 62,90</span>
                <button>Remover</button>
              </S.InfoContainer>
            </S.CardItem>
            
          </S.CardContainer>
          <S.ModalFooter>
            <div>
              <span>Quantidade</span>
              <span>3 itens</span>
            </div>
            <div>
              <p>Valor total</p>
              <strong>R$ 270,00</strong>
            </div>
            <button>Finalizar Compra</button>
          </S.ModalFooter>
        </S.ModalBody>
      </S.Content>
    </Dialog.Portal>
  )
}