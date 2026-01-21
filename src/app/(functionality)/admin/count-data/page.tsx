"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import useFetch from "@/hooks/use-fetch";
import { getEventDetailsWithCounts } from "@/actions/event-actions";
import * as XLSX from "xlsx";
import { eventOrder } from "@/data/eventOrder";

export default function EventDetailsPage() {
    const [fileName, setFileName] = useState("event-count-details");
    const [eventDetails, setEventDetails] = useState<{ eventName: string; teamCount: number; userCount: number; insiderCount: number; outsiderCount: number; }[]>([]);

    const {
        data: eventDetailsData,
        loading: eventDetailsLoading,
        error: eventDetailsError,
        fn: eventDetailsFn,
    } = useFetch(getEventDetailsWithCounts);

    useEffect(() => {
        const fetchData = async () => {
            await eventDetailsFn();
        };

        fetchData();
    }, );

    useEffect(() => {
        if (eventDetailsData) {
            // Sort the eventDetailsData based on the specified order
            const sortedEventDetails = eventDetailsData.sort((a, b) => {
                return (
                    eventOrder.indexOf(a.eventName) -
                    eventOrder.indexOf(b.eventName)
                );
            });
            setEventDetails(sortedEventDetails);
        }
    }, [eventDetailsData]);

    useEffect(() => {
        if (eventDetailsError) {
            toast({
                title: "Error",
                description: "Failed to fetch event details",
                variant: "destructive",
            });
        }
    }, [eventDetailsError]);

    const handleDownloadExcel = () => {
        const data = eventDetails.map((event) => ({
            EventName: event.eventName,
            // TeamCount: event.teamCount,
            UserCount: event.userCount,
            Insiders: event.insiderCount,
            Outsiders: event.outsiderCount,
        }));

        data.push({
            EventName: "Total Count",
            // TeamCount: event.teamCount,
            UserCount: totalUserCount,
            Insiders: totalInsiderCount,
            Outsiders: totalOutsiderCount,
        });

        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "EventDetails");
        XLSX.writeFile(workbook, `${fileName}.xlsx`);
    };

    if (eventDetailsLoading) {
        return <div>Loading...</div>;
    }

    // Calculate total counts for the table
    const totalUserCount = eventDetails.reduce((acc, event) => acc + event.userCount, 0);
    // const totalTeamCount = eventDetails.reduce((acc, event) => acc + event.teamCount, 0);
    const totalInsiderCount = eventDetails.reduce((acc, event) => acc + event.insiderCount, 0);
    const totalOutsiderCount = eventDetails.reduce((acc, event) => acc + event.outsiderCount, 0);

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-6 text-center">Event-Count Details</h1>
            <Card className="mb-6">
                <CardHeader>
                    <CardTitle>Event-Count Details</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Event Name</TableHead>
                                {/* <TableHead>Team Count</TableHead> */}
                                <TableHead>User Count</TableHead>
                                <TableHead>Insiders</TableHead>
                                <TableHead>Outsiders</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {eventDetails.map((event) => (
                                <TableRow key={event.eventName}>
                                    <TableCell>{event.eventName}</TableCell>
                                    {/* <TableCell>{event.teamCount}</TableCell> */}
                                    <TableCell>{event.userCount}</TableCell>
                                    <TableCell>{event.insiderCount}</TableCell>
                                    <TableCell>{event.outsiderCount}</TableCell>
                                </TableRow>
                            ))}
                            <TableRow className="font-bold">
                                <TableCell>Total Count</TableCell>
                                <TableCell>{totalUserCount}</TableCell>
                                <TableCell>{totalInsiderCount}</TableCell>
                                <TableCell>{totalOutsiderCount}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <Card className="mb-6">
                <CardHeader>
                    <CardTitle>Download Event-Count Details</CardTitle>
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