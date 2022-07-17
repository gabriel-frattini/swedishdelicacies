import Document, {
  DocumentContext,
  DocumentInitialProps,
  Html,
  NextScript,
  Head,
  Main,
} from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext,
  ): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);

    return initialProps;
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="shortcut icon" href="/favicon/favicon.ico" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />

          <body>
            <Main />
            <NextScript />
          </body>
        </Head>
      </Html>
    );
  }
}

export default MyDocument;
