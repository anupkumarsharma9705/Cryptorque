import React from 'react';
import { CURRENTLY, PRINCIPLES, PROFILE, SPECS } from './data';
import { Reveal, SectionHeader, Tag } from './ui';
import { Icons } from './icons';

export default function About() {
  return (
    <section id="profile" className="section about" aria-labelledby="profile-title">
      <div className="wrap">
        <SectionHeader
          index="01"
          label="ENGINEER_PROFILE"
          title="Engineer, measured."
          description="Not a list of technologies. A way of working — and the evidence that it produces something real."
          aside={<Tag color="gold">EARLY-CAREER · 2025</Tag>}
        />

        <div className="about__grid">
          <Reveal className="about__card">
            <div className="id-card">
              <div className="id-card__top">
                <span className="mono id-card__label">DRIVER_ID // AKS-07</span>
                <span className="id-card__status mono">
                  <span className="id-card__status-dot" aria-hidden="true" />
                  AVAILABLE
                </span>
              </div>

              <div className="id-card__identity">
                <img
                  className="id-card__logo"
                  src="/race/wolf-128.webp"
                  width="64"
                  height="64"
                  alt=""
                  aria-hidden="true"
                />
                <div className="id-card__name">
                  <h3>{PROFILE.name}</h3>
                  <p>{PROFILE.role}</p>
                  <p className="id-card__focus">{PROFILE.focus}</p>
                </div>
                <span className="id-card__number" aria-hidden="true">07</span>
              </div>

              <div className="id-card__specs">
                {SPECS.map((spec) => (
                  <div className="id-card__spec" key={spec.label}>
                    <span className="mono id-card__spec-label">{spec.label}</span>
                    <span className="id-card__spec-value">{spec.value}</span>
                    <Tag color={spec.color}>{spec.tag}</Tag>
                  </div>
                ))}
              </div>

              <div className="id-card__foot mono">
                <span>{PROFILE.clearance}</span>
                <span>HYD / IN</span>
              </div>

              <div className="id-card__barcode" aria-hidden="true" />
            </div>
          </Reveal>

          <Reveal className="about__body" delay={90}>
            <p className="about__lead">
              I build the layer between a request and the money it moves.
            </p>

            <p className="about__text">
              My work sits where backend reliability meets security engineering: Spring Boot
              services, Redis-backed state, MySQL audit trails, and request pipelines that assume
              the input is hostile. I care about the unglamorous parts — idempotency keys, sliding
              windows, failure modes, and the audit log that proves what happened.
            </p>

            <p className="about__text">
              I’m early in my career, and I won’t pretend otherwise. I graduated in 2025. What I
              can show you is how I think: every project here is documented like a system I’d have
              to operate, not a demo I’d have to present.
            </p>

            <blockquote className="about__quote">
              “The interesting part isn’t getting the request through. It’s deciding whether it
              should have been allowed in the first place.”
            </blockquote>

            <div className="principles">
              {PRINCIPLES.map((principle) => (
                <div className="principle" key={principle.index}>
                  <span className="principle__index mono">{principle.index}</span>
                  <h3 className="principle__title">{principle.title}</h3>
                  <p className="principle__body">{principle.body}</p>
                </div>
              ))}
            </div>

            <div className="currently">
              <div className="currently__head mono">
                <Icons.Pulse size={14} />
                CURRENT_FOCUS
              </div>
              <div className="currently__grid">
                {CURRENTLY.map((item) => (
                  <div className="currently__item" key={item.label}>
                    <span className="mono currently__label">{item.label}</span>
                    <span>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
