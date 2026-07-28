// Mock fixtures mirroring the real app's demo data.
export const uploadsByDay = [0, 2, 3, 1, 4, 0, 0, 1, 5, 3, 2, 6, 1, 0]
export const questionsByDay = [3, 11, 14, 9, 18, 1, 0, 6, 22, 17, 12, 26, 8, 4]

export const me = {
  name: 'Abdul Moiz', initials: 'AM', role: 'Owner', tenant: 'Acme Corp',
  plan: 'Growth', questions: 340, maxQuestions: 5000,
}

export type Severity = 'high' | 'medium' | 'low'
export interface Insight { id: string; category: string; title: string; body: string; severity: Severity; age: string; isNew?: boolean; source?: string }

export const insights: Insight[] = [
  { id: 'ins-1', category: 'finance', title: 'Revenue dropped 12% in Q3', body: 'Based on uploaded financials, Q3 revenue fell compared to Q2 due to reduced enterprise deal closures in July and August.', severity: 'high', age: '8 weeks ago', isNew: true, source: 'Q3_Revenue_Report.pdf' },
  { id: 'ins-2', category: 'churn', title: '3 enterprise accounts flagged at risk', body: 'Usage patterns and support ticket frequency suggest elevated churn probability for 3 accounts renewing this quarter.', severity: 'high', age: '8 weeks ago', isNew: true, source: 'Customer_Churn_Analysis.pdf' },
  { id: 'ins-3', category: 'sales', title: 'Pipeline conversion improving', body: 'Lead-to-close rate improved by 8% compared to last quarter. Mid-market segment driving most of the gain.', severity: 'medium', age: '7 weeks ago', source: 'Sales_Pipeline_June.xlsx' },
  { id: 'ins-4', category: 'growth', title: 'New market segment emerging', body: 'Inbound inquiries from logistics sector up 34% this month. No current documents cover this vertical.', severity: 'low', age: '7 weeks ago' },
]

export type DocStatus = 'ready' | 'processing' | 'failed'
export interface Doc { id: string; filename: string; sub: string; type: string; visibility: string; status: DocStatus; uploaded: string; err?: string }
export const documents: Doc[] = [
  { id: 'doc-1', filename: 'Q3_Revenue_Report.pdf', sub: '24 pages', type: 'financial', visibility: 'Everyone', status: 'ready', uploaded: 'Jun 1' },
  { id: 'doc-2', filename: 'Sales_Pipeline_June.xlsx', sub: 'Processing…', type: 'crm', visibility: 'Sales dept', status: 'processing', uploaded: 'Jun 10' },
  { id: 'doc-3', filename: 'Customer_Churn_Analysis.pdf', sub: '', type: 'report', visibility: 'Everyone', status: 'failed', uploaded: 'Jun 12', err: 'File appears corrupted after page 6. Re-upload a clean copy.' },
  { id: 'doc-4', filename: 'HR_Policy_2026.pdf', sub: '18 pages', type: 'report', visibility: 'HR dept', status: 'ready', uploaded: 'May 20' },
  { id: 'doc-5', filename: 'Board_Deck_Q2.pptx', sub: '32 pages', type: 'financial', visibility: 'Only me', status: 'ready', uploaded: 'May 15' },
]

export const conversations = ['Q3 Revenue Analysis', 'Churn risk deep dive', 'HR policy questions']
