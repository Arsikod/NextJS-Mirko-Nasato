import React, { DetailedHTMLProps, InputHTMLAttributes } from "react";

export interface InputProps
  extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {}

export default function Input(props: InputProps) {
  return <input className="border rounded px-3 py-1 w-80" {...props} />;
}
