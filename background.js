chrome.alarms.create("pomodoro", {
  periodInMinutes: 1 / 60,
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "pomodoro") {
    chrome.storage.local.get(["timer", "isRunning", "timeOptions"], (res) => {
      let timer = res.timer;
      let isRunning = res.isRunning;
      const timeOptions = res.timeOptions
      if (isRunning) {
        timer += 1;
        console.log(timer);
        if (timer === 60 * timeOptions) {
          this.registration.showNotification("Pomodoro Timer", {
            body: `${timeOptions} minutes has passed`,
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

chrome.storage.local.get(["timer", "isRunning", "timeOptions"], (res) => {
  chrome.storage.local.set({
    timer: "timer" in res ? res.timer : 0,
    timer: "timeOptions" in res ? res.timeOptions : 25,
    isRunning: "isRunning" in res ? res.isRunning : false,
  });
});
