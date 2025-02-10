import { ssr } from "fullsoak";
import { assertSnapshot } from "@std/testing/snapshot";
import { MyRouteAwareComponent } from "../src/components/MyRouteAwareComponent/index.tsx";

Deno.test("MyRouteAwareComponent", async (t) => {
  const output = await ssr(MyRouteAwareComponent, {
    url: "http://localhost/bar",
  });
  await assertSnapshot(t, output);
});
