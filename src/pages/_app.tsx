import { AppProps } from "next/app";
import { globalStyles } from "../styles/global";
import * as S from '../styles/pages/app'
import { Header } from "../components/Header";

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <S.Container>
      <Header />
      <Component {...pageProps} />
    </S.Container>
  )
}
