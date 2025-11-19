export default function Confirmation({ order, onNew }) {
  if (!order) return null
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-slate-900">Order confirmed</h3>
        <p className="text-slate-600 text-sm">Thank you. Your payment was successful.</p>
      </div>
      <div className="space-y-2 text-slate-700">
        <div className="flex justify-between"><span>Reference</span><span className="font-mono">{order.payment_reference}</span></div>
        <div className="flex justify-between"><span>Plan</span><span>{order.plan_name}</span></div>
        <div className="flex justify-between"><span>Amount</span><span>${order.total}</span></div>
        <div className="flex justify-between"><span>Customer</span><span>{order.first_name} {order.last_name}</span></div>
        <div className="flex justify-between"><span>Email</span><span>{order.email}</span></div>
      </div>
      <button onClick={onNew} className="mt-6 w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold">Create another</button>
    </div>
  )
}
