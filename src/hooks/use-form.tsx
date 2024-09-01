/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { z } from "zod";

type TUseForm<Scheme extends z.ZodType<any>> = {
  defaultValues: z.infer<Scheme>;
  validation: Scheme;
};

export const useHookForm = <Scheme extends z.ZodType<any>>({
  defaultValues,
  validation,
}: TUseForm<Scheme>) => {
  const [formState, setFormState] = useState({
    values: defaultValues ?? undefined,
    errors: {},
  });

  const reset = (values: z.infer<Scheme>) => {
    setFormState({
      values,
      errors: {},
    });
  };

  const setValue = <K extends keyof typeof defaultValues>(
    key: K,
    value: (typeof defaultValues)[K],
  ) => {
    setFormState((prev) => ({
      ...prev,
      values: {
        ...prev.values,
        [key]: value,
      },
    }));
  };

  const getValue = <K extends keyof typeof defaultValues>(
    key: K,
  ): (typeof defaultValues)[K] => {
    return formState.values ? formState.values[key] : undefined;
  };

  const onChange = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormState((prev) => ({
      ...prev,
      values: {
        ...prev.values,
        [name]: value,
      },
    }));
  };

  const onBlur = (e: any) => {
    const { name } = e.target;
    // @ts-expect-error fix error later
    const value = formState.values[name];

    // Validate only the specific field
    // @ts-expect-error fix error later
    const fieldSchema = validation.shape[name]; // Assuming the schema is a Zod object with a shape
    const result = fieldSchema.safeParse(value);

    if (!result.success) {
      setFormState((prev) => ({
        ...prev,
        errors: {
          ...prev.errors,
          [name]: result.error.errors.map(
            (err: { message: string }) => err.message,
          ),
        },
      }));
    } else {
      // If the field is valid, clear any previous errors for this field
      setFormState((prev) => {
        const newErrors = { ...prev.errors };
        // @ts-expect-error fix error later
        delete newErrors[name];
        return {
          ...prev,
          errors: newErrors,
        };
      });
    }
  };

  const handleSubmit =
    (callback: (val: any) => Promise<void>) => async (e: any) => {
      e.preventDefault();
      const result = validation.safeParse(formState.values);
      if (result.success) {
        setFormState((prev) => ({ ...prev, errors: {} }));
        await callback(result.data);
      } else {
        setFormState((prev) => ({
          ...prev,
          errors: result.error.formErrors.fieldErrors,
        }));
      }
    };

  return {
    formState,
    setValue,
    getValue,
    handleSubmit,
    onChange,
    onBlur,
    reset,
  };
};
