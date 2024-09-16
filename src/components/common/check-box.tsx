import {
  Control,
  FieldPath,
  FieldValues,
  useController,
} from "react-hook-form";

interface CheckBoxProps {
  control: Control<FieldValues>;
  name: FieldPath<FieldValues>;
  text: string;
}

export default function CheckBox({ control, name, text }: CheckBoxProps) {
  const { field } = useController({ control, name });
  return (
    <label htmlFor={field.name} className="text-18">
      <input type="checkbox" id={field.name} {...field}></input> {text}
    </label>
  );
}
