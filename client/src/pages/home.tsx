import { useState } from "react";
import FeedbackForm from "@/components/feedback-form";
import FeedbackList from "@/components/feedback-list";
import SuccessMessage from "@/components/success-message";
import ThemeToggle from "@/components/theme-toggle";
import { useTheme } from "@/hooks/use-theme";
import { MessageSquare } from "lucide-react";

export default function Home() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const { theme } = useTheme();

  const toggleAdmin = () => {
    setIsAdmin(!isAdmin);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-white transition-colors duration-200">
      <header className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <MessageSquare className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
            <h1 className="text-lg sm:text-xl font-bold text-primary-600 dark:text-primary-400">Feedback Collector</h1>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-6 sm:mb-8 flex justify-center sm:justify-end">
            <button 
              className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors dark:bg-primary-700 dark:hover:bg-primary-800"
              onClick={toggleAdmin}>
              {isAdmin ? 'Hide Feedback' : 'View Submitted Feedback'}
            </button>
          </div>

          {!isAdmin && (
            <FeedbackForm 
              onSuccess={() => setShowSuccessMessage(true)} 
            />
          )}

          <FeedbackList 
            isVisible={isAdmin} 
          />

          <SuccessMessage 
            isOpen={showSuccessMessage} 
            onClose={() => setShowSuccessMessage(false)} 
          />
        </div>
      </main>

      <footer className="mt-auto bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-4">
        <div className="container mx-auto px-4 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>© {new Date().getFullYear()} Feedback Collector - Developed by <span className="font-medium">Mayank Kumar</span></p>
          <p className="text-xs mt-1">Submission for Developer Evaluation Task - April 2025</p>
        </div>
      </footer>
    </div>
  );
}
