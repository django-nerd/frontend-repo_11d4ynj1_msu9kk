import { useState } from 'react'
import PlanSelector from './components/PlanSelector'
import CheckoutForm from './components/CheckoutForm'
import Payment from './components/Payment'
import Confirmation from './components/Confirmation'

function App() {
  const [step, setStep] = useState('plans')
  const [selectedPlan, setSelectedPlan] = useState(null)
  const [order, setOrder] = useState(null)

  const onSelectPlan = (plan) => {
    setSelectedPlan(plan)
    setStep('details')
  }

  const onCreated = (order) => {
    setOrder(order)
    setStep('payment')
  }

  const onPaid = (paidOrder) => {
    setOrder(paidOrder)
    setStep('done')
  }

  const reset = () => {
    setStep('plans'); setSelectedPlan(null); setOrder(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <header className="border-b border-slate-200 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-blue-600 text-white grid place-items-center font-bold">W</div>
            <div>
              <p className="text-slate-900 font-semibold">PeaceWill</p>
              <p className="text-slate-500 text-xs">Professional Will Writing</p>
            </div>
          </div>
          <nav className="text-sm text-slate-600 hidden md:flex gap-6">
            <span className={step==='plans'?'text-slate-900 font-medium':'opacity-70'}>Choose plan</span>
            <span className={step==='details'?'text-slate-900 font-medium':'opacity-70'}>Your details</span>
            <span className={step==='payment'?'text-slate-900 font-medium':'opacity-70'}>Payment</span>
            <span className={step==='done'?'text-slate-900 font-medium':'opacity-70'}>Confirmation</span>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            {step === 'plans' && (
              <PlanSelector onSelect={onSelectPlan} />
            )}
            {step === 'details' && (
              <CheckoutForm plan={selectedPlan} onCreated={onCreated} />
            )}
            {step === 'payment' && (
              <Payment order={order} onPaid={onPaid} onBack={() => setStep('details')} />)
            }
            {step === 'done' && (
              <Confirmation order={order} onNew={reset} />
            )}
          </div>

          <aside className="space-y-4">
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h4 className="font-semibold text-slate-900 mb-4">Order summary</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span>Plan</span><span>{selectedPlan?.name || '-'}</span></div>
                <div className="flex justify-between"><span>Price</span><span>{selectedPlan ? `$${selectedPlan.price}` : '-'}</span></div>
                <div className="flex justify-between"><span>Status</span><span className="capitalize">{order?.status || '-'}</span></div>
                {order?.payment_reference && (
                  <div className="flex justify-between"><span>Ref</span><span className="font-mono">{order.payment_reference}</span></div>
                )}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h4 className="font-semibold text-slate-900 mb-2">Need help?</h4>
              <p className="text-slate-600 text-sm">Our team can guide you through choosing the right plan and completing your Will.</p>
              <a href="#" className="inline-block mt-3 text-blue-600 hover:text-blue-700 text-sm font-medium">Chat with support →</a>
            </div>
          </aside>
        </div>
      </main>

      <footer className="py-10 text-center text-slate-500 text-sm">© {new Date().getFullYear()} PeaceWill Ltd. All rights reserved.</footer>
    </div>
  )
}

export default App
