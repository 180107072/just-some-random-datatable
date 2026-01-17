"use client";

import * as React from "react";

import { Example } from "@/components/example";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { data } from "@/data";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import type { Layout } from "react-resizable-panels";

import { columns, defaultLayout, sortLabels } from "./data-table-constants";
import {
  DateRangeHeader,
  StatusFilterHeader,
  SortButton,
} from "./data-table-components";
import { buildCaptionParts, filterRows, sortRows } from "./data-table-utils";
import type {
  ColumnKey,
  DateColumnKey,
  DateRangeFilter,
  DateRangeFilters,
  DataRow,
  StatusFilter,
  SortDirection,
  SortKey,
} from "./data-table-types";
import { IconSearch } from "@tabler/icons-react";

export function DataTableExample() {
  const pageSize = 30;
  const [statusFilter, setStatusFilter] = React.useState<StatusFilter>("ALL");
  const [dateRangeFilters, setDateRangeFilters] =
    React.useState<DateRangeFilters>({});
  const [query, setQuery] = React.useState("");
  const [sortKey, setSortKey] = React.useState<SortKey | null>("summary");
  const [sortDirection, setSortDirection] =
    React.useState<SortDirection>("desc");
  const [page, setPage] = React.useState(1);
  const [columnSizes, setColumnSizes] = React.useState<number[]>(
    columns.map((column) => column.defaultSize),
  );
  const tableSummaryId = React.useId();
  const pageJumpInputId = React.useId();

  const collator = React.useMemo(
    () => new Intl.Collator("en", { numeric: true, sensitivity: "base" }),
    [],
  );
  const currencyFormatter = React.useMemo(
    () =>
      new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      }),
    [],
  );

  const filteredRows = React.useMemo(() => {
    return filterRows(data, statusFilter, query, dateRangeFilters);
  }, [statusFilter, query, dateRangeFilters]);

  const sortedRows = React.useMemo(() => {
    return sortRows(filteredRows, sortKey, sortDirection, collator);
  }, [filteredRows, sortKey, sortDirection, collator]);

  const totalRows = sortedRows.length;
  const totalPages = Math.max(1, Math.ceil(totalRows / pageSize));
  const pageStart = totalRows === 0 ? 0 : (page - 1) * pageSize + 1;
  const pageEnd = Math.min(page * pageSize, totalRows);
  const [pageInput, setPageInput] = React.useState(String(page));

  const paginatedRows = React.useMemo(() => {
    const start = (page - 1) * pageSize;
    return sortedRows.slice(start, start + pageSize);
  }, [sortedRows, page, pageSize]);

  const pageItems = React.useMemo(() => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    const items: Array<number | "ellipsis"> = [];
    const windowSize = 2;
    const start = Math.max(2, page - windowSize);
    const end = Math.min(totalPages - 1, page + windowSize);

    items.push(1);

    if (start > 2) {
      items.push("ellipsis");
    }

    for (let current = start; current <= end; current += 1) {
      items.push(current);
    }

    if (end < totalPages - 1) {
      items.push("ellipsis");
    }

    items.push(totalPages);

    return items;
  }, [page, totalPages]);

  const handleSort = (key: SortKey) => {
    if (sortKey !== key) {
      setSortKey(key);
      setSortDirection("asc");
      setPage(1);
      return;
    }

    if (sortDirection === "asc") {
      setSortDirection("desc");
      setPage(1);
      return;
    }

    setSortKey(null);
    setSortDirection("asc");
    setPage(1);
  };

  const handleLayout = React.useCallback((layout: Layout) => {
    setColumnSizes((current) =>
      columns.map(
        (column, index) =>
          layout[column.key] ?? current[index] ?? column.defaultSize,
      ),
    );
  }, []);

  const handleJumpToPage = React.useCallback(() => {
    const parsed = Number.parseInt(pageInput, 10);
    if (Number.isNaN(parsed)) return;
    const nextPage = Math.min(Math.max(1, parsed), totalPages);
    setPage(nextPage);
  }, [pageInput, totalPages]);

  const captionParts = React.useMemo(
    () =>
      buildCaptionParts(
        pageStart,
        pageEnd,
        totalRows,
        statusFilter,
        query,
        dateRangeFilters,
      ),
    [pageStart, pageEnd, totalRows, statusFilter, query, dateRangeFilters],
  );

  React.useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  React.useEffect(() => {
    setPageInput(String(page));
  }, [page, totalPages]);

  React.useEffect(() => {
    setPage(1);
  }, [statusFilter, query, dateRangeFilters]);

  const handleDateRangeChange = React.useCallback(
    (key: DateColumnKey, value: DateRangeFilter) => {
      setDateRangeFilters((current) => ({
        ...current,
        [key]: value,
      }));
    },
    [],
  );

  const isDateColumn = (
    column: (typeof columns)[number],
  ): column is (typeof columns)[number] & {
    key: DateColumnKey;
    control: "date";
  } => column.control === "date";

  const isSortableColumn = (
    column: (typeof columns)[number],
  ): column is (typeof columns)[number] & {
    key: SortKey;
    control?: undefined;
  } => !column.control;

  const statusVariants = {
    Planned: "secondary",
    Active: "default",
    Paused: "outline",
    Closed: "secondary",
  } as const;

  const renderCellValue = (row: DataRow, column: ColumnKey) => {
    switch (column) {
      case "id":
        return row.id;
      case "status":
        return <Badge variant={statusVariants[row.status]}>{row.status}</Badge>;
      case "summary":
        return row.summary;
      case "createdAt":
        return row.createdAt;
      case "updatedAt":
        return row.updatedAt;
      case "dueDate":
        return row.dueDate;
      case "owner":
        return row.owner;
      case "region":
        return row.region;
      case "priority":
        return row.priority;
      case "stage":
        return row.stage;
      case "budget":
        return currencyFormatter.format(row.budget);
      case "score":
        return row.score.toFixed(1);
      case "riskLevel":
        return row.riskLevel;
      case "channel":
        return row.channel;
      case "segment":
        return row.segment;
      case "product":
        return row.product;
      case "account":
        return row.account;
      case "team":
        return row.team;
      case "cycleDays":
        return `${row.cycleDays}d`;
      case "health":
        return row.health;
      default:
        return null;
    }
  };

  const getAriaSort = (
    column: (typeof columns)[number],
  ): React.AriaAttributes["aria-sort"] | undefined => {
    if (!isSortableColumn(column)) return undefined;
    if (sortKey !== column.key) return "none";
    return sortDirection === "asc" ? "ascending" : "descending";
  };

  return (
    <Example
      title="Test task"
      containerClassName="md:col-span-2"
      className="gap-4"
    >
      <div className="flex flex-1 w-full flex-col gap-3 min-h-0">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-end">
            <div className="flex w-full flex-col gap-1 sm:max-w-xs">
              <label
                htmlFor="main-schema-search"
                className="text-muted-foreground gap-1 flex items-center text-xs font-medium"
              >
                Text search <IconSearch className="size-3" aria-hidden="true" />
              </label>
              <Input
                id="main-schema-search"
                type="search"
                placeholder="Search by id, summary, owner, account"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <Badge variant="secondary">Rows: {totalRows}</Badge>
            <Badge variant="outline">
              Sorted:{" "}
              {sortKey ? `${sortLabels[sortKey]} ${sortDirection}` : "None"}
            </Badge>
          </div>
        </div>
        <div className="relative border-b w-full min-h-0 overflow-auto flex flex-col flex-1">
          <div className="min-w-[1600px] flex h-fit flex-col">
            <ResizablePanelGroup
              orientation="horizontal"
              className="border-b text-xs backdrop-blur-md sticky top-0"
              onLayoutChange={handleLayout}
              defaultLayout={defaultLayout}
            >
              {columns.map((column, index) => (
                <React.Fragment key={column.key}>
                  <ResizablePanel
                    minSize={`${column.minSize}%`}
                    id={column.key}
                  >
                    {column.control === "select" ? (
                      <StatusFilterHeader
                        id={`main-schema-${column.key}`}
                        label={column.label}
                        value={statusFilter}
                        onChange={setStatusFilter}
                      />
                    ) : isDateColumn(column) ? (
                      <DateRangeHeader
                        id={`main-schema-${column.key}`}
                        label={column.label}
                        value={dateRangeFilters[column.key]}
                        onChange={(value) =>
                          handleDateRangeChange(column.key, value)
                        }
                      />
                    ) : isSortableColumn(column) ? (
                      <SortButton
                        column={column.key}
                        label={column.label}
                        sortKey={sortKey}
                        sortDirection={sortDirection}
                        onSort={handleSort}
                      />
                    ) : null}
                  </ResizablePanel>

                  {index < columns.length - 1 ? (
                    <ResizableHandle className="w-px -mx-[0.5px] bg-input hover:bg-primary align-middle" />
                  ) : null}
                </React.Fragment>
              ))}
            </ResizablePanelGroup>
            <table
              className="w-full table-fixed caption-bottom text-xs"
              aria-label="Work items"
              aria-describedby={tableSummaryId}
            >
              <caption className="sr-only">
                Work items table with filters, sorting, and pagination.
              </caption>
              <colgroup>
                {columns.map((column, index) => (
                  <col
                    key={column.key}
                    className="border-l first:border-l-0"
                    style={{ width: `${columnSizes[index]}%` }}
                  />
                ))}
              </colgroup>
              <TableHeader className="sr-only">
                <TableRow>
                  {columns.map((column) => (
                    <TableHead
                      key={column.key}
                      scope="col"
                      aria-sort={getAriaSort(column)}
                    >
                      {column.label}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedRows.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="text-muted-foreground py-6 text-center"
                    >
                      No results found.
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedRows.map((row) => (
                    <TableRow className="*:truncate" key={row.id}>
                      {columns.map((column) => (
                        <TableCell key={column.key}>
                          {renderCellValue(row, column.key)}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                )}
              </TableBody>
            </table>
          </div>
        </div>

        <div className="mt-auto flex w-full flex-col gap-2 text-muted-foreground">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
            <span id={tableSummaryId} role="status" aria-live="polite">
              {captionParts.join(" ")}
            </span>

            <nav
              className="flex flex-wrap items-center gap-3"
              aria-label="Table pagination"
            >
              <Button
                type="button"
                variant="outline"
                size="xs"
                aria-label="Previous page"
                onClick={() => setPage((current) => Math.max(1, current - 1))}
                disabled={page <= 1}
              >
                Previous
              </Button>
              <div className="flex items-center gap-1">
                {pageItems.map((item, index) =>
                  item === "ellipsis" ? (
                    <span
                      key={`ellipsis-${index}`}
                      className="px-1 text-muted-foreground"
                    >
                      ...
                    </span>
                  ) : (
                    <Button
                      key={item}
                      type="button"
                      variant={item === page ? "secondary" : "outline"}
                      size="xs"
                      aria-current={item === page ? "page" : undefined}
                      aria-label={`Page ${item}`}
                      onClick={() => setPage(item)}
                      className="px-1.5"
                    >
                      {item}
                    </Button>
                  ),
                )}
              </div>
              <Button
                type="button"
                variant="outline"
                size="xs"
                aria-label="Next page"
                onClick={() =>
                  setPage((current) => Math.min(totalPages, current + 1))
                }
                disabled={page >= totalPages}
              >
                Next
              </Button>
              <div className="flex items-center gap-1">
                <label htmlFor={pageJumpInputId}>Jump to page</label>
                <Input
                  id={pageJumpInputId}
                  type="number"
                  min={1}
                  max={totalPages}
                  value={pageInput}
                  onChange={(event) => setPageInput(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      event.preventDefault();
                      handleJumpToPage();
                    }
                  }}
                  className="h-6 w-16 px-2 text-xs"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="xs"
                  aria-label="Go to page"
                  onClick={handleJumpToPage}
                >
                  Go
                </Button>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </Example>
  );
}
