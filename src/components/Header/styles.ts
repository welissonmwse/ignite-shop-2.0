import * as Dialog from '@radix-ui/react-dialog'
import { styled } from "../../styles";

export const Header = styled('header', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '2rem 0',
  width: '100%',
  maxWidth: 1180,
  margin: '0 auto',
})

export const Bag = styled('button', {
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 48,
  height: 48,
  border: 0,
  borderRadius: 6,
  background: '$gray800',
  cursor: 'pointer',

  svg: {
    color: '$gray300'
  },

  span: {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 4,
    minWidth: 32,
    minHeight: 32,
    borderRadius: '50%',
    border: '3px solid $gray900',
    background: '$green300',
    right: -14,
    top: -10,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14
  }
})
