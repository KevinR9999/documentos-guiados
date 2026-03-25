import type { FieldErrors, UseFormRegister } from 'react-hook-form';
import type { FieldDefinition } from '../types/documents';

type Props = {
  field: FieldDefinition;
  register: UseFormRegister<Record<string, string>>;
  errors: FieldErrors<Record<string, string>>;
};

export default function QuestionField({ field, register, errors }: Props) {
  const error = errors[field.id];

  return (
    <div className="rounded-[1.25rem] border border-white/10 bg-white/[0.03] p-4 sm:p-5">
      <label className="block text-sm font-medium leading-6 text-white/90">
        {field.label}
      </label>

      {field.helpText ? (
        <p className="mt-2 text-xs leading-5 text-white/45">{field.helpText}</p>
      ) : null}

      {field.type === 'text' && (
        <input
          {...register(field.id, {
            required: field.required ? 'Este campo es obligatorio' : false,
          })}
          type="text"
          placeholder={field.placeholder}
          className="mt-3 w-full rounded-2xl border border-white/10 bg-[#0b1526] px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-cyan-400/50"
        />
      )}

      {field.type === 'textarea' && (
        <textarea
          {...register(field.id, {
            required: field.required ? 'Este campo es obligatorio' : false,
          })}
          placeholder={field.placeholder}
          rows={5}
          className="mt-3 w-full resize-none rounded-2xl border border-white/10 bg-[#0b1526] px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-cyan-400/50"
        />
      )}

      {field.type === 'select' && (
        <select
          {...register(field.id, {
            required: field.required ? 'Este campo es obligatorio' : false,
          })}
          defaultValue=""
          className="mt-3 w-full rounded-2xl border border-white/10 bg-[#0b1526] px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400/50"
        >
          <option value="" disabled className="bg-[#0b1526] text-white/50">
            Selecciona una opcion
          </option>
          {field.options?.map((option) => (
            <option
              key={option.value}
              value={option.value}
              className="bg-[#0b1526] text-white"
            >
              {option.label}
            </option>
          ))}
        </select>
      )}

      {error ? (
        <p className="mt-2 text-xs font-medium text-rose-300">
          {String(error.message)}
        </p>
      ) : null}
    </div>
  );
}