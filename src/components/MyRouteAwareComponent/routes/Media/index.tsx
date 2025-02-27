import type { FunctionComponent } from "preact";
import type { RoutableProps } from "preact-iso";

type Props = RoutableProps & {
  id?: string
}

export const Media: FunctionComponent<Props> = ({ id }) => {

  return <section className="page-media">
    {id && <h1>Showing media for id {id}</h1>}
    {!id && <small>Please provide a source url to view its content</small>}
  </section>;
}
