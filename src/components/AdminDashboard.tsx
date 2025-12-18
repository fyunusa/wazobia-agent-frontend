import { useEffect, useState } from 'react'
import { Users, MessageSquare, TrendingUp, Activity, Globe, Calendar, BarChart3 } from 'lucide-react'

interface AdminStats {
  total_users: number
  active_users: number
  total_conversations: number
  total_messages: number
  user_messages: number
  recent_signups: number
  messages_24h: number
  language_stats: Record<string, number>
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<AdminStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('auth_token')
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/admin/stats`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (!response.ok) {
        throw new Error('Failed to fetch admin stats')
      }

      const data = await response.json()
      setStats(data)
    } catch (err: any) {
      setError(err.message || 'Failed to load stats')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-8">
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-600">
          {error}
        </div>
      </div>
    )
  }

  if (!stats) return null

  const languageNames: Record<string, string> = {
    'ha': 'Hausa',
    'pcm': 'Pidgin',
    'yo': 'Yoruba',
    'en': 'English',
    'ig': 'Igbo'
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent mb-2">
          Admin Dashboard
        </h1>
        <p className="text-neutral-600">Overview of Wazobia AI Agent metrics and usage</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Users */}
        <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
              Total
            </span>
          </div>
          <p className="text-3xl font-bold text-neutral-900 mb-1">{stats.total_users}</p>
          <p className="text-sm text-neutral-600">Registered Users</p>
          <p className="text-xs text-neutral-500 mt-2">
            {stats.active_users} active (30d)
          </p>
        </div>

        {/* Recent Signups */}
        <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-xs font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full">
              7 Days
            </span>
          </div>
          <p className="text-3xl font-bold text-neutral-900 mb-1">{stats.recent_signups}</p>
          <p className="text-sm text-neutral-600">New Signups</p>
          <p className="text-xs text-neutral-500 mt-2">
            Last 7 days
          </p>
        </div>

        {/* Total Conversations */}
        <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-xs font-semibold text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
              All Time
            </span>
          </div>
          <p className="text-3xl font-bold text-neutral-900 mb-1">{stats.total_conversations}</p>
          <p className="text-sm text-neutral-600">Conversations</p>
          <p className="text-xs text-neutral-500 mt-2">
            {stats.total_messages} total messages
          </p>
        </div>

        {/* 24h Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <Activity className="w-6 h-6 text-orange-600" />
            </div>
            <span className="text-xs font-semibold text-orange-600 bg-orange-50 px-3 py-1 rounded-full">
              24h
            </span>
          </div>
          <p className="text-3xl font-bold text-neutral-900 mb-1">{stats.messages_24h}</p>
          <p className="text-sm text-neutral-600">Messages Today</p>
          <p className="text-xs text-neutral-500 mt-2">
            Last 24 hours
          </p>
        </div>
      </div>

      {/* Language Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Language Stats */}
        <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center">
              <Globe className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-neutral-900">Language Distribution</h2>
              <p className="text-sm text-neutral-600">Messages by language</p>
            </div>
          </div>

          <div className="space-y-4">
            {Object.entries(stats.language_stats).map(([lang, count]) => {
              const total = Object.values(stats.language_stats).reduce((a, b) => a + b, 0)
              const percentage = ((count / total) * 100).toFixed(1)
              
              return (
                <div key={lang}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-neutral-700">
                      {languageNames[lang] || lang.toUpperCase()}
                    </span>
                    <span className="text-sm font-semibold text-neutral-900">
                      {count} ({percentage}%)
                    </span>
                  </div>
                  <div className="w-full bg-neutral-100 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-primary-500 to-accent-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Usage Summary */}
        <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-neutral-900">Usage Summary</h2>
              <p className="text-sm text-neutral-600">Platform statistics</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
              <div>
                <p className="text-sm font-medium text-neutral-600">Avg Messages per User</p>
                <p className="text-2xl font-bold text-neutral-900">
                  {stats.total_users > 0 ? (stats.user_messages / stats.total_users).toFixed(1) : '0'}
                </p>
              </div>
              <MessageSquare className="w-8 h-8 text-purple-500" />
            </div>

            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl">
              <div>
                <p className="text-sm font-medium text-neutral-600">Avg Msgs per Conversation</p>
                <p className="text-2xl font-bold text-neutral-900">
                  {stats.total_conversations > 0 ? (stats.total_messages / stats.total_conversations).toFixed(1) : '0'}
                </p>
              </div>
              <Activity className="w-8 h-8 text-green-500" />
            </div>

            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl">
              <div>
                <p className="text-sm font-medium text-neutral-600">Active User Rate</p>
                <p className="text-2xl font-bold text-neutral-900">
                  {stats.total_users > 0 ? ((stats.active_users / stats.total_users) * 100).toFixed(1) : '0'}%
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-orange-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Refresh Button */}
      <div className="mt-8 flex justify-center">
        <button
          onClick={fetchStats}
          className="px-6 py-3 bg-gradient-to-r from-primary-600 to-accent-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105"
        >
          Refresh Stats
        </button>
      </div>
    </div>
  )
}
