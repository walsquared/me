import React from 'react'
import styled from 'styled-components'
import { useLocation } from '@reach/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp } from '@fortawesome/free-solid-svg-icons'

import { useScrollHeight } from 'hooks'
import { ThemeColor } from '../types'

const Button = styled.button<{ color: ThemeColor; isVisible: boolean }>`
  position: fixed;
  bottom: 5vh;
  right: 5vh;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid var(--black);
  width: 50px;
  height: 50px;
  padding: 0;

  transition: 0.1s ease-in;
  opacity: ${(props) => (props.isVisible ? 1 : 0)};

  span {
    display: none;
  }

  @media only screen and (min-width: 700px) {
    width: unset;
    height: unset;
    padding: 10px;

    span {
      display: flex;
      padding-left: 10px;
      font-size: 1rem;
    }

    &:hover {
      background-color: ${(props) => `var(--${props.color})`};
      cursor: pointer;
    }
  }
`

const BackToTopButton = () => {
  const scrollHeight = useScrollHeight()

  const pathname: Array<string> = useLocation().pathname.split('/')

  const colorMap = (route: string): ThemeColor => {
    switch (route) {
      case 'about':
        return 'green'
      case 'resume':
        return 'yellow'
      case 'blog':
        return 'blue'
      default:
        return 'red'
    }
  }

  return (
    <Button
      color={colorMap(pathname[1])}
      isVisible={scrollHeight >= window.innerHeight * 2}
      type='button'
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <FontAwesomeIcon icon={faChevronUp} size='2x' />
      <span>Back to Top</span>
    </Button>
  )
}

export default BackToTopButton
