import React from "react";
import "./sectionTitle.scss";

type SectionTitleProps = {
  directory: string;
  run: string | React.ReactNode;
  contained?: boolean;
  description?: string;
};

export default function SectionTitle({
  directory,
  run,
  contained,
  description,
}: SectionTitleProps) {
  return (
    <div className={`section-title ${contained ? "container" : ""}`}>
      <p className="directory">{directory}</p>
      <p className="run-command">
        {run} <span className="cursor">_</span>
      </p>

      {description && (
        <div className="description">
          <p>
            {"> "}
            {description}
          </p>
        </div>
      )}
    </div>
  );
}
