import type { Health, Priority, RiskLevel, Status, WorkItem } from "./types";

const statuses: Status[] = ["Planned", "Active", "Paused", "Closed"];
const priorities: Priority[] = ["Low", "Medium", "High"];
const riskLevels: RiskLevel[] = ["Low", "Medium", "High"];
const healthStates: Health[] = ["Good", "Watch", "At Risk"];

const summaries = [
  "Quarterly usage sync with regional lead",
  "Renewal package pricing review",
  "Post-launch performance audit",
  "Cross-team dependency alignment",
  "Escalation follow-up with finance",
  "Customer onboarding checklist refresh",
  "Pipeline risk assessment",
  "Enablement content refresh",
  "Partner co-sell planning",
  "Support backlog cleanup",
  "Forecast variance analysis",
  "International rollout planning",
];

const owners = [
  "Avery Chen",
  "Jordan Lee",
  "Morgan Hale",
  "Riley Park",
  "Casey Ford",
  "Taylor Reed",
  "Jamie Brooks",
  "Cameron Cruz",
  "Drew Stone",
  "Robin Shah",
];

const regions = ["North", "South", "East", "West", "Central"];
const stages = [
  "Intake",
  "Discovery",
  "Proposal",
  "Negotiation",
  "Execution",
];
const channels = ["Direct", "Partner", "Online", "Field", "Referral"];
const segments = ["SMB", "Mid-Market", "Enterprise", "Public", "Strategic"];
const products = ["Atlas", "Orion", "Nimbus", "Pulse", "Quasar"];
const accounts = [
  "Acme Corp",
  "Brightline",
  "Canyon Labs",
  "DeltaWorks",
  "Evergreen",
  "Foxglove",
  "Greenway",
  "Harborline",
  "Ionix",
  "Juniper",
];
const teams = ["Growth", "Revenue", "Ops", "Success", "Platform"];

const baseDate = new Date(Date.UTC(2025, 0, 1));
const addDays = (offset: number) => {
  const date = new Date(baseDate);
  date.setUTCDate(baseDate.getUTCDate() + offset);
  return date.toISOString().slice(0, 10);
};

export const data: WorkItem[] = Array.from({ length: 48 }, (_, index) => {
  const createdAt = addDays(index * 3);
  const updatedAt = addDays(index * 3 + 5);
  const dueDate = addDays(index * 3 + 17);

  return {
    id: index + 1,
    status: statuses[index % statuses.length],
    summary: summaries[index % summaries.length],
    createdAt,
    updatedAt,
    dueDate,
    owner: owners[index % owners.length],
    region: regions[index % regions.length],
    priority: priorities[index % priorities.length],
    stage: stages[index % stages.length],
    budget: 15000 + index * 1250,
    score: Number((72 + (index % 15) * 1.3).toFixed(1)),
    riskLevel: riskLevels[(index + 1) % riskLevels.length],
    channel: channels[index % channels.length],
    segment: segments[index % segments.length],
    product: products[index % products.length],
    account: accounts[index % accounts.length],
    team: teams[index % teams.length],
    cycleDays: 14 + (index % 20),
    health: healthStates[index % healthStates.length],
  };
});
