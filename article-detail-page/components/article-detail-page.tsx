"use client"

import { useState } from "react"
import { ArticleHeader } from "./article/article-header"
import { ArticleBreadcrumb } from "./article/article-breadcrumb"
import { ArticleContent } from "./article/article-content"
import { ArticleSidebar } from "./article/article-sidebar"
import { ArticleNavigation } from "./article/article-navigation"
import { SiteFooter } from "./article/site-footer"

export function ArticleDetailPage() {
  const [activeTab, setActiveTab] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerate = (type: "resum" | "exemple") => {
    setIsGenerating(true)
    setActiveTab(type === "resum" ? "Resum" : "Exemple aplicat")
    // Simulate AI generation
    setTimeout(() => setIsGenerating(false), 2000)
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Breadcrumb */}
      <ArticleBreadcrumb />

      {/* Header */}
      <ArticleHeader />

      {/* Main content area */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-6 lg:px-8 py-8 lg:py-12">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Main article content */}
          <div className="flex-1 min-w-0">
            <ArticleContent onGenerate={handleGenerate} isGenerating={isGenerating} />
            <ArticleNavigation />
          </div>

          {/* Sidebar */}
          <aside className="w-full lg:w-80 shrink-0">
            <ArticleSidebar activeTab={activeTab} setActiveTab={setActiveTab} isGenerating={isGenerating} />
          </aside>
        </div>
      </main>

      {/* Footer */}
      <SiteFooter />
    </div>
  )
}
