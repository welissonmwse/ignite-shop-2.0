import { styled } from "../../styles"

export const ArrowContainer = styled('svg',{
  width: 48,
  height: 48,
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  '-webkit-transform': 'translateY(-50%)',
  fill: '$gray300',
  cursor: 'pointer',

  '&.arrow--left': {
    left: 16,
  },
  
  '&.arrow--right': {
    left: 'auto',
    right: 16,
  },
  
  '&.arrow--disabled': {
    fill: 'transparent',
  },
})