import * as Dialog from '@radix-ui/react-dialog'
import { styled } from "../../styles"

export const Content = styled(Dialog.Content, {
  minWidth: '30rem',
  height: '100%',
  backgroundColor: '$gray800',
  padding: 48,
  position: 'fixed',
  top: 0,
  right: 0,
  overflowY: 'auto',
})

export const CloseButton = styled(Dialog.Close, {
  position: 'absolute',
  background: 'transparent',
  color: '$gray300',
  border: 0,
  top: '1.5rem',
  right: '1.5rem',
  lineHeight: 0,
  cursor: 'pointer',
})

export const ModalBody = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  marginTop: '3rem',
})

export const CardContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',
})

export const CardItem = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: 20,
  width: '100%',
})

export const ImageContainer = styled('div', {
  width: 102,
  height: 93,
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  borderRadius: 8,
  padding: '0.25rem',
  overflow: 'hidden',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  img: {
    objectFit: 'cover'
  },
})

export const InfoContainer = styled('div', {
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
  gap: 12,
  // width: '100%',

  strong: {
    display: 'block',
    fontSize: '$md',
    color: '$gray300'
  },

  span: {
    display: 'block',
    fontSize: '$md',
    fontWeight: 'bold',
    color: '$green100',
  },

  button: {
    backgroundColor: 'transparent',
    color: '$green500',
    display: 'inline',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '1rem',
    textAlign: 'left'
  }
})

export const ModalFooter = styled('footer', {
  marginTop: '4rem',
  div: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '1rem',

    span: {
      fontSize: '$md',
      color: '$gray300',
    },

    p: {
      color: '$gray100',
      fontSize: '$md',
      fontWeight: 'bold',
    },

    strong: {
      color: '$gray100',
      fontSize: '$xl',
      fontWeight: 'bold',
    }
  },

  button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    margin: '3.5rem 0 1rem',
    background: '$green500',
    color: '$white',
    border: 0,
    borderRadius: 8,
    padding: '1.25rem',
    // padding: 8,
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '$md',
    transition: 'background-color 0.2s',

    '&:disabled': {
      opacity: 0.6,
      cursor: 'not-allowed',
    },

    '&:not(:disabled):hover': {
      backgroundColor: '$green300'
    },

    div: {
      margin: 0,
      padding: 0,
    }
  }
})