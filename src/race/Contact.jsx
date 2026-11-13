import React, { useRef, useState } from 'react';
import { CHANNELS, CONTACT_FORM, CONTACT_SUBJECTS, PROFILE } from './data';
import {
  Button,
  CopyButton,
  Reveal,
  SectionHeader,
  StatusDot,
  Tag,
} from './ui';
import { Icons } from './icons';

const channelIcons = {
  email: <Icons.Mail size={15} />,
  linkedin: <Icons.LinkedIn size={15} />,
  github: <Icons.GitHub size={15} />,
  x: <Icons.XLogo size={15} />,
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const buildMailtoHref = ({ name, email, subject, message }) => {
  const body = [
    `Name: ${name.trim()}`,
    `Email: ${email.trim()}`,
    '',
    message.trim(),
  ].join('\n');

  return `mailto:${PROFILE.email}?subject=${encodeURIComponent(
    `[Portfolio] ${subject}`,
  )}&body=${encodeURIComponent(body)}`;
};

export default function Contact({ notify }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: CONTACT_SUBJECTS[0],
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [draftHref, setDraftHref] = useState('');
  const [sent, setSent] = useState(false);

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const messageRef = useRef(null);

  const updateField = (field) => (event) => {
    const { value } = event.target;
    setForm((current) => ({ ...current, [field]: value }));
    setSent(false);
    setDraftHref('');
    setErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const next = {};
    if (form.name.trim().length < 2) {
      next.name = 'Enter your name so the reply has a recipient.';
    }
    if (!EMAIL_PATTERN.test(form.email.trim())) {
      next.email = 'Enter a valid email address.';
    }
    if (form.message.trim().length < 12) {
      next.message = 'Add a little more detail — at least 12 characters.';
    }

    setErrors(next);

    if (Object.keys(next).length > 0) {
      const first = ['name', 'email', 'message'].find((key) => next[key]);
      const refs = { name: nameRef, email: emailRef, message: messageRef };
      refs[first]?.current?.focus();
      return;
    }

    const href = buildMailtoHref(form);
    setDraftHref(href);
    setSent(true);
    if (notify) notify('Mail client opened — review before sending.');
    window.location.href = href;
  };

  const resetForm = () => {
    setForm({
      name: '',
      email: '',
      subject: CONTACT_SUBJECTS[0],
      message: '',
    });
    setErrors({});
    setSent(false);
    setDraftHref('');
  };

  return (
    <section id="uplink" className="section contact" aria-labelledby="uplink-title">
      <div className="wrap">
        <SectionHeader
          index="07"
          label="OPEN_CHANNEL"
          title="Open a channel."
          description="Hiring, review, or a question about the architecture — all of it goes to the same inbox. No form backend, no tracking, no lead funnel."
          aside={<Tag color="green" dot>OPEN TO WORK</Tag>}
        />

        <div className="contact__grid">
          <div className="contact__left">
            <Reveal className="availability">
              <div className="availability__top">
                <span className="mono">AVAILABILITY // 2026</span>
                <StatusDot color="green" pulse label="OPEN" />
              </div>
              <h3 className="availability__title">Backend &amp; fintech roles</h3>
              <p className="availability__text">
                Full-time · Hyderabad / Remote-friendly. I read every message myself —
                no recruiting pipeline on the other side.
              </p>
              <dl className="availability__meta">
                <div>
                  <dt className="mono">ROLE</dt>
                  <dd>Security-first backend</dd>
                </div>
                <div>
                  <dt className="mono">BASE</dt>
                  <dd>Hyderabad, India</dd>
                </div>
                <div>
                  <dt className="mono">TIMEZONE</dt>
                  <dd>{PROFILE.timezone}</dd>
                </div>
                <div>
                  <dt className="mono">RESPONSE</dt>
                  <dd>IST business hours</dd>
                </div>
              </dl>
            </Reveal>

            <Reveal className="channels" delay={70}>
              <div className="channels__head mono">
                <span>CHANNELS</span>
                <span>{String(CHANNELS.length).padStart(2, '0')} OPEN</span>
              </div>

              {CHANNELS.map((channel) => (
                <div className={`channel channel--${channel.color}`} key={channel.id}>
                  <span className="channel__icon" aria-hidden="true">
                    {channelIcons[channel.id]}
                  </span>
                  <a
                    className="channel__body"
                    href={channel.href}
                    {...(channel.id !== 'email'
                      ? { target: '_blank', rel: 'noreferrer noopener' }
                      : {})}
                  >
                    <span className="channel__label mono">{channel.label}</span>
                    <span className="channel__value">{channel.value}</span>
                    <span className="channel__note">{channel.note}</span>
                  </a>
                  {channel.copy ? (
                    <CopyButton
                      value={channel.value}
                      label="Copy"
                      copiedLabel="Copied"
                      className="channel__copy"
                    />
                  ) : (
                    <span className="channel__arrow" aria-hidden="true">
                      <Icons.ArrowUpRight size={14} />
                    </span>
                  )}
                </div>
              ))}
            </Reveal>

            <Reveal className="resume-card" delay={130}>
              <span className="resume-card__icon" aria-hidden="true">
                <Icons.FileText size={18} />
              </span>
              <div className="resume-card__copy">
                <h3>Résumé available on request</h3>
                <p>One-page PDF · backend and security focus.</p>
              </div>
              <Button
                href={`mailto:${PROFILE.email}?subject=${encodeURIComponent(
                  '[Portfolio] Résumé request',
                )}`}
                variant="outline"
                size="sm"
                icon={<Icons.Mail size={13} />}
              >
                Request
              </Button>
            </Reveal>
          </div>

          <Reveal className="form-panel" delay={90}>
            <div className="form__head">
              <span className="mono">{CONTACT_FORM.title}</span>
              <span className="mono form__protocol">
                <span className="form__dot" aria-hidden="true" />
                MAILTO_PROTOCOL
              </span>
            </div>

            <form className="form" onSubmit={handleSubmit} noValidate>
              <div className="form__body">
                <div className="field-row">
                  <div className={`field${errors.name ? ' field--error' : ''}`}>
                    <div className="field__label">
                      <label htmlFor="contact-name">
                        NAME <em aria-hidden="true">*</em>
                      </label>
                    </div>
                    <input
                      ref={nameRef}
                      id="contact-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      value={form.name}
                      onChange={updateField('name')}
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? 'contact-name-error' : undefined}
                      placeholder="Your name"
                    />
                    {errors.name && (
                      <p className="field__error" id="contact-name-error" role="alert">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div className={`field${errors.email ? ' field--error' : ''}`}>
                    <div className="field__label">
                      <label htmlFor="contact-email">
                        EMAIL <em aria-hidden="true">*</em>
                      </label>
                    </div>
                    <input
                      ref={emailRef}
                      id="contact-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={form.email}
                      onChange={updateField('email')}
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? 'contact-email-error' : undefined}
                      placeholder="you@company.com"
                    />
                    {errors.email && (
                      <p className="field__error" id="contact-email-error" role="alert">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div className="field">
                  <div className="field__label">
                    <label htmlFor="contact-subject">SUBJECT</label>
                  </div>
                  <div className="select-wrap">
                    <select
                      id="contact-subject"
                      name="subject"
                      value={form.subject}
                      onChange={updateField('subject')}
                    >
                      {CONTACT_SUBJECTS.map((subject) => (
                        <option key={subject} value={subject}>
                          {subject}
                        </option>
                      ))}
                    </select>
                    <Icons.ChevronDown size={14} />
                  </div>
                </div>

                <div className={`field${errors.message ? ' field--error' : ''}`}>
                  <div className="field__label">
                    <label htmlFor="contact-message">
                      MESSAGE <em aria-hidden="true">*</em>
                    </label>
                    <span className="field__meta mono">
                      {String(form.message.length).padStart(3, '0')} / 1200
                    </span>
                  </div>
                  <textarea
                    ref={messageRef}
                    id="contact-message"
                    name="message"
                    rows={6}
                    maxLength={1200}
                    value={form.message}
                    onChange={updateField('message')}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? 'contact-message-error' : undefined}
                    placeholder="Role, team, timeline — or the specific design decision you want to discuss."
                  />
                  {errors.message && (
                    <p className="field__error" id="contact-message-error" role="alert">
                      {errors.message}
                    </p>
                  )}
                </div>

                {sent && (
                  <div className="form__success" role="status">
                    <Icons.CheckCircle size={16} />
                    <div>
                      <strong>{CONTACT_FORM.success}</strong>
                      <span>
                        If nothing opened,{' '}
                        <a href={draftHref}>open the draft manually</a> or copy the
                        address from the channel list.
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <div className="form__foot">
                <p>{CONTACT_FORM.note}</p>
                <div className="form__actions">
                  {sent && (
                    <button type="button" className="form__reset mono" onClick={resetForm}>
                      RESET
                    </button>
                  )}
                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    iconRight={<Icons.ArrowUpRight size={15} />}
                  >
                    {CONTACT_FORM.submit}
                  </Button>
                </div>
              </div>
            </form>
          </Reveal>
        </div>

        <p className="contact__note mono">
          <Icons.Shield size={13} />
          No server · no analytics · no third-party form service. Your message leaves
          through your own mail client.
        </p>
      </div>
    </section>
  );
}
