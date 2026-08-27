import { TicketConversation } from '@/components/support/TicketConversation';

export default function SupportTicketsPage() {
  return (
    <div className="container-page py-10 md:py-16">
      <p className="page-kicker">Workspace</p>
      <h1 className="mt-2">Support ticket</h1>
      <p className="page-lead">Conversation threads, order context, macros, SLA timers and escalation.</p>
      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_280px]">
        <TicketConversation />
        <aside className="panel p-6">
          <h2>Order context</h2>
          <p className="mt-3 text-sm text-muted">Order ord-9001 · Shipped · Customer lifetime value $1,842.70</p>
          <div className="mt-6 space-y-3">
            <button className="btn btn-ghost w-full">Issue store credit</button>
            <button className="btn-quiet block w-full text-sm">Open return</button>
            <button className="btn-quiet block w-full text-sm">Contact carrier</button>
          </div>
        </aside>
      </div>
    </div>
  );
}
