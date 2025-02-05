"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetMessagesQuery } from "@/store/messagesApi";
import { ITEMS_PER_PAGE } from "@/components/common/consts/pagination-per-page";
import { DeleteButton } from "@/components/DeleteButton";
import { PaginationControls } from "@/components/PaginationControls";
import { Spinner } from "@/components/common/loading-spinner/loading-spinner";
import { ErrorDialog } from "@/components/common/error-alert/error-alert";
import { EditButton } from "@/components/EditButton";

export const MessageTable = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const {
    data: messagesData,
    error,
    isLoading,
  } = useGetMessagesQuery({
    page: currentPage,
    perPage: ITEMS_PER_PAGE,
  });

  const totalPages = messagesData?.totalPages || 0;

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <ErrorDialog message="Failed to fetch messages due to server error! Please refresh page." />
    );
  }

  return (
    <div className="w-full h-full overflow-hidden rounded-lg border shadow-md flex flex-col">
      <div className="flex-1 overflow-x-auto overflow-y-auto">
        <Table className="table-auto min-w-full border-collapse">
          <TableHeader>
            <TableRow>
              <TableHead className="w-20 text-center px-4">ID</TableHead>
              <TableHead className="px-4">Messages</TableHead>
              <TableHead className="w-32 text-center px-4">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {messagesData?.data?.map((row) => (
              <TableRow key={row.id} className="hover:bg-gray-100">
                <TableCell className="text-center px-4">{row.id}</TableCell>
                <TableCell className="px-4 break-words max-w-[300px]">
                  {row.message}
                </TableCell>
                <TableCell className="px-4 py-2">
                  <div className="flex justify-center items-center gap-3">
                    <EditButton
                      messageId={row.id}
                      initialContent={row.message}
                    />
                    <DeleteButton id={row.id} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="mt-auto">
        <div className="border-t border-gray-300"></div>
        <div className="flex justify-center mt-6 mb-5">
          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};
