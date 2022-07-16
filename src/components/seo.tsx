import * as React from 'react';
import Head from 'next/head';

export function Seo({
  title = '',
  description = '',
  pathname = '',
  image = '',
  children = null,
}) {
  const siteMetadata = {
    siteTitle: 'Swedish Delicacies',
    siteTitleDefault: 'Swedish Delicacies',
    siteDescription: 'We sell swedish food',
    siteUrl: 'https://swedishdelicacies.vercel.app',
    siteImage: '',
  };

  const { siteTitle, siteTitleDefault, siteUrl, siteDescription, siteImage } =
    siteMetadata;

  const seo = {
    title: title,
    description: description,
    url: `${siteUrl}${pathname}`,
    image: image,
  };

  return (
    <Head>
      <meta name="description" content={seo.description} />
      <meta name="image" content={seo.image} />
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

      {children}
    </Head>
  );
}
