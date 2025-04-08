import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertFeedbackSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes for feedback
  app.post("/api/submit-feedback", async (req, res) => {
    try {
      // Validate the request body
      const validatedData = insertFeedbackSchema.safeParse(req.body);
      
      if (!validatedData.success) {
        const errorMessage = fromZodError(validatedData.error).message;
        return res.status(400).json({ 
          success: false, 
          message: errorMessage 
        });
      }
      
      // Store the feedback
      const feedback = await storage.createFeedback(validatedData.data);
      
      return res.status(201).json({ 
        success: true, 
        message: "Feedback submitted successfully",
        data: feedback
      });
    } catch (error) {
      console.error("Error submitting feedback:", error);
      return res.status(500).json({ 
        success: false, 
        message: "An error occurred while submitting your feedback" 
      });
    }
  });

  app.get("/api/feedbacks", async (_req, res) => {
    try {
      const allFeedback = await storage.getAllFeedback();
      return res.status(200).json({ 
        success: true, 
        data: allFeedback 
      });
    } catch (error) {
      console.error("Error fetching feedback:", error);
      return res.status(500).json({ 
        success: false, 
        message: "An error occurred while retrieving feedback" 
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
