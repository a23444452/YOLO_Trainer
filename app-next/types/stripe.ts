export type PlanName = 'free' | 'pro' | 'enterprise'

export interface SubscriptionInfo {
  plan: PlanName
  status: string
  currentPeriodEnd: string | null
  cancelAtPeriodEnd: boolean
}
