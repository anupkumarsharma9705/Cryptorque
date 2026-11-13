import React from 'react';
import { ARTIFACTS, PROJECTS } from './data';
import { CopyButton, Reveal, SectionHeader, Tag } from './ui';
import { Icons } from './icons';

const metaLabel = (key) =>
  key
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (char) => char.toUpperCase())
    .toUpperCase();

function ArchitectureArtifact({ artifact }) {
  return (
    <div className="artifact-stack">
      <div className="arch">
        <div className="arch__pipeline">
          <div className="arch__pipeline-head mono">
            <span>GATEWAY :8081</span>
            <span>7-STAGE FILTER PIPELINE</span>
          </div>
          {artifact.stages.map((stage) => (
            <div className="arch__stage" key={stage.n}>
              <span className="arch__stage-num mono">{stage.n}</span>
              <span className="arch__stage-name">{stage.name}</span>
              <span className="arch__stage-detail mono">{stage.detail}</span>
            </div>
          ))}
        </div>

        <div className="arch__side">
          <div className="arch__block">
            <div className="arch__block-label mono">PROTECTED_API :8080</div>
            {artifact.backend.map((node) => (
              <div className="arch__node" key={node}>{node}</div>
            ))}
          </div>

          <div className="arch__block">
            <div className="arch__block-label mono">STATE_STORES</div>
            {artifact.stores.map((store) => (
              <div className="arch__store" key={store.name}>
                <span className="mono">{store.name}</span>
                <span>{store.detail}</span>
              </div>
            ))}
          </div>

          <div className="arch__legend mono">
            <span><i className="arch__dot arch__dot--red" /> request</span>
            <span><i className="arch__dot arch__dot--cyan" /> state</span>
            <span><i className="arch__dot arch__dot--gold" /> audit</span>
          </div>
        </div>
      </div>

      <ul className="artifact-notes">
        {artifact.notes.map((note) => (
          <li key={note}><span className="mono">//</span>{note}</li>
        ))}
      </ul>
    </div>
  );
}

function ThreatArtifact({ artifact }) {
  return (
    <div className="artifact-stack">
      <div className="artifact-summary mono">
        <span><strong>{artifact.meta.threats}</strong> threats</span>
        <span><strong>{artifact.meta.mitigated}</strong> mitigated</span>
        <span><strong>{artifact.meta.residual}</strong> residual</span>
      </div>

      <div className="table-wrap">
        <table className="threat-table">
          <thead>
            <tr>
              {artifact.headers.map((header) => <th key={header}>{header}</th>)}
              <th>STATUS</th>
            </tr>
          </thead>
          <tbody>
            {artifact.rows.map((row) => (
              <tr key={row[0]}>
                {row.map((cell, index) => (
                  <td key={cell} data-label={artifact.headers[index]}>{cell}</td>
                ))}
                <td data-label="STATUS">
                  <Tag color="green" dot>MITIGATED</Tag>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function K6Artifact({ artifact }) {
  const s = artifact.summary;
  const summary = [
    ['DURATION', s.duration],
    ['VIRTUAL USERS', s.virtualUsers],
    ['REQUESTS', s.totalRequests],
    ['THROUGHPUT', `${s.requestsPerSecond} rps`],
    ['AVG LATENCY', s.avgLatency],
    ['P95 LATENCY', s.p95Latency],
    ['P99 LATENCY', s.p99Latency],
    ['ERROR RATE', s.errorRate],
  ];

  const raw = JSON.stringify(
    {
      duration: s.duration,
      virtual_users: s.virtualUsers,
      total_requests: s.totalRequests,
      requests_per_second: s.requestsPerSecond,
      latency: {
        avg: s.avgLatency,
        p90: s.p90Latency,
        p95: s.p95Latency,
        p99: s.p99Latency,
        max: s.maxLatency,
      },
      error_rate: s.errorRate,
      attack_detection_rate: s.attackDetectionRate,
    },
    null,
    2,
  );

  return (
    <div className="artifact-stack">
      <div className="k6-summary">
        {summary.map(([label, value]) => (
          <div className="k6-summary__item" key={label}>
            <span className="k6-summary__label mono">{label}</span>
            <span className="k6-summary__value mono">{value}</span>
          </div>
        ))}
      </div>

      <div className="k6-grid">
        <div className="k6-block">
          <div className="k6-block__head mono">
            <span>THRESHOLDS</span>
            <Tag color="green">04 / 04 PASS</Tag>
          </div>
          <div className="k6-thresholds">
            {artifact.thresholds.map((threshold) => (
              <div className="k6-threshold" key={threshold.name}>
                <span className="mono k6-threshold__name">{threshold.name}</span>
                <span className="mono k6-threshold__rule">{threshold.rule}</span>
                <span className="mono k6-threshold__actual">{threshold.actual}</span>
                <Tag color="green">PASS</Tag>
              </div>
            ))}
          </div>
        </div>

        <div className="k6-block">
          <div className="k6-block__head mono">
            <span>SCENARIO_MIX</span>
            <span>VUs / RPS</span>
          </div>
          <div className="k6-scenarios">
            {artifact.scenarios.map((scenario) => (
              <div className="k6-scenario" key={scenario.name}>
                <div className="k6-scenario__top">
                  <span>{scenario.name}</span>
                  <span className="mono">{scenario.vus} VUs · {scenario.rps} rps</span>
                </div>
                <div className="k6-scenario__track" aria-hidden="true">
                  <span
                    className={`k6-scenario__bar k6-scenario__bar--${scenario.color}`}
                    style={{ width: scenario.width }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="code-block">
        <div className="code-block__head mono">
          <span>k6-summary.json</span>
          <CopyButton value={raw} label="Copy JSON" copiedLabel="Copied" />
        </div>
        <pre className="code-block__pre"><code>{raw}</code></pre>
      </div>

      <p className="artifact-footnote mono">
        <Icons.AlertTriangle size={13} />
        Full k6 report available on request. Numbers above are from a 60-second run, not a production SLA.
      </p>
    </div>
  );
}

function AdrArtifact({ artifact }) {
  return (
    <div className="artifact-stack">
      <div className="artifact-summary mono">
        <span><strong>{artifact.meta.total}</strong> records</span>
        <span><strong>{artifact.meta.accepted}</strong> accepted</span>
        <span><strong>{artifact.meta.proposed}</strong> proposed</span>
        <span><strong>{artifact.meta.deprecated}</strong> deprecated</span>
      </div>

      <div className="adr-list">
        {artifact.records.map((record, index) => (
          <details className="adr" key={record.id} open={index === 0}>
            <summary className="adr__summary">
              <span className="adr__id mono">{record.id}</span>
              <span className="adr__title">{record.title}</span>
              <Tag color={record.status === 'ACCEPTED' ? 'green' : 'gold'}>{record.status}</Tag>
              <span className="adr__date mono">{record.date}</span>
              <span className="adr__chevron" aria-hidden="true">
                <Icons.ChevronDown size={15} />
              </span>
            </summary>
            <div className="adr__body">
              <div className="adr__row">
                <span className="adr__label mono">CONTEXT</span>
                <p>{record.context}</p>
              </div>
              <div className="adr__row">
                <span className="adr__label mono">DECISION</span>
                <p>{record.decision}</p>
              </div>
              <div className="adr__row">
                <span className="adr__label mono">CONSEQUENCES</span>
                <p>{record.consequences}</p>
              </div>
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}

function ArtifactContent({ artifact }) {
  if (artifact.type === 'architecture') return <ArchitectureArtifact artifact={artifact} />;
  if (artifact.type === 'threats') return <ThreatArtifact artifact={artifact} />;
  if (artifact.type === 'k6') return <K6Artifact artifact={artifact} />;
  if (artifact.type === 'adr') return <AdrArtifact artifact={artifact} />;
  return null;
}

export default function Artifacts({ activeTab, setActiveTab }) {
  const active = ARTIFACTS.find((artifact) => artifact.id === activeTab) || ARTIFACTS[0];

  const handleTabKey = (event, index) => {
    let next = null;
    if (event.key === 'ArrowRight') next = (index + 1) % ARTIFACTS.length;
    if (event.key === 'ArrowLeft') next = (index - 1 + ARTIFACTS.length) % ARTIFACTS.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = ARTIFACTS.length - 1;
    if (next === null) return;

    event.preventDefault();
    const id = ARTIFACTS[next].id;
    setActiveTab(id);
    requestAnimationFrame(() => {
      document.getElementById(`artifact-tab-${id}`)?.focus();
    });
  };

  const meta = Object.entries(active.meta || {})
    .filter(([key]) => key !== 'reportUrl')
    .slice(0, 3);

  return (
    <section id="artifacts" className="section artifacts" aria-labelledby="artifacts-title">
      <div className="wrap">
        <SectionHeader
          index="04"
          label="ENGINEERING_ARTIFACTS"
          title="Receipts."
          description="Claims are cheap. These are the files behind the claims — the architecture, the threat model, the load test, and the decisions."
          aside={<span className="mono section-head__meta">04 FILES · READ_ONLY</span>}
        />

        <Reveal className="artifact-shell">
          <div className="artifact-shell__top mono">
            <span>ARTIFACTS // FIN_GATEWAY</span>
            <span className="artifact-shell__mode">READ_ONLY</span>
          </div>

          <div className="artifact-nav" role="tablist" aria-label="Engineering artifacts">
            {ARTIFACTS.map((artifact, index) => {
              const selected = artifact.id === active.id;
              return (
                <button
                  type="button"
                  key={artifact.id}
                  id={`artifact-tab-${artifact.id}`}
                  role="tab"
                  aria-selected={selected}
                  aria-controls="artifact-panel"
                  tabIndex={selected ? 0 : -1}
                  className={`artifact-tab${selected ? ' is-active' : ''}`}
                  onClick={() => setActiveTab(artifact.id)}
                  onKeyDown={(event) => handleTabKey(event, index)}
                >
                  <span className="artifact-tab__index mono">{String(index + 1).padStart(2, '0')}</span>
                  <span className="artifact-tab__label">
                    <span className="artifact-tab__file mono">{artifact.file}</span>
                    <span className="artifact-tab__title">{artifact.title}</span>
                  </span>
                </button>
              );
            })}
          </div>

          <div
            className="artifact-panel"
            id="artifact-panel"
            role="tabpanel"
            aria-labelledby={`artifact-tab-${active.id}`}
            tabIndex={0}
          >
            <div className="artifact-head">
              <div>
                <div className="artifact-head__path mono">
                  ~/fin-gateway/docs/{active.file.toLowerCase()}
                </div>
                <h3 className="artifact-head__title">{active.title}</h3>
                <p className="artifact-head__subtitle">{active.subtitle}</p>
              </div>
              <div className="artifact-head__meta">
                {meta.map(([key, value]) => (
                  <span className="mono" key={key}>
                    <small>{metaLabel(key)}</small>
                    {String(value)}
                  </span>
                ))}
                <a
                  className="artifact-head__link mono"
                  href={PROJECTS[0].repo}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  OPEN_REPO <Icons.ArrowUpRight size={13} />
                </a>
              </div>
            </div>

            <ArtifactContent artifact={active} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
