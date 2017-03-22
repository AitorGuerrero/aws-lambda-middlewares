import Handler from './handler.interface';

interface Transformer<E, R>{
	(error: Error, event: E, r: R, ct: {awsRequestId: string}): Promise<any>;
}

export default function onErrorMiddleware<Event, Response>(
	handler: Handler<Event, Response>,
	transform: Transformer<Event, Response>,
): Handler<Event,  Response> {
	return (event, context, callback) => {
		try {
			handler(event, context, (err, response) => {
				if (err === null || err === undefined) {
					callback(err, response);
				} else {
					transform(err, event, response, context as any).then(
						response => callback(null, response),
						transformedError => callback(transformedError, response)
					);
				}
			});
		} catch (err) {
			callback(err);
		}
	};
}