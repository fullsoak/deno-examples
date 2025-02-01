import {
  type Context,
  Controller,
  ControllerMethodArgs,
  Get,
  getComponentJs,
  setupDefaultFullsoakLogger,
  ssr,
  useFullSoak,
} from "fullsoak";
import { html } from "htm/preact";
import { MySimpleHtmComponent } from "./components/MySimpleHtmComponent/index.tsx";
import { MyTsxComponent } from "./components/MyTsxComponent/index.tsx";
import { MyRouteAwareComponent } from "./components/MyRouteAwareComponent/index.tsx";

setupDefaultFullsoakLogger();

const GLOBAL_COMPONENTS_DIR: string = Deno.cwd() + "/src/components";

@Controller()
class MyController {
  @Get("/")
  renderDynamicallyImportedComponent() {
    return ssr(MyTsxComponent, { foo: "bar 1" });
  }

  @Get("/app")
  renderMyRouteAwareComponent() {
    return ssr(MyRouteAwareComponent, { my: "route aware component" });
  }

  @Get("/components/:parentComponent/routes/:routeComponent")
  @ControllerMethodArgs("param")
  renderRouteComponent(
    param: { parentComponent: string; routeComponent: string },
    ctx: Context
  ) {
    ctx.response.headers.set('content-type', 'text/javascript');
    const { parentComponent, routeComponent } = param;
    return getComponentJs(`${GLOBAL_COMPONENTS_DIR}/${parentComponent}/routes/${routeComponent}`);
  }

  // @TODO figure out why `ssr` crash for this
  @Get("/example1")
  renderPreImportedComponent() {
    return ssr(MySimpleHtmComponent);
  }

  // @TODO figure out why `ssr` crash for this
  @Get("/example2")
  async renderDynamicallyImportedHtmComponent() {
    const { MyHtmComponent } = await import(
      "./components/MyHtmComponent/index.tsx"
    );
    return ssr(MyHtmComponent);
  }

  // @TODO figure out why `ssr` crash for this
  @Get("/example3")
  async renderDynamicallyImportedHtmComponentWithHtmAndProps() {
    const { MyHtmComponent } = await import(
      "./components/MyHtmComponent/index.tsx"
    );
    const props = { foo: "bar 3" };
    return ssr(html`<${MyHtmComponent} ...${props} />`);
  }
}

const port = Number(Deno.env.get("PORT") || 0) ?? 3991;

useFullSoak({
  port,
  controllers: [MyController],
  componentsDir: GLOBAL_COMPONENTS_DIR,
});
