import { Helmet } from 'react-helmet-async';
import ExceptionReporView from 'src/sections/overview/app/report/exception-repor';
// sections

// ----------------------------------------------------------------------

export default function ExceptionReportPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: App</title>
      </Helmet>

      <ExceptionReporView />
    </>
  );
}
