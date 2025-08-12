import './App.css'
import Pages from "@/pages/index.jsx"
import { Toaster } from "@/components/ui/toaster"

function App() {
  console.log('🎉 Little Linguist LOCAL APP LOADED - NOT Base44!', {
    timestamp: new Date().toISOString(),
    url: window.location.href,
    environment: 'local-development'
  });
  
  return (
    <>
      <Pages />
      <Toaster />
    </>
  )
}

export default App 