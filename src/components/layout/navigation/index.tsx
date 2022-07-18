import * as React from 'react';
import styles from './navigation.module.css';
import Link from 'next/link';
import { AllCollectionsType } from '@/lib/types';
import { useRouter } from 'next/router';

interface NavbarProps {
  collections: AllCollectionsType;
  activePage: string;
}

export const Navigation = ({ collections, activePage }: NavbarProps) => {
  const router = useRouter();
  const [scrollPosX, setScrollPosX] = React.useState('0');
  const ref = React.useRef<HTMLParagraphElement>(null);

  const handleClickedNavItem = (id: string) => {
    sessionStorage.setItem('navScrollX', scrollPosX);
  };

  React.useEffect(() => {
    const storedScrollX = sessionStorage.getItem('navScrollX');
    if (storedScrollX)
      ref.current?.scrollTo({
        left: parseInt(storedScrollX),
        behavior: 'auto',
      });
  }, []);

  const slicedId = (id: string) => {
    if (id) {
      return id.split('/').slice(-1)[0];
    }
    return id;
  };
  return (
    <nav
      className={styles.navStyle}
      ref={ref}
      onScroll={() =>
        setScrollPosX(
          JSON.stringify(ref.current && ref.current.scrollLeft) || '0',
        )
      }
    >
      <Link key="All" href="/products/">
        <a
          className={[
            styles.navLink,
            activePage === '0' && styles.activeLink,
          ].join(' ')}
          onClick={() => handleClickedNavItem('0')}
        >
          All Products
        </a>
      </Link>
      {collections &&
        collections.edges
          .filter((item) => item.node.handle !== 'frontpage')
          .map((edge) => (
            <Link
              key={edge.node.handle}
              replace
              href={`/products/${edge.node.handle}`}
            >
              <a
                onClick={() => handleClickedNavItem(slicedId(edge.node.id))}
                className={[
                  styles.navLink,
                  slicedId(activePage) === slicedId(edge.node.id) &&
                    styles.activeLink,
                ].join(' ')}
              >
                {edge.node.handle}
              </a>
            </Link>
          ))}
    </nav>
  );
};
