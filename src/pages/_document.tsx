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
          src="https://checkout.noramp.io/noramp.min.js"
          strategy="beforeInteractive"
        />
      </body>
    </Html>
  );
}
