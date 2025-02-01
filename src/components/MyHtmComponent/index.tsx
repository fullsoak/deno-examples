import { html } from "htm/preact";
import { useEffect } from "preact/hooks";
import type { FunctionComponent } from "preact";

let serverSideData: unknown;

const mockFetchForSomething = () =>
  new Promise((resolve) => {
    if (serverSideData) return resolve(serverSideData);
    setTimeout(() => resolve(42), 2000);
  });

try {
  serverSideData = await mockFetchForSomething();
} catch {
  // @TODO use error boundary?
}

export const MyHtmComponent: FunctionComponent = (props) => {
  useEffect(() => {
    alert(`rendered: hello, ${serverSideData} & ${JSON.stringify(props)}`);
  });
  return html`
  <div>
    <p>hello, ${serverSideData}</p>
    <p><a href="/">home</></p>
  </div>
  `;
};
