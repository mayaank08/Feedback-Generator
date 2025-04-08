import { useQuery } from "@tanstack/react-query";
import { Feedback } from "@shared/schema";
import { Loader2, Inbox } from "lucide-react";

interface FeedbackListProps {
  isVisible: boolean;
}

export default function FeedbackList({ isVisible }: FeedbackListProps) {
  const { data, isLoading } = useQuery<{ success: boolean; data: Feedback[] }>({
    queryKey: ['/api/feedbacks'],
    enabled: isVisible,
  });

  const feedbackItems = data?.data || [];

  return (
    <div 
      className={`transition-height ${isVisible ? 'max-h-[2000px]' : 'max-h-0'} overflow-hidden`} 
      style={{ transition: "max-height 0.3s ease-in-out" }}
    >
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Submitted Feedback</h2>
          
          {/* Loading State */}
          {isLoading && (
            <div className="py-10 text-center">
              <Loader2 className="animate-spin h-8 w-8 mx-auto text-primary-500" />
              <p className="mt-2 text-gray-600 dark:text-gray-400">Loading feedback...</p>
            </div>
          )}

          {/* Empty State */}
          {!isLoading && feedbackItems.length === 0 && (
            <div className="py-10 text-center">
              <Inbox className="w-12 h-12 mx-auto text-gray-400" />
              <p className="mt-2 text-gray-600 dark:text-gray-400">No feedback submissions yet.</p>
            </div>
          )}

          {/* Feedback Items */}
          {!isLoading && feedbackItems.length > 0 && (
            <div className="space-y-4">
              {feedbackItems.map((item) => (
                <div key={item.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-600">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">{item.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{item.email}</p>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date(item.timestamp).toLocaleString()}
                    </div>
                  </div>
                  <p className="mt-2 text-gray-700 dark:text-gray-300">{item.message}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
