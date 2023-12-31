import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default function Document() {
  return (
    <Html>
      <Head />
      <body>
        <Main />
        <NextScript />
        <Script
          src="https://checkout-testnet.noramp.io/noramp.min.js"
          // src="http://localhost:4000/noramp.min.js"
          strategy="beforeInteractive"
        />
      </body>
    </Html>
  );
}
