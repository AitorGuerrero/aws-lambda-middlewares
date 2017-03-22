# AWS Lambda Middlewares

Some utilities for composing amazon lambda handlers.

## beforeMiddleware
Middleware for process the input event.

```typescript
import beforeMiddleware from 'aws-lambda-middlewares';

const originalHandler = (transformedEvent, context, callback) => {
    // Process event;
    callback();
};

export const handler = beforeMiddleware(
    originalHandler,
    async originalEvent => {
        let transformedEvent: any;
        // transform the event
        return transformedEvent;
    }
);
```

## afterMiddleware
Middleware for process the output response.
```typescript
import afterMiddleware from 'aws-lambda-middlewares';

const originalHandler = (event, context, callback) => {
    let response: any;
    // Process event;
    callback(null, response);
};

export const handler = afterMiddleware(
    originalHandler,
    async response => {
        let transformedResponse: any;
        // transform the response
        return transformedResponse;
    }
);
```

## onErrorMiddleware
Middleware for process the error when the handler has failed.

You have to throw the error. If the error is not thrown, it is considered managed and recovered

This middleware will only be called if the handler fails.

```typescript
import onErrorMiddleware from 'aws-lambda-middlewares';

const originalHandler = (event, context, callback) => {
    let response: any;
    // Process event;
    callback(null, response);
};

export const handler = onErrorMiddleware(
    originalHandler,
    async error => {
        let transformedError: Error;
        // transform the error
        throw transformedError;
    }
);
```