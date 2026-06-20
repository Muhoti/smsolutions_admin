import React, { useMemo, useState } from 'react';
import { FiPlus, FiSearch, FiStar } from 'react-icons/fi';
import Button from '../ui/Button';
import AdminToolbar from './AdminToolbar';
import AdminPagination from './AdminPagination';
import MobileSectionHead from './MobileSectionHead';
import { paginate } from './adminConstants';

const TestimonialsPanel = ({ testimonials, onAdd }) => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return testimonials;
    return testimonials.filter((t) =>
      [t.name, t.company, t.review, t.title].some((f) => f?.toLowerCase().includes(q))
    );
  }, [testimonials, search]);

  const { items, page: safePage, totalPages, total } = paginate(filtered, page);

  const renderCard = (testimonial) => (
    <article key={testimonial.id} className="adm-m-testimonial-card">
      <div className="adm-testimonial-stars">
        {Array.from({ length: 5 }, (_, i) => (
          <FiStar key={i} size={14} className={i < (testimonial.rating || 5) ? 'filled' : ''} />
        ))}
      </div>
      <blockquote>&ldquo;{testimonial.review}&rdquo;</blockquote>
      <footer>
        <strong>{testimonial.name}</strong>
        <span>{testimonial.title}{testimonial.company ? ` · ${testimonial.company}` : ''}</span>
      </footer>
      {testimonial.featured && <span className="adm-badge adm-badge--featured">Featured</span>}
    </article>
  );

  return (
    <div className="adm-panel adm-panel--testimonials">
      <div className="adm-mobile-only adm-m-screen">
        <div className="adm-m-search-wrap">
          <FiSearch size={18} className="adm-m-search-icon" />
          <input
            type="search"
            className="adm-m-search"
            placeholder="Search testimonials…"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          />
        </div>

        <MobileSectionHead title={`${total} review${total !== 1 ? 's' : ''}`} />

        {total > 0 ? (
          <>
            <div className="adm-m-testimonial-list">
              {items.map(renderCard)}
            </div>
            <AdminPagination page={safePage} totalPages={totalPages} total={total} onPageChange={setPage} />
          </>
        ) : (
          <div className="adm-m-empty-card">
            <FiStar size={32} />
            <h3>{testimonials.length ? 'No matches' : 'No testimonials yet'}</h3>
            <p>Add client reviews to build trust.</p>
          </div>
        )}

        <button type="button" className="adm-fab" onClick={onAdd} aria-label="Add testimonial">
          <FiPlus size={24} />
        </button>
      </div>

      <div className="adm-desktop-only">
        <AdminToolbar
          search={search}
          onSearchChange={(v) => { setSearch(v); setPage(1); }}
          searchPlaceholder="Search testimonials…"
          actions={(
            <Button variant="primary" onClick={onAdd}>
              <FiPlus size={16} />
              Add testimonial
            </Button>
          )}
        />

        {total > 0 ? (
          <>
            <div className="adm-testimonial-grid">
              {items.map((t) => (
                <article key={t.id} className="adm-testimonial-card">
                  <div className="adm-testimonial-stars">
                    {Array.from({ length: 5 }, (_, i) => (
                      <FiStar key={i} size={14} className={i < (t.rating || 5) ? 'filled' : ''} />
                    ))}
                  </div>
                  <blockquote>&ldquo;{t.review}&rdquo;</blockquote>
                  <footer>
                    <strong>{t.name}</strong>
                    <span>{t.title}{t.company ? ` · ${t.company}` : ''}</span>
                  </footer>
                  {t.featured && <span className="adm-badge adm-badge--featured">Featured</span>}
                </article>
              ))}
            </div>
            <AdminPagination page={safePage} totalPages={totalPages} total={total} onPageChange={setPage} />
          </>
        ) : (
          <div className="adm-empty">
            <FiStar size={40} />
            <h3>No testimonials yet</h3>
            <p>Add client reviews to build trust on your website.</p>
            <Button variant="primary" onClick={onAdd}>
              <FiPlus size={16} />
              Add testimonial
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestimonialsPanel;
