import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Icons } from './icons';
import { Kbd, useEscape, useFocusTrap, useLockBodyScroll } from './ui';

const GROUPS = [
  { id: 'navigate', label: 'NAVIGATE' },
  { id: 'action', label: 'ACTIONS' },
  { id: 'external', label: 'EXTERNAL' },
];

export default function CommandPalette({ open, onClose, commands }) {
  const panelRef = useRef(null);
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);

  useLockBodyScroll(open);
  useEscape(open, onClose);
  useFocusTrap(open, panelRef);

  useEffect(() => {
    if (!open) return undefined;
    setQuery('');
    setActive(0);
    const raf = requestAnimationFrame(() => inputRef.current?.focus());
    return () => cancelAnimationFrame(raf);
  }, [open]);

  const groups = useMemo(() => {
    const q = query.trim().toLowerCase();
    let index = 0;

    return GROUPS.map((group) => {
      const items = commands
        .filter((command) => command.group === group.id)
        .filter((command) => {
          if (!q) return true;
          const haystack = `${command.label} ${command.meta || ''} ${command.keywords || ''}`.toLowerCase();
          return haystack.includes(q);
        })
        .map((command) => ({ ...command, index: index++ }));
      return { ...group, items };
    }).filter((group) => group.items.length > 0);
  }, [commands, query]);

  const flat = useMemo(() => groups.flatMap((group) => group.items), [groups]);

  useEffect(() => {
    setActive(0);
  }, [query]);

  useEffect(() => {
    if (!open) return;
    const node = listRef.current?.querySelector(`[data-command-index="${active}"]`);
    node?.scrollIntoView({ block: 'nearest' });
  }, [active, open]);

  if (!open) return null;

  const run = (command) => {
    if (!command) return;
    command.run();
    onClose();
  };

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActive((current) => (flat.length ? (current + 1) % flat.length : 0));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActive((current) => (flat.length ? (current - 1 + flat.length) % flat.length : 0));
    } else if (event.key === 'Home') {
      event.preventDefault();
      setActive(0);
    } else if (event.key === 'End') {
      event.preventDefault();
      setActive(Math.max(flat.length - 1, 0));
    } else if (event.key === 'Enter') {
      event.preventDefault();
      run(flat[active]);
    }
  };

  return createPortal(
    <div
      className="palette"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        className="palette__panel"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
      >
        <div className="palette__top">
          <span className="palette__mark" aria-hidden="true">
            AKS
          </span>
          <span className="palette__module mono">COMMAND_PALETTE</span>
          <span className="palette__status mono">
            <span className="palette__status-dot" aria-hidden="true" />
            READY
          </span>
        </div>

        <div className="palette__input-row">
          <Icons.Search size={17} />
          <input
            ref={inputRef}
            className="palette__input"
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Jump to a module, action, or artifact…"
            role="combobox"
            aria-expanded="true"
            aria-controls="palette-list"
            aria-activedescendant={flat[active] ? `palette-command-${flat[active].id}` : undefined}
            aria-autocomplete="list"
            aria-label="Search commands"
            autoComplete="off"
            spellCheck="false"
          />
          <Kbd>ESC</Kbd>
        </div>

        <div className="palette__list" id="palette-list" role="listbox" ref={listRef} aria-label="Commands">
          {groups.length === 0 && (
            <div className="palette__empty">
              <span className="mono">NO_MATCH</span>
              <p>Try “gateway”, “threat”, “theme”, or “email”.</p>
            </div>
          )}

          {groups.map((group) => (
            <div className="palette__group" key={group.id} role="group" aria-labelledby={`palette-group-${group.id}`}>
              <div className="palette__group-label mono" id={`palette-group-${group.id}`}>
                {group.label}
                <span>{String(group.items.length).padStart(2, '0')}</span>
              </div>
              {group.items.map((command) => {
                const selected = command.index === active;
                return (
                  <button
                    key={command.id}
                    type="button"
                    id={`palette-command-${command.id}`}
                    data-command-index={command.index}
                    role="option"
                    aria-selected={selected}
                    className={`palette__item${selected ? ' is-active' : ''}`}
                    onMouseEnter={() => setActive(command.index)}
                    onClick={() => run(command)}
                  >
                    <span className="palette__item-icon" aria-hidden="true">
                      {command.icon}
                    </span>
                    <span className="palette__item-label">{command.label}</span>
                    {command.meta && <span className="palette__item-meta mono">{command.meta}</span>}
                    <span className="palette__item-enter" aria-hidden="true">
                      <Icons.CornerDownLeft size={13} />
                    </span>
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        <div className="palette__footer">
          <span><Kbd>↑</Kbd><Kbd>↓</Kbd> navigate</span>
          <span><Kbd>↵</Kbd> run</span>
          <span><Kbd>esc</Kbd> close</span>
          <span className="palette__footer-right mono">
            {flat.length} {flat.length === 1 ? 'COMMAND' : 'COMMANDS'}
          </span>
        </div>
      </div>
    </div>,
    document.body,
  );
}
