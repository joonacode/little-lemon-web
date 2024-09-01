/* eslint-disable @typescript-eslint/no-explicit-any */
import { useHookForm } from "@/hooks/use-form";
import { Button, Field, Modal, ModalProps, Textfield } from "../ui";
import { z } from "zod";
import { FormProvider } from "@/context/form-context";
import { useAuth } from "@/hooks/use-context";
import { AuthActionKind } from "@/context";

const detailValues = {
  firstName: null as any,
  lastName: null as any,
  email: null as any,
  phoneNumber: null as any,
  password: null as any,
};

const formValidation = z.object({
  firstName: z
    .string({ message: "Required" })
    .min(3, { message: "Min 3 character" }),
  lastName: z
    .string({ message: "Required" })
    .min(3, { message: "Min 3 character" }),
  email: z.string({ message: "Required" }).email({ message: "email invalid" }),
  phoneNumber: z
    .string({ message: "Required" })
    .min(3, { message: "Min 3 character" }),
  password: z
    .string({ message: "Required" })
    .min(8, { message: "Min 8 character" }),
});

export const ModalRegister = ({ isOpen, onClose }: ModalProps) => {
  const { state, dispatch } = useAuth();
  const form = useHookForm({
    defaultValues: detailValues,
    validation: formValidation,
  });

  const handleSubmit = async (values: typeof detailValues) => {
    if (state.users.find((x) => x.email === values.email)) {
      console.log("Email already exists");
      return;
    }
    dispatch({ type: AuthActionKind.REGISTER, payload: { ...values, id: "" } });
    form.reset(detailValues);
    onClose();
    console.log("values");
  };

  return (
    <Modal
      size="sm"
      description="Create little lemon account"
      title="Register"
      isOpen={isOpen}
      onClose={() => {
        form.reset(detailValues);
        onClose();
      }}
    >
      <form
        className="flex flex-col gap-4"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <FormProvider {...form}>
          <div className="grid grid-cols-2 gap-4">
            <Field
              label="First Name"
              component={Textfield}
              name="firstName"
              placeholder="Enter first name"
            />
            <Field
              label="Last Name"
              component={Textfield}
              name="lastName"
              placeholder="Enter last name"
            />
          </div>
          <Field
            label="Email"
            component={Textfield}
            name="email"
            type="email"
            placeholder="Enter email"
          />
          <Field
            label="Phone Number"
            component={Textfield}
            name="phoneNumber"
            placeholder="Enter phone number"
          />
          <Field
            label="Password"
            component={Textfield}
            name="password"
            type="password"
            placeholder="Enter password"
          />
          <Button type="submit">Create Account</Button>
        </FormProvider>
      </form>
    </Modal>
  );
};
