import React from "react";
import "./scheduleSection.scss";

export default function ScheduleSection({url}:any) {
  return (
    <section id="schedules">
      <div className="sched-img">
        <div className="header">
          <img src="decor/sched_heading.png" alt="" />
          <img src="decor/sched_text.png" alt="" className="decor" />
        </div>
        <img src={url ?? "/art/schedule_placeholder.png"} alt="" />
      </div>
    </section>
  );
}
