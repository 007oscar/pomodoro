chrome.alarms.create("pomodoro", {
  periodInMinutes: 1 / 60,
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "pomodoro") {
    chrome.storage.local.get(["timer", "isRunning"], (res) => {
      let timer = res.timer;
      const isRunning = res.isRunning;
      if (isRunning) {
        timer += 1;
        console.log(timer);
        chrome.storage.local.set({ timer });
      }
    });
  }
});

chrome.storage.local.get(["timer", "isRunning"], (res) => {
  chrome.storage.local.set({
    timer: "timer" in res ? res.timer : 0,
    isRunning: "isRunning" in res ? res.isRunning : false,
  });
});
