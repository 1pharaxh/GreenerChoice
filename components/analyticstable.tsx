"use client";

import * as React from "react";
import {
  CaretSortIcon,
  ChevronDownIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const data: Payment[] = [
  {
    id: "m5gr84i9",

    pageurl: "https://www.google.com",
    pagetitle: "Google",
    allowed: "Yes",
    category: "Others",
    date: "2021-09-01",
  },
  {
    id: "3u1reuv4",
    amount: 242,
    status: "success",
    email: "Abe45@gmail.com",

    pageurl: "https://www.acme.com",
    pagetitle: "Your daily politics | Acme",
    allowed: "No",
    category: "Politics",
    date: "2021-09-01",
  },
  {
    id: "derv1ws0",
    amount: 837,
    status: "processing",
    email: "Monserrat44@gmail.com",

    pageurl: "https://www.acme.com",
    pagetitle: "Your daily politics | Acme",
    allowed: "No",
    category: "Politics",
    date: "2021-09-01",
  },
  {
    id: "5kma53ae",
    amount: 874,
    status: "success",
    email: "Silas22@gmail.com",

    pageurl: "https://www.acme.com",
    pagetitle: "Your daily politics | Acme",
    allowed: "No",
    category: "Politics",
    date: "2021-09-01",
  },
  {
    id: "bhqecj4p",
    amount: 721,
    status: "failed",
    email: "carmella@hotmail.com",

    pageurl: "https://www.acme.com",
    pagetitle: "Your daily politics | Acme",
    allowed: "No",
    category: "Politics",
    date: "2021-09-01",
  },
  {
    id: "bhqecjd4p",
    amount: 721,
    status: "success",
    email: "sasd@hotmail.com",

    pageurl: "https://www.acme.com",
    pagetitle: "Your daily politics | Acme",
    allowed: "No",
    category: "Politics",
    date: "2021-09-01",
  },
  {
    id: "bhqe222cjd4p",
    amount: 721,
    status: "success",
    email: "sasd@hotmail.com",

    pageurl: "https://www.acme.com",
    pagetitle: "Your daily politics | Acme",
    allowed: "No",
    category: "Politics",
    date: "2021-09-01",
  },

  {
    id: "bhqe21222cjd4p",
    amount: 221,
    status: "success",
    email: "sasd@hotmail.com",

    pageurl: "https://www.acme.com",
    pagetitle: "Your daily politics | Acme",
    allowed: "No",
    category: "Politics",
    date: "2021-09-01",
  },
  {
    id: "bh2qecjd4p",
    amount: 721,
    status: "success",
    email: "sasd@hotmail.com",

    pageurl: "https://www.acme.com",
    pagetitle: "Your daily politics | Acme",
    allowed: "No",
    category: "Politics",
    date: "2021-09-01",
  },
  {
    id: "bhq21ecjd4p",
    amount: 721,
    status: "success",
    email: "sasd@hotmail.com",

    pageurl: "https://www.acme.com",
    pagetitle: "Your daily politics | Acme",
    allowed: "No",
    category: "Politics",
    date: "2021-09-01",
  },
  {
    id: "b21hqecjd4p",
    amount: 721,
    status: "success",
    email: "sasd@hotmail.com",

    pageurl: "https://www.acme.com",
    pagetitle: "Your daily politics | Acme",
    allowed: "No",
    category: "Politics",
    date: "2021-09-01",
  },
];

export type Payment = {
  id: string;
  amount?: number;
  status?: "pending" | "processing" | "success" | "failed";
  email?: string;
  pageurl?: string;
  pagetitle?: string;
  allowed?: string;
  date?: string;
  category?: string;
  time?: string;
};

export const columns: ColumnDef<Payment>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "pagetitle",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase w-[150px]  line-clamp-1">
        {row.getValue("pagetitle")}
      </div>
    ),
  },

  {
    accessorKey: "allowed",
    header: "Allowed",
    cell: ({ row }) => (
      <div className="capitalize  w-[50px]  line-clamp-1">
        {row.getValue("allowed")}
      </div>
    ),
  },
  {
    accessorKey: "pageurl",
    header: "URL",
    cell: ({ row }) => (
      <div className=" w-[150px]  line-clamp-1">{row.getValue("pageurl")}</div>
    ),
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("category")}</div>
    ),
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => <div className="capitalize">{row.getValue("date")}</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              {/* FIX THIS  */}
              Delete
            </DropdownMenuItem>
            {/* <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export function AnalyticsTable({ userId }: { userId: string }) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [dataTable, setdataTable] = React.useState<Payment[]>([
    {
      id: "m5gr84i9",

      pageurl: "https://www.google.com",
      pagetitle: "Google",
      allowed: "Yes",
      category: "Others",
      date: "2021-09-01",
    },
    {
      id: "3u1reuv4",
      amount: 242,
      status: "success",
      email: "Abe45@gmail.com",

      pageurl: "https://www.acme.com",
      pagetitle: "Your daily politics | Acme",
      allowed: "No",
      category: "Politics",
      date: "2021-09-01",
    },
    {
      id: "derv1ws0",
      amount: 837,
      status: "processing",
      email: "Monserrat44@gmail.com",

      pageurl: "https://www.acme.com",
      pagetitle: "Your daily politics | Acme",
      allowed: "No",
      category: "Politics",
      date: "2021-09-01",
    },
    {
      id: "5kma53ae",
      amount: 874,
      status: "success",
      email: "Silas22@gmail.com",

      pageurl: "https://www.acme.com",
      pagetitle: "Your daily politics | Acme",
      allowed: "No",
      category: "Politics",
      date: "2021-09-01",
    },
    {
      id: "bhqecj4p",
      amount: 721,
      status: "failed",
      email: "carmella@hotmail.com",

      pageurl: "https://www.acme.com",
      pagetitle: "Your daily politics | Acme",
      allowed: "No",
      category: "Politics",
      date: "2021-09-01",
    },
    {
      id: "bhqecjd4p",
      amount: 721,
      status: "success",
      email: "sasd@hotmail.com",

      pageurl: "https://www.acme.com",
      pagetitle: "Your daily politics | Acme",
      allowed: "No",
      category: "Politics",
      date: "2021-09-01",
    },
    {
      id: "bhqe222cjd4p",
      amount: 721,
      status: "success",
      email: "sasd@hotmail.com",

      pageurl: "https://www.acme.com",
      pagetitle: "Your daily politics | Acme",
      allowed: "No",
      category: "Politics",
      date: "2021-09-01",
    },

    {
      id: "bhqe21222cjd4p",
      amount: 221,
      status: "success",
      email: "sasd@hotmail.com",

      pageurl: "https://www.acme.com",
      pagetitle: "Your daily politics | Acme",
      allowed: "No",
      category: "Politics",
      date: "2021-09-01",
    },
    {
      id: "bh2qecjd4p",
      amount: 721,
      status: "success",
      email: "sasd@hotmail.com",

      pageurl: "https://www.acme.com",
      pagetitle: "Your daily politics | Acme",
      allowed: "No",
      category: "Politics",
      date: "2021-09-01",
    },
    {
      id: "bhq21ecjd4p",
      amount: 721,
      status: "success",
      email: "sasd@hotmail.com",

      pageurl: "https://www.acme.com",
      pagetitle: "Your daily politics | Acme",
      allowed: "No",
      category: "Politics",
      date: "2021-09-01",
    },
    {
      id: "b21hqecjd4p",
      amount: 721,
      status: "success",
      email: "sasd@hotmail.com",

      pageurl: "https://www.acme.com",
      pagetitle: "Your daily politics | Acme",
      allowed: "No",
      category: "Politics",
      date: "2021-09-01",
    },
  ]);
  const fetchTableData = async () => {
    if (userId) {
      try {
        const res = await fetch(`/api/getTable`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ extension_user_id: userId }),
        });
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        if (data) {
          console.log("GOT TABLE DATA", data);
          const tableData = data.table.map((row: any) => {
            return {
              id: row._id,
              pageurl: row.url,
              pagetitle: row.page_title,
              allowed: row.allowed === true ? "Yes" : "No",
              category: row.category,
              date: new Date(row.date).toLocaleDateString("en-CA"),
            };
          });
          setdataTable(tableData);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    }
  };
  React.useEffect(() => {
    fetchTableData();
  }, [userId]);
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data: dataTable,
    // data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter titles..."
          value={
            (table.getColumn("pagetitle")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("pagetitle")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
