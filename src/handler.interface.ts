export interface Callback<Response> {
	(error?: Error, response?: Response): void;
}

export interface Context {
	awsRequestId: string;
}

interface Handler<Event, Response> {
	(e: Event, ct: Context, cb: Callback<Response>): void;
}

export default Handler;