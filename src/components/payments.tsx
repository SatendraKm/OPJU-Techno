import { toast } from "@/hooks/use-toast";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { useEffect, useState } from "react";
import Image from "next/image";
import {
	addTransactionIdAction,
	getTransactionsByUserEmail,
} from "@/actions/payment-actions";
import useFetch from "@/hooks/use-fetch";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "./ui/table";
import { ITransaction } from "@/models/transaction.model";

const Payments = ({
	payAmount,
	userEmail,
}: {
	payAmount: number;
	userEmail: string;
}) => {
	const [isPayModalOpen, setIsPayModalOpen] = useState(false);
	const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);
	const [transactionId, setTransactionId] = useState("");
	const [totalRecievedAmount, setTotalRecievedAmount] = useState(0);

	const {
		data: transactionFetchData,
		fn: transactiondFetchFn,
		loading: transactiondFetchLoading,
	} = useFetch<(ITransaction & { createdAt: Date })[]>(
		getTransactionsByUserEmail
	);

	useEffect(() => {
		transactiondFetchFn(userEmail);
	}, [userEmail]);

	useEffect(() => {
 setTotalRecievedAmount(
  transactionFetchData?.reduce(
   (acc, transaction) =>
    acc +
    (transaction.acknowledgementByAdmin
      ? transaction.amountAtAdmin
      : 0),
   0
  ) || 0
 );
}, [transactionFetchData]);

	const handlePay = () => {
		setIsPayModalOpen(true);
	};

	const handleAddTransactionId = async () => {
		try {
			await addTransactionIdAction(
				transactionId,
				userEmail,
				payAmount - totalRecievedAmount <= 0
					? 0
					: payAmount - totalRecievedAmount
			);
			transactiondFetchFn(userEmail);
			toast({
				title: "Success",
				description: "Transaction ID added successfully!",
			});
			setIsTransactionModalOpen(false);
			setIsPayModalOpen(false);
		} catch {
			toast({
				title: "Error",
				description: "Failed to add transaction ID",
				variant: "destructive",
			});
		}
	};

	return (
		<div>
			<Card className="mb-6">
				<CardHeader>
					<CardTitle>Payment Amount</CardTitle>
				</CardHeader>
				{transactiondFetchLoading ? (
					<p>Loading...</p>
				) : (
					<CardContent>
						<p className="text-lg font-medium">
							Amount Left: Rs.{" "}
							{payAmount - totalRecievedAmount <= 0
								? 0
								: payAmount - totalRecievedAmount}
						</p>
						<Button onClick={handlePay} disabled={payAmount - totalRecievedAmount <= 0}>
							Pay or Add Transaction
						</Button>

						<Card className="mb-6">
							<CardHeader>
								<CardTitle>Transactions</CardTitle>
							</CardHeader>
							<CardContent>
								{transactionFetchData &&
								transactionFetchData?.length > 0 ? (
									<Table>
										<TableHeader>
											<TableRow>
												<TableHead>
													Transaction ID
												</TableHead>
												<TableHead>
													Specified Amount
												</TableHead>
												<TableHead>TimeStamp</TableHead>
												<TableHead>
													Amount Recieved at Admin
												</TableHead>
												<TableHead>
													Acknowledgement by Admin
												</TableHead>
											</TableRow>
										</TableHeader>
										<TableBody>
											{transactionFetchData?.map(
												(transaction) => (
													<TableRow
														key={
															transaction.transactionId
														}
													>
														<TableCell>
															{
																transaction.transactionId
															}
														</TableCell>
														<TableCell>
															Rs.{" "}
															{
																transaction.currentPayAmount
															}
														</TableCell>
														<TableCell>
															{new Date(
																transaction.createdAt
															).toLocaleString()}
														</TableCell>
														<TableCell>
															Rs.{" "}
															{
																transaction.amountAtAdmin
															}
														</TableCell>
														<TableCell>
															{transaction.acknowledgementByAdmin
																? "Acknowledged"
																: "Pending"}
														</TableCell>
													</TableRow>
												)
											)}
										</TableBody>
									</Table>
								) : (
									<p>No transactions found</p>
								)}
							</CardContent>
						</Card>
					</CardContent>
				)}
			</Card>

			<Dialog open={isPayModalOpen} onOpenChange={setIsPayModalOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Payment</DialogTitle>
					</DialogHeader>
					<p>
						After the payment is done, transactionId will be sent to
						your mail via eassbuzz. You need to fill that in the
						input given in user dashboard.
					</p>
					<p>
						Scan QR or{" "}
						<a
							href="https://smartpay.easebuzz.in/125084/Technorollix2025"
							target="_blank"
							rel="noopener noreferrer"
							className="text-blue-500 underline"
						>
							Click Here
						</a>{" "}
						to make the payment:
					</p>
					<p>
					Note: Please fill the same email id as you have used for signup.
					</p>
					<div className="flex justify-center my-4">
						{/* Replace with actual QR code or payment link */}
						<Image
							src="/payments/technoQR.png"
							alt="QR Code"
							width={270}
							height={270}
						/>
					</div>
					<Button onClick={() => setIsTransactionModalOpen(true)}>
						Add TransactionId
					</Button>
				</DialogContent>
			</Dialog>

			<Dialog
				open={isTransactionModalOpen}
				onOpenChange={setIsTransactionModalOpen}
			>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Add Transaction ID</DialogTitle>
					</DialogHeader>
					<Input
						type="text"
						placeholder="Enter Transaction ID"
						value={transactionId}
						onChange={(e) => setTransactionId(e.target.value)}
						className="mb-4"
					/>
					<DialogFooter>
						<Button onClick={handleAddTransactionId}>
							Confirm
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default Payments;
