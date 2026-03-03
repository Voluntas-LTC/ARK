import type { FinalPolicy } from './types';

type FallbackPhase = 'loading' | 'failed';

const referenceSecurities = [
  {
    id: 'VOO',
    name: 'VOO',
    allocation_pct: 44.34,
    allocation_amount: 299295,
    management_style: 'passive',
    asset_class: 'US Equity',
  },
  {
    id: 'BTC',
    name: 'BTC',
    allocation_pct: 25.78,
    allocation_amount: 174015,
    management_style: 'passive',
    asset_class: 'Bitcoin',
  },
  {
    id: 'EWJ',
    name: 'EWJ',
    allocation_pct: 16.38,
    allocation_amount: 110565,
    management_style: 'passive',
    asset_class: 'Japan Equity',
  },
  {
    id: 'IEMU',
    name: 'IEMU',
    allocation_pct: 11.49,
    allocation_amount: 77557.5,
    management_style: 'passive',
    asset_class: 'Dev. Europe ex UK Equity',
  },
  {
    id: 'BIL',
    name: 'BIL',
    allocation_pct: 2.0,
    allocation_amount: 13500,
    management_style: 'passive',
    asset_class: 'Cash',
  },
] as const;

const section9Content = JSON.stringify({
  recommended_securities: referenceSecurities.map((row) => ({
    security_name: row.name,
    asset_class: row.asset_class,
    allocation_pct: row.allocation_pct,
    allocation_amount: row.allocation_amount,
    management_style: row.management_style,
    security_id: row.id,
  })),
});

const buildFallbackMessage = (phase: FallbackPhase, reason?: string): string => {
  if (phase === 'loading') {
    return 'Reference fallback content is shown while live policy generation is still running.';
  }
  if (reason?.trim()) {
    return `Live policy generation failed. Showing reference fallback content instead. ${reason.trim()}`;
  }
  return 'Live policy generation failed. Showing reference fallback content instead.';
};

export const buildReferenceFallbackPolicy = (
  phase: FallbackPhase,
  reason?: string
): FinalPolicy => ({
  proposal_count: 1,
  proposal_index: 1,
  menu: {
    title: 'Carter Family Strategic Wealth Policy',
    summary:
      phase === 'loading'
        ? 'Reference fallback policy for retirement readiness, education planning, and household allocation discipline while the live policy is being generated.'
        : 'Reference fallback policy for retirement readiness, education planning, and household allocation discipline because the live policy generation step failed.',
  },
  detail: {
    title: 'Carter Family Strategic Wealth Policy',
    sections: [
      {
        id: 'client-background',
        title: 'Client Background',
        content:
          "Michael Carter, age 36, and Emily Carter, age 34, live in Austin, Texas with their one-year-old son Noah. Michael works as a Senior Operations Manager with stable long-term income, while Emily works part-time as a pediatric nurse to preserve childcare flexibility. The household priorities are retirement security, education funding, emergency reserves, and stronger portfolio discipline.",
      },
      {
        id: 'client-financial-snapshot',
        title: 'Client Financial Snapshot',
        content:
          "Gross household income is approximately USD 242,000 per year, with estimated monthly take-home pay of USD 12,300 to USD 13,100. Total investable assets are USD 675,000 across USD 78,000 in cash, USD 275,000 in taxable brokerage invested in US equity, and USD 322,000 in Michael's 401(k) invested in US Treasury exposure. Liabilities include a USD 472,000 mortgage at 3.375% fixed and Emily's student loan payment of USD 280 per month.",
      },
      {
        id: 'client-financial-needs',
        title: 'Client Financial Needs',
        content:
          'The household needs a coordinated strategy for retirement readiness by age 62, future college funding for Noah, and preservation of a six- to nine-month emergency reserve. The plan also needs to reduce concentration risk, improve tax efficiency between taxable and tax-deferred accounts, and create enough structural savings margin to support long-term goals.',
      },
      {
        id: 'client-investment-preferences',
        title: 'Client Investment Preferences and Behavioral Considerations',
        content:
          'Michael and Emily prefer disciplined diversification over concentrated exposures and want a household-level allocation framework that reduces reactive decisions. They value tax efficiency, want to avoid over-concentration in the brokerage account, and need an implementable structure that keeps retirement, liquidity, and education funding aligned.',
      },
      {
        id: 'taxes-exclusions',
        title: 'Taxes, Exclusions, and Exemptions',
        content:
          'Because the family resides in Texas, there is no state income tax, so planning emphasis falls on federal tax efficiency and account-location discipline. Higher-growth assets should be used more intentionally across tax-deferred and taxable accounts, while no special exclusions or religious investment restrictions were identified in the reference policy.',
      },
      {
        id: 'special-requirements',
        title: 'Other Special Requirements',
        content:
          'The policy must preserve current lifestyle continuity, maintain liquid emergency reserves, and avoid treating the low-rate mortgage as an immediate prepayment priority. The implementation approach should be practical for a young family and flexible enough to revisit education-cost targets when better data becomes available.',
      },
      {
        id: 'capital-deployment',
        title: 'Capital Deployment Timeline',
        content:
          'Total plan capital is USD 675,000. Implementation assumes immediate reallocation of existing balances, with USD 322,000 repositioned inside the 401(k) for retirement and USD 353,000 allocated across brokerage and cash holdings for education support, liquidity, and household portfolio discipline.',
      },
      {
        id: 'portfolio-policy',
        title: 'Portfolio Policy',
        content:
          'The policy replaces the current barbell structure of 100% Treasury in the 401(k) and 100% US equity in taxable assets with a globally diversified, risk-optimized portfolio. The target mix is designed to improve retirement readiness, preserve a dedicated liquidity sleeve, and create a single household allocation standard rather than disconnected account-level decisions.',
      },
      {
        id: 'investment-vehicle-selection',
        title: 'Investment Vehicle Selection Highlights',
        content: section9Content,
      },
      {
        id: 'risk-management',
        title: 'Risk Management Framework',
        content:
          "Risk management is centered on diversification, emergency-liquidity preservation, and regular rebalancing if asset-class drift exceeds target bands. The reference diagnosis also highlights an insurance review need, because survivorship and income-protection coverage were not verified despite a young dependent, mortgage obligations, and reliance on Michael's income.",
      },
      {
        id: 'policy-evaluation',
        title: 'Policy Evaluation Metrics',
        content:
          'The reference policy targets improved retirement feasibility, better tax efficiency, and a more stable household allocation process. The underlying example notes that the baseline plan failed without allocation changes, while optimized allocations materially improved outcomes but still left sensitivity to the family\'s savings rate and spending discipline.',
      },
      {
        id: 'fee-governance',
        title: 'Fee and Governance Notes',
        content:
          'Governance is handled at the household level, with quarterly review and rebalancing when major drift occurs. The reference plan assumes standard advisory-fee treatment and emphasizes a repeatable review cadence rather than ad hoc portfolio changes.',
      },
      {
        id: 'disclaimer',
        title: 'Disclaimer and Acknowledgment',
        content:
          'This fallback policy is a reference rendering derived from the Michael & Emily example set. It remains subject to investment risk, incomplete client-specific data, and future updates to assumptions such as education-cost targets and insurance coverage.',
      },
      {
        id: 'tool-log',
        title: 'Tool Execution Log',
        content:
          'Reference case summary: baseline deterministic cashflow failed under the original allocation, allocation optimization improved deterministic outcomes, and a Monte Carlo stress view still showed material dependence on stronger savings discipline.',
      },
    ],
    portfolio: {
      currency: 'USD',
      total_value: 675000,
      securities: [...referenceSecurities],
    },
  },
  execution: {
    remedy_name: 'Carter Family Strategic Wealth Policy',
    funding_source: 'JPMorgan Chase Bank, N.A. — Account ending in XXX',
    total_transfer: 675000,
    currency: 'USD',
  },
  financial_diagnoses: [
    {
      id: 'fallback-investment-1',
      category: 'investment related',
      title: 'Extreme Asset Allocation Polarization',
      description:
        'The reference diagnosis flags a barbell portfolio structure: the 401(k) is concentrated in US Treasuries while the taxable brokerage is concentrated in US equity. That mismatch drags retirement growth, creates concentration risk, and weakens overall household allocation discipline.',
    },
    {
      id: 'fallback-insurance-1',
      category: 'insurance related',
      title: 'Unverified Income Protection',
      description:
        "The household depends heavily on Michael's earnings while supporting a young child and a large mortgage. The reference materials do not confirm life or disability coverage, so income-protection risk remains a material open issue.",
    },
    {
      id: 'fallback-spending-1',
      category: 'spending related',
      title: 'Critical Cash Flow Tightness',
      description:
        'The reference case shows annual spending nearly consuming minimum take-home pay, leaving little room for error or incremental savings. Even after improving the portfolio, long-term goal success remains sensitive to stronger savings discipline.',
    },
    {
      id: 'fallback-liability-1',
      category: 'liability related',
      title: 'Housing Cost Ratio Strain',
      description:
        'The mortgage, property tax, and insurance burden materially reduce monthly flexibility. The debt is not high-cost, but the fixed housing load constrains liquidity and limits how easily the family can increase goal-directed savings.',
    },
  ],
  ui_generation: {
    fallback_used: true,
    source: 'ui-reference-fallback',
    fallback_label: 'Reference fallback content',
    fallback_message: buildFallbackMessage(phase, reason),
    fallback_reason: reason,
    source_documents: [
      'examples & discussions/Michael & Emily.md',
      'examples & discussions/Michael & Emily.client-profile-agent-output.md',
      'examples & discussions/Michael & Emily.step1-policy.md',
    ],
  },
});
