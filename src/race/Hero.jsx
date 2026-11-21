import React from 'react';
import { HERO } from './data';
import { Button, Kbd, Sparkline, StatusDot, modKey, scrollToId } from './ui';
import { Icons } from './icons';

export default function Hero({ onOpenPalette }) {
  const t = HERO.telemetry;

  return (
    <section id="sys" className="hero" aria-labelledby="hero-title">
      <div className="hero__blueprint" aria-hidden="true" />

      <div className="wrap hero__inner">
        <div className="hero__copy">
          <div className="hero__eyebrow">
            <span className="eyebrow eyebrow--bare">{HERO.eyebrow}</span>
            <StatusDot color="green" pulse label="SYSTEM ONLINE" />
          </div>

          <h1 className="hero__title" id="hero-title">
            <span className="hero__title-line" style={{ '--line': 0 }}>{HERO.titleTop}</span>
            <span className="hero__title-line hero__title-line--accent" style={{ '--line': 1 }}>{HERO.titleAccent}</span>
            <span className="hero__title-line hero__title-line--muted" style={{ '--line': 2 }}>{HERO.titleMuted}</span>
          </h1>

          <p className="hero__sub">{HERO.sub}</p>

          <div className="hero__cta">
            <Button
              href="#gateways"
              variant="primary"
              size="lg"
              iconRight={<Icons.ArrowUpRight size={16} />}
              onClick={(event) => {
                event.preventDefault();
                scrollToId('gateways');
              }}
            >
              {HERO.primaryCta}
            </Button>
            <Button
              variant="ghost"
              size="lg"
              icon={<Icons.Terminal size={16} />}
              onClick={onOpenPalette}
            >
              {HERO.secondaryCta}
              <Kbd className="btn__kbd">{modKey} K</Kbd>
            </Button>
          </div>

          <dl className="hero__meta">
            {HERO.meta.map((item) => (
              <div className="hero__meta-item" key={item.label}>
                <dt>{item.label}</dt>
                <dd>{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <aside className="telemetry" aria-label="FinGateway load test telemetry">
          <span className="telemetry__corner telemetry__corner--tl" aria-hidden="true" />
          <span className="telemetry__corner telemetry__corner--tr" aria-hidden="true" />
          <span className="telemetry__corner telemetry__corner--bl" aria-hidden="true" />
          <span className="telemetry__corner telemetry__corner--br" aria-hidden="true" />

          <div className="telemetry__top">
            <span className={`telemetry__live${t.live ? '' : ' is-static'}`}>
              <span className="telemetry__live-dot" aria-hidden="true" />
              {t.state}
            </span>
            <span className="telemetry__module mono">{t.title}</span>
            <span className="telemetry__run mono">{t.run}</span>
          </div>

          <div className="telemetry__main">
            <div className="telemetry__primary">
              <div className="telemetry__value">
                {t.primary}
                <span>{t.primaryUnit}</span>
              </div>
              <div className="telemetry__label mono">{t.primaryLabel}</div>
              <div className="telemetry__note mono">{t.primaryNote}</div>
            </div>
            <Sparkline className="telemetry__spark" color="var(--cyan)" width={240} height={66} />
          </div>

          <div className="telemetry__metrics">
            {t.metrics.map((metric) => (
              <div className="telemetry__metric" key={metric.label}>
                <span className="telemetry__metric-label mono">{metric.label}</span>
                <span className="telemetry__metric-value mono">
                  {metric.value}
                  <small>{metric.unit}</small>
                </span>
              </div>
            ))}
          </div>

          <div className="telemetry__dist">
            <div className="telemetry__section-label mono">
              <span>LATENCY_DISTRIBUTION</span>
              <span>ms</span>
            </div>
            {t.distribution.map((row) => (
              <div className="telemetry__bar-row" key={row.label}>
                <span className="telemetry__bar-label mono">{row.label}</span>
                <span className="telemetry__bar-track" aria-hidden="true">
                  <span className="telemetry__bar" style={{ width: row.width }} />
                </span>
                <span className="telemetry__bar-value mono">{row.value}</span>
              </div>
            ))}
          </div>

          <div className="telemetry__log" aria-label="Verification log">
            {t.log.map((line) => (
              <div className="telemetry__log-line mono" key={line.text}>
                <span className="telemetry__ok">[ok]</span>
                <span>{line.text}</span>
              </div>
            ))}
          </div>

          <div className="telemetry__foot mono">
            <span>{t.source}</span>
            <span>{t.period}</span>
          </div>

          <span className="telemetry__scan" aria-hidden="true" />
        </aside>
      </div>

      <div className="wrap hero__scroll">
        <span className="mono">SCROLL TO INSPECT</span>
        <span className="hero__scroll-line" aria-hidden="true" />
        <Icons.ArrowDown size={14} />
      </div>
    </section>
  );
}
