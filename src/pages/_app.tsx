import { AppProps } from "next/app";
import { globalStyles } from "../styles/global";
import logoImg from '../assets/logo.svg'

import * as S from '../styles/pages/app'
import Image from "next/future/image";

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <S.Container>
      <S.Header>
        <Image src={logoImg} alt="" />
      </S.Header>
      <Component {...pageProps} />
    </S.Container>
  )
}
