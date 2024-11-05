self.addEventListener("push", (event) => {
  const data = event.data ? event.data.json() : {};
  const title = data.title || "No title";
  const body = {
    body: data.body || "No body",
    icon: "/art/showcase-pfp.png",
  };
  event.waitUntil(self.registration.showNotification(title, body));
});
