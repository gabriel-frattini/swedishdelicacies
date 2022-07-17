import * as React from 'react';
import { SkipNavContent, SkipNavLink } from '../skip-nav';
import { Header } from './header';
import { Footer } from './footer';
import { Seo } from '../seo';
import { AllCollectionsType } from '@/lib/types';

interface LayoutProps {
  children: any;
  collections: AllCollectionsType;
  activePage: string;
}

export function Layout({ children, collections, activePage }: LayoutProps) {
  return (
    <>
      <SkipNavLink />
      <Header collections={collections} activePage={activePage} />
      <SkipNavContent>{children}</SkipNavContent>
      <Footer />
    </>
  );
}
