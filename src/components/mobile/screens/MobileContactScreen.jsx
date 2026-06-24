import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FiSend, FiCheckCircle, FiClock } from 'react-icons/fi';
import { useApp } from '../../../context/AppContext';
import { CONTACT_CONTENT } from '../../../data/pageContent';
import {
  BUDGET_RANGES,
  FAQ_ITEMS,
  PROJECT_TYPES,
  TIMELINES,
} from '../../../data/contactForm';
import {
  M3Screen,
  M3Section,
  M3TextField,
  M3Button,
  M3ExpansionTile,
} from '../flutter/MobileUIKit';
import '../flutter/MobileUIKit.css';
import './MobileContactScreen.css';

const MobileContactScreen = () => {
  const { submitContact, loading } = useApp();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { form, success, faq, toast: toastCopy } = CONTACT_CONTENT;
  const fields = form.fields;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      company: '',
      projectType: '',
      budget: '',
      timeline: '',
      message: '',
    },
  });

  const onSubmit = async (data) => {
    try {
      const result = await submitContact(data);
      if (result.success) {
        toast.success(toastCopy.success);
        setIsSubmitted(true);
        reset();
        setTimeout(() => setIsSubmitted(false), 5000);
      } else {
        toast.error(result.error || toastCopy.error);
      }
    } catch {
      toast.error(toastCopy.unexpected);
    }
  };

  return (
    <M3Screen className="m3-contact">
      <section className="m3-contact-form-section" aria-label={form.title}>
        <div className="m3-contact-form-wrap">
          {isSubmitted ? (
            <div className="m3-contact-success">
              <FiCheckCircle size={48} />
              <h3>{success.title}</h3>
              <p>{success.message}</p>
            </div>
          ) : (
            <form className="m3-contact-form" onSubmit={handleSubmit(onSubmit)}>
              <header className="m3-contact-form-head">
                <h2>{form.title}</h2>
                <p>{form.subtitle}</p>
              </header>

              <M3TextField
                label={fields.name.label}
                id="m-name"
                {...register('name', { required: fields.name.required })}
                placeholder={fields.name.placeholder}
                error={errors.name?.message}
              />
              <M3TextField
                label={fields.email.label}
                id="m-email"
                type="email"
                {...register('email', {
                  required: fields.email.required,
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: fields.email.invalid,
                  },
                })}
                placeholder={fields.email.placeholder}
                error={errors.email?.message}
              />
              <div className="m3-form-row">
                <M3TextField
                  label={fields.phone.label}
                  id="m-phone"
                  type="tel"
                  {...register('phone')}
                  placeholder={fields.phone.placeholder}
                />
                <M3TextField
                  label={fields.company.label}
                  id="m-company"
                  {...register('company')}
                  placeholder={fields.company.placeholder}
                />
              </div>
              <M3TextField
                label={fields.projectType.label}
                id="m-projectType"
                as="select"
                {...register('projectType', { required: fields.projectType.required })}
                error={errors.projectType?.message}
              >
                <option value="">{fields.projectType.placeholder}</option>
                {PROJECT_TYPES.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </M3TextField>
              <div className="m3-form-row">
                <M3TextField label={fields.budget.label} id="m-budget" as="select" {...register('budget')}>
                  <option value="">{fields.budget.placeholder}</option>
                  {BUDGET_RANGES.map((b) => (
                    <option key={b.value} value={b.value}>
                      {b.label}
                    </option>
                  ))}
                </M3TextField>
                <M3TextField label={fields.timeline.label} id="m-timeline" as="select" {...register('timeline')}>
                  <option value="">{fields.timeline.placeholder}</option>
                  {TIMELINES.map((t) => (
                    <option key={t.value} value={t.value}>
                      {t.label}
                    </option>
                  ))}
                </M3TextField>
              </div>
              <M3TextField
                label={fields.message.label}
                id="m-message"
                as="textarea"
                rows={5}
                {...register('message', { required: fields.message.required })}
                placeholder={fields.message.placeholder}
                error={errors.message?.message}
              />

              <M3Button type="submit" variant="filled" fullWidth disabled={loading}>
                {loading ? (
                  <>
                    <FiClock size={18} />
                    {form.sending}
                  </>
                ) : (
                  <>
                    <FiSend size={18} />
                    {form.submit}
                  </>
                )}
              </M3Button>
            </form>
          )}
        </div>
      </section>

      <M3Section title={faq.title}>
        <div className="m3-contact-faq">
          {FAQ_ITEMS.map((item) => (
            <M3ExpansionTile key={item.question} title={item.question}>
              {item.answer}
            </M3ExpansionTile>
          ))}
        </div>
      </M3Section>
    </M3Screen>
  );
};

export default MobileContactScreen;
