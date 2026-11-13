import React from 'react';
import { EDUCATION, EDUCATION_STATS } from './data';
import { Reveal, SectionHeader, Tag } from './ui';
import { Icons } from './icons';

const COURSEWORK = [
  'Data structures',
  'DBMS',
  'Operating systems',
  'Computer networks',
  'Software engineering',
  'OOP',
];

export default function Education() {
  return (
    <section id="log" className="section education" aria-labelledby="log-title">
      <div className="wrap">
        <SectionHeader
          index="05"
          label="TRAINING_LOG"
          title="Training log."
          description="The formal record. The projects above are where the real practice happened."
          aside={<span className="mono section-head__meta">2021 — 2025</span>}
        />

        <div className="edu__stats">
          {EDUCATION_STATS.map((stat) => (
            <Reveal className="edu-stat" key={stat.label} delay={40}>
              <span className="edu-stat__value mono">{stat.value}</span>
              <span className="edu-stat__label mono">{stat.label}</span>
            </Reveal>
          ))}
        </div>

        <div className="edu__list">
          {EDUCATION.map((item, index) => (
            <Reveal
              as="article"
              className={`edu__item edu__item--${item.color}`}
              key={item.index}
              delay={index * 55}
            >
              <div className="edu__period">
                <span className="edu__index mono">{item.index}</span>
                <span className="edu__years mono">{item.period}</span>
                <Tag color={item.color}>{item.grade}</Tag>
              </div>

              <div className="edu__content">
                <div className="edu__heading">
                  <h3>{item.degree}</h3>
                  <span className="edu__location mono">
                    <Icons.MapPin size={13} />
                    {item.location}
                  </span>
                </div>
                <p className="edu__institution">{item.institution}</p>
                <ul className="edu__highlights">
                  {item.highlights.map((highlight) => (
                    <li key={highlight}>
                      <span className="edu__bullet" aria-hidden="true" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="edu__coursework">
          <span className="mono edu__coursework-label">CORE_COURSEWORK</span>
          <div className="tech">
            {COURSEWORK.map((course) => (
              <Tag key={course} color="muted">{course}</Tag>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
