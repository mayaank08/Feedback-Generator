import { CheckIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SuccessMessageProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SuccessMessage({ isOpen, onClose }: SuccessMessageProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
      <div className="relative bg-white dark:bg-gray-800 rounded-lg p-6 max-w-sm mx-auto shadow-xl">
        <div className="flex items-center justify-center mb-4">
          <div className="bg-green-100 dark:bg-green-900 rounded-full p-2">
            <CheckIcon className="w-8 h-8 text-green-500 dark:text-green-400" />
          </div>
        </div>
        <h3 className="text-lg font-medium text-center text-gray-900 dark:text-white mb-2">Thank You!</h3>
        <p className="text-center text-gray-600 dark:text-gray-400">Your feedback has been submitted successfully.</p>
        <div className="mt-4 text-center">
          <Button
            className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors dark:bg-primary-700 dark:hover:bg-primary-800"
            onClick={onClose}
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}
