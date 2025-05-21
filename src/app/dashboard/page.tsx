import DashboardLayout from '@/components/dashboard/DashboardLayout'
import PortfolioOverview from '@/components/dashboard/PortfolioOverview'
import AlphaScore from '@/components/dashboard/AlphaScore'
import SignalFeed from '@/components/dashboard/SignalFeed'

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Monitor your portfolio, trade signals, and market analytics.
        </p>
      </div>
      
      <div className="space-y-8">
        <PortfolioOverview />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AlphaScore />
          <SignalFeed />
        </div>
      </div>
    </DashboardLayout>
  )
} 