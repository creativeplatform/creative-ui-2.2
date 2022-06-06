import React from "react";
import { AppProps } from "next/app";
import { Mumbai, Config, DAppProvider, useEthers } from "@usedapp/core";
import {
  ChakraProvider,
  Box,
  HStack,
  Icon,
  Stack,
  Text,
  Button,
} from "@chakra-ui/react";
// import theme from "../styles/theme";
import theme from "../styles/theme";
import Header from "../components/common/Navbar/header";
import Footer from "../components/common/Footer/footer";
import { BannerLink } from "../components/common/BannerLink";
import { BellIcon } from "@chakra-ui/icons";
import { StoreContainer } from "../utils/store";
import { getDefaultProvider } from "ethers";

import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "../services/apollo/apollo-client";
import { UserProvider } from "../services/context/users";

const config: Config = {
  readOnlyChainId: Mumbai.chainId,
  readOnlyUrls: {
    [Mumbai.chainId]: getDefaultProvider(`${process.env.NEXT_PUBLIC_MUMBAI}`),
  },
  notifications: {
    checkInterval: 1500,
    expirationPeriod: 5000,
  },
};

// Extend the theme to include custom colors, fonts, etc
// const colors = {
//   brand: {
//     200: "#FFCC80",
//     300: "#FF8A65",
//     400: "#EC407A",
//     500: "#E5395",
//     600: "#D32F2F",
//     700: "#FBC02D",
//    },
//  }

//  const theme = extendTheme({ colors })

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <DAppProvider config={config}>
      <ApolloProvider client={apolloClient()}>
        <ChakraProvider resetCSS theme={theme}>
          <StoreContainer.Provider>
            <UserProvider>
              <Box minH="100vh" minW="100vw">
                <Header children />
                <Box as="section" pt="8" pb="12">
                  <Stack
                    direction={{ base: "column", sm: "row" }}
                    justifyContent="center"
                    alignItems="center"
                    py="3"
                    px={{ base: "3", md: "6", lg: "8" }}
                    color="white"
                    bgGradient="linear(to-l, #FFCC80, #D32F2F, #EC407A)"
                  >
                    <HStack spacing="3">
                      <Icon as={BellIcon} fontSize="2xl" h="10" />
                      <Text fontWeight="medium" marginEnd="2" is="custom">
                        Creative platform is available on Testnet. Make sure you are connected to: <b>Mumbai Testnet</b>
                      </Text>
                    </HStack>
                    <BannerLink w={{ base: "full", sm: "auto" }} flexShrink={0}>
                      Add Mumbai Network
                    </BannerLink>
                  </Stack>
                </Box>
                <Component {...pageProps} />
                <Footer />
              </Box>
            </UserProvider>
          </StoreContainer.Provider>
        </ChakraProvider>
      </ApolloProvider>
    </DAppProvider>
  );
};

export default MyApp;
