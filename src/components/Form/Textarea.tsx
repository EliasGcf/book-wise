'use client';

import { TextareaHTMLAttributes, forwardRef, useState } from 'react';

import { tw } from '@utils/tw';

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>((props, ref) => {
  const [text, setText] = useState('');

  return (
    <div
      className={tw(
        'mt-6 flex flex-col overflow-hidden rounded border border-gray-05 bg-gray-08 focus-within:border-green-02',
        { 'opacity-40': props.disabled },
      )}
    >
      <textarea
        className="h-40 w-full resize-none rounded bg-gray-08 px-5 pt-3 text-gray-02 outline-none placeholder:text-gray-04"
        placeholder="Escreva sua avaliação"
        onChange={(e) => setText(e.target.value)}
        ref={ref}
        {...props}
      />
      {props.maxLength && (
        <span className="mb-1 ml-auto mr-2 text-xs text-gray-04">
          {text.length}/{props.maxLength}
        </span>
      )}
    </div>
  );
});
