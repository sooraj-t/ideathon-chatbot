export class Message {
    content: string;
    answer: string;
    timestamp: Date;
    user: string;

    constructor(content: string, answer: string, bot: boolean, timestamp?: Date) {
        this.content = content;
        this.answer = answer;
        this.timestamp = timestamp || new Date();
        this.user = bot ? 'Bot' : 'User';
    }
}
