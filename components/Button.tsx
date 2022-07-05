import { ButtonHTMLAttributes, DetailedHTMLProps, PropsWithChildren } from "react";

export interface ButtonProps
  extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {}

export default function Button({ children, ...rest }: PropsWithChildren<ButtonProps>) {
  return (
    <button className="bg-green-800 text-gray-100 rounded px-4 py-2 hover:bg-green-700" {...rest}>
      {children}
    </button>
  );
}
