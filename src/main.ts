import {
  type Context,
  Controller,
  Get,
  setupDefaultFullsoakLogger,
  ssr,
  useFullSoak,
} from "fullsoak";
import { byoHat } from "fullsoak/batteries";
import { MyComponent } from "./components/MyComponent/index.tsx";
import { MyRouteAwareComponent } from "./components/MyRouteAwareComponent/index.tsx";

setupDefaultFullsoakLogger();

const GLOBAL_COMPONENTS_DIR: string = Deno.cwd() + "/src/components";

@Controller()
class MyController {
  @Get("/")
  simpleExample() {
    return ssr(MyComponent, { foo: "bar" });
  }

  @Get("/app/:page*")
  renderMyRouteAwareComponent(ctx: Context) {
    return ssr(MyRouteAwareComponent, {
      foo: "Lorem Ipsum",
      path: ctx.request.url.pathname,
    }, { headContent: byoHat({ title: "FullSoak App" }) });
  }
}

const port = Number(Deno.env.get("PORT") || 0) ?? 3991;

useFullSoak({
  port,
  controllers: [MyController],
  componentsDir: GLOBAL_COMPONENTS_DIR,
});
