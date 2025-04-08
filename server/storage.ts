import { users, type User, type InsertUser, feedback, type Feedback, type InsertFeedback } from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Feedback methods
  createFeedback(feedbackData: InsertFeedback): Promise<Feedback>;
  getAllFeedback(): Promise<Feedback[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private feedbackEntries: Map<number, Feedback>;
  private userId: number;
  private feedbackId: number;

  constructor() {
    this.users = new Map();
    this.feedbackEntries = new Map();
    this.userId = 1;
    this.feedbackId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createFeedback(insertFeedback: InsertFeedback): Promise<Feedback> {
    const id = this.feedbackId++;
    const timestamp = new Date();
    const feedbackEntry: Feedback = { ...insertFeedback, id, timestamp };
    this.feedbackEntries.set(id, feedbackEntry);
    return feedbackEntry;
  }

  async getAllFeedback(): Promise<Feedback[]> {
    return Array.from(this.feedbackEntries.values())
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()); // Sort by timestamp, newest first
  }
}

export const storage = new MemStorage();
