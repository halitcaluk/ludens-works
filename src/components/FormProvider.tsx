"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import CRMFormModal from "./CRMFormModal";

const FormContext = createContext<{ openForm: () => void }>({
  openForm: () => {},
});

export const useFormModal = () => useContext(FormContext);

export default function FormProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <FormContext.Provider value={{ openForm: () => setOpen(true) }}>
      {children}
      <CRMFormModal open={open} onClose={() => setOpen(false)} />
    </FormContext.Provider>
  );
}
