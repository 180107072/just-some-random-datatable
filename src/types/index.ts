export type Status = "Planned" | "Active" | "Paused" | "Closed";
export type Priority = "Low" | "Medium" | "High";
export type RiskLevel = "Low" | "Medium" | "High";
export type Health = "Good" | "Watch" | "At Risk";

export interface WorkItem {
  id: number;
  status: Status;
  summary: string;
  createdAt: string;
  updatedAt: string;
  dueDate: string;
  owner: string;
  region: string;
  priority: Priority;
  stage: string;
  budget: number;
  score: number;
  riskLevel: RiskLevel;
  channel: string;
  segment: string;
  product: string;
  account: string;
  team: string;
  cycleDays: number;
  health: Health;
}
