"use client";
import React, { useEffect, useState } from "react";
import "./timeSyncSection.scss";
import SectionTitle from "@/app/components/SectionTitle/SectionTitle";
import dayjs from "dayjs";
import tz from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import duration from "dayjs/plugin/duration";

dayjs.extend(tz);
dayjs.extend(utc);
dayjs.extend(duration);
const streamDateFormat = "HH:mm A - DD MMMM YYYY";
type Props = {
  targetTime: string;
  isActive: boolean;
  onlyTime?: boolean;
};
export default function TimeSyncSection({
  targetTime,
  isActive,
  onlyTime,
}: Props) {
  const [userCurrentLocalTime, setUserCurrentLocalTime] = useState(dayjs());
  const [streamDate, setStreamDate] = useState(dayjs());
  useEffect(() => {
    const now = new Date();

    if (targetTime !== null) {
      const target = dayjs(targetTime).tz("America/Chicago");
      // console.log(streamDate.toISOString(),streamDate.format(streamDateFormat))
      setStreamDate(target);
      console.log(target);
    }
    setInterval(() => {
      setUserCurrentLocalTime(dayjs());
    }, 1000);
  }, []);

  const centralUsTime = dayjs().tz("America/Chicago");

  // let streamDate = dayjs('11:30 PM 20 March 2024',strex amDateFormat).tz('America/Chicago');

  const dateFormat = "DD MMMM YYYY";
  const timeFormat = "hh:mm A ";
  // centralUsTime.d
  const dateFormatter = new Intl.DateTimeFormat();
  const resolvedOptions = dateFormatter.resolvedOptions();
  const userTz = resolvedOptions.timeZone;

  const streamTimeLeft = streamDate.diff(userCurrentLocalTime);
  const dst = dayjs.duration({ milliseconds: streamTimeLeft });
  const actualOffset =
    userCurrentLocalTime.utcOffset() - centralUsTime.utcOffset();

  // Timezone list
  const jpDiff = streamDate.tz("Asia/Tokyo");
  const pacificDiff = streamDate.tz("Pacific/Auckland");
  const italyDiff = streamDate.tz("Europe/Rome");
  const londonDiff = streamDate.tz("Europe/London");
  const germanyDiff = streamDate.tz("Europe/Berlin");
  const indoDiff = streamDate.tz("Asia/Jakarta");
  const estDiff = streamDate.tz("America/New_York");
  const cetDiff = streamDate.tz("America/Chicago");

  const ranOut = dst.asMilliseconds() < 0;
  const shouldShowcConnectionLost = onlyTime ? true : !ranOut && isActive;
  return (
    <section id="time-sync" className={onlyTime ? "only-time" : ""}>
      {!onlyTime && (
        <>
          <div className="heading">
            <h2>TIME SYNC</h2>
          </div>
          <div className="confine">
            <SectionTitle
              run={
                <>
                  run {">>"} <strong>time-sync.bat</strong>
                </>
              }
              directory="C:/Users/NikulasWraith/Project_Phantom/Nik.exe"
            />
            <div className="user-time">
              <h2>Your current time:</h2>
              <div className="user-time-detail">
                <p>
                  {userCurrentLocalTime.format("MMM D, YYYY h:m:s A")} {userTz}
                </p>
                <p>
                  {" "}
                  TIME DIFFERENCE: {actualOffset} minutes{" "}
                  {`(${dayjs
                    .duration({ minutes: actualOffset })
                    .asHours()} hours)`}
                </p>
              </div>
            </div>
          </div>
        </>
      )}
      {shouldShowcConnectionLost ? (
        <>
          {!onlyTime && (
            <div className="next-stream-time">
              <div className="confine">
                <h2>- TIME UNTIL NEXT STREAM -</h2>
                <p className="ctd-timer">
                  {" "}
                  {Math.floor(dst.asDays())}
                  <span className="blink">:</span>
                  {Math.floor(dst.asHours() % 24)}
                  <span className="blink">:</span>
                  {Math.floor(dst.asMinutes()) % 60}
                  <span className="blink">:</span>
                  {Math.floor(dst.asSeconds() % 60)}
                </p>
                <div className="ctd-detail">
                  <p className="title">
                    {"<<"} STARTING AT {">>"}{" "}
                  </p>
                  <p className="time">{streamDate.format(streamDateFormat)}</p>
                  <p className="tz">CENTRAL US</p>
                </div>
              </div>
            </div>
          )}

          {!onlyTime ? (
            <div className="confine">
              <div className="flight-time">
                <div className="area">
                  <p className="area-time">{jpDiff.format(timeFormat)}</p>
                  <div className="area-detail">
                    <p className="country">JAPAN</p>
                    <p className="date">{jpDiff.format(dateFormat)}</p>
                  </div>
                </div>
                <div className="area">
                  <p className="area-time">{pacificDiff.format(timeFormat)}</p>
                  <div className="area-detail">
                    <p className="country">Pacific</p>
                    <p className="date">{pacificDiff.format(dateFormat)}</p>
                  </div>
                </div>
                <div className="area">
                  <p className="area-time">{italyDiff.format(timeFormat)}</p>
                  <div className="area-detail">
                    <p className="country">ITALY</p>
                    <p className="date">{italyDiff.format(dateFormat)}</p>
                  </div>
                </div>
                <div className="area">
                  <p className="area-time">{londonDiff.format(timeFormat)}</p>
                  <div className="area-detail">
                    <p className="country">London</p>
                    <p className="date">{londonDiff.format(dateFormat)}</p>
                  </div>
                </div>
                <div className="area">
                  <p className="area-time">{germanyDiff.format(timeFormat)}</p>
                  <div className="area-detail">
                    <p className="country">Germany</p>
                    <p className="date">{germanyDiff.format(dateFormat)}</p>
                  </div>
                </div>
                <div className="area">
                  <p className="area-time">{indoDiff.format(timeFormat)}</p>
                  <div className="area-detail">
                    <p className="country">INDONESIA</p>
                    <p className="date">{indoDiff.format(dateFormat)}</p>
                  </div>
                </div>
                <div className="area">
                  <p className="area-time">{estDiff.format(timeFormat)}</p>
                  <div className="area-detail">
                    <p className="country">Eastern US</p>
                    <p className="date">{estDiff.format(dateFormat)}</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="confine">
              <div className="flight-time">
                <div className="area">
                  <p className="area-time">{londonDiff.format(timeFormat)}</p>
                  <div className="area-detail">
                    <p className="country">London</p>
                    <p className="date">{londonDiff.format(dateFormat)}</p>
                  </div>
                </div>
                <div className="area">
                  <p className="area-time">{germanyDiff.format(timeFormat)}</p>
                  <div className="area-detail">
                    <p className="country">Germany</p>
                    <p className="date">{germanyDiff.format(dateFormat)}</p>
                  </div>
                </div>

                <div className="area">
                  <p className="area-time">{cetDiff.format(timeFormat)}</p>
                  <div className="area-detail">
                    <p className="country">Central US</p>
                    <p className="date">{cetDiff.format(dateFormat)}</p>
                  </div>
                </div>
                <div className="area">
                  <p className="area-time">{jpDiff.format(timeFormat)}</p>
                  <div className="area-detail">
                    <p className="country">JAPAN</p>
                    <p className="date">{jpDiff.format(dateFormat)}</p>
                  </div>
                </div>
                <div className="area">
                  <p className="area-time">{pacificDiff.format(timeFormat)}</p>
                  <div className="area-detail">
                    <p className="country">Pacific</p>
                    <p className="date">{pacificDiff.format(dateFormat)}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          <div className="connection-lost">
            <p>Connection Lost . . .</p>
          </div>
        </>
      )}
    </section>
  );
}
