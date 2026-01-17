import type { Layout } from "react-resizable-panels";

import type { ColumnControl, ColumnKey, SortKey } from "./data-table-types";

export type ColumnDefinition = {
  key: ColumnKey;
  label: string;
  defaultSize: number;
  minSize: number;
  control?: ColumnControl;
};

export const statusFilterOptions = [
  { label: "All", value: "ALL" },
  { label: "Planned", value: "Planned" },
  { label: "Active", value: "Active" },
  { label: "Paused", value: "Paused" },
  { label: "Closed", value: "Closed" },
];

export const columnLabels: Record<ColumnKey, string> = {
  id: "ID",
  status: "Status",
  summary: "Summary",
  createdAt: "createdAt",
  updatedAt: "updatedAt",
  dueDate: "dueDate",
  owner: "Owner",
  region: "Region",
  priority: "Priority",
  stage: "Stage",
  budget: "Budget",
  score: "Score",
  riskLevel: "Risk",
  channel: "Channel",
  segment: "Segment",
  product: "Product",
  account: "Account",
  team: "Team",
  cycleDays: "Cycle Days",
  health: "Health",
};

export const sortLabels: Record<SortKey, string> = {
  id: columnLabels.id,
  summary: columnLabels.summary,
  owner: columnLabels.owner,
  region: columnLabels.region,
  priority: columnLabels.priority,
  stage: columnLabels.stage,
  budget: columnLabels.budget,
  score: columnLabels.score,
  riskLevel: columnLabels.riskLevel,
  channel: columnLabels.channel,
  segment: columnLabels.segment,
  product: columnLabels.product,
  account: columnLabels.account,
  team: columnLabels.team,
  cycleDays: columnLabels.cycleDays,
  health: columnLabels.health,
};

export const columns: ColumnDefinition[] = [
  { key: "id", label: columnLabels.id, defaultSize: 6, minSize: 4 },
  {
    key: "status",
    label: columnLabels.status,
    defaultSize: 6,
    minSize: 5,
    control: "select",
  },
  { key: "summary", label: columnLabels.summary, defaultSize: 10, minSize: 8 },
  {
    key: "createdAt",
    label: columnLabels.createdAt,
    defaultSize: 5,
    minSize: 4,
    control: "date",
  },
  {
    key: "updatedAt",
    label: columnLabels.updatedAt,
    defaultSize: 5,
    minSize: 4,
    control: "date",
  },
  {
    key: "dueDate",
    label: columnLabels.dueDate,
    defaultSize: 5,
    minSize: 4,
    control: "date",
  },
  { key: "owner", label: columnLabels.owner, defaultSize: 5, minSize: 4 },
  { key: "region", label: columnLabels.region, defaultSize: 4, minSize: 4 },
  {
    key: "priority",
    label: columnLabels.priority,
    defaultSize: 4,
    minSize: 4,
  },
  { key: "stage", label: columnLabels.stage, defaultSize: 4, minSize: 4 },
  { key: "budget", label: columnLabels.budget, defaultSize: 5, minSize: 4 },
  { key: "score", label: columnLabels.score, defaultSize: 4, minSize: 4 },
  { key: "riskLevel", label: columnLabels.riskLevel, defaultSize: 5, minSize: 4 },
  { key: "channel", label: columnLabels.channel, defaultSize: 4, minSize: 4 },
  { key: "segment", label: columnLabels.segment, defaultSize: 4, minSize: 4 },
  { key: "product", label: columnLabels.product, defaultSize: 4, minSize: 4 },
  { key: "account", label: columnLabels.account, defaultSize: 7, minSize: 5 },
  { key: "team", label: columnLabels.team, defaultSize: 4, minSize: 4 },
  {
    key: "cycleDays",
    label: columnLabels.cycleDays,
    defaultSize: 5,
    minSize: 4,
  },
  { key: "health", label: columnLabels.health, defaultSize: 4, minSize: 4 },
];

export const defaultLayout = columns.reduce((layout, column) => {
  layout[column.key] = column.defaultSize;
  return layout;
}, {} as Layout);
