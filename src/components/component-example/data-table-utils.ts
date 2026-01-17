import type {
  DateRangeFilter,
  DateRangeFilters,
  DataRow,
  StatusFilter,
  SortDirection,
  SortKey,
} from "./data-table-types";

const padDatePart = (value: number) => String(value).padStart(2, "0");

const formatDateLabel = (date: Date) => {
  const year = date.getFullYear();
  const month = padDatePart(date.getMonth() + 1);
  const day = padDatePart(date.getDate());
  return `${year}-${month}-${day}`;
};

const parseDateKey = (value: string) => {
  const [year, month, day] = value.split("-").map(Number);
  if (!year || !month || !day) return null;
  return year * 10000 + month * 100 + day;
};

const dateToKey = (value: Date) =>
  value.getFullYear() * 10000 + (value.getMonth() + 1) * 100 + value.getDate();

const compareNumbers = (a: number, b: number) =>
  a === b ? 0 : a > b ? 1 : -1;

export const formatDateRangeLabel = (range: DateRangeFilter) => {
  if (!range?.from && !range?.to) {
    return null;
  }

  if (range?.from && range?.to) {
    return `${formatDateLabel(range.from)} to ${formatDateLabel(range.to)}`;
  }

  if (range?.from) {
    return `from ${formatDateLabel(range.from)}`;
  }

  return `through ${formatDateLabel(range.to!)}`;
};

export const filterRows = (
  rows: DataRow[],
  statusFilter: StatusFilter,
  query: string,
  dateRangeFilters: DateRangeFilters,
) => {
  const normalizedQuery = query.trim().toLowerCase();

  return rows.filter((row) => {
    if (statusFilter !== "ALL" && row.status !== statusFilter) {
      return false;
    }

    for (const [column, range] of Object.entries(dateRangeFilters)) {
      if (!range?.from && !range?.to) {
        continue;
      }

      const value = row[column as keyof DataRow];
      if (typeof value !== "string") {
        return false;
      }

      const rowDateKey = parseDateKey(value);
      if (!rowDateKey) return false;

      if (range?.from) {
        const fromKey = dateToKey(range.from);
        if (rowDateKey < fromKey) return false;
      }

      if (range?.to) {
        const toKey = dateToKey(range.to);
        if (rowDateKey > toKey) return false;
      }
    }

    if (!normalizedQuery) {
      return true;
    }

    return [
      String(row.id),
      row.summary,
      row.owner,
      row.account,
      row.product,
      row.status,
      row.region,
      row.priority,
      row.stage,
    ].some((value) => value.toLowerCase().includes(normalizedQuery));
  });
};

export const sortRows = (
  rows: DataRow[],
  sortKey: SortKey | null,
  sortDirection: SortDirection,
  collator: Intl.Collator,
) => {
  if (!sortKey) {
    return rows;
  }

  const nextRows = [...rows];

  nextRows.sort((a, b) => {
    let result = 0;

    switch (sortKey) {
      case "id":
        result = compareNumbers(a.id, b.id);
        break;
      case "summary":
        result = collator.compare(a.summary, b.summary);
        break;
      case "owner":
        result = collator.compare(a.owner, b.owner);
        break;
      case "region":
        result = collator.compare(a.region, b.region);
        break;
      case "priority":
        result = collator.compare(a.priority, b.priority);
        break;
      case "stage":
        result = collator.compare(a.stage, b.stage);
        break;
      case "budget":
        result = compareNumbers(a.budget, b.budget);
        break;
      case "score":
        result = compareNumbers(a.score, b.score);
        break;
      case "riskLevel":
        result = collator.compare(a.riskLevel, b.riskLevel);
        break;
      case "channel":
        result = collator.compare(a.channel, b.channel);
        break;
      case "segment":
        result = collator.compare(a.segment, b.segment);
        break;
      case "product":
        result = collator.compare(a.product, b.product);
        break;
      case "account":
        result = collator.compare(a.account, b.account);
        break;
      case "team":
        result = collator.compare(a.team, b.team);
        break;
      case "cycleDays":
        result = compareNumbers(a.cycleDays, b.cycleDays);
        break;
      case "health":
        result = collator.compare(a.health, b.health);
        break;
      default:
        result = 0;
    }

    return sortDirection === "asc" ? result : -result;
  });

  return nextRows;
};

export const buildCaptionParts = (
  pageStart: number,
  pageEnd: number,
  totalRows: number,
  statusFilter: StatusFilter,
  query: string,
  dateRangeFilters: DateRangeFilters,
) => {
  const parts =
    totalRows === 0
      ? ["No results."]
      : [`Showing ${pageStart}-${pageEnd} of ${totalRows}.`];
  parts.push(`Status: ${statusFilter === "ALL" ? "All" : statusFilter}.`);

  const dateFilters = Object.entries(dateRangeFilters)
    .map(([key, range]) => {
      const label = formatDateRangeLabel(range);
      return label ? `${key}: ${label}` : null;
    })
    .filter((entry): entry is string => Boolean(entry));

  if (dateFilters.length > 0) {
    parts.push(`Dates: ${dateFilters.join(", ")}.`);
  }
  const trimmedQuery = query.trim();
  if (trimmedQuery) {
    parts.push(`Search: "${trimmedQuery}".`);
  }
  return parts;
};
