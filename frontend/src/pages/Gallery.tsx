import React, { useState } from 'react';
import { GalleryItem } from '../types';

interface GalleryProps {
  gallery: GalleryItem[];
}

export const Gallery: React.FC<GalleryProps> = ({ gallery }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [activeLightbox, setActiveLightbox] = useState<GalleryItem | null>(null);

  // Extract only categories that actually exist in the gallery items
  const availableCategories = React.useMemo(() => {
    const cats = Array.from(new Set(gallery.map(item => item.category).filter(Boolean)));
    return cats.length > 0 ? ['All', ...cats] : [];
  }, [gallery]);

  // If activeCategory is not in available categories, reset to 'All'
  const currentCategory = availableCategories.includes(activeCategory) ? activeCategory : 'All';

  const filteredItems = currentCategory === 'All'
    ? gallery
    : gallery.filter(item => item.category.toLowerCase() === currentCategory.toLowerCase());

  return (
    <div>
      {/* Page Hero */}
      <section className="section-dark blueprint-grid" style={{ paddingBlock: 'clamp(4rem, 6vw, 6rem)', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: 820 }}>
          <div className="eyebrow" style={{ marginInline: 'auto' }}>
            <span className="eyebrow-dot"></span>
            <span>Real Field Execution • Zero Stock Imagery</span>
          </div>
          <h1 style={{ color: '#ffffff', marginBottom: '1rem' }}>
            Work Gallery.
          </h1>
          <p style={{ color: '#cbd5e1', fontSize: '1.2rem' }}>
            Photographic documentation of in-place line boring, flange facing, and shaft alignment performed inside New York Harbor shipyards.
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <div className="section section-white">
        <div className="container">
          {availableCategories.length > 1 && (
            <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '3rem' }}>
              {availableCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    padding: '0.55rem 1.25rem',
                    borderRadius: 2,
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.95rem',
                    textTransform: 'uppercase',
                    fontWeight: 600,
                    cursor: 'pointer',
                    border: currentCategory === cat ? '1px solid var(--color-steel-blue)' : '1px solid var(--color-border)',
                    background: currentCategory === cat ? 'var(--color-steel-blue)' : '#ffffff',
                    color: currentCategory === cat ? '#ffffff' : 'var(--color-navy)',
                    transition: 'var(--transition)'
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}

          {/* Gallery Grid */}
          {filteredItems.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 1rem', color: 'var(--color-steel-gray)' }}>
              <p style={{ fontSize: '1.1rem' }}>No projects available in this category yet.</p>
            </div>
          ) : (
            <div className="grid-3">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setActiveLightbox(item)}
                className="card"
                style={{
                  padding: 0,
                  overflow: 'hidden',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                }}
              >
                <div style={{ width: '100%', aspectRatio: '4 / 3', overflow: 'hidden', position: 'relative', background: 'var(--color-navy)' }}>
                  <img
                    src={item.image_url}
                    alt={item.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.4s ease' }}
                    className="gallery-thumb"
                  />
                  <span style={{
                    position: 'absolute',
                    top: '0.75rem',
                    left: '0.75rem',
                    background: 'rgba(4, 23, 35, 0.85)',
                    color: '#fff',
                    padding: '0.25rem 0.65rem',
                    borderRadius: 2,
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    textTransform: 'uppercase'
                  }}>
                    {item.category}
                  </span>
                </div>
                <div style={{ padding: '1.25rem 1.5rem' }}>
                  <h4 style={{ fontSize: '1.1rem', marginBottom: '0.35rem' }}>{item.title}</h4>
                  <p style={{ fontSize: '0.88rem', color: 'var(--color-steel-gray)' }}>{item.caption}</p>
                </div>
              </div>
            ))}
            </div>
          )}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeLightbox && (
        <div
          onClick={() => setActiveLightbox(null)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(4, 23, 35, 0.95)',
            zIndex: 2000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: 900, width: '100%', textAlign: 'center', position: 'relative' }}
          >
            <button
              onClick={() => setActiveLightbox(null)}
              style={{
                position: 'absolute',
                top: -45,
                right: 0,
                background: 'transparent',
                border: 'none',
                color: '#fff',
                fontSize: '2rem',
                cursor: 'pointer'
              }}
            >
              &times;
            </button>
            <img
              src={activeLightbox.image_url}
              alt={activeLightbox.title}
              style={{ maxHeight: '75vh', maxWidth: '100%', objectFit: 'contain', margin: '0 auto', borderRadius: 2 }}
            />
            <h3 style={{ color: '#fff', marginTop: '1rem', fontSize: '1.3rem' }}>{activeLightbox.title}</h3>
            <p style={{ color: '#cbd5e1', fontSize: '0.95rem' }}>{activeLightbox.caption}</p>
          </div>
        </div>
      )}
    </div>
  );
};
