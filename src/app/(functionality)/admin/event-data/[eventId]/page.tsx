"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import useFetch from "@/hooks/use-fetch";
import {
  getEventById,
  getTeamsByEventIdPaginated,
  generateEventParticipantsExcel,
} from "@/actions/event-actions";
import { getUsersByEmails } from "@/actions/user-actions";
import * as XLSX from "xlsx";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function EventDataPage() {
  const { eventId } = useParams();
  const [fileName, setFileName] = useState("participants");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalTeams, setTotalTeams] = useState(0);

  const {
    data: eventFetchData,
    loading: eventFetchLoading,
    error: eventFetchError,
    fn: eventFetchFn,
  } = useFetch(getEventById);

  const {
    data: teamsFetchData,
    loading: teamsFetchLoading,
    error: teamsFetchError,
    fn: teamsFetchFn,
  } = useFetch(getTeamsByEventIdPaginated);

  const {
    data: usersFetchData,
    // loading: usersFetchLoading,
    error: usersFetchError,
    fn: usersFetchFn,
  } = useFetch(getUsersByEmails);

  const {
    data: excelData,
    loading: excelLoading,
    fn: excelFn,
  } = useFetch(generateEventParticipantsExcel);

  // Fetch event details once
  useEffect(() => {
    const fetchData = async () => {
      await eventFetchFn(eventId);
    };
    fetchData();
  }, [eventId]);

  // Fetch teams when page changes
  useEffect(() => {
    teamsFetchFn(eventId, currentPage, 10);
  }, [eventId, currentPage]);

  // Fetch users when teams data changes
  useEffect(() => {
    if (teamsFetchData) {
      setTotalPages(teamsFetchData.totalPages);
      setTotalTeams(teamsFetchData.totalTeams);

      const emails = teamsFetchData.teams.flatMap((team) => team.members);
      if (emails.length > 0) {
        usersFetchFn(emails);
      }
    }
  }, [teamsFetchData]);

  // Set filename when event data loads
  useEffect(() => {
    if (eventFetchData) {
      const formattedFileName = eventFetchData.name
        .toLowerCase()
        .replace(/\s+/g, "-");
      setFileName(formattedFileName);
    }
  }, [eventFetchData]);

  // Handle errors
  useEffect(() => {
    if (eventFetchError || teamsFetchError || usersFetchError) {
      toast({
        title: "Error",
        description: "Failed to fetch data",
        variant: "destructive",
      });
    }
  }, [eventFetchError, teamsFetchError, usersFetchError]);

  // Generate Excel when data is ready
  useEffect(() => {
    if (excelData) {
      const worksheet = XLSX.utils.json_to_sheet(excelData.data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Participants");
      XLSX.writeFile(workbook, `${fileName}.xlsx`);

      toast({
        title: "Success",
        description: `Downloaded ${excelData.stats.totalUsers} participants data`,
      });
    }
  }, [excelData, fileName]);

  const handleDownloadExcel = async () => {
    await excelFn(eventId);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (eventFetchLoading || (teamsFetchLoading && currentPage === 1)) {
    return <div>Loading...</div>;
  }

  // Calculate stats for current page
  const currentPageUsers = usersFetchData || [];
  // const currentPageOutsiders = currentPageUsers.filter(
  //   (user) => user.isOutsider,
  // ).length;
  // const currentPageInsiders = currentPageUsers.length - currentPageOutsiders;

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Event Data</h1>

      {eventFetchData && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Event Details</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-between">
            <div>
              <p>
                <strong>Name:</strong> {eventFetchData.name}
              </p>
              <p>
                <strong>Prize Money:</strong> {eventFetchData.prizeMoney}
              </p>
              <p>
                <strong>Team Size:</strong> {eventFetchData.teamSize}
              </p>
            </div>
            <div>
              <p>
                <strong>Total Teams:</strong> {totalTeams}
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Stats shown are for current page only.
                <br />
                Download Excel for complete data.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>
            Participants (Page {currentPage} of {totalPages})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {teamsFetchLoading ? (
            <div className="text-center py-4">Loading...</div>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User Details</TableHead>
                    <TableHead>Additional Details</TableHead>
                    <TableHead>Team Leader Name</TableHead>
                    <TableHead>Team Leader Email</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {teamsFetchData &&
                    teamsFetchData.teams.map((team) => {
                      const leader = usersFetchData?.find(
                        (user) => user.email === team.leader,
                      );
                      return team.members.map((memberEmail) => {
                        const member = usersFetchData?.find(
                          (user) => user.email === memberEmail,
                        );
                        return (
                          <TableRow key={member?.email}>
                            <TableCell>
                              <p>
                                <strong>Name:</strong> {member?.fullName}
                              </p>
                              <p>
                                <strong>Email:</strong> {member?.email}
                              </p>
                              <p>
                                <strong>Branch:</strong> {member?.branch}
                              </p>
                              <p>
                                <strong>Enrollment:</strong>{" "}
                                {member?.enrollmentNumber}
                              </p>
                            </TableCell>
                            <TableCell>
                              <p>
                                <strong>Outsider:</strong>{" "}
                                {member?.isOutsider ? "Yes" : "No"}
                              </p>
                              <p>
                                <strong>Mobile:</strong> {member?.mobileNumber}
                              </p>
                              <p>
                                <strong>Address:</strong> {member?.address}
                              </p>
                            </TableCell>
                            <TableCell>{leader?.fullName}</TableCell>
                            <TableCell>{leader?.email}</TableCell>
                          </TableRow>
                        );
                      });
                    })}
                </TableBody>
              </Table>

              {/* Pagination Controls */}
              <div className="flex items-center justify-between mt-4">
                <div className="text-sm text-muted-foreground">
                  Showing page {currentPage} of {totalPages} (
                  {currentPageUsers.length} users on this page)
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                  >
                    Next
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Download Participants Data</CardTitle>
        </CardHeader>
        <CardContent>
          <label className="block mb-2">File Name:</label>
          <Input
            type="text"
            placeholder="Enter file name"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            className="mb-2"
          />
          <Button
            onClick={handleDownloadExcel}
            disabled={excelLoading ?? false}
          >
            {excelLoading
              ? "Generating Excel..."
              : "Download Complete Data as Excel"}
          </Button>
          <p className="text-sm text-muted-foreground mt-2">
            Excel will contain all participants across all pages
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
