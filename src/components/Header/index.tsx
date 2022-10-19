import * as S from './styles'
import Image from "next/future/image";
import { Handbag } from 'phosphor-react'
import logoImg from '../../assets/logo.svg'
import Link from 'next/link';

export function Header(){
  return (
    <S.Header>
      <Image src={logoImg} alt="" />
      <Link href="">
        <S.Bag>
          <Handbag size={20} weight="bold" />
          <span>1</span>
        </S.Bag>
      </Link>
    </S.Header>
  )
}