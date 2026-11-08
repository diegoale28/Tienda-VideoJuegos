import { useState } from 'react';

export function useForm(initialState = {}) {
  const [form, setForm] = useState(initialState);

  const handleInputChange = ({ target }) => {
    const { name, value } = target;
    setForm({ ...form, [name]: value });
  };

  const resetForm = () => setForm(initialState);
  const setFormValues = (newValues) => setForm(newValues);

  return { form, handleInputChange, resetForm, setFormValues };
}