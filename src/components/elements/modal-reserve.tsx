/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Badge, Button, Field, Modal, ModalProps, Textfield } from "../ui";
import { twMerge } from "tailwind-merge";
import { ReservedTable } from "./reserved-table";
import { useHookForm } from "@/hooks/use-form";
import { z } from "zod";
import { FormProvider } from "@/context/form-context";
import { Textarea } from "../ui/textarea";

const CATEGORY_FLOOR = [
  {
    label: "1st Floor",
    value: "floor1",
  },
  {
    label: "2nd Floor",
    value: "floor2",
  },
  {
    label: "Outdor",
    value: "outdor",
  },
  {
    label: "Rooftop",
    value: "rooftop",
  },
  {
    label: "Basement",
    value: "basement",
  },
];

const LIST_TABLES = [
  {
    number: "2",
    location: "floor1",
    isAvailable: true,
  },
  {
    number: "3",
    location: "floor1",
    isAvailable: true,
  },
  {
    number: "3",
    location: "floor1",
    isAvailable: true,
  },
  {
    number: "3",
    location: "floor1",
    isAvailable: true,
  },
  {
    number: "2",
    location: "floor1",
    isAvailable: true,
  },
  {
    number: "2",
    location: "floor1",
    isAvailable: true,
  },
];

const formValidation = z.object({
  firstName: z
    .string({ message: "Required" })
    .min(3, { message: "Min 3 character" }),
  lastName: z
    .string({ message: "Required" })
    .min(3, { message: "Min 3 character" }),
  date: z.string({ message: "Required" }),
  time: z.string({ message: "Required" }),
  email: z.string({ message: "Required" }).email({ message: "email invalid" }),
  phoneNumber: z
    .string({ message: "Required" })
    .min(3, { message: "Min 3 character" }),
  numberPerson: z
    .string({ message: "Required" })
    .min(1, { message: "Min 1 person" }),
  notes: z
    .string({ message: "Required" })
    .min(3, { message: "Min 3 character" })
    .max(50, { message: "Max 50 character" }),
});
const defaultInformation = {
  firstName: null as any,
  lastName: null as any,
  date: null as any,
  time: null as any,
  email: null as any,
  phoneNumber: null as any,
  numberPerson: null as any,
  notes: null as any,
};
export const ModalReserve = ({ isOpen, onClose }: ModalProps) => {
  const [informationDetail, setInformationDetail] =
    useState(defaultInformation);
  const form = useHookForm({
    defaultValues: informationDetail,
    validation: formValidation,
  });

  const generateOrderSummary = () => {
    return [
      {
        label: "Table",
        value: `${CATEGORY_FLOOR.find((x) => x.value === selectedFloor)?.label ?? "-"} - Table ${selectedTable}`,
      },
      {
        label: "Name",
        value: `${informationDetail.firstName} ${informationDetail.lastName}`,
      },
      {
        label: "Phone Number",
        value: informationDetail.phoneNumber,
      },
      {
        label: "Email",
        value: informationDetail.email,
      },
      {
        label: "Date",
        value: informationDetail.date.toString(),
      },
      {
        label: "Hours",
        value: informationDetail.time.toString(),
      },
      {
        label: "Number of Person",
        value: informationDetail.numberPerson,
      },
      {
        label: "Notes",
        value: informationDetail.notes,
      },
    ];
  };

  const generateOrderTotal = () => {
    return [
      {
        label: "Subtotal",
        value: `$${price}`,
      },
      {
        label: "Tax",
        value: `$${tax}`,
      },
      {
        label: "Grand Total",
        value: `$${tax + price}`,
      },
    ];
  };

  const [currentStep, setCurrentStep] = useState(0);
  const [selectedFloor, setSelectedFloor] = useState("floor1");
  const [selectedTable, setSelectedTable] = useState(0);
  const [price, setPrice] = useState(0);
  const [tax, setTax] = useState(0);
  const handleNext = () => {
    if (currentStep === 2) {
      setCurrentStep(0);
      onClose();
      setSelectedTable(0);
      setInformationDetail(defaultInformation);
      form.reset(defaultInformation)
      return;
    }
    setCurrentStep((prev) => (prev += 1));
  };

  const handleBack = () => {
    if (currentStep === 0) {
      onClose();
      return;
    }
    setCurrentStep((prev) => (prev -= 1));
  };

  const renderStep1 = () => {
    return (
      <>
        <div className="">
          <h2 className="text-2xl mb-3 font-medium">Select Table</h2>
          <div className="flex items-center gap-2">
            {CATEGORY_FLOOR.map((category) => (
              <Badge
                onClick={() => setSelectedFloor(category.value)}
                color={
                  selectedFloor === category.value ? "primary" : "secondary"
                }
                key={category.value}
                role="button"
              >
                {category.label}
              </Badge>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-8 my-16">
          {LIST_TABLES.map((table, i) => (
            <ReservedTable
              isSelected={i + 1 === selectedTable}
              key={`${table.location}_${i}`}
              isAvailable={table.isAvailable}
              number={table.number as "2" | "3"}
              tableNumber={i + 1}
              onClick={(v) => setSelectedTable(v)}
            />
          ))}
        </div>
        <div className="flex items-center gap-2">
          <Button
            color="secondary"
            className="w-[100px] mt-5"
            onClick={onClose}
          >
            Close
          </Button>
          <Button
            disabled={!selectedTable}
            className="w-full mt-5"
            onClick={handleNext}
          >
            Continue
          </Button>
        </div>
      </>
    );
  };

  const handleSubmit = async (values: typeof informationDetail) => {
    setInformationDetail(values);
    const price = Math.round(Math.random() * 100);
    const tax = Math.round(Math.random() * 10);
    setPrice(price);
    setTax(tax);
    handleNext();
  };

  const renderStep2 = () => {
    return (
      <>
        <h2 className="text-2xl font-medium mb-5">Information Detail</h2>
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
            <div className="grid grid-cols-2 gap-4">
              <Field
                label="Date"
                component={Textfield}
                name="date"
                type="date"
                placeholder="Select date"
                min={new Date().toString()}
              />
              <Field
                label="Time"
                component={Textfield}
                name="time"
                type="time"
                placeholder="Select time"
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
              min={1}
              max={100}
              label="Number of Person"
              component={Textfield}
              name="numberPerson"
              type="number"
              placeholder="Enter total person"
            />
            <Field
              label="Notes"
              component={Textarea}
              name="notes"
              placeholder="Enter notes"
            />
            <div className="flex items-center gap-2">
              <Button
                color="secondary"
                className="w-[100px] mt-5"
                onClick={handleBack}
              >
                Back
              </Button>
              <Button type="submit" className="w-full mt-5">
                Continue
              </Button>
            </div>
          </FormProvider>
        </form>
      </>
    );
  };

  const renderStep3 = () => {
    return (
      <>
        <h2 className="text-2xl font-medium">Order Summary</h2>
        <div className="w-full">
          {generateOrderSummary().map((data, i) => (
            <div
              key={i}
              className={
                "border-b border-dark-100 flex items-center justify-between gap-2 py-3"
              }
            >
              <span className="text-dark-200">{data.label}</span>
              <span className="">{data.value}</span>
            </div>
          ))}
          <div className="border-t border-dashed border-dark-100 mt-20 pt-6">
            {generateOrderTotal().map((data, i) => (
              <div
                key={i}
                className={
                  "border-dark-100 flex items-center justify-between gap-2 py-1"
                }
              >
                <span
                  className={twMerge(
                    data.label === "Grand Total"
                      ? "text-dark-400 font-bold text-lg"
                      : "text-dark-200",
                  )}
                >
                  {data.label}
                </span>
                <span
                  className={twMerge(
                    data.label === "Grand Total"
                      ? "text-dark-400 font-bold text-lg"
                      : "text-dark-400",
                  )}
                >
                  {data.value}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            color="secondary"
            className="w-[100px] mt-5"
            onClick={handleBack}
          >
            Back
          </Button>
          <Button onClick={handleNext} className="w-full mt-5">
            Pay and Reserve
          </Button>
        </div>
      </>
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex items-center justify-between gap-5 mb-5">
        <div className="grid grid-cols-3 flex-1 gap-1">
          {["Select Table", "Information Detail", "Order Summary"].map(
            (data, i) => (
              <div key={i}>
                <span className="text-center block text-dark-300 mb-2">
                  {data}
                </span>
                <div
                  key={i}
                  className={twMerge(
                    "h-3 w-full bg-yellow-200",
                    i <= currentStep && "bg-yellow-400",
                    i === 0 && "rounded-l-xl",
                    i === 2 && "rounded-r-xl",
                  )}
                />
              </div>
            ),
          )}
        </div>
      </div>
      {currentStep === 0 && renderStep1()}
      {currentStep === 1 && renderStep2()}
      {currentStep === 2 && renderStep3()}
    </Modal>
  );
};
