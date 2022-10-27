import { styled } from ".."

export const HomeContainer = styled('main', {
  display: 'flex',
  width: '100%',
  maxWidth: 'calc(100vw - ((100vw - 1180px) / 2))',
  marginLeft: 'auto',
  minHeight: 456,
  position: 'relative',
})

export const SliderContainer = styled('div',{
  width: '100%',
})

export const Product = styled('a', {
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  borderRadius: 8,
  padding: '0.25rem',
  position: 'relative',
  overflow: 'hidden',
  cursor: 'pointer',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  img: {
    objectFit: 'cover'
  },

  footer: {
    position: 'absolute',
    bottom: '0.25rem',
    left: '0.25rem',
    right: '0.25rem',
    padding: '1.5rem',
    borderRadius: 6,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    background: 'rgba(0, 0, 0, 0.6)',

    transform: 'translateY(110%)',
    opacity: 0,
    transition: 'all 0.2s ease-in-out',

    div: {
      strong: {
        display: 'block',
        fontSize: '$lg',
        color: '$gray100'
      },
  
      span: {
        display: 'block',
        fontSize: '$xl',
        fontWeight: 'bold',
        color: '$green300',
        marginTop: 8,
      }
    },

    button: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 0,
      backgroundColor: '$green500',
      color: '$white',
      cursor: 'pointer',
      border: 'none',
      borderRadius: 6,
      padding: 12,
      transition: 'background-color 0.2s',

      '&:hover': {
        backgroundColor: '$green300'
      }
    }
  },

  '&:hover': {
    footer: {
      transform: 'translateY(0%)',
      opacity: 1,
    }
  }
})