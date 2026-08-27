import { customers } from '@/lib/expansionData';
import { formatMoney } from '@/lib/commerce';

export default function AdminUsersPage() {
  return (
    <div>
      <p className="page-kicker">People</p>
      <h1 className="mt-2">User management</h1>
      <input placeholder="Search users by email, name or role" className="field mt-6 max-w-md" />
      <div className="mt-6 overflow-x-auto">
        <table className="ops-table">
          <thead>
            <tr>
              <th>User</th><th>Roles</th><th>Status</th><th>LTV</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map(u => (
              <tr key={u.id}>
                <td>
                  <strong>{u.name}</strong>
                  <p className="text-muted">{u.email}</p>
                </td>
                <td>{u.roles.join(', ')}</td>
                <td>{u.status}</td>
                <td className="tabular-nums">{formatMoney(u.lifetimeValue)}</td>
                <td>
                  <button className="btn-quiet text-sm">View</button>
                  <span className="mx-2 text-line">·</span>
                  <button className="btn-quiet text-sm">Suspend</button>
                  <span className="mx-2 text-line">·</span>
                  <button className="btn-quiet text-sm">Roles</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
