import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider, theme } from "@chakra-ui/react";
//import { extendTheme } from "@chakra-ui/theme";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

//const theme = extendTheme({});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ChakraProvider theme={theme}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ChakraProvider>
);

