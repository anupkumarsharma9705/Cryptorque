import React, { useState } from 'react';
import { PROJECTS } from './data';
import { Button, Reveal, SectionHeader, Tag } from './ui';
import { Icons } from './icons';

const priorityColor = {
  P0: 'red',
  P1: 'cyan',
  P2: 'muted',
};

export default function Projects({ onOpenArtifact }) {
  const [openId, setOpenId] = useState(
    PROJECTS.find((project) => project.expandedByDefault)?.id || PROJECTS[0]?.id,
  );

  const toggle = (id) => setOpenId((current) => (current === id ? null : id));

  return (
    <section id="gateways" className="section projects" aria-labelledby="gateways-title">
      <div className="wrap">
        <SectionHeader
          index="03"
          label="GATEWAY_SYSTEMS"
          title="Systems, not screenshots."
          description="Each project is a case study: the problem, the architecture, what broke, and the evidence that the fix held."
          aside={<span className="mono section-head__meta">{String(PROJECTS.length).padStart(2, '0')} CASES · 01 FLAGSHIP</span>}
        />

        <div className="projects__list">
          {PROJECTS.map((project, index) => {
            const open = openId === project.id;
            const bodyId = `project-body-${project.id}`;

            return (
              <Reveal
                as="article"
                className={`project${open ? ' is-open' : ''}`}
                key={project.id}
                delay={index * 60}
              >
                <button
                  type="button"
                  className="project__trigger"
                  aria-expanded={open}
                  aria-controls={bodyId}
                  onClick={() => toggle(project.id)}
                >
                  <span className="project__index mono">{project.index}</span>
                  <Tag color={priorityColor[project.priority]} className="project__priority">
                    {project.priority}
                  </Tag>
                  <span className="project__title-wrap">
                    <span className="project__title">{project.title}</span>
                    <span className="project__subtitle">{project.subtitle}</span>
                  </span>
                  <span className="project__tagline">{project.tagline}</span>
                  <span className="project__meta mono">
                    {project.type}
                    <span>{project.year}</span>
                  </span>
                  <Tag color="green" className="project__status">
                    {project.status}
                  </Tag>
                  <span className="project__chevron" aria-hidden="true">
                    <Icons.ChevronDown size={16} />
                  </span>
                </button>

                {open && (
                  <div className="project__body" id={bodyId}>
                    <div className="project__metrics">
                      {project.metrics.map((metric) => (
                        <div className="project__metric" key={metric.label}>
                          <span className="project__metric-value mono">
                            {metric.value}
                            <small>{metric.unit}</small>
                          </span>
                          <span className="project__metric-label mono">{metric.label}</span>
                        </div>
                      ))}
                    </div>

                    <div className="project__grid">
                      <div className="project__main">
                        <div className="block">
                          <span className="block__label mono">PROBLEM</span>
                          <p className="block__text">{project.problem}</p>
                        </div>

                        <div className="block">
                          <span className="block__label mono">ARCHITECTURE</span>
                          <p className="block__text">{project.architecture}</p>
                        </div>

                        <div className="block">
                          <span className="block__label mono">IMPLEMENTATION</span>
                          <ol className="block__list">
                            {project.implementation.map((item, i) => (
                              <li key={item}>
                                <span className="mono">{String(i + 1).padStart(2, '0')}</span>
                                <p>{item}</p>
                              </li>
                            ))}
                          </ol>
                        </div>

                        <div className="block">
                          <span className="block__label mono">WHAT BROKE / WHAT FIXED IT</span>
                          <ul className="block__list block__list--plain">
                            {project.challenges.map((item) => (
                              <li key={item}>
                                <Icons.Zap size={14} />
                                <p>{item}</p>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <aside className="project__side">
                        <div className="flow">
                          <div className="flow__label mono">REQUEST_PIPELINE</div>
                          {project.stages.map((stage, i) => (
                            <div className="flow__stage" key={stage}>
                              <span className="flow__stage-num mono">
                                {String(i + 1).padStart(2, '0')}
                              </span>
                              <span className="flow__stage-name">{stage}</span>
                              {i < project.stages.length - 1 && (
                                <span className="flow__connector" aria-hidden="true" />
                              )}
                            </div>
                          ))}
                        </div>

                        <div className="side-block">
                          <span className="side-block__label mono">STACK</span>
                          <div className="tech">
                            {project.tech.map((tech) => (
                              <Tag key={tech} color="muted">{tech}</Tag>
                            ))}
                          </div>
                        </div>

                        <div className="side-block">
                          <span className="side-block__label mono">EVIDENCE</span>
                          <p className="project__note">{project.note}</p>
                          <div className="side-links">
                            <Button
                              href={project.repo}
                              variant="outline"
                              size="sm"
                              icon={<Icons.GitHub size={14} />}
                              iconRight={<Icons.ArrowUpRight size={14} />}
                            >
                              Source
                            </Button>
                            {project.id === 'fingateway' && onOpenArtifact && (
                              <>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  icon={<Icons.Pulse size={14} />}
                                  onClick={() => onOpenArtifact('load-test')}
                                >
                                  k6 evidence
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  icon={<Icons.Shield size={14} />}
                                  onClick={() => onOpenArtifact('threat-model')}
                                >
                                  Threat model
                                </Button>
                              </>
                            )}
                          </div>
                        </div>

                        <div className="side-block side-block--limits">
                          <span className="side-block__label mono">KNOWN_LIMITS // MITIGATIONS</span>
                          <ul className="limits">
                            {project.limits.map((limit) => (
                              <li key={limit}>
                                <Icons.AlertTriangle size={14} />
                                <span>{limit}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </aside>
                    </div>
                  </div>
                )}
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
