import { useEffect, useState } from 'react'

export default function PlanSelector({ onSelect }) {
  const [plans, setPlans] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const load = async () => {
      try {
        const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
        const res = await fetch(`${baseUrl}/api/plans`)
        if (!res.ok) throw new Error(`Failed to load plans (${res.status})`)
        const data = await res.json()
        setPlans(data.plans || [])
      } catch (e) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  if (loading) {
    return (
      <div className="p-8 bg-white/70 rounded-xl border border-slate-200 animate-pulse">
        <div className="h-6 w-40 bg-slate-200 rounded mb-4"></div>
        <div className="grid md:grid-cols-3 gap-4">
          {[1,2,3].map(i => (
            <div key={i} className="p-6 rounded-xl border border-slate-200 bg-white">
              <div className="h-5 w-24 bg-slate-200 rounded mb-2"></div>
              <div className="h-4 w-32 bg-slate-200 rounded mb-6"></div>
              <div className="h-8 w-full bg-slate-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6 bg-red-50 text-red-700 rounded-xl border border-red-200">
        {error}
      </div>
    )
  }

  return (
    <div className="">
      <h2 className="text-2xl font-semibold text-slate-800 mb-4">Choose your plan</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {plans.map(plan => (
          <div key={plan.id} className="group rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-baseline justify-between mb-2">
                <h3 className="text-lg font-semibold text-slate-900">{plan.name}</h3>
                <div className="text-2xl font-bold text-blue-600">${plan.price}</div>
              </div>
              <p className="text-slate-600 mb-4">{plan.description}</p>
              <ul className="space-y-2 mb-6">
                {plan.features?.map((f, idx) => (
                  <li key={idx} className="text-sm text-slate-700 flex items-start gap-2">
                    <span className="mt-1 inline-block h-2 w-2 rounded-full bg-blue-500"></span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <button
                className="w-full py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
                onClick={() => onSelect(plan)}
              >
                Select {plan.name}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
