import { Suspense } from 'react'
import { BillingContent } from './billing-content'

export default function BillingPage() {
  return (
    <Suspense fallback={<BillingFallback />}>
      <BillingContent />
    </Suspense>
  )
}

function BillingFallback() {
  return (
    <div className="space-y-8">
      <div>
        <div className="h-9 w-48 bg-muted/50 rounded animate-pulse" />
        <div className="h-5 w-72 bg-muted/30 rounded animate-pulse mt-2" />
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-96 bg-muted/20 rounded-lg animate-pulse" />
        ))}
      </div>
    </div>
  )
}
