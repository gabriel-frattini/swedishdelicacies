import * as React from 'react';
import { SkipNavContent, SkipNavLink } from './skip-nav';
import { Header } from './header';
import { Footer } from './footer';
import { Seo } from './seo';
import { AllCollectionsType } from '@/lib/types';

interface LayoutProps {
  children: any;
  collections: AllCollectionsType;
}

export function Layout({ children, collections }: LayoutProps) {
  return (
    <>
      <Seo />
      <SkipNavLink />
      <Header collections={collections} />
      <SkipNavContent>{children}</SkipNavContent>
      <Footer />
    </>
  );
}
