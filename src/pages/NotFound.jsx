import Page from '../components/Page'
export default function NotFound() {
  return (
    <Page className="min-h-screen">
      <div className="text-center min-h-45">
        <h1 className="text-2xl font-semibold">404 - Not Found</h1>
        <p className="text-gray-600 mt-2">The page you are looking for does not exist.</p>
      </div>
    </Page>
  )
}
