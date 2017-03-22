import Handler from './handler.interface';

export function beforeMiddleware<OriginalEvent, TransformedEvent, Response>(
	handler: Handler<TransformedEvent, Response>,
	transform: (event: OriginalEvent) => Promise<TransformedEvent>,
): Handler<OriginalEvent,  Response> {
	return (e, ct, cb) => {
		transform(e)
		.then(e => handler(e, ct, cb))
		.catch(err => cb(err));
	};
}