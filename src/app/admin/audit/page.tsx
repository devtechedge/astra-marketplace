import { auditEvents } from '@/lib/expansionData';

export default function AdminAuditPage() {
  return (
    <div>
      <p className="page-kicker">Security</p>
      <h1 className="mt-2">Audit log</h1>
      <div className="mt-6 overflow-x-auto">
        <table className="ops-table">
          <thead>
            <tr>
              <th>Action</th><th>Actor</th><th>Entity</th><th>Severity</th><th>When</th>
            </tr>
          </thead>
          <tbody>
            {auditEvents.map(a => (
              <tr key={a.id}>
                <td className="font-medium">{a.action}</td>
                <td>{a.actor}</td>
                <td className="text-muted">{a.entity}:{a.entityId}</td>
                <td>{a.severity}</td>
                <td className="text-muted">{new Date(a.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
