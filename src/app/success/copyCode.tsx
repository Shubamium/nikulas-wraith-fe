"use client";
import React from "react";
import { IoCopy } from "react-icons/io5";

type Props = {
  code: string;
};

export default function CopyCode({ code }: Props) {
  return (
    <code
      onClick={() => {
        navigator.clipboard.writeText(code);
      }}
      className="id"
    >
      {code} <IoCopy />
    </code>
  );
}
