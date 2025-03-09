import { useFullSoak } from "fullsoak/testing";
import { assertSnapshot } from "@std/testing/snapshot";
import { superoak } from "superoak";
import { Controller, Get, ssr } from "fullsoak";
import { MyComponent } from "../src/components/MyComponent/index.tsx";

@Controller()
class FooController {
  @Get("/")
  serve() {
    return ssr(MyComponent, { foo: "bar" });
  }
}

Deno.test("MyComponent", async (t) => {
  const app = await useFullSoak({ controllers: [FooController] });
  const req = await superoak(app);
  const resp = await req.get("/");
  await assertSnapshot(t, resp.text);
});
