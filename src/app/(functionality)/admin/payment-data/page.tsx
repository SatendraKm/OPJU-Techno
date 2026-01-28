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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import useFetch from "@/hooks/use-fetch";
import { getPaymentData, IPaymentData } from "@/actions/payment-actions";
import * as XLSX from "xlsx";

export default function PaymentsPage() {
  const [paymentsData, setPaymentsData] = useState<IPaymentData[]>([]);
  const [fileName, setFileName] = useState("payments-data");

  const {
    data: paymentsFetchData,
    loading: paymentsFetchLoading,
    error: paymentsFetchError,
    fn: paymentsFetchFn,
  } = useFetch(getPaymentData);

  useEffect(() => {
    const fetchData = async () => {
      await paymentsFetchFn();
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (paymentsFetchData) {
      setPaymentsData(paymentsFetchData);
    }
  }, [paymentsFetchData]);

  useEffect(() => {
    if (paymentsFetchError) {
      toast({
        variant: "destructive",
        description: paymentsFetchError.message,
      });
    }
  }, [paymentsFetchError]);

  const handleDownloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(paymentsData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Payments");
    XLSX.writeFile(workbook, `${fileName}.xlsx`);
  };

  if (paymentsFetchLoading) {
    return (
      <div className="text-white text-center">
        This can take upto 2 minutes. Loading...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Payments</h1>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Download Payments Data</CardTitle>
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
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Payments Data</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Full Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Mobile</TableHead>
                <TableHead>Event Names</TableHead>
                <TableHead>Individual Count</TableHead>
                <TableHead>Team Count</TableHead>
                <TableHead>Payable Amount</TableHead>
                <TableHead>Number of Transactions</TableHead>
                <TableHead>Acknowledged Transactions</TableHead>
                <TableHead>Acknowledged Amount</TableHead>
                <TableHead>Pay Clearance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paymentsData.map((payment, index) => (
                <TableRow
                  key={index}
                  className={`${payment.payClearance ? "bg-green-200 hover:bg-green-300" : "bg-red-200 hover:bg-red-300"}`}
                >
                  <TableCell>{payment.fullName}</TableCell>
                  <TableCell>{payment.email}</TableCell>
                  <TableCell>{payment.mobileNumber}</TableCell>
                  <TableCell>{payment.eventNames}</TableCell>
                  <TableCell>{payment.individualSchemaCount}</TableCell>
                  <TableCell>{payment.teamSchemaCount}</TableCell>
                  <TableCell>{payment.payableAmount}</TableCell>
                  <TableCell>{payment.numberOfTransactions}</TableCell>
                  <TableCell>{payment.acknowledgedTransactions}</TableCell>
                  <TableCell>{payment.acknowledgedAmount}</TableCell>
                  <TableCell>{payment.payClearance ? "Yes" : "No"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
