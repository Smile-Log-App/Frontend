import { ComponentPropsWithoutRef } from "react";

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {}

export default function Button({
  disabled = false,
  ...attribute
}: ButtonProps) {
  return (
    <button
      {...attribute}
      className={`h-60 w-180 rounded-12 text-20 text-white ${disabled ? "bg-gray-400" : "bg-blue-base"}`}
    ></button>
  );
}
