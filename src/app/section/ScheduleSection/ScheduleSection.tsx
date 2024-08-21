import React from "react";
import "./scheduleSection.scss";

export default function ScheduleSection({ url, sa }: any) {
  return (
    <>
      <section id="schedules">
        <div className="sched-img">
          <div className="header">
            <img src="decor/sched_heading.png" alt="" />
            <img src="decor/sched_text.png" alt="" className="decor" />
          </div>
          <img src={url ?? "/art/schedule_placeholder.png"} alt="" />
        </div>
      </section>
      <section id="schedules" className="second">
        <div className="sched-img">
          <div className="header">
            {/* <img src="decor/sched_heading.png" alt="" /> */}
            <p className="decor text">SPECIAL ANNOUNCEMENT</p>
            {/* <img src="decor/sched_text.png" alt="" className="decor" /> */}
          </div>
          <img src={sa ?? "/art/schedule_placeholder.png"} alt="" />
        </div>
      </section>
    </>
  );
}
