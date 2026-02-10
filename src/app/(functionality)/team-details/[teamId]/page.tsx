// "use client";

// import { useEffect, useState } from "react";
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import {
// 	Dialog,
// 	DialogContent,
// 	DialogHeader,
// 	DialogTitle,
// 	DialogTrigger,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { toast } from "@/hooks/use-toast";
// import useFetch from "@/hooks/use-fetch";
// import { getTeamDetailsAction } from "@/actions/team-actions";
// import { useParams } from "next/navigation";
// import { getUser } from "@/actions/user-actions";
// import Image from "next/image";
// import {
// 	cancelInviteAction,
// 	sendTeamInviteAction,
// } from "@/actions/invite-actions";

// export default function TeamDetails() {
// 	const params = useParams();
// 	const [isLeader, setIsLeader] = useState(false);
// 	const [inviteeEmail, setInviteeEmail] = useState("");
// 	const [isModalOpen, setIsModalOpen] = useState(false);
// 	const [canSendMoreInvites, setCanSendMoreInvites] = useState(false);

// 	// Fetch team details
// 	const {
// 		data: teamData,
// 		loading: teamLoading,
// 		error: teamError,
// 		fn: fetchTeamDetailsFn,
// 	} = useFetch(getTeamDetailsAction);

// 	// Send invite
// 	const {
// 		// data: inviteData,
// 		loading: inviteLoading = false,
// 		error: inviteError,
// 		fn: sendInviteFn,
// 	} = useFetch(sendTeamInviteAction);

// 	// Cancel invite
// 	const {
// 		// data: cancelInviteData,
// 		// loading: cancelInviteLoading,
// 		// error: cancelInviteError,
// 		fn: cancelInviteFn,
// 	} = useFetch(cancelInviteAction);

// 	// user
// 	const {
// 		data: userData,
// 		// loading: userLoading,
// 		// error: userError,
// 		fn: userFn,
// 	} = useFetch(getUser);

// 	useEffect(() => {
// 		userFn();
// 	}, []);

// 	useEffect(() => {
// 		fetchTeamDetailsFn(params.teamId);
// 	}, [params.teamId]);

// 	useEffect(() => {
// 		if (teamData && userData) {
// 			// Check if current user is team leader
// 			if (userData?.email === teamData?.team?.leader) {
// 				setIsLeader(true);
// 			}
// 			const pendingInvites = teamData?.invites.filter(
// 				(invite: { status: string }) => invite.status === "PENDING"
// 			).length;

// 			if (
// 				teamData?.team?.members.length + pendingInvites <
// 				teamData?.event?.teamSize
// 			) {
// 				setCanSendMoreInvites(true);
// 			} else {
// 				setCanSendMoreInvites(false);
// 			}
// 		}
// 	}, [userData, teamData]);

// 	const handleSendInvite = async () => {
// 		if (!inviteeEmail) {
// 			toast({
// 				title: "Error",
// 				description: "Please enter an email address",
// 				variant: "destructive",
// 			});
// 			return;
// 		}

// 		await sendInviteFn({
// 			teamId: params.teamId,
// 			inviteeEmail: inviteeEmail,
// 		});

// 		if (!inviteError) {
// 			setInviteeEmail("");
// 			setIsModalOpen(false);
// 			// Refresh team details to get updated invites list
// 			fetchTeamDetailsFn(params.teamId);
// 		}
// 	};

// 	const handleCancelInvite = async (inviteId: string) => {
// 		await cancelInviteFn(inviteId);
// 		toast({
// 			title: "Invite Canceled",
// 			description: `The invite has been canceled.`,
// 		});
// 		fetchTeamDetailsFn(params.teamId);
// 	};

// 	if (teamLoading) {
// 		return <div className="text-center p-6">Loading team details...</div>;
// 	}

// 	if (teamError) {
// 		return (
// 			<div className="text-center p-6 text-red-500">
// 				Error loading team details
// 			</div>
// 		);
// 	}

// 	if (!teamData) {
// 		return <div className="text-center p-6">Team not found</div>;
// 	}

// 	return (
// 		<div className="max-w-4xl mx-auto p-6">
// 			{/* Event Card */}
// 			<div className="mb-8">
// 				<h2 className="text-xl font-semibold mb-4">Event Details</h2>
// 				<Card>
// 					<CardHeader>
// 						<Image
// 							src={teamData.event.image}
// 							alt={teamData.event.name}
// 							className="w-full h-48 object-cover rounded-t-lg mb-4"
// 							width={800}
// 							height={400}
// 						/>
// 						<CardTitle className="text-lg">
// 							{teamData.event.name}
// 						</CardTitle>
// 					</CardHeader>
// 					<CardContent>
// 						<div className="text-sm space-y-2">
// 							<p>
// 								<strong>Team Size:</strong>{" "}
// 								{teamData.event.teamSize} members
// 							</p>
// 							<p>
// 								<strong>Prize Pool:</strong> ₹
// 								{teamData.event.prizeMoney.toLocaleString()}
// 							</p>
// 						</div>
// 					</CardContent>
// 				</Card>
// 			</div>

// 			{/* Team Details */}
// 			<div className="mb-8">
// 				<div className="flex justify-between items-center mb-4">
// 					<h2 className="text-xl font-semibold">Team Details</h2>
// 					{isLeader && (
// 						<Dialog
// 							open={isModalOpen}
// 							onOpenChange={setIsModalOpen}
// 						>
// 							<DialogTrigger
// 								asChild
// 								disabled={!canSendMoreInvites}
// 							>
// 								<Button>Invite Member</Button>
// 							</DialogTrigger>
// 							<DialogContent>
// 								<DialogHeader>
// 									<DialogTitle>
// 										Invite Team Member
// 									</DialogTitle>
// 								</DialogHeader>
// 								<div className="space-y-4 mt-4">
// 									<Input
// 										placeholder="Enter email address"
// 										type="email"
// 										value={inviteeEmail}
// 										onChange={(e) =>
// 											setInviteeEmail(e.target.value)
// 										}
// 									/>
// 									<Button
// 										onClick={handleSendInvite}
// 										disabled={inviteLoading || false}
// 										className="w-full"
// 									>
// 										{inviteLoading
// 											? "Sending..."
// 											: "Send Invite"}
// 									</Button>
// 								</div>
// 							</DialogContent>
// 						</Dialog>
// 					)}
// 				</div>

// 				{/* Leader Section */}
// 				<Card className="mb-4">
// 					<CardHeader>
// 						<CardTitle className="text-md">Team Leader</CardTitle>
// 					</CardHeader>
// 					<CardContent>
// 						{(() => {
// 							const leader = teamData.members.find(
// 								(m: { email: string }) =>
// 									m.email === teamData.team.leader
// 							);
// 							return (
// 								<div className="space-y-2">
// 									<p>
// 										<strong>Name:</strong>{" "}
// 										{leader?.fullName}
// 									</p>
// 									<p>
// 										<strong>Email:</strong> {leader?.email}
// 									</p>
// 									<p>
// 										<strong>Branch:</strong>{" "}
// 										{leader?.branch}
// 									</p>
// 									<p>
// 										<strong>Enrollment:</strong>{" "}
// 										{leader?.enrollmentNumber}
// 									</p>
// 								</div>
// 							);
// 						})()}
// 					</CardContent>
// 				</Card>

// 				{/* Members Section */}
// 				<Card className="mb-4">
// 					<CardHeader>
// 						<CardTitle className="text-md">
// 							Other Team Members
// 						</CardTitle>
// 					</CardHeader>
// 					<CardContent>
// 						<div className="space-y-4">
// 							{teamData.members.length === 1 ? (
// 								<p className="text-gray-500">
// 									No other members
// 								</p>
// 							) : (
// 								teamData.members
// 									.filter(
// 										(member: { email: string }) =>
// 											member.email !==
// 											teamData.team.leader
// 									)
// 									.map(
// 										(member: {
// 											email: string;
// 											fullName: string;
// 											branch: string;
// 											enrollmentNumber: string;
// 										}) => (
// 											<div
// 												key={member.email}
// 												className="p-4 bg-gray-50 rounded-lg"
// 											>
// 												<p>
// 													<strong>Name:</strong>{" "}
// 													{member.fullName}
// 												</p>
// 												<p>
// 													<strong>Email:</strong>{" "}
// 													{member.email}
// 												</p>
// 												<p>
// 													<strong>Branch:</strong>{" "}
// 													{member.branch}
// 												</p>
// 												<p>
// 													<strong>Enrollment:</strong>{" "}
// 													{member.enrollmentNumber}
// 												</p>
// 											</div>
// 										)
// 									)
// 							)}
// 						</div>
// 					</CardContent>
// 				</Card>

// 				{/* Invites Section */}
// 				<Card>
// 					<CardHeader>
// 						<CardTitle className="text-md">Invites</CardTitle>
// 					</CardHeader>
// 					<CardContent>
// 						{teamData.invites.length > 0 ? (
// 							<div className="space-y-2">
// 								{teamData.invites.map(
// 									(invite: {
// 										_id: string;
// 										inviteeEmail: string;
// 										status: string;
// 									}) => (
// 										<div
// 											key={invite._id}
// 											className={`flex items-center justify-between p-2 rounded ${
// 												invite.status === "ACCEPTED"
// 													? "bg-green-50"
// 													: invite.status ===
// 													  "PENDING"
// 													? "bg-yellow-50"
// 													: invite.status ===
// 													  "REJECTED"
// 													? "bg-red-50"
// 													: "bg-gray-50"
// 											}`}
// 										>
// 											<span>{invite.inviteeEmail}</span>
// 											<Badge variant="secondary">
// 												{invite.status}
// 											</Badge>
// 											{isLeader &&
// 												invite.status === "PENDING" && (
// 													<Button
// 														variant="destructive"
// 														size="sm"
// 														onClick={() =>
// 															handleCancelInvite(
// 																invite._id
// 															)
// 														}
// 													>
// 														Cancel
// 													</Button>
// 												)}
// 										</div>
// 									)
// 								)}
// 							</div>
// 						) : (
// 							<p className="text-gray-500">No invites found</p>
// 						)}
// 					</CardContent>
// 				</Card>
// 			</div>
// 		</div>
// 	);
// }

"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import useFetch from "@/hooks/use-fetch";
import { getTeamDetailsAction, deleteTeamAction } from "@/actions/team-actions";
import { useParams, useRouter } from "next/navigation";
import { getUser } from "@/actions/user-actions";
import Image from "next/image";
import {
  cancelInviteAction,
  sendTeamInviteAction,
} from "@/actions/invite-actions";
import { Trash2 } from "lucide-react";

export default function TeamDetails() {
  const params = useParams();
  const router = useRouter();
  const [isLeader, setIsLeader] = useState(false);
  const [inviteeEmail, setInviteeEmail] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [canSendMoreInvites, setCanSendMoreInvites] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  // Fetch team details
  const {
    data: teamData,
    loading: teamLoading,
    error: teamError,
    fn: fetchTeamDetailsFn,
  } = useFetch(getTeamDetailsAction);

  // Send invite
  const {
    // data: inviteData,
    loading: inviteLoading = false,
    error: inviteError,
    fn: sendInviteFn,
  } = useFetch(sendTeamInviteAction);

  // Cancel invite
  const {
    // data: cancelInviteData,
    // loading: cancelInviteLoading,
    // error: cancelInviteError,
    fn: cancelInviteFn,
  } = useFetch(cancelInviteAction);

  // Delete team
  const { loading: deletingTeam, fn: deleteTeamFn } =
    useFetch(deleteTeamAction);

  // user
  const {
    data: userData,
    // loading: userLoading,
    // error: userError,
    fn: userFn,
  } = useFetch(getUser);

  useEffect(() => {
    userFn();
  }, []);

  useEffect(() => {
    fetchTeamDetailsFn(params.teamId);
  }, [params.teamId]);

  useEffect(() => {
    if (teamData && userData) {
      // Check if current user is team leader
      if (userData?.email === teamData?.team?.leader) {
        setIsLeader(true);
      }
      const pendingInvites = teamData?.invites.filter(
        (invite: { status: string }) => invite.status === "PENDING",
      ).length;

      if (
        teamData?.team?.members.length + pendingInvites <
        teamData?.event?.teamSize
      ) {
        setCanSendMoreInvites(true);
      } else {
        setCanSendMoreInvites(false);
      }
    }
  }, [userData, teamData]);

  const handleSendInvite = async () => {
    if (!inviteeEmail) {
      toast({
        title: "Error",
        description: "Please enter an email address",
        variant: "destructive",
      });
      return;
    }

    await sendInviteFn({
      teamId: params.teamId,
      inviteeEmail: inviteeEmail,
    });

    if (!inviteError) {
      setInviteeEmail("");
      setIsModalOpen(false);
      // Refresh team details to get updated invites list
      fetchTeamDetailsFn(params.teamId);
    }
  };

  const handleCancelInvite = async (inviteId: string) => {
    await cancelInviteFn(inviteId);
    toast({
      title: "Invite Canceled",
      description: `The invite has been canceled.`,
    });
    fetchTeamDetailsFn(params.teamId);
  };

  // NEW: Delete team handler
  const handleDeleteTeam = async () => {
    try {
      await deleteTeamFn(params.teamId as string);

      toast({
        title: "Team Deleted",
        description: "Team has been successfully deleted",
      });

      // Redirect to dashboard
      router.push("/dashboard");
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Failed to delete team";

      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
    } finally {
      setShowDeleteDialog(false);
    }
  };

  if (teamLoading) {
    return <div className="text-center p-6">Loading team details...</div>;
  }

  if (teamError) {
    return (
      <div className="text-center p-6 text-red-500">
        Error loading team details
      </div>
    );
  }

  if (!teamData) {
    return <div className="text-center p-6">Team not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Event Card */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Event Details</h2>
          {isLeader && (
            <Button
              variant="destructive"
              onClick={() => setShowDeleteDialog(true)}
              disabled={deletingTeam ?? false}
              className="flex items-center gap-2"
            >
              <Trash2 className="h-4 w-4" />
              Delete Team
            </Button>
          )}
        </div>
        <Card>
          <CardHeader>
            <Image
              src={teamData.event.image}
              alt={teamData.event.name}
              className="w-full h-48 object-cover rounded-t-lg mb-4"
              width={800}
              height={400}
            />
            <CardTitle className="text-lg">{teamData.event.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm space-y-2">
              <p>
                <strong>Team Size:</strong> {teamData.event.teamSize} members
              </p>
              <p>
                <strong>Prize Pool:</strong> ₹
                {teamData.event.prizeMoney.toLocaleString()}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Team Details */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Team Details</h2>
          {isLeader && (
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogTrigger asChild disabled={!canSendMoreInvites}>
                <Button>Invite Member</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Invite Team Member</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <Input
                    placeholder="Enter email address"
                    type="email"
                    value={inviteeEmail}
                    onChange={(e) => setInviteeEmail(e.target.value)}
                  />
                  <Button
                    onClick={handleSendInvite}
                    disabled={inviteLoading || false}
                    className="w-full"
                  >
                    {inviteLoading ? "Sending..." : "Send Invite"}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>

        {/* Leader Section */}
        <Card className="mb-4">
          <CardHeader>
            <CardTitle className="text-md">Team Leader</CardTitle>
          </CardHeader>
          <CardContent>
            {(() => {
              const leader = teamData.members.find(
                (m: { email: string }) => m.email === teamData.team.leader,
              );
              return (
                <div className="space-y-2">
                  <p>
                    <strong>Name:</strong> {leader?.fullName}
                  </p>
                  <p>
                    <strong>Email:</strong> {leader?.email}
                  </p>
                  <p>
                    <strong>Branch:</strong> {leader?.branch}
                  </p>
                  <p>
                    <strong>Enrollment:</strong> {leader?.enrollmentNumber}
                  </p>
                </div>
              );
            })()}
          </CardContent>
        </Card>

        {/* Members Section */}
        <Card className="mb-4">
          <CardHeader>
            <CardTitle className="text-md">Other Team Members</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {teamData.members.length === 1 ? (
                <p className="text-gray-500">No other members</p>
              ) : (
                teamData.members
                  .filter(
                    (member: { email: string }) =>
                      member.email !== teamData.team.leader,
                  )
                  .map(
                    (member: {
                      email: string;
                      fullName: string;
                      branch: string;
                      enrollmentNumber: string;
                    }) => (
                      <div
                        key={member.email}
                        className="p-4 bg-gray-50 rounded-lg"
                      >
                        <p>
                          <strong>Name:</strong> {member.fullName}
                        </p>
                        <p>
                          <strong>Email:</strong> {member.email}
                        </p>
                        <p>
                          <strong>Branch:</strong> {member.branch}
                        </p>
                        <p>
                          <strong>Enrollment:</strong> {member.enrollmentNumber}
                        </p>
                      </div>
                    ),
                  )
              )}
            </div>
          </CardContent>
        </Card>

        {/* Invites Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-md">Invites</CardTitle>
          </CardHeader>
          <CardContent>
            {teamData.invites.length > 0 ? (
              <div className="space-y-2">
                {teamData.invites.map(
                  (invite: {
                    _id: string;
                    inviteeEmail: string;
                    status: string;
                  }) => (
                    <div
                      key={invite._id}
                      className={`flex items-center justify-between p-2 rounded ${
                        invite.status === "ACCEPTED"
                          ? "bg-green-50"
                          : invite.status === "PENDING"
                            ? "bg-yellow-50"
                            : invite.status === "REJECTED"
                              ? "bg-red-50"
                              : "bg-gray-50"
                      }`}
                    >
                      <span>{invite.inviteeEmail}</span>
                      <Badge variant="secondary">{invite.status}</Badge>
                      {isLeader && invite.status === "PENDING" && (
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleCancelInvite(invite._id)}
                        >
                          Cancel
                        </Button>
                      )}
                    </div>
                  ),
                )}
              </div>
            ) : (
              <p className="text-gray-500">No invites found</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* DELETE CONFIRMATION DIALOG */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Team</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this team for{" "}
              <strong>{teamData?.event?.name}</strong>? This action cannot be
              undone. All team members will be removed and pending invitations
              will be canceled.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deletingTeam ?? false}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteTeam}
              disabled={deletingTeam ?? false}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deletingTeam ? "Deleting..." : "Delete Team"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
