import Handler from './handler.interface';

export default function afterMiddleware<Event, OriginalResponse, TransformedResponse>(
	handler: Handler<Event, OriginalResponse>,
	transform: (error: any, r: OriginalResponse) => Promise<TransformedResponse>,
): Handler<Event, TransformedResponse> {
	return (e, ct, cb) => {
		handler(e, ct, (err, response) => {
			if (!err) transform(err, response).then(
				response => cb(err, response),
				err => cb(err, response as any as TransformedResponse)
			);
			else cb(err, response as any as TransformedResponse);
		});
	};
}