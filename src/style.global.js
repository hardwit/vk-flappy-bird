import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  html, body {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: sans-serif;
    background: #eaeaea;
    user-select: none;
  }
`