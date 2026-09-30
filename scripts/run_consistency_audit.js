const { runConsistencyAudit } = require('../lib/rag/auditEngine');

function main() {
  console.log('Running Canonical Consistency Audit...');
  const report = runConsistencyAudit();
  console.log('=== CONSISTENCY AUDIT REPORT ===');
  console.log('Timestamp:', report.timestamp);
  console.log('Total Checks:', report.totalChecks);
  console.log('Consistent Checks:', report.consistentCount);
  console.log('Documented Conflicts:', report.conflictCount);
  console.log('Unverified Items:', report.unverifiedCount);
  console.log('Stale Integrations:', report.staleCount);
  console.log('Documented Source Conflicts Tracked:', report.documentedConflictsCount);
  console.log('\n--- FINDINGS BREAKDOWN ---');
  report.findings.forEach(f => {
    console.log(`[${f.status.padEnd(11)}] ${f.entity.padEnd(30)} -> ${f.details}`);
  });
}

main();
