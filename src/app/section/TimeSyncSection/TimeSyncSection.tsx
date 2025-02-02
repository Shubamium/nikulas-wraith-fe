"use client";
import React, { useEffect, useState } from "react";
import "./timeSyncSection.scss";
import SectionTitle from "@/app/components/SectionTitle/SectionTitle";
import dayjs from "dayjs";
import tz from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import duration from "dayjs/plugin/duration";

import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5geodata_worldLow from "@amcharts/amcharts5-geodata/worldLow";
import am5themes_Animated from "@amcharts/amcharts5/themes/animated";
import am5themes_Dark from "@amcharts/amcharts5/themes/dark";
dayjs.extend(tz);
dayjs.extend(utc);
dayjs.extend(duration);

const streamDateFormat = "HH:mm A - DD MMMM YYYY";
type Props = {
  targetTime: string;
  isActive: boolean;
  onlyTime?: boolean;
  noBg?: boolean;
  onlyWC?: boolean;
};
export default function TimeSyncSection({
  targetTime,
  isActive,
  onlyTime,
  noBg,
  onlyWC,
}: Props) {
  const [userCurrentLocalTime, setUserCurrentLocalTime] = useState(dayjs());
  const [londonCR, setLondonCR] = useState(dayjs());
  const [germanyCR, setGermanyCR] = useState(dayjs());
  const [centralCR, setCentralCR] = useState(dayjs());
  const [japanCR, setJapanCR] = useState(dayjs());
  const [pacificCR, setPacificCR] = useState(dayjs());

  const [streamDate, setStreamDate] = useState(dayjs());

  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  useEffect(() => {
    // const now = new Date();

    if (targetTime !== null) {
      const target = dayjs(targetTime).tz("America/Chicago");
      // console.log(streamDate.toISOString(),streamDate.format(streamDateFormat))
      setStreamDate(target);
      console.log(target);
    }

    // Instantiate Map Charts AM5 and embed it to #chartdiv
    const setMapChart = () => {
      am5.ready(function () {
        // Create root element
        // https://www.amcharts.com/docs/v5/getting-started/#Root_element
        var root = am5.Root.new("chartdiv");
        root.interfaceColors.set("primaryButton", am5.color("#3a3a65"));
        root.interfaceColors.set("primaryButtonDisabled", am5.color("#1f1f38"));
        // Set themes
        // https://www.amcharts.com/docs/v5/concepts/themes/
        root.setThemes([
          am5themes_Animated.new(root),
          am5themes_Dark.new(root),
        ]);

        // Create the map chart
        // https://www.amcharts.com/docs/v5/charts/map-chart/
        var chart = root.container.children.push(
          am5map.MapChart.new(root, {
            panX: "translateX",
            panY: "translateY",
            projection: am5map.geoMercator(),
          })
        );

        // Create main polygon series for countries
        // https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/
        var polygonSeries = chart.series.push(
          am5map.MapPolygonSeries.new(root, {
            geoJSON: am5geodata_worldLow,
            exclude: ["AQ"],
            fill: am5.color("#565684"),
          })
        );

        polygonSeries.mapPolygons.template.setAll({
          tooltipText: "[bold #fff fontVariant:small-caps]{name}",
          toggleKey: "active",
          interactive: true,
        });

        polygonSeries.mapPolygons.template.states.create("hover", {
          fill: am5.color("#3b8046"),
        });

        polygonSeries.mapPolygons.template.states.create("active", {
          fill: am5.color("#3b8046"),
        });

        var previousPolygon: any;

        polygonSeries.mapPolygons.template.on(
          "active",
          function (active, target) {
            if (previousPolygon && previousPolygon != target) {
              previousPolygon.set("active", false);
            }
            if (target && target.get("active") && target.dataItem) {
              // console.log(target.dataItem);
              polygonSeries.zoomToDataItem(target.dataItem as any);
              const country = target.dataItem.dataContext as any;
              console.log(country.id);
              setSelectedCountry(country.name);
              // const timezoneList = ct.getCountry(country);
              // console.log(timezoneList);
            } else {
              chart.goHome();
            }
            previousPolygon = target;
          }
        );

        // Add zoom control
        // https://www.amcharts.com/docs/v5/charts/map-chart/map-pan-zoom/#Zoom_control
        var zoomControl = chart.set(
          "zoomControl",
          am5map.ZoomControl.new(root, {})
        );
        zoomControl.homeButton.set("visible", true);

        const bg = chart.chartContainer.get("background");
        // Set clicking on "water" to zoom out
        bg?.events.on("click", function () {
          chart.goHome();
        });

        // Make stuff animate on load
        chart.appear(1000, 100);

        const hovered = chart.chartContainer.get("hover" as any);
        hovered?.events.on();
      }); // end am5.ready()
    };

    if (!onlyTime) {
      setMapChart();
    }

    setInterval(() => {
      setUserCurrentLocalTime(dayjs());
      if (onlyTime) {
        setLondonCR(dayjs().tz("Europe/London"));
        setGermanyCR(dayjs().tz("Europe/Berlin"));
        setCentralCR(dayjs().tz("America/Chicago"));
        setJapanCR(dayjs().tz("Asia/Tokyo"));
        setPacificCR(dayjs().tz("America/Los_Angeles"));
      }
    }, 1000);
  }, []);

  const centralUsTime = dayjs().tz("America/Chicago");

  // let streamDate = dayjs('11:30 PM 20 March 2024',strex amDateFormat).tz('America/Chicago');

  const dateFormat = "DD MMMM YYYY";
  const timeFormat = "hh:mm A ";
  const timeFormatS = "hh:mm:ss A ";
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
  const pacificDiff = streamDate.tz("America/Los_Angeles");
  const italyDiff = streamDate.tz("Europe/Rome");
  const londonDiff = streamDate.tz("Europe/London");
  const germanyDiff = streamDate.tz("Europe/Berlin");
  const indoDiff = streamDate.tz("Asia/Jakarta");
  const estDiff = streamDate.tz("America/New_York");
  const cetDiff = streamDate.tz("America/Chicago");

  const ranOut = dst.asMilliseconds() < 0;
  const shouldShowcConnectionLost = onlyTime ? true : !ranOut && isActive;

  useEffect(() => {
    if (noBg) {
      document.body.classList.add("nothing");
    }
  }, [noBg]);
  return (
    <section id="time-sync" className={onlyTime ? "only-time" : ""}>
      <div id="stream" className="scroll"></div>
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
              {!onlyWC && (
                <div className="flight-time">
                  <div className="area">
                    <p className="area-time">{jpDiff.format(timeFormat)}</p>
                    <div className="area-detail">
                      <p className="country">JAPAN</p>
                      <p className="date">{jpDiff.format(dateFormat)}</p>
                    </div>
                  </div>
                  <div className="area">
                    <p className="area-time">
                      {pacificDiff.format(timeFormat)}
                    </p>
                    <div className="area-detail">
                      <p className="country">Pacific</p>
                      <p className="date">{pacificDiff.format(dateFormat)}</p>
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
                    <p className="area-time">{londonDiff.format(timeFormat)}</p>
                    <div className="area-detail">
                      <p className="country">London</p>
                      <p className="date">{londonDiff.format(dateFormat)}</p>
                    </div>
                  </div>
                  <div className="area">
                    <p className="area-time">
                      {germanyDiff.format(timeFormat)}
                    </p>
                    <div className="area-detail">
                      <p className="country">Germany</p>
                      <p className="date">{germanyDiff.format(dateFormat)}</p>
                    </div>
                  </div>
                </div>
              )}
              <div className="flight-time active">
                <div className="area">
                  <p className="area-time">{japanCR.format(timeFormatS)}</p>
                  <div className="area-detail">
                    <p className="country">JAPAN</p>
                    <p className="date">{japanCR.format(dateFormat)}</p>
                  </div>
                </div>
                <div className="area">
                  <p className="area-time">{pacificCR.format(timeFormatS)}</p>
                  <div className="area-detail">
                    <p className="country">Pacific</p>
                    <p className="date">{pacificCR.format(dateFormat)}</p>
                  </div>
                </div>
                <div className="area">
                  <p className="area-time">{centralCR.format(timeFormatS)}</p>
                  <div className="area-detail">
                    <p className="country">Central US</p>
                    <p className="date">{centralCR.format(dateFormat)}</p>
                  </div>
                </div>
                <div className="area">
                  <p className="area-time">{londonCR.format(timeFormatS)}</p>
                  <div className="area-detail">
                    <p className="country">London</p>
                    <p className="date">{londonCR.format(dateFormat)}</p>
                  </div>
                </div>
                <div className="area">
                  <p className="area-time">{germanyCR.format(timeFormatS)}</p>
                  <div className="area-detail">
                    <p className="country">Germany</p>
                    <p className="date">{germanyCR.format(dateFormat)}</p>
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

      {!onlyTime && (
        <div id="world-map">
          <div className="map">
            <div className="map-head confine">
              <h2>WORLD CLOCK</h2>
              <p>Select a country to view time</p>
            </div>
            <div id="chartdiv"></div>
          </div>
          <div className="tz-head">
            <p>{selectedCountry?.toUpperCase()}</p>
          </div>

          <div className="timezone-list confine">
            <div className="list">
              <div className="timezone">
                <p>Timezone list</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
