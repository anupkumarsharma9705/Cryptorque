import React from 'react';
import { STACK, STACK_NOTE } from './data';
import { Reveal, SectionHeader, Tag } from './ui';

const totalSkills = STACK.reduce((sum, module) => sum + module.skills.length, 0);

export default function Stack() {
  return (
    <section id="stack" className="section stack" aria-labelledby="stack-title">
      <div className="wrap">
        <SectionHeader
          index="02"
          label="TECHNICAL_STACK"
          title="The toolchain."
          description="Grouped by where it sits in the request path. Levels are honest, and every module points to the project where it was used."
          aside={<span className="mono section-head__meta">{String(STACK.length).padStart(2, '0')} MODULES · {totalSkills} SIGNALS</span>}
        />

        <div className="stack__table">
          {STACK.map((module, index) => (
            <Reveal
              as="article"
              className={`stack-row stack-row--${module.color}`}
              key={module.id}
              delay={index * 45}
            >
              <div className="stack-row__head">
                <span className="stack-row__index mono">{module.index}</span>
                <div className="stack-row__title-wrap">
                  <h3 className="stack-row__title">{module.title}</h3>
                  <span className="stack-row__evidence mono">EVIDENCE // {module.evidence}</span>
                </div>
                <Tag color={module.color}>{module.level}</Tag>
              </div>

              <div className="stack-row__skills">
                {module.skills.map((skill) => (
                  <div className="skill" key={skill.name}>
                    <span className="skill__name">{skill.name}</span>
                    <span className="skill__note">{skill.note}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          ))}
        </div>

        <p className="stack__note mono">
          <span className="stack__note-mark" aria-hidden="true">¶</span>
          {STACK_NOTE}
        </p>
      </div>
    </section>
  );
}
