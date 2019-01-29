# React Builder

A faster, slimmer, more opinionated version of [Create React App](https://facebook.github.io/create-react-app/).

## Styles

CSS is not supported. Use a CSS-in-JS library like [styled-components](https://styled-components.com/) or [emotion](https://emotion.sh/).

## Assets

Most asset types (images, fonts, etc) can be imported into JavaScript.

```tsx
import React from 'react';
import logo from './logo.png';

console.log(logo); // /logo.abcdef0123456789.png

const App = () => (
  <img src={logo} alt="Logo" />;
);
```

In addition, you can import SVGs as React components:

```tsx
import { ReactComponent as Logo } from "./logo.svg";

const App = () => (
  <div>
    <Logo />
  </div>
);
```

## Proxying API Requests

Add a `proxy` field to your `package.json`. For example:

```json
"proxy": {
  "/api": "http://localhost:3001"
}
```

Any requests to paths on the left will get proxied to the URLs on the right.

## Web Workers

Web workers can be imported by prepending them with `worker-loader!`.

```ts
import Worker from "worker-loader!./something.worker";

const worker = new Worker();

worker.postmessage("Hello, worker!");
```
