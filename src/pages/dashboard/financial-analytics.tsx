import { Helmet } from 'react-helmet-async';
import FinancialAnalysis from 'src/sections/overview/app/analytics/financial-analy';
// sections

// ----------------------------------------------------------------------

export default function FinancialAnalysisPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: App</title>
      </Helmet>

      <FinancialAnalysis />
    </>
  );
}
