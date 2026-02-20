import { Card, CardContent, CardHeader } from '@/components/ui/card'

export default function DashboardLoading() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <div className="h-9 w-56 bg-muted/50 rounded animate-pulse" />
        <div className="h-5 w-72 bg-muted/30 rounded animate-pulse" />
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="border-border/50 bg-card/80">
            <CardHeader className="space-y-2">
              <div className="h-4 w-20 bg-muted/30 rounded animate-pulse" />
              <div className="h-7 w-28 bg-muted/50 rounded animate-pulse" />
            </CardHeader>
            <CardContent>
              <div className="h-9 bg-muted/20 rounded-md animate-pulse" />
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-border/50 bg-card/80">
        <CardHeader className="space-y-2">
          <div className="h-6 w-24 bg-muted/50 rounded animate-pulse" />
          <div className="h-4 w-48 bg-muted/30 rounded animate-pulse" />
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="h-4 w-full bg-muted/20 rounded animate-pulse" />
            <div className="h-4 w-3/4 bg-muted/20 rounded animate-pulse" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
