export interface Task {
    service: any,
    timeout: number,
}
export class TaskScheduler {
    tasks : Task[];

    constructor() {
        this.tasks = [];
    }
    addTask(task: Task) {
        this.tasks.push(task);
    }
    async run() {
        while (true) {
            let loopWaitTime: number = 0;
            for (let i = 0; i < this.tasks.length; i++) {
                setTimeout(async () => {
                    await this.tasks[i].service.run();
                }, this.tasks[i].timeout)
                loopWaitTime += this.tasks[i].timeout;
            }
            await new Promise(resolve => setTimeout(resolve, loopWaitTime));
        }
       
    }
}

export default new TaskScheduler();