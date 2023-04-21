'use client';

import { TextareaHTMLAttributes, useState } from 'react';

import { tw } from '@utils/tw';

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export function Textarea({ ...rest }: TextareaProps) {
  const [text, setText] = useState('');

  return (
    <div
      className={tw(
        'mt-6 flex flex-col overflow-hidden rounded border border-gray-05 bg-gray-08 focus-within:border-green-02',
        { 'opacity-40': rest.disabled },
      )}
    >
      <textarea
        className="h-40 w-full resize-none rounded bg-gray-08 px-5 pt-3 text-gray-02 outline-none placeholder:text-gray-04"
        placeholder="Escreva sua avaliação"
        onChange={(e) => setText(e.target.value)}
        {...rest}
      />
      {rest.maxLength && (
        <span className="mb-1 ml-auto mr-2 text-xs text-gray-04">
          {text.length}/{rest.maxLength}
        </span>
      )}
    </div>
  );
}
