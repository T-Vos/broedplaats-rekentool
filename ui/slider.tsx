type SliderProps = {
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
};

export const Slider = ({
  min,
  max,
  step,
  value,
  onChange,
  label,
}: SliderProps) => {
  const generateIdFromLabel = (label: string) => {
    return label.toLowerCase().replace(/\s+/g, '-');
  };

  const id = generateIdFromLabel(label);
  return (
    <>
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-medium text-gray-400 dark:text-white"
      >
        {label} : {value}
      </label>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={onChange}
        className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-800"
      />
    </>
  );
};
