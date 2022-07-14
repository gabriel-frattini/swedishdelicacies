import * as React from 'react';
import styles from './navigation.module.css';
import Link from 'next/link';
import { AllCollectionsType } from '@/lib/types';

interface NavbarProps {
  collections: AllCollectionsType;
}

export const Navigation = ({ collections }: NavbarProps) => {
  const [scrollPosX, setScrollPosX] = React.useState('0');
  const [activeItem, setActiveItem] = React.useState('');
  const ref = React.useRef<HTMLParagraphElement>(null);
  const handleClickedNavItem = (id: string) => {
    sessionStorage.setItem('navScrollX', scrollPosX);

    setActiveItem(id);
  };

  React.useEffect(() => {
    const storedScrollX = sessionStorage.getItem('navScrollX');
    if (storedScrollX) ref.current?.scrollTo({ left: parseInt(storedScrollX) });
  }, []);

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
        <a className={styles.navLink}>All Products</a>
      </Link>
      {collections &&
        collections.edges.map((edge) => (
          <Link
            key={edge.node.handle}
            replace
            href={`/products/${edge.node.handle}`}
          >
            <a
              onClick={() => handleClickedNavItem(edge.node.id)}
              className={[
                styles.navLink,
                activeItem === edge.node.handle && styles.activeLink,
              ].join(' ')}
            >
              {edge.node.handle}
            </a>
          </Link>
        ))}
    </nav>
  );
};
