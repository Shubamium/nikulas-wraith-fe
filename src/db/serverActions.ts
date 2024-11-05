"use server";
import { createData, mutateData, mutateSubscriber } from "./client";

export const updatePath = async (path: string, good: number, bad: number) => {
  console.log("dataselected", good, bad);
  mutateData({
    stats: {
      good: good + (path === "good" ? 1 : 0),
      bad: bad + (path === "bad" ? 1 : 0),
    },
  }).then(() => {
    console.log("path choosen");
  });
};

// DEPRECATED
// =====================================================
// export const subscribe = async (target: string) => {
//   mutateSubscriber("add", target).then(() => {
//     console.log(" subscribe added");
//   });

//   return true;
// };
// export const unsubscribe = async (target: string) => {
//   mutateSubscriber("remove", target).then(() => {
//     console.log(" subscribe added");
//   });

//   return true;
// };

export const saveSubscribtion = async (subscribtion: any) => {
  try {
    let subs = await createData("subscribtion", subscribtion);
    console.log("subscribed success", subs);
  } catch (err) {
    console.log(err, "failed to save subscribtion info");
  }
};
