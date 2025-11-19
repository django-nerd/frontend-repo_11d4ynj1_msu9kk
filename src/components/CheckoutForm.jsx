import { useState } from 'react'

export default function CheckoutForm({ plan, onCreated }) {
  const [form, setForm] = useState({
    first_name: '', last_name: '', email: '', phone: '',
    address_line1: '', address_line2: '', city: '', state: '', postal_code: '', country: 'United Kingdom',
    notes: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  if (!plan) return null

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      const res = await fetch(`${baseUrl}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan_id: plan.id, ...form })
      })
      if (!res.ok) throw new Error('Could not create order')
      const data = await res.json()
      onCreated(data.order)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  const field = (label, name, type='text', required=false) => (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
      <input
        name={name}
        type={type}
        required={required}
        value={form[name]}
        onChange={handleChange}
        className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  )

  return (
    <form onSubmit={submit} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-slate-900">Your details</h3>
        <div className="text-slate-600 text-sm">Selected: <span className="font-medium">{plan.name}</span></div>
      </div>

      {error && <div className="mb-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded p-2">{error}</div>}

      <div className="grid md:grid-cols-2 gap-4">
        {field('First name', 'first_name', 'text', true)}
        {field('Last name', 'last_name', 'text', true)}
      </div>
      <div className="grid md:grid-cols-2 gap-4 mt-4">
        {field('Email', 'email', 'email', true)}
        {field('Phone', 'phone')}
      </div>

      <div className="mt-4 space-y-4">
        {field('Address line 1', 'address_line1', 'text', true)}
        {field('Address line 2', 'address_line2')}
        <div className="grid md:grid-cols-3 gap-4">
          {field('City', 'city', 'text', true)}
          {field('State / County', 'state')}
          {field('Postal code', 'postal_code', 'text', true)}
        </div>
        {field('Country', 'country', 'text', true)}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Notes</label>
          <textarea name="notes" value={form.notes} onChange={handleChange} rows={3} className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <div className="text-slate-700">Total</div>
        <div className="text-2xl font-bold text-slate-900">${plan.price}</div>
      </div>

      <button disabled={loading} className="mt-6 w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors disabled:opacity-60">
        {loading ? 'Creating order...' : 'Continue to payment'}
      </button>
    </form>
  )
}
