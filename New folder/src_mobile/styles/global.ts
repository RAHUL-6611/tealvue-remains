import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    user-select: none;
  }

  html,
  body {
    font-family: "Poppins", sans-serif;
    background-color: ${(p) => p.theme.palette.white};
  }

  html {
    /* font-size: 62.5%; */
    scroll-behavior: smooth;

    /* @media (max-width: 1200px) {
      font-size: 56.25%;
    }

	  @media (max-width: 900px) {
        font-size: 50%;
      }

    @media (max-width: 600px) {
        font-size: 43.75%;
    } */
  }


  :target {
    animation: background-fade 10s forwards;
    -webkit-animation: background-fade 3s forwards; /* Safari 4+ */
    -moz-animation:    background-fade 3s forwards; /* Fx 5+ */
    -o-animation:      background-fade 3s forwards; /* Opera 12+ */
    animation:         background-fade 3s forwards;
  }

  &::-webkit-scrollbar {
      /* width: 1em; */
    }

    &::-webkit-scrollbar-track {
      border-radius: 10px;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background: ${(p) => p.theme.palette.primary};
      transition: all 0.2s;
    }

    &::-webkit-scrollbar-thumb:hover {
      background: #56a0a0;
    }

  a {
    color: inherit;
    text-decoration: none;
  }

  ul {
    padding: 0;
    margin: 0;
    list-style: none;
  }
`;

export default GlobalStyle;
