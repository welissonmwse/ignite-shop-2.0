import { AppProps } from "next/app";
import { CartProvider } from 'use-shopping-cart'
import { globalStyles } from "../styles/global";
import * as S from '../styles/pages/app'
import { Header } from "../components/Header";
import { ToastContainer } from 'react-toastify'
globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  const stripeKey = 'pk_test_51LkZlYLz8cnHSOmC6Gh6jQdRGXg3ncdjyR2CpyHWkdGo8locJN1DlNwmAHVW7nNOIwStoi80bC4OmzSYxnRJcS1y00MblXZhIV'
  
  return (
    <CartProvider
      cartMode="checkout-session"
      stripe={stripeKey}
      currency="BRL"
    >
      <ToastContainer autoClose={3000} theme="dark"/>
      <S.Container>
        <Header />
        <Component {...pageProps} />
      </S.Container>
    </CartProvider>
  )
}
