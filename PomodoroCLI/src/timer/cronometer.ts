class Cronometer {
    private seconds: number = 0;
    private intervalId?: ReturnType<typeof setInterval>;

    constructor(private duration: number, private onTick: (seconds: number) => void) {
        this.seconds = duration;
    }

    start() {
        if (this.intervalId) return;
        this.intervalId = setInterval(() => {
            this.seconds--;
            this.onTick(this.seconds);
            if (this.seconds <= 0) {
                this.pause();
            }
        }, 1000);
    }

    pause() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = undefined;
        }
    }

    reset() {
        this.pause();
        this.seconds = this.duration;
        this.onTick(this.seconds);
    }

    getTime(): number {
        return this.seconds;
    }
}

export { Cronometer };