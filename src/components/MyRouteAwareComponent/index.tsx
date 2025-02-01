import { lazy, LocationProvider, ErrorBoundary, Router, Route, prerender, hydrate } from 'fullsoak/preact-iso';

// Synchronous
import { Home } from './routes/Home.tsx';
import { Profiles } from './routes/Profiles.tsx';

// Asynchronous (throws a promise)
const Profile = lazy(() => import('./routes/Profile.tsx').then(cmp => cmp.Profile));
const NotFound = lazy(() => import('./routes/_404.tsx').then(cmp => cmp.NotFound));

// const PreloadedProfile = (await Profile.preload()).Profile;
// console.log("Profile", PreloadedProfile);

export const MyRouteAwareComponent = () => (
	<LocationProvider scope="/app">
		<ErrorBoundary>
			<Router>
				<Home path="/app" />
				{/* Alternative dedicated route component for better TS support */}
				<Route path="/app/profiles" component={Profiles} />
				<Route path="/app/profiles/:id" component={() => <Profile blah="foo" />} />
				{/* `default` prop indicates a fallback route. Useful for 404 pages */}
				<NotFound default />
			</Router>
		</ErrorBoundary>
	</LocationProvider>
);

// export const SsredApp = prerender(<MyRouteAwareComponent />);
