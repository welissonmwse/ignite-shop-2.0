import * as Dialog from '@radix-ui/react-dialog'
import Image from "next/future/image";
import { Handbag } from 'phosphor-react'
import * as S from './styles'
import logoImg from '../../assets/logo.svg'
import { CartModal } from '../CartModal';
import { useShoppingCart } from 'use-shopping-cart';
import Link from 'next/link';

export function Header(){
  const { cartCount } = useShoppingCart()
  return (
    <S.Header>
      <Link href="/">
        <Image src={logoImg} alt="" />
      </Link>
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <S.Bag>
            <Handbag size={20} weight="bold" />
            <span>{ cartCount }</span>
          </S.Bag>
        </Dialog.Trigger>
        <CartModal />
      </Dialog.Root>
    </S.Header>
  )
}