/* eslint-disable @typescript-eslint/no-explicit-any */
import { useHookForm } from "@/hooks/use-form";
import { Button, Field, Modal, ModalProps, Textfield } from "../ui";
import { z } from "zod";
import { FormProvider } from "@/context/form-context";
import { useAuth, useToast } from "@/hooks/use-context";
import { AuthActionKind } from "@/context";

const defaultValue = {
  email: null as any,
  password: null as any,
};

const formValidation = z.object({
  email: z.string({ message: "Required" }).email({ message: "email invalid" }),
  password: z
    .string({ message: "Required" })
    .min(8, { message: "Min 8 character" }),
});

export const ModalLogin = ({ isOpen, onClose }: ModalProps) => {
  const { addToast } = useToast();
  const { state, dispatch } = useAuth();
  const form = useHookForm({
    defaultValues: defaultValue,
    validation: formValidation,
  });
  const handleSubmit = async (values: typeof defaultValue) => {
    const me = state.users.find((x) => x.email === values.email);
    console.log('me', {x: state.users, a: values})
    if (!me) {
      addToast({ title: "Email not found", status: "error" });
      return;
    } else if (me && me.password !== values.password) {
      addToast({ title: "Wrong password", status: "error" });
      return;
    }
    dispatch({ type: AuthActionKind.LOGIN, payload: values });
    addToast({ title: "Login success", status: "success" });
    form.reset(defaultValue);
    onClose();
  };

  return (
    <Modal
      size="sm"
      description="Login to little lemon"
      title="Login"
      isOpen={isOpen}
      onClose={() => {
        form.reset(defaultValue);
        onClose();
      }}
    >
      <form
        className="flex flex-col gap-4"
        onSubmit={form.handleSubmit(handleSubmit)}
        autoComplete="off"
      >
        <FormProvider {...form}>
          <Field
            autoComplete="off"
            label="Email"
            component={Textfield}
            name="email"
            type="email"
            placeholder="Enter email"
          />
          <Field
            label="Password"
            component={Textfield}
            name="password"
            autoComplete="current-password"
            type="password"
            placeholder="Enter password"
          />
          <Button type="submit">Login</Button>
        </FormProvider>
      </form>
    </Modal>
  );
};
