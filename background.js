chrome.alarms.create("pomodoro", {
  periodInMinutes: 1 / 60,
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "pomodoro") {
    chrome.storage.local.get(["timer", "isRunning"], (res) => {
      let timer = res.timer;
      let isRunning = res.isRunning;
      if (isRunning) {
        timer += 1;
        console.log(timer);
        if (timer === 60 * 25) {
          this.registration.showNotification("Pomodoro Timer", {
            body: "25 minutes has passed",
            icon: "icon.png",
          });
          timer = 0;
          isRunning = false;
        }
        chrome.storage.local.set({ timer, isRunning });
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
