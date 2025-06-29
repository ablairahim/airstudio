import { getAllCaseStudies } from '@/lib/sanity'
import { CaseStudyCard } from '@/components/CaseStudyCard'

export default async function TestCMSPage() {
  const caseStudies = await getAllCaseStudies()
  
  // Убеждаемся что у нас есть массив
  const safeCaseStudies = Array.isArray(caseStudies) ? caseStudies : []

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">CMS Test Page</h1>
      
      {safeCaseStudies.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-2xl mb-4">No case studies yet</h2>
          <p className="text-gray-600 mb-4">
            Go to <a href="/studio" className="text-blue-600 underline">/studio</a> to create your first case study
          </p>
          <div className="bg-gray-100 p-4 rounded-lg text-left max-w-md mx-auto">
            <h3 className="font-bold mb-2">Steps:</h3>
            <ol className="list-decimal list-inside space-y-1 text-sm">
              <li>Create some Callouts first (metrics, quotes, etc.)</li>
              <li>Then create a Case Study</li>
              <li>Add content blocks to your case study</li>
              <li>Refresh this page to see results</li>
            </ol>
          </div>
        </div>
      ) : (
        <div className="grid gap-8">
          {safeCaseStudies.map((caseStudy) => (
            <CaseStudyCard key={caseStudy._id} caseStudy={caseStudy} />
          ))}
        </div>
      )}
    </div>
  )
} 