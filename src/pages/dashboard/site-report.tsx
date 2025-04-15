import { Helmet } from 'react-helmet-async';
import SiteReportView from '../../sections/overview/app/report/site-repor';
// sections

// ----------------------------------------------------------------------

export default function SiteReportPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: App</title>
      </Helmet>

      <SiteReportView />
    </>
  );
}
