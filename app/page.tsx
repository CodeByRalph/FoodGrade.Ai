import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Navigation } from '@/components/Navigation';

export default function Home() {
  return (
    <main className="min-h-screen relative">
      {/* Background Image with Blur */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e")',
          }}
        />
        <div className="absolute inset-0 backdrop-blur-xl bg-blue-900/70" />
      </div>

      <Navigation />

      {/* Main Content */}
      <div className="relative z-10 min-h-[calc(100vh-64px)] flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
            AI-Powered Food Safety Audits
          </h1>
          <p className="text-xl sm:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Streamline compliance with intelligent automation
          </p>
          <Button 
            size="lg"
            className="w-full sm:w-auto px-8 py-4 text-lg bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all"
            asChild
          >
            <Link href="/video-chat">Start Video Chat</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}