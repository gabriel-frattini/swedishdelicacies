import * as React from 'react';
import Head from 'next/head';

interface CompProps {
  title?: string;
  description?: string;
  pathname?: string;
  image?: string;
  children?: any;
}

export function Seo({
  title,
  description,
  pathname,
  image,
  children = null,
}: CompProps) {
  const siteMetadata = {
    siteTitle: 'Swedish Delicacies',
    siteTitleDefault: 'Swedish Delicacies',
    siteDescription:
      'It’s a simple concept that started in our family house in Halmstad Sweden, with 1000+ products and 30k customers already.',
    siteUrl: 'https://swedishdelicacies.vercel.app',
    siteImage: 'https://swedishdelicacies.vercel.app/logo.png',
  };

  const { siteTitle, siteTitleDefault, siteUrl, siteDescription, siteImage } =
    siteMetadata;

  const seo = {
    title: title ? title : siteTitle,
    description: description ? description : siteDescription,
    url: pathname ? `${siteUrl}${pathname}` : siteUrl,
    image: image ? image : siteImage,
  };

  return (
    <Head>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta itemProp="name" content={seo.title} />
      <meta itemProp="description" content={seo.description} />
      <meta itemProp="image" content={seo.image} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:url" content={seo.url} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1"
      ></meta>
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link rel="shortcut icon" href="/favicon/favicon.ico" />

      {children}
    </Head>
  );
}
