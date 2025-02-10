import { ssr } from "fullsoak";
import { MyComponent } from "../src/components/MyComponent/index.tsx";
import { assertSnapshot } from "@std/testing/snapshot";

Deno.test("MyComponent", async (t) => {
  const output = await ssr(MyComponent, { foo: "bar" });
  await assertSnapshot(t, output);
});
