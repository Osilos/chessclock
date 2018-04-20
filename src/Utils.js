class Utils {
    static formatTime(milliseconds) {
        let time = Utils.millisecondsToTime(milliseconds);
        let text = time.hours + ":" + time.minutes + ":" + time.seconds + (milliseconds < 10000 && milliseconds > 0
            ? (":" + time.centiseconds)
            : "");

        text = text
            .split(":")
            .map((item) => {
                if (item.length === 1) 
                    return "0" + item;
                return item;
            })
            .join(":");

        return text;
    }

    static millisecondsToTime(time) {
        let hours = Math.floor(time / 3600000);
        let minutes = Math.floor((time - hours * 3600000) / 60000);
        let seconds = Math.floor((time - (hours * 3600000 + minutes * 60000)) / 1000);
        let centiseconds = Math.floor((time % 1000) / 10);
        return {hours, minutes, seconds, centiseconds}
    }
}

export default Utils;