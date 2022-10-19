import * as Dialog from '@radix-ui/react-dialog'
import Image from "next/future/image";
import { Handbag } from 'phosphor-react'
import * as S from './styles'
import logoImg from '../../assets/logo.svg'
import { CartModal } from '../CartModal';

export function Header(){
  return (
    <S.Header>
      <Image src={logoImg} alt="" />
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <S.Bag>
            <Handbag size={20} weight="bold" />
            <span>1</span>
          </S.Bag>
        </Dialog.Trigger>
        <CartModal />
      </Dialog.Root>
    </S.Header>
  )
}