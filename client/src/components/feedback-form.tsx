import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertFeedbackSchema, type InsertFeedback } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2, User, Mail, MessageSquare } from "lucide-react";

interface FeedbackFormProps {
  onSuccess: () => void;
}

export default function FeedbackForm({ onSuccess }: FeedbackFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<InsertFeedback>({
    resolver: zodResolver(insertFeedbackSchema),
    defaultValues: {
      name: "",
      email: "",
      message: ""
    },
    mode: "onChange" // Validate on change for better UX
  });

  const onSubmit = async (data: InsertFeedback) => {
    setIsSubmitting(true);
    try {
      await apiRequest("POST", "/api/submit-feedback", data);
      form.reset();
      toast({
        title: "Success!",
        description: "Your feedback has been submitted.",
        duration: 3000,
      });
      onSuccess();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Submission Failed",
        description: error instanceof Error ? error.message : "Failed to submit feedback. Please try again."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper for field focus animations
  const getLabelClass = (fieldName: string) => {
    return `absolute text-xs transition-all duration-200 ${
      focused === fieldName ? 'text-primary-500 dark:text-primary-400' : 'text-gray-500 dark:text-gray-400'
    }`;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-all duration-300">
      <div className="p-4 sm:p-6">
        <h2 className="text-xl sm:text-2xl font-bold mb-6 text-gray-900 dark:text-white">
          Share Your Feedback
        </h2>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <div className="relative">
                    <FormLabel className="text-gray-700 dark:text-gray-300 flex items-center gap-2">
                      <User className="w-4 h-4 text-primary-500 dark:text-primary-400" />
                      Full Name
                    </FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter your name" 
                        className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md"
                        {...field} 
                        onFocus={() => setFocused("name")}
                        onBlur={() => setFocused(null)}
                      />
                    </FormControl>
                  </div>
                  <FormMessage className="text-xs mt-1 text-red-500" />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <div className="relative">
                    <FormLabel className="text-gray-700 dark:text-gray-300 flex items-center gap-2">
                      <Mail className="w-4 h-4 text-primary-500 dark:text-primary-400" />
                      Email Address
                    </FormLabel>
                    <FormControl>
                      <Input 
                        type="email" 
                        placeholder="your.email@example.com" 
                        className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md"
                        {...field} 
                        onFocus={() => setFocused("email")}
                        onBlur={() => setFocused(null)}
                      />
                    </FormControl>
                  </div>
                  <FormMessage className="text-xs mt-1 text-red-500" />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <div className="relative">
                    <FormLabel className="text-gray-700 dark:text-gray-300 flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-primary-500 dark:text-primary-400" />
                      Feedback Message
                    </FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Please share your thoughts... (minimum 10 characters)" 
                        className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md resize-y"
                        rows={4}
                        {...field} 
                        onFocus={() => setFocused("message")}
                        onBlur={() => setFocused(null)}
                      />
                    </FormControl>
                  </div>
                  <FormMessage className="text-xs mt-1 text-red-500" />
                </FormItem>
              )}
            />
            
            <Button 
              type="submit" 
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 dark:bg-primary-700 dark:hover:bg-primary-800"
              disabled={isSubmitting || !form.formState.isValid}
            >
              {isSubmitting && <Loader2 className="animate-spin mr-2 h-4 w-4" />}
              {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
            </Button>
            
            {/* Form status indicator */}
            {form.formState.isSubmitting && (
              <p className="text-xs text-center text-gray-500 dark:text-gray-400 animate-pulse">
                Submitting your feedback...
              </p>
            )}
          </form>
        </Form>
      </div>
    </div>
  );
}
