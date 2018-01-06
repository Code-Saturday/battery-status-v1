document.addEventListener('DOMContentLoaded', () => {
    var battery = navigator.getBattery()
    navigator.getBattery().then(function (battery) {
        function updateAllBatteryInfo() {
            updateChargeInfo();
            updateLevelInfo();
            updateChargingInfo();
            updateDischargingInfo();
        }
        updateAllBatteryInfo();

        battery.addEventListener('chargingchange', function () {
            updateChargeInfo();
            function getNotificationId() {
                var id = Math.floor(Math.random() * 9007199254740992) + 1;
                return id.toString();
            }
            if (battery.charging) {
                chrome.notifications.create(getNotificationId(), {
                    type: "progress",
                    title: "Batery Status",
                    message: "Short message plus an image",
                    progress: 60,
                    iconUrl: "icon.png"
                });
            }
        });

        function updateChargeInfo() {
            console.log("Battery charging? " +
                (battery.charging ? "Yes" : "No"));
            document.getElementById('batteryCharging').innerHTML = "Battery charging? " + (battery.charging ? "Yes" : "No")
        }

        battery.addEventListener('levelchange', function () {
            updateLevelInfo();
        });

        function updateLevelInfo() {
            console.log("Battery level: " +
                battery.level * 100 + "%");
            document.getElementById('batteryLevel').innerHTML = ("Battery level: " + battery.level * 100 + "%")
            var batteryLevel = battery.level * 100
        }

        battery.addEventListener('chargingtimechange', function () {
            updateChargingInfo();
        });

        function updateChargingInfo() {
            console.log("Battery charging time: " +
                battery.chargingTime + " seconds");
            document.getElementById('batteryChargingTime').innerHTML = "Battery charging time: " +
                battery.chargingTime + " seconds"
        }

        battery.addEventListener('dischargingtimechange', function () {
            updateDischargingInfo();
        });

        function updateDischargingInfo() {
            console.log("Battery discharging time: " +
                battery.dischargingTime + " seconds");
            document.getElementById('batteryDischargingTime').innerHTML = "Battery discharging time: " + battery.dischargingTime + " seconds"
        }

       

    });
});