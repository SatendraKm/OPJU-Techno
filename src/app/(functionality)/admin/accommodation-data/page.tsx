"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";
import useFetch from "@/hooks/use-fetch";
import { getAllAccommodationsWithUsers } from "@/actions/accomodation-actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import * as XLSX from "xlsx";

export default function AccommodationDataPage() {
  const [fileName, setFileName] = useState("accommodation-data");

  const {
    data: accommodationsFetchData,
    loading: accommodationsFetchLoading,
    error: accommodationsFetchError,
    fn: accommodationsFetchFn,
  } = useFetch(getAllAccommodationsWithUsers);

  useEffect(() => {
    const fetchData = async () => {
      await accommodationsFetchFn();
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (accommodationsFetchError) {
      toast({
        title: "Error",
        description: "Failed to fetch data",
        variant: "destructive",
      });
    }
  }, [accommodationsFetchError]);

  const handleDownloadExcel = () => {
    const data = accommodationsFetchData?.map(
      ({ user, accommodation, leaders }) => ({
        "User Full Name": user.fullName,
        "User Email": user.email,
        "User Mobile Number": user.mobileNumber,
        Leaders: leaders.join(", "),
        "Arrival Time": new Date(accommodation.arrivalTime).toLocaleString(),
        "Departure Time": new Date(
          accommodation.departureTime
        ).toLocaleString(),
        "Additional Details": accommodation.additionalDetails,
        "University Name": accommodation.universityName,
        Gender: accommodation.gender,
      })
    );

    if (data) {
      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Accommodations");
      XLSX.writeFile(workbook, `${fileName}.xlsx`);
    } else {
      toast({
        title: "Error",
        description: "No data available to download",
        variant: "destructive",
      });
    }
  };

  if (accommodationsFetchLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Accommodation Data
      </h1>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Accommodations</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/6">User Full Name</TableHead>
                <TableHead className="w-1/6">User Email</TableHead>
                <TableHead className="w-1/6">User Mobile Number</TableHead>
                <TableHead className="w-1/6">Leaders</TableHead>
                <TableHead className="w-1/6">University Name</TableHead>
                <TableHead className="w-1/6">Gender</TableHead>
                <TableHead className="w-1/6">Arrival Time</TableHead>
                <TableHead className="w-1/6">Departure Time</TableHead>
                <TableHead className="w-1/6">Additional Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {accommodationsFetchData?.map(
                ({ user, accommodation, leaders }) => (
                  <TableRow key={accommodation._id.toString()}>
                    <TableCell className="w-1/6">{user.fullName}</TableCell>
                    <TableCell className="w-1/6">{user.email}</TableCell>
                    <TableCell className="w-1/6">{user.mobileNumber}</TableCell>
                    <TableCell className="w-1/6">
                      {leaders.join(", ")}
                    </TableCell>
                    <TableCell className="w-1/6">
                      {accommodation.universityName}
                    </TableCell>
                    <TableCell className="w-1/6">
                      {accommodation.gender}
                    </TableCell>
                    <TableCell className="w-1/6">
                      {new Date(accommodation.arrivalTime).toLocaleString()}
                    </TableCell>
                    <TableCell className="w-1/6">
                      {new Date(accommodation.departureTime).toLocaleString()}
                    </TableCell>
                    <TableCell className="w-1/6">
                      {accommodation.additionalDetails}
                    </TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Download Accommodation Data</CardTitle>
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
          <Button onClick={handleDownloadExcel}>Download as Excel</Button>
        </CardContent>
      </Card>
    </div>
  );
}
