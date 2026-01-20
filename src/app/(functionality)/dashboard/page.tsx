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
import { toast } from "@/hooks/use-toast";
import Payments from "@/components/payments";
import { getMergedEvents } from "@/lib/utils";

const MAX_SUBEVENTS = 7;

const DashboardPage = () => {
  const router = useRouter();

  const [selectedInvite, setSelectedInvite] = useState<any>(null);
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

  const [MergedleadingEvents, setMergedLeadingEvents] = useState<any[]>([]);
  const [payAmount, setPayAmount] = useState(0);

  // ---------- SUB EVENT COUNT ----------
  const getSubEventCount = () =>
    participatingTeamsData?.length || 0;

  // ---------- PAYMENT LOGIC ----------
  function calculatePayAmount(ind: number, team: number) {
    const total = ind + team;
    if (total >= 4) return 499;

    let amt = 0;
    if (ind === 1) amt += 99;
    else if (ind === 2 || ind === 3) amt += 199;

    if (team === 1) amt += 299;
    else if (team === 2) amt += 598;
    else if (team === 3) amt += 897;

    return amt;
  }

  useEffect(() => {
    if (participatingTeamsData && userData) {
      const merged = getMergedEvents(
        participatingTeamsData,
        userData.email
      );

      const ind = merged.filter((e: any) => e.individualSchema).length;
      const team = merged.filter((e: any) => !e.individualSchema).length;

      setPayAmount(calculatePayAmount(ind, team));
      setMergedLeadingEvents(merged);
    }
  }, [participatingTeamsData, userData]);

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
  }, []);

  // ---------- INVITE ACCEPT LIMIT ----------
  const handleInviteAccept = async (id: string) => {
    if (getSubEventCount() >= MAX_SUBEVENTS) {
      toast({
        title: "Limit reached",
        description: "Maximum 7 sub-events allowed",
        variant: "destructive",
      });
      return;
    }

    acceptInvitationFn(id);
    setSelectedInvite(null);
    participatingTeamsFn();
    invitedTeamsFn();
  };

  const handleInviteReject = async (id: string) => {
    rejectInvitationFn(id);
    setSelectedInvite(null);
    invitedTeamsFn();
  };

  const isOPJU = userData?.email?.endsWith("@opju.ac.in");

  return (
    <div className="container mx-auto p-6 space-y-6">

      <h1 className="text-3xl font-bold text-center">Dashboard</h1>

      {/* USER PROFILE */}
      {userData && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" /> Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Name</p>
              <p>{userData.fullName}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p>{userData.email}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Branch</p>
              <p>{userData.branch}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Enrollment</p>
              <p>{userData.enrollmentNumber}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* REGISTER BUTTON */}
      <div className="text-center">
        <Button
          onClick={() => router.push("/events-selection")}
          disabled={getSubEventCount() >= MAX_SUBEVENTS}
        >
          Register for Events
        </Button>

        {getSubEventCount() >= MAX_SUBEVENTS && (
          <p className="text-red-400 text-sm mt-2">
            Sub-event limit reached
          </p>
        )}
      </div>

      <p className="text-center text-sm text-gray-400">
        Joined: {getSubEventCount()} / 7
      </p>

      {/* TEAMS + INVITES */}
      <div className="grid md:grid-cols-2 gap-6">

        {/* PARTICIPATING TEAMS */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" /> Participating Teams
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[350px] pr-3">
              {participatingTeamsLoading ? (
                <p className="text-center">Loading...</p>
              ) : participatingTeamsData?.length ? (
                participatingTeamsData.map((team: any) => (
                  <Card
                    key={team._id}
                    className="mb-2 cursor-pointer hover:bg-accent"
                    onClick={() =>
                      router.push(`/team-details/${team._id}`)
                    }
                  >
                    <CardContent className="pt-4">
                      <div className="flex justify-between">
                        <div>
                          <p className="font-medium">
                            {team.event.name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Leader: {team.leader.fullName}
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
                ))
              ) : (
                <p className="text-center text-muted-foreground">
                  No teams found
                </p>
              )}
            </ScrollArea>
          </CardContent>
        </Card>

        {/* INVITES */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" /> Team Invitations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[350px] pr-3">
              {invitedTeamsLoading ? (
                <p className="text-center">Loading...</p>
              ) : invitedTeamsData?.length ? (
                invitedTeamsData.map((invite: any) => (
                  <Card
                    key={invite._id}
                    className="mb-2 cursor-pointer hover:bg-accent"
                    onClick={() =>
                      invite.status === "PENDING" &&
                      setSelectedInvite(invite)
                    }
                  >
                    <CardContent className="pt-4">
                      <div className="flex justify-between">
                        <div>
                          <p className="font-medium">
                            {invite.team.event.name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Leader: {invite.team.leader.fullName}
                          </p>
                        </div>
                        <Badge>{invite.status}</Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <p className="text-center text-muted-foreground">
                  No invitations
                </p>
              )}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      {/* PAYMENT */}
      {!isOPJU && payAmount > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Payment Section</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-2">
              Amount to pay: ₹{payAmount}
            </p>
            <Payments
              payAmount={payAmount}
              userEmail={userData?.email}
            />
          </CardContent>
        </Card>
      )}

      {isOPJU && (
        <p className="text-green-500 text-center font-semibold">
          FREE registration for OPJU students
        </p>
      )}

      {/* INVITE MODAL */}
      <Dialog
        open={!!selectedInvite}
        onOpenChange={() => setSelectedInvite(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Team Invitation</DialogTitle>
            <DialogDescription>
              Join {selectedInvite?.team?.event?.name}
            </DialogDescription>
          </DialogHeader>

          <Separator />

          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() =>
                handleInviteReject(selectedInvite._id)
              }
            >
              Reject
            </Button>
            <Button
              onClick={() =>
                handleInviteAccept(selectedInvite._id)
              }
            >
              Accept
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DashboardPage;
