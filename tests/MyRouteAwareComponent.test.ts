import { useFullSoak } from "fullsoak/testing";
import { assertSnapshot } from "@std/testing/snapshot";
import { superoak } from "superoak";
import { Controller, Get, ssr } from "fullsoak";
import { makeHat } from "fullsoak/batteries";
import { MyRouteAwareComponent } from "../src/components/MyRouteAwareComponent/index.tsx";

@Controller()
class MyController {
  @Get("/:whatever*")
  serve() {
    return ssr(MyRouteAwareComponent, { path: "/do/some/thing", foo: "bar" }, {
      headContent: makeHat({ title: "FullSoak SSR App" }),
    });
  }
}

Deno.test("MyRouteAwareComponent", async (t) => {
  const app = await useFullSoak({ controllers: [MyController] });
  const req = await superoak(app);
  const resp = await req.get("/do/some/thing");
  assertSnapshot(t, resp.text);
});
