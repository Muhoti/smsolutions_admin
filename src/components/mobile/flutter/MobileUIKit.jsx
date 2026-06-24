import React from 'react';
import { Link } from 'react-router-dom';
import { FiChevronRight, FiChevronDown } from 'react-icons/fi';

export const M3Screen = ({ children, className = '', ...props }) => (
  <div className={`m3-screen ${className}`.trim()} {...props}>{children}</div>
);

export const M3Section = ({ title, subtitle, actionLabel, actionTo, children }) => (
  <section className="m3-section">
    <div className="m3-section-header">
      <div>
        {title && <h2 className="m3-section-title">{title}</h2>}
        {subtitle && <p className="m3-section-subtitle">{subtitle}</p>}
      </div>
      {actionLabel && actionTo && (
        <Link to={actionTo} className="m3-section-action">
          {actionLabel}
          <FiChevronRight size={16} />
        </Link>
      )}
    </div>
    {children}
  </section>
);

export const M3Card = ({ children, className = '', onClick, as: Tag = 'div' }) => (
  <Tag
    className={`m3-card ${onClick ? 'm3-card--interactive' : ''} ${className}`.trim()}
    onClick={onClick}
    role={onClick ? 'button' : undefined}
    tabIndex={onClick ? 0 : undefined}
  >
    {children}
  </Tag>
);

export const M3ListTile = ({
  leading,
  title,
  subtitle,
  trailing,
  onClick,
  href,
  className = '',
}) => {
  const content = (
    <>
      {leading && <span className="m3-list-tile-leading">{leading}</span>}
      <span className="m3-list-tile-content">
        {title && <span className="m3-list-tile-title">{title}</span>}
        {subtitle && <span className="m3-list-tile-subtitle">{subtitle}</span>}
      </span>
      {trailing && <span className="m3-list-tile-trailing">{trailing}</span>}
    </>
  );

  if (href) {
    return (
      <a href={href} className={`m3-list-tile ${className}`.trim()}>
        {content}
      </a>
    );
  }

  if (onClick) {
    return (
      <button type="button" className={`m3-list-tile ${className}`.trim()} onClick={onClick}>
        {content}
      </button>
    );
  }

  return <div className={`m3-list-tile ${className}`.trim()}>{content}</div>;
};

export const M3Chip = ({ label, active, onClick }) => (
  <button
    type="button"
    className={`m3-chip ${active ? 'm3-chip--selected' : ''}`}
    onClick={onClick}
  >
    {label}
  </button>
);

export const M3Button = ({
  children,
  variant = 'filled',
  to,
  href,
  onClick,
  type = 'button',
  disabled,
  fullWidth,
  className = '',
}) => {
  const cls = [
    'm3-button',
    `m3-button--${variant}`,
    fullWidth ? 'm3-button--full' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if (to) {
    return (
      <Link to={to} className={cls}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={cls}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} className={cls} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export const M3Progress = ({ value }) => (
  <div className="m3-progress" role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={100}>
    <div className="m3-progress-bar" style={{ width: `${value}%` }} />
  </div>
);

export const M3ExpansionTile = ({ title, subtitle, children, defaultOpen = false }) => {
  const [open, setOpen] = React.useState(defaultOpen);

  return (
    <div className={`m3-expansion ${open ? 'm3-expansion--open' : ''}`}>
      <button type="button" className="m3-expansion-header" onClick={() => setOpen((v) => !v)}>
        <span className="m3-expansion-text">
          <span className="m3-expansion-title">{title}</span>
          {subtitle && <span className="m3-expansion-subtitle">{subtitle}</span>}
        </span>
        <FiChevronRight className="m3-expansion-chevron" size={20} />
      </button>
      {open && <div className="m3-expansion-body">{children}</div>}
    </div>
  );
};

const parseSelectOptions = (children) =>
  React.Children.toArray(children)
    .filter(React.isValidElement)
    .map((child) => ({
      value: child.props.value ?? '',
      label: child.props.children,
      disabled: Boolean(child.props.disabled),
    }));

const M3SelectField = ({
  label,
  id,
  error,
  inputClass,
  children,
  onChange,
  onBlur,
  ref: fieldRef,
  name,
  value: controlledValue,
  defaultValue,
  disabled,
  ...selectProps
}) => {
  const options = React.useMemo(() => parseSelectOptions(children), [children]);
  const wrapRef = React.useRef(null);
  const nativeRef = React.useRef(null);
  const [open, setOpen] = React.useState(false);
  const [internalValue, setInternalValue] = React.useState(
    () => defaultValue ?? controlledValue ?? '',
  );

  const isControlled = controlledValue !== undefined;
  const currentValue = isControlled ? controlledValue : internalValue;
  const selectedOption = options.find((option) => String(option.value) === String(currentValue));
  const displayLabel = selectedOption?.label ?? '';
  const isPlaceholder = currentValue === '' || currentValue === undefined;

  const setSelectRef = (node) => {
    nativeRef.current = node;
    if (typeof fieldRef === 'function') {
      fieldRef(node);
    } else if (fieldRef) {
      fieldRef.current = node;
    }
    if (node && !isControlled) {
      setInternalValue(node.value);
    }
  };

  // Keep trigger label in sync when react-hook-form reset() updates the hidden select.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useLayoutEffect(() => {
    if (isControlled) return;
    const node = nativeRef.current;
    if (!node) return;
    setInternalValue((prev) => (prev === node.value ? prev : node.value));
  });

  React.useEffect(() => {
    if (!open) return undefined;

    const handlePointerDown = (event) => {
      if (!wrapRef.current?.contains(event.target)) {
        setOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  const commitValue = (nextValue) => {
    if (!isControlled) {
      setInternalValue(nextValue);
    }

    const node = nativeRef.current;
    if (node) {
      node.value = nextValue;
      onChange?.({ target: node, type: 'change' });
    }

    setOpen(false);
  };

  const handleTriggerBlur = (event) => {
    if (!wrapRef.current?.contains(event.relatedTarget)) {
      onBlur?.(event);
    }
  };

  const triggerClass = [
    inputClass,
    'm3-field-select-trigger',
    isPlaceholder ? 'm3-field-input--placeholder' : '',
    open ? 'm3-field-select-trigger--open' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <label className={`m3-field m3-field--select${error ? ' m3-field--error' : ''}`} htmlFor={id}>
      <span className="m3-field-label">{label}</span>
      <div className="m3-field-select-wrap" ref={wrapRef}>
        <button
          type="button"
          id={id}
          className={triggerClass}
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={`${id}-listbox`}
          onClick={() => !disabled && setOpen((isOpen) => !isOpen)}
          onBlur={handleTriggerBlur}
        >
          {displayLabel}
        </button>
        <FiChevronDown className="m3-field-select-chevron" size={18} aria-hidden />
        {open && (
          <ul className="m3-field-select-menu" id={`${id}-listbox`} role="listbox">
            {options.map((option) => {
              const isSelected = String(option.value) === String(currentValue);
              return (
                <li key={`${option.value}-${option.label}`} role="presentation">
                  <button
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    className={[
                      'm3-field-select-option',
                      option.value === '' ? 'm3-field-select-option--placeholder' : '',
                      isSelected ? 'm3-field-select-option--selected' : '',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                    disabled={option.disabled}
                    onMouseDown={(event) => {
                      event.preventDefault();
                      commitValue(option.value);
                    }}
                  >
                    {option.label}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
        <select
          ref={setSelectRef}
          name={name}
          className="m3-field-select-native"
          tabIndex={-1}
          aria-hidden="true"
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          {...(isControlled ? { value: controlledValue } : {})}
          {...(!isControlled && defaultValue !== undefined ? { defaultValue } : {})}
          {...selectProps}
        >
          {children}
        </select>
      </div>
      {error && <span className="m3-field-error">{error}</span>}
    </label>
  );
};

export const M3TextField = ({
  label,
  id,
  error,
  as = 'input',
  children,
  ...props
}) => {
  const inputClass = [
    'm3-field-input',
    as === 'select' ? 'm3-field-input--select' : '',
    error ? 'm3-field-input--error' : '',
  ]
    .filter(Boolean)
    .join(' ');

  if (as === 'select') {
    return (
      <M3SelectField
        label={label}
        id={id}
        error={error}
        inputClass={inputClass}
        {...props}
      >
        {children}
      </M3SelectField>
    );
  }

  const Tag = as;

  return (
    <label className="m3-field" htmlFor={id}>
      <span className="m3-field-label">{label}</span>
      <Tag id={id} className={inputClass} {...props}>
        {children}
      </Tag>
      {error && <span className="m3-field-error">{error}</span>}
    </label>
  );
};

export const M3Divider = () => <div className="m3-divider" role="separator" />;

export const M3Empty = ({ icon: Icon, title, message }) => (
  <div className="m3-empty">
    {Icon && <Icon size={40} />}
    {title && <h3>{title}</h3>}
    {message && <p>{message}</p>}
  </div>
);

export const M3Loading = ({ message = 'Loading…' }) => (
  <div className="m3-loading" role="status">
    <span className="m3-loading-spinner" />
    <p>{message}</p>
  </div>
);

export const M3Stepper = ({ steps }) => (
  <div className="m3-stepper">
    {steps.map((step, index) => (
      <div key={step.title} className="m3-stepper-item">
        <div className="m3-stepper-rail">
          <span className="m3-stepper-dot">{step.step}</span>
          {index < steps.length - 1 && <span className="m3-stepper-line" />}
        </div>
        <div className="m3-stepper-content">
          <h3>{step.title}</h3>
          <p>{step.description}</p>
        </div>
      </div>
    ))}
  </div>
);
