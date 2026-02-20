import { Card, CardContent, CardHeader } from '@/components/ui/card'

export default function AuthLoading() {
  return (
    <Card className="w-full max-w-md border-border/50 bg-card/80 backdrop-blur">
      <CardHeader className="text-center space-y-2">
        <div className="h-7 w-40 bg-muted/50 rounded animate-pulse mx-auto" />
        <div className="h-4 w-56 bg-muted/30 rounded animate-pulse mx-auto" />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="h-10 bg-muted/30 rounded-md animate-pulse" />
          <div className="h-10 bg-muted/30 rounded-md animate-pulse" />
        </div>
        <div className="h-px bg-muted/20" />
        <div className="space-y-3">
          <div className="space-y-2">
            <div className="h-4 w-12 bg-muted/30 rounded animate-pulse" />
            <div className="h-10 bg-muted/20 rounded-md animate-pulse" />
          </div>
          <div className="space-y-2">
            <div className="h-4 w-10 bg-muted/30 rounded animate-pulse" />
            <div className="h-10 bg-muted/20 rounded-md animate-pulse" />
          </div>
          <div className="h-10 bg-muted/40 rounded-md animate-pulse" />
        </div>
      </CardContent>
    </Card>
  )
}
