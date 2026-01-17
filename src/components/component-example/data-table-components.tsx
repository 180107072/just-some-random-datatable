import * as React from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  IconChevronUp,
  IconChevronDown,
  IconCalendarPlus,
} from "@tabler/icons-react";

import { statusFilterOptions } from "./data-table-constants";
import { formatDateRangeLabel } from "./data-table-utils";
import type {
  DateRangeFilter,
  StatusFilter,
  SortDirection,
  SortKey,
} from "./data-table-types";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export type SortButtonProps = {
  column: SortKey;
  label: string;
  sortKey: SortKey | null;
  sortDirection: SortDirection;
  onSort: (column: SortKey) => void;
};

export function SortButton({
  column,
  label,
  sortKey,
  sortDirection,
  onSort,
}: SortButtonProps) {
  const isActive = sortKey === column;
  const ariaLabel = isActive
    ? `Sorted by ${label} ${
        sortDirection === "asc" ? "ascending" : "descending"
      }. Activate to ${
        sortDirection === "asc" ? "sort descending" : "clear sorting"
      }.`
    : `Sort by ${label}.`;

  return (
    <Button
      type="button"
      variant="ghost"
      size="xs"
      aria-pressed={isActive}
      aria-label={ariaLabel}
      className="px-1 focus-within:bg-input h-6 w-full min-w-0 truncate text-foreground border-0 bg-input/50 justify-start hover:bg-input flex items-center text-left font-medium rounded-none"
      onClick={() => onSort(column)}
    >
      <span className="truncate">{label}</span>
      <span className="text-muted-foreground ml-1 flex items-center justify-center">
        {isActive ? (
          sortDirection === "asc" ? (
            <IconChevronUp className="size-3.5" aria-hidden="true" />
          ) : (
            <IconChevronDown className="size-3.5" aria-hidden="true" />
          )
        ) : null}
      </span>
    </Button>
  );
}

export type StatusFilterHeaderProps = {
  id: string;
  label: string;
  value: StatusFilter;
  onChange: (value: StatusFilter) => void;
};

export function StatusFilterHeader({
  id,
  label,
  value,
  onChange,
}: StatusFilterHeaderProps) {
  return (
    <Select
      value={value}
      onValueChange={(next) => onChange(next as StatusFilter)}
    >
      <SelectTrigger
        id={id}
        size="sm"
        title={label}
        aria-label={`${label} filter`}
        className="w-full h-5 text-xs focus-within:bg-input py-0 rounded-none border-0 bg-input/50 px-1 font-medium hover:bg-input"
      >
        <SelectValue placeholder={label} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {statusFilterOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export type DateRangeHeaderProps = {
  id: string;
  label: string;
  value: DateRangeFilter;
  onChange: (value: DateRangeFilter) => void;
};

export function DateRangeHeader({
  id,
  label,
  value,
  onChange,
}: DateRangeHeaderProps) {
  const [open, setOpen] = React.useState(false);
  const rangeLabel = formatDateRangeLabel(value);

  const handleSelect = (next: DateRangeFilter) => {
    onChange(next);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <Button
            id={id}
            type="button"
            variant="outline"
            size="xs"
            aria-label={`Filter ${label} date range`}
            aria-haspopup="dialog"
            aria-expanded={open}
            className="px-1 h-6 focus-within:bg-input w-full min-w-0 truncate text-foreground border-0 bg-input/50 justify-start hover:bg-input flex items-center text-left font-medium rounded-none"
          >
            <span className="truncate">
              {rangeLabel ? `${label} - ${rangeLabel}` : label}
            </span>

            <IconCalendarPlus
              className="text-muted-foreground ml-1 flex size-3.5 items-center justify-center"
              aria-hidden="true"
            />
          </Button>
        }
        className="w-full"
      />
      <PopoverContent
        align="start"
        className="p-0 w-auto"
        aria-label={`${label} date range`}
      >
        <Calendar
          mode="range"
          selected={value}
          onSelect={handleSelect}
          numberOfMonths={2}
        />
      </PopoverContent>
    </Popover>
  );
}
