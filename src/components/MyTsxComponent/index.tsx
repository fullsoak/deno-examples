import { type FunctionComponent } from "preact";
import { useEffect, useState } from "preact/hooks";

console.log("MyTsxComponent is being imported...");

type MyProps = {
  foo: string;
};

export const MyTsxComponent: FunctionComponent<MyProps> = ({ foo }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    alert(`component mounted with initial props foo=${foo}`);
    return () => alert(`unmounted component with initial props foo=${foo}`);
  }, []);

  return (
    <section className="main">
      <ul>
        <li>props foo is {foo}</li>
        <li>
          state count is {count}{" "}
          <button onClick={() => setCount((x) => x + 1)}>+</button>
          <button onClick={() => setCount((x) => x - 1)}>-</button>
        </li>
        <li>
          <a href="/example1">Example 1</a>
        </li>
        <li>
          <a href="/example2">Example 2</a>
        </li>
        <li>
          <a href="/example3">Example 3</a>
        </li>
        <li>
          <a href="/app">Route Aware App Component</a>
        </li>
      </ul>
    </section>
  );
};
