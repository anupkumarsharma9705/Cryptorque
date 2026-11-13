import React, { useState } from 'react';
import { CERTS, CERT_FILTERS } from './data';
import { Reveal, SectionHeader, Tag } from './ui';
import { Icons } from './icons';

export default function Certifications() {
  const [filter, setFilter] = useState('ALL');
  const visible = filter === 'ALL' ? CERTS : CERTS.filter((cert) => cert.category === filter);

  return (
    <section id="certs" className="section certs" aria-labelledby="certs-title">
      <div className="wrap">
        <SectionHeader
          index="06"
          label="VERIFIED_SIGNALS"
          title="Verified signals."
          description="Security and backend foundations — not a badge collection. Every credential opens the original document."
          aside={<span className="mono section-head__meta">{String(CERTS.length).padStart(2, '0')} CREDENTIALS</span>}
        />

        <div className="cert-toolbar">
          <div className="filters" role="group" aria-label="Filter certifications">
            {CERT_FILTERS.map((option) => (
              <button
                type="button"
                key={option}
                className={`filter${filter === option ? ' is-active' : ''}`}
                aria-pressed={filter === option}
                onClick={() => setFilter(option)}
              >
                {option}
              </button>
            ))}
          </div>
          <span className="mono cert-count">
            {String(visible.length).padStart(2, '0')} / {String(CERTS.length).padStart(2, '0')} SHOWN
          </span>
        </div>

        <div className="cert-grid">
          {visible.map((cert, index) => (
            <Reveal
              as="article"
              className={`cert cert--${cert.color}`}
              key={cert.id}
              delay={index * 45}
            >
              <div className="cert__top">
                <span className="mono cert__issuer">{cert.issuer}</span>
                <span className="mono cert__year">{cert.year}</span>
              </div>

              <Tag color={cert.color}>{cert.category}</Tag>

              <h3 className="cert__title">{cert.title}</h3>
              <p className="cert__desc">{cert.description}</p>

              <div className="cert__topics">
                {cert.topics.map((topic) => (
                  <span className="cert__topic mono" key={topic}>{topic}</span>
                ))}
              </div>

              <div className="cert__foot">
                <span className="mono cert__status">
                  <Icons.CheckCircle size={13} />
                  VERIFIED
                </span>
                <a
                  className="cert__link mono"
                  href={cert.url}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  VIEW_CREDENTIAL
                  <Icons.ArrowUpRight size={13} />
                </a>
              </div>
            </Reveal>
          ))}
        </div>

        <p className="certs__note mono">
          Credentials open in a new tab. 02 security · 01 compliance · 02 development.
        </p>
      </div>
    </section>
  );
}
