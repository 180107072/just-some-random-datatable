import type { data } from "@/data";
import type { DateRange } from "react-day-picker";

export type ColumnKey =
  | "id"
  | "status"
  | "summary"
  | "createdAt"
  | "updatedAt"
  | "dueDate"
  | "owner"
  | "region"
  | "priority"
  | "stage"
  | "budget"
  | "score"
  | "riskLevel"
  | "channel"
  | "segment"
  | "product"
  | "account"
  | "team"
  | "cycleDays"
  | "health";
export type DateColumnKey = "createdAt" | "updatedAt" | "dueDate";
export type ColumnControl = "select" | "date";
export type SortKey = Exclude<ColumnKey, "status" | DateColumnKey>;
export type SortDirection = "asc" | "desc";
export type StatusFilter = "ALL" | "Planned" | "Active" | "Paused" | "Closed";
export type DataRow = (typeof data)[number];
export type DateRangeFilter = DateRange | undefined;
export type DateRangeFilters = Partial<Record<DateColumnKey, DateRangeFilter>>;
