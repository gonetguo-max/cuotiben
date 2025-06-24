"use client"

import { useState, useEffect } from "react"
import { Search, Clock, BookOpen, FileText, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface SearchResult {
  id: string
  type: "mistake" | "topic" | "note"
  title: string
  content: string
  subject: string
  date: string
  difficulty?: string
}

export default function GlobalSearch() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [recentSearches, setRecentSearches] = useState<string[]>(["二次函数", "化学方程式", "牛顿定律"])
  const [isSearching, setIsSearching] = useState(false)

  // 模拟搜索数据
  const mockResults: SearchResult[] = [
    {
      id: "1",
      type: "mistake",
      title: "二次函数最值问题",
      content: "求函数 f(x) = x² - 4x + 3 的最小值",
      subject: "数学",
      date: "2024-01-15",
      difficulty: "中等",
    },
    {
      id: "2",
      type: "topic",
      title: "二次函数知识点总结",
      content: "二次函数的图像、性质、最值等重要知识点",
      subject: "数学",
      date: "2024-01-10",
    },
    {
      id: "3",
      type: "mistake",
      title: "化学方程式配平",
      content: "Al + HCl → AlCl₃ + H₂ 的配平方法",
      subject: "化学",
      date: "2024-01-12",
      difficulty: "简单",
    },
  ]

  useEffect(() => {
    if (query.trim()) {
      setIsSearching(true)
      // 模拟搜索延迟
      const timer = setTimeout(() => {
        const filtered = mockResults.filter(
          (item) =>
            item.title.toLowerCase().includes(query.toLowerCase()) ||
            item.content.toLowerCase().includes(query.toLowerCase()),
        )
        setResults(filtered)
        setIsSearching(false)
      }, 300)

      return () => clearTimeout(timer)
    } else {
      setResults([])
      setIsSearching(false)
    }
  }, [query])

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery)
    // 添加到最近搜索
    if (searchQuery.trim() && !recentSearches.includes(searchQuery)) {
      setRecentSearches([searchQuery, ...recentSearches.slice(0, 4)])
    }
  }

  const clearRecentSearches = () => {
    setRecentSearches([])
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "mistake":
        return <BookOpen className="w-4 h-4 text-red-500" />
      case "topic":
        return <FileText className="w-4 h-4 text-blue-500" />
      default:
        return <Search className="w-4 h-4 text-gray-500" />
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "mistake":
        return "错题"
      case "topic":
        return "知识点"
      case "note":
        return "笔记"
      default:
        return "其他"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => window.history.back()}>
              <X className="w-5 h-5" />
            </Button>
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="搜索错题、知识点、笔记..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-10"
                autoFocus
              />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6">
        {!query.trim() && (
          <div className="space-y-6">
            {/* Recent Searches */}
            {recentSearches.length > 0 && (
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium text-gray-900 flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      最近搜索
                    </h3>
                    <Button variant="ghost" size="sm" onClick={clearRecentSearches}>
                      清除
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((search, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => handleSearch(search)}
                        className="text-sm"
                      >
                        {search}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Hot Topics */}
            <Card>
              <CardContent className="p-4">
                <h3 className="font-medium text-gray-900 mb-3">热门搜索</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {["二次函数", "化学方程式", "牛顿定律", "三角函数", "电路分析", "有机化学"].map((topic) => (
                    <Button
                      key={topic}
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSearch(topic)}
                      className="justify-start text-sm"
                    >
                      {topic}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Search Results */}
        {query.trim() && (
          <div className="space-y-4">
            {isSearching ? (
              <div className="text-center py-8">
                <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                <p className="text-gray-500">搜索中...</p>
              </div>
            ) : results.length > 0 ? (
              <>
                <div className="text-sm text-gray-600">找到 {results.length} 个相关结果</div>
                <div className="space-y-3">
                  {results.map((result) => (
                    <Card key={result.id} className="cursor-pointer hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 mt-1">{getTypeIcon(result.type)}</div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-medium text-gray-900 truncate">{result.title}</h3>
                              <Badge variant="outline" className="text-xs">
                                {getTypeLabel(result.type)}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 mb-2 line-clamp-2">{result.content}</p>
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                              <span>{result.subject}</span>
                              <span>•</span>
                              <span>{result.date}</span>
                              {result.difficulty && (
                                <>
                                  <span>•</span>
                                  <Badge
                                    variant={
                                      result.difficulty === "困难"
                                        ? "destructive"
                                        : result.difficulty === "中等"
                                          ? "default"
                                          : "secondary"
                                    }
                                    className="text-xs"
                                  >
                                    {result.difficulty}
                                  </Badge>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-8">
                <Search className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                <p className="text-gray-500">没有找到相关结果</p>
                <p className="text-sm text-gray-400 mt-1">试试其他关键词</p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  )
}
