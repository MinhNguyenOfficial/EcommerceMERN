export default function FormInput({
  size,
  placeholder,
  name,
  style,
  label,
  ...rests
}) {
  return (
    <div className="flex w-full justify-between items-center">
      <label htmlFor={name}>{label}</label>
      <input
        className="w-80 p-2 ring-1 rounded-sm"
        size={size}
        placeholder={placeholder}
        style={style}
        name={name}
        {...rests}
      />
    </div>
  );
}
