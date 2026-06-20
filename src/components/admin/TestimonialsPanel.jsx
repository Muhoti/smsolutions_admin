import React, { useMemo, useState } from 'react';
import { FiPlus, FiStar } from 'react-icons/fi';
import Button from '../ui/Button';
import AdminToolbar from './AdminToolbar';
import AdminPagination from './AdminPagination';
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

  return (
    <div className="adm-panel">
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
            {items.map((testimonial) => (
              <article key={testimonial.id} className="adm-testimonial-card">
                <div className="adm-testimonial-stars">
                  {Array.from({ length: 5 }, (_, i) => (
                    <FiStar
                      key={i}
                      size={14}
                      className={i < (testimonial.rating || 5) ? 'filled' : ''}
                    />
                  ))}
                </div>
                <blockquote>&ldquo;{testimonial.review}&rdquo;</blockquote>
                <footer>
                  <strong>{testimonial.name}</strong>
                  <span>{testimonial.title}{testimonial.company ? ` · ${testimonial.company}` : ''}</span>
                </footer>
                {testimonial.featured && (
                  <span className="adm-badge adm-badge--featured">Featured</span>
                )}
              </article>
            ))}
          </div>
          <AdminPagination page={safePage} totalPages={totalPages} total={total} onPageChange={setPage} />
        </>
      ) : (
        <div className="adm-empty">
          <FiStar size={40} />
          <h3>{testimonials.length ? 'No matches' : 'No testimonials yet'}</h3>
          <p>Add client reviews to build trust on your website.</p>
          <Button variant="primary" onClick={onAdd}>
            <FiPlus size={16} />
            Add testimonial
          </Button>
        </div>
      )}
    </div>
  );
};

export default TestimonialsPanel;
