import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes, type Location } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { DayOverview } from './components/day/DayOverview';

// Lazy-load the detail screens (PRD §10 performance).
const LandDetail = lazy(() => import('./components/land/LandDetail'));
const ActivityDetail = lazy(
  () => import('./components/activity/ActivityDetail'),
);

function RouteFallback() {
  return (
    <div className="flex h-[60vh] items-center justify-center text-slate-400">
      <Loader2 className="h-7 w-7 animate-spin" />
    </div>
  );
}

export function AppRoutes({ location }: { location: Location }) {
  return (
    <Suspense fallback={<RouteFallback />}>
      <Routes location={location}>
        <Route path="/" element={<DayOverview />} />
        <Route path="/land/:landId" element={<LandDetail />} />
        <Route
          path="/land/:landId/activity/:activityId"
          element={<ActivityDetail />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}
