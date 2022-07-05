import React, { PropsWithChildren } from "react";

type FieldProps = {
  label: string;
};

export default function Field({ label, children }: PropsWithChildren<FieldProps>) {
  return (
    <label className="block my-2">
      <span className="block text-sm text-gray-600">{label}</span>
      {children}
    </label>
  );
}
