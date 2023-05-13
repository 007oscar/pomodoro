const saveOptions = document.getElementById("save-btn");
const timeOptions = document.getElementById("time-options");
// chrome.storage.local.set({ timeOptions: 0 });

chrome.storage.local.get(["timeOptions"], (res) => {
  timeOptions.value = res.timeOptions ?? 25;
});

timeOptions.addEventListener("change", (event) => {
  const value = event.target.value;
  if (value < 1 || value > 60) {
    timeOptions.value = 25;
  }
});

saveOptions.addEventListener("click", () => {
  const timer = 0;
  const isRunning = false;
  chrome.storage.local.set({
    timer,
    isRunning,
    timeOptions: timeOptions.value,
  });
});
