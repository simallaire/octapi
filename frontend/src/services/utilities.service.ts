

class UtilitiesService {
    toDateTime(seconds: number): Date {
        var t = new Date(Date.UTC(1970, 0, 1));
        t.setSeconds(seconds);
        return t;
    }
    secondsToHumanReadable(seconds: number): string {
        
        return (
            Intl.DateTimeFormat('en-CA', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                timeZone: "America/Halifax"
            },).format(this.toDateTime(seconds))
        )
    }
    secondsToHourMin(seconds: number): string {
        return (
            Intl.DateTimeFormat('en-CA', {
                hour: 'numeric',
                minute: 'numeric',
                timeZone: 'America/Halifax',
                hour12: false
            },).format(this.toDateTime(seconds))
        )
    }
    bytesToHumanReadable(bytes: number): string {
        if (bytes === 0) {
          return "0 bytes";
        }
      
        const units = ["bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
        const size = 1024;
        const i = Math.floor(Math.log(bytes) / Math.log(size));
      
        return `${(bytes / Math.pow(size, i)).toFixed(2)} ${units[i]}`;
      }
}

export default new UtilitiesService();