import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class PEDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang='en'>
        <Head>
          <meta name="description" content="An app for students to share and find projects" />
          <link rel='shortcut icon' href='/favicon.ico' type='image/x-icon' />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
