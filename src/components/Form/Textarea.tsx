'use client';

import { useState } from 'react';

type TextareaProps = {
  maxLength?: number;
};

export function Textarea({ maxLength }: TextareaProps) {
  const [text, setText] = useState('');

  return (
    <div className="mt-6 flex flex-col overflow-hidden rounded border border-gray-05 bg-gray-08 focus-within:border-green-02">
      <textarea
        className="h-40 w-full resize-none rounded bg-gray-08 px-5 pt-3 text-gray-02 outline-none placeholder:text-gray-04"
        placeholder="Escreva sua avaliação"
        onChange={(e) => setText(e.target.value)}
        maxLength={maxLength}
      />
      {maxLength && (
        <span className="mr-2 mb-1 ml-auto text-xs text-gray-04">
          {text.length}/{maxLength}
        </span>
      )}
    </div>
  );
}
