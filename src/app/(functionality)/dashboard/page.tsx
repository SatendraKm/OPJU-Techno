/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useFetch from "@/hooks/use-fetch";
import { getUser } from "@/actions/user-actions";
import { getParticipatingTeams, getInvitedTeams } from "@/actions/team-actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { User, Calendar, Users } from "lucide-react";
import {
  acceptInviteAction,
  rejectInviteAction,
} from "@/actions/invite-actions";
import AccommodationModal from "@/components/accomodation-modal";
import { getAccommodationDetailsAction } from "@/actions/accomodation-actions";
import { toast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Payments from "@/components/payments";
import { getMergedEvents } from "@/lib/utils";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/ui/hover-card";

const DashboardPage = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  interface SelectedInvite {
    _id: string;
    status: string;
    team: {
      event: {
        name: string;
        prizeMoney: string;
        teamSize: number;
      };
      leader: {
        _id: string;
        fullName: string;
      };
      members: {
        _id: string;
        fullName: string;
      }[];
    };
  }

  const [selectedInvite, setSelectedInvite] = useState<SelectedInvite | null>(
    null
  );
  const { data: userData, fn: userFn } = useFetch(getUser);
  const {
    data: participatingTeamsData,
    loading: participatingTeamsLoading,
    fn: participatingTeamsFn,
  } = useFetch(getParticipatingTeams);
  const {
    data: invitedTeamsData,
    loading: invitedTeamsLoading,
    fn: invitedTeamsFn,
  } = useFetch(getInvitedTeams);

  const { error: acceptInvitationError, fn: acceptInvitationFn } =
    useFetch(acceptInviteAction);

  const { fn: rejectInvitationFn } = useFetch(rejectInviteAction);

  const {
    data: accommodationFetchData,
    loading: accommodationFetchLoading,
    fn: accommodationFetchFn,
  } = useFetch(getAccommodationDetailsAction);

  // Create a function to calculate the payAmount.
  // This will input number of teams with individualSchema and number of teamSchema
  // if sum of both teams >= 4 : 499
  // for individualSchema :
  // if number of individualSchema teams == 1 : 99
  // if number of individualSchema teams == (2 or 3) : 199
  // for teamSchema :
  // if number of teamSchema teams == 1 : 299
  // if number of teamSchema teams == 2 : 299 * 2
  // if number of teamSchema teams == 3 : 299 * 3

  function calculatePayAmount(
    individualSchemaCount: number,
    teamSchemaCount: number
  ): number {
    const totalTeams = individualSchemaCount + teamSchemaCount;

    // If the sum of both teams is >= 4, return 499
    if (totalTeams >= 4) {
      return 499;
    }

    let payAmount = 0;

    // Calculate pay amount for individualSchema teams
    if (individualSchemaCount === 1) {
      payAmount += 99;
    } else if (individualSchemaCount === 2 || individualSchemaCount === 3) {
      payAmount += 199;
    }

    // Calculate pay amount for teamSchema teams
    if (teamSchemaCount === 1) {
      payAmount += 299;
    } else if (teamSchemaCount === 2) {
      payAmount += 299 * 2;
    } else if (teamSchemaCount === 3) {
      payAmount += 299 * 3;
    }

    return payAmount;
  }

  const [MergedleadingEvents, setMergedLeadingEvents] = useState<any[]>([]);
  const [payAmount, setPayAmount] = useState(0);

  useEffect(() => {
    if (participatingTeamsData) {
      const mergedTeamsArray = getMergedEvents(
        participatingTeamsData,
        userData.email
      );
      setPayAmount(
        calculatePayAmount(
          mergedTeamsArray?.filter((event: any) => event.individualSchema)
            .length,
          mergedTeamsArray?.filter((event: any) => !event.individualSchema)
            .length
        )
      );
      setMergedLeadingEvents(mergedTeamsArray);
    }
  }, [participatingTeamsData]);

  useEffect(() => {
    if (acceptInvitationError) {
      toast({
        title: "Error",
        description: acceptInvitationError.message,
        variant: "destructive",
      });
    }
  }, [acceptInvitationError]);

  useEffect(() => {
    userFn();
    participatingTeamsFn();
    invitedTeamsFn();
    accommodationFetchFn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleTeamClick = (teamId: string) => {
    router.push(`/team-details/${teamId}`);
  };

  const handleInviteAccept = async (inviteId: string) => {
    // Implement accept logic here
    acceptInvitationFn(inviteId);
    setSelectedInvite(null);
    participatingTeamsFn();
    invitedTeamsFn();
  };

  const handleInviteReject = async (inviteId: string) => {
    // Implement reject logic here
    rejectInvitationFn(inviteId);
    setSelectedInvite(null);
    invitedTeamsFn();
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    accommodationFetchFn();
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center mb-8">Dashboard</h1>

      {userData && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              User Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Full Name</p>
              <p className="font-medium">{userData.fullName}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium">{userData.email}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Branch</p>
              <p className="font-medium">{userData.branch}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Enrollment</p>
              <p className="font-medium">{userData.enrollmentNumber}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {userData?.isOutsider && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Accommodation Details</CardTitle>
          </CardHeader>
          <CardContent>
            {!accommodationFetchLoading ? (
              accommodationFetchData ? (
                <div>
                  <p>
                    Arrival Time:{" "}
                    {new Date(
                      accommodationFetchData.arrivalTime
                    ).toLocaleString()}
                  </p>
                  <p>
                    Departure Time:{" "}
                    {new Date(
                      accommodationFetchData.departureTime
                    ).toLocaleString()}
                  </p>
                  <p>
                    Additional Details:{" "}
                    {accommodationFetchData.additionalDetails}
                  </p>
                  {/* New Fields */}
                  <p>
                    University Name: {accommodationFetchData.universityName}
                  </p>
                  <p>Gender: {accommodationFetchData.gender}</p>
                  <Button
                    className="mt-4"
                    disabled={!userData?.isOutsider}
                    onClick={handleOpenModal}
                  >
                    Edit Accommodation
                  </Button>
                </div>
              ) : (
                <div>
                  {/* <p>Accommodation not availed.</p> */}
                  <p>
                    {/* Note: Avail if you are an outsider participant. */}
                    Note: Availing of accommodation is closed.
                  </p>
                  <Button
                    className="mt-4"
                    disabled={!userData?.isOutsider}
                    onClick={handleOpenModal}
                  >
                    Add Accommodation
                  </Button>
                </div>
              )
            ) : (
              <div>Loading Accommodation details...</div>
            )}
          </CardContent>
        </Card>
      )}
      {userData && (
        <AccommodationModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          initialData={
            accommodationFetchData
              ? {
                  ...accommodationFetchData,
                  arrivalTime: new Date(
                    accommodationFetchData.arrivalTime
                  ).toISOString(),
                  departureTime: new Date(
                    accommodationFetchData.departureTime
                  ).toISOString(),
                  userId: userData?._id,
                }
              : { userId: userData?._id }
          }
        />
      )}

      {/* Register on More Events */}
      <div className="text-center mt-8">
        <Button onClick={() => router.push("/events-selection")}>
          Register for Events as leader
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Participating Teams Section */}
        <Card className="h-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Participating Teams
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px] pr-4">
              {participatingTeamsLoading ? (
                <p className="text-center text-muted-foreground">
                  Loading Participating Teams...
                </p>
              ) : participatingTeamsData?.length > 0 ? (
                <div className="space-y-4">
                  {participatingTeamsData.map((team: any) => (
                    <Card
                      key={team._id}
                      className="cursor-pointer hover:bg-accent transition-colors"
                      onClick={() => handleTeamClick(team._id)}
                    >
                      <CardContent className="pt-6">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="font-medium">{team.event.name}</p>
                            <p className="text-sm text-muted-foreground">
                              Led by {team.leader.fullName}
                            </p>
                          </div>
                          <Badge>
                            {team.leader.email === userData?.email
                              ? "Leader"
                              : "Member"}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground">
                  No participating teams found
                </p>
              )}
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Invited Teams Section */}
        <Card className="h-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Team Invitations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px] pr-4">
              {invitedTeamsLoading ? (
                <p className="text-center text-muted-foreground">
                  Loading Invitations...
                </p>
              ) : invitedTeamsData?.length > 0 ? (
                <div className="space-y-4">
                  {invitedTeamsData.map((invite: any) => (
                    <Card
                      key={invite._id}
                      className={
                        invite.status === "PENDING"
                          ? "cursor-pointer hover:bg-accent transition-colors"
                          : ""
                      }
                      onClick={() =>
                        invite.status === "PENDING" && setSelectedInvite(invite)
                      }
                    >
                      <CardContent className="pt-6">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="font-medium">
                              {invite.team.event.name}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Led by {invite.team.leader.fullName}
                            </p>
                          </div>
                          <Badge
                            variant={
                              invite.status === "PENDING"
                                ? "secondary"
                                : invite.status === "ACCEPTED"
                                ? "default"
                                : "destructive"
                            }
                          >
                            {invite.status}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground">
                  No invitations found
                </p>
              )}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      {/* Payments section */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex justify-between">
            Payments Section
            <HoverCard>
              <HoverCardTrigger>
                <button className="text-gray-600 underline font-thin text-sm">
                  View Fee Structure
                </button>
              </HoverCardTrigger>
              <HoverCardContent className="w-72 p-4 bg-white shadow-lg rounded-lg">
                <div className="text-sm text-gray-700">
                  <p>Registration Fee structure:</p>
                  <ul className="list-disc pl-4">
                    <li>For Individual Registration:</li>
                    <ul className="list-disc pl-8">
                      <li>1 event: Rs. 99</li>
                      <li>2 or 3 events: Rs. 199</li>
                      <li>4 to 7 events: Rs. 499</li>
                    </ul>
                    <li>For Team Registration:</li>
                    <ul className="list-disc pl-8">
                      <li>per event: Rs. 299</li>
                      <li>4 to 7 events: Rs. 499</li>
                    </ul>
                  </ul>
                  <p>
                    If your team have any outsiders, then payment is required.
                  </p>
                  <p>
                    If the event&apos;s team size is 1, then it is considered an
                    individual event. Otherwise, it is considered a team event.
                  </p>
                  <br />
                  <p>Note: Only leaders are needed to pay the fee.</p>
                </div>
              </HoverCardContent>
            </HoverCard>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {participatingTeamsLoading ? (
            <p className="text-center text-muted-foreground">
              Loading Participating Events...
            </p>
          ) : MergedleadingEvents.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Event Name</TableHead>
                  <TableHead>Participating subevents</TableHead>
                  <TableHead>Type of pay scheme</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {MergedleadingEvents.map((event, k) => {
                  return (
                    <TableRow key={k}>
                      <TableCell>{event.eventName}</TableCell>
                      <TableCell>{event.teams.length}</TableCell>
                      <TableCell>
                        {event.individualSchema ? "Individual" : "Team"}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          ) : (
            <p>No payment is required</p>
          )}
          <br />
          {payAmount > 0 && (
            <>
              <div className=" flex justify-between">
                <div>
                  <p>
                    Total Individual schema:{" "}
                    {
                      MergedleadingEvents?.filter(
                        (event) => event.individualSchema
                      ).length
                    }
                  </p>
                  <p>
                    Total Team schema:{" "}
                    {
                      MergedleadingEvents?.filter(
                        (event) => !event.individualSchema
                      ).length
                    }
                  </p>
                  <p>Amount to be paid: {payAmount}</p>
                </div>
                <div></div>
              </div>
              <Payments payAmount={payAmount} userEmail={userData?.email} />
            </>
          )}
          <p className="text-sm text-center text-muted-foreground mt-4">
            Note: Payments are non-refundable. Try to do payment after
            completing all the team buildings. <br />
            For any doubts or queries related to payments, please contact this
            number: +91 79-70834551
          </p>
        </CardContent>
      </Card>

      {/* Invitation Modal */}
      <Dialog
        open={selectedInvite !== null}
        onOpenChange={() => setSelectedInvite(null)}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Team Invitation</DialogTitle>
            <DialogDescription>
              You have been invited to join {selectedInvite?.team?.event.name}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Event Details</h4>
              <p className="text-sm text-muted-foreground">
                PrizeMoney: {selectedInvite?.team.event.prizeMoney}
              </p>
              <p className="text-sm text-muted-foreground">
                TeamSize: {selectedInvite?.team.event.teamSize}
              </p>
            </div>

            <div>
              <h4 className="font-medium mb-2">Team Members</h4>
              <div className="space-y-2">
                {selectedInvite?.team.members.map((member) => (
                  <div
                    key={member._id}
                    className="flex justify-between items-center"
                  >
                    <p className="text-sm">{member.fullName}</p>
                    <Badge variant="outline">
                      {member._id === selectedInvite.team.leader._id
                        ? "Leader"
                        : "Member"}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            <div className="flex justify-end gap-4">
              <Button
                variant="outline"
                onClick={() =>
                  selectedInvite && handleInviteReject(selectedInvite._id)
                }
              >
                Reject
              </Button>
              <Button
                onClick={() =>
                  selectedInvite && handleInviteAccept(selectedInvite._id)
                }
              >
                Accept
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DashboardPage;
