/**
 * Forms — validation, error messages, Web3Forms submission
 */
const form = document.querySelector('.contact-form');
if (form) {
  const successEl = document.querySelector('.form__success');

  function showError(field, message) {
    const errorEl = document.getElementById(field.id + '-error');
    if (errorEl) errorEl.textContent = message;
    field.setAttribute('aria-invalid', 'true');
  }

  function clearError(field) {
    const errorEl = document.getElementById(field.id + '-error');
    if (errorEl) errorEl.textContent = '';
    field.removeAttribute('aria-invalid');
  }

  function validateField(field) {
    const value = field.value.trim();

    if (field.required && !value) {
      showError(field, 'This field is required.');
      return false;
    }

    if (field.type === 'email' && value) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(value)) {
        showError(field, 'Please enter a valid email address.');
        return false;
      }
    }

    if (field.type === 'tel' && value) {
      const digits = value.replace(/\D/g, '');
      if (digits.length < 10) {
        showError(field, 'Please enter a valid phone number.');
        return false;
      }
    }

    if (field.tagName === 'SELECT' && field.required && !value) {
      showError(field, 'Please select an option.');
      return false;
    }

    clearError(field);
    return true;
  }

  /* Live validation on blur */
  form.querySelectorAll('input, select, textarea').forEach((field) => {
    field.addEventListener('blur', () => validateField(field));
    field.addEventListener('input', () => {
      if (field.getAttribute('aria-invalid') === 'true') {
        validateField(field);
      }
    });
  });

  /* Submit */
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const fields = form.querySelectorAll('input:not([type="hidden"]):not([type="checkbox"]), select, textarea');
    let isValid = true;

    fields.forEach((field) => {
      if (!validateField(field)) {
        isValid = false;
      }
    });

    if (!isValid) {
      const firstInvalid = form.querySelector('[aria-invalid="true"]');
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
      });

      if (response.ok) {
        form.hidden = true;
        if (successEl) successEl.hidden = false;
      } else {
        submitBtn.textContent = 'Something went wrong. Try again.';
        submitBtn.disabled = false;
        setTimeout(() => {
          submitBtn.textContent = originalText;
        }, 3000);
      }
    } catch {
      submitBtn.textContent = 'Connection error. Try again.';
      submitBtn.disabled = false;
      setTimeout(() => {
        submitBtn.textContent = originalText;
      }, 3000);
    }
  });
}
