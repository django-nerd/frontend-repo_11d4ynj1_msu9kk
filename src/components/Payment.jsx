import { useState } from 'react'

export default function Payment({ order, onPaid, onBack }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  if (!order) return null

  const pay = async () => {
    setLoading(true)
    setError('')
    try {
      const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      const res = await fetch(`${baseUrl}/api/orders/${order.id}/pay`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ method: 'card' })
      })
      if (!res.ok) throw new Error('Payment failed')
      const data = await res.json()
      onPaid(data.order)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-slate-900">Payment</h3>
        <p className="text-slate-600 text-sm">Secure payment for {order.plan_name}</p>
      </div>

      {error && <div className="mb-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded p-2">{error}</div>}

      <div className="space-y-3">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Card number</label>
            <input className="w-full rounded-lg border border-slate-300 px-3 py-2" placeholder="4242 4242 4242 4242" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Expiry</label>
              <input className="w-full rounded-lg border border-slate-300 px-3 py-2" placeholder="MM/YY" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">CVC</label>
              <input className="w-full rounded-lg border border-slate-300 px-3 py-2" placeholder="123" />
            </div>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Name on card</label>
          <input className="w-full rounded-lg border border-slate-300 px-3 py-2" placeholder={`${order.first_name} ${order.last_name}`} />
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <div className="text-slate-700">Amount</div>
        <div className="text-2xl font-bold text-slate-900">${order.total}</div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <button onClick={onBack} className="py-3 rounded-lg border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50">Back</button>
        <button disabled={loading} onClick={pay} className="py-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold disabled:opacity-60">
          {loading ? 'Processing...' : 'Pay now'}
        </button>
      </div>
    </div>
  )
}
