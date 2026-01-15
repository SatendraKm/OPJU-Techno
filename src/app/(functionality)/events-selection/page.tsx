"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import useFetch from "@/hooks/use-fetch";
import { Badge } from "@/components/ui/badge";
import {
  getAllEventsAction,
  getPendingInvitesAction,
  getRegisteredEventsAction,
  submitEventsAction,
} from "@/actions/event-actions";
import { IEvent } from "@/models/event.model";
import { useRouter } from "next/navigation";
import { getUser } from "@/actions/user-actions";
// import Image from "next/image";

const registrationClosedEvents: string[] = [
  "67c15c20e3c4c72ebbd459cd",
  "67c15c91e3c4c72ebbd459d1",
  "67c15d28e3c4c72ebbd459d3",
  "67c15d4de3c4c72ebbd459d5",
  "67c15d72e3c4c72ebbd459d7",
  "67c15d97e3c4c72ebbd459d9",
  "67c15de3e3c4c72ebbd459df",
  "67c15df2e3c4c72ebbd459e1",
  "67c15e06e3c4c72ebbd459e3",
  "67c15e19e3c4c72ebbd459e5",
  "67c15e32e3c4c72ebbd459e7",
  "67c15e46e3c4c72ebbd459e9",
  "67c15e72e3c4c72ebbd459eb",
  "67c15e8fe3c4c72ebbd459ed",
  "67c15ea6e3c4c72ebbd459ef",
  "67c15eb9e3c4c72ebbd459f1",
  "67c15ed0e3c4c72ebbd459f3",
  "67c15ef5e3c4c72ebbd459f5",
  "67c15f09e3c4c72ebbd459f7",
  "67c15f30e3c4c72ebbd459f9",
  "67c15f55e3c4c72ebbd459fb",
  "67c15f6ae3c4c72ebbd459fd",
  "67c15f7de3c4c72ebbd459ff",
  "67c15f92e3c4c72ebbd45a01",
  "67c15fb0e3c4c72ebbd45a03",
  "67c15fc8e3c4c72ebbd45a05",
  "67c16008e3c4c72ebbd45a07",
  "67c16029e3c4c72ebbd45a09",
  "67c1604de3c4c72ebbd45a0b",
  "67c16066e3c4c72ebbd45a0d",
  "67c1607de3c4c72ebbd45a0f",
  "67c160a1e3c4c72ebbd45a11",
  "67c160cbe3c4c72ebbd45a13",
  "67c160e1e3c4c72ebbd45a15",
  "67c16109e3c4c72ebbd45a17",
  "67c16137e3c4c72ebbd45a19",
  "67c1614ae3c4c72ebbd45a1b",
  "67c161cee3c4c72ebbd45a1d",
  "67c161e9e3c4c72ebbd45a1f",
  "67c1620fe3c4c72ebbd45a21",
  "67c1623ee3c4c72ebbd45a23",
  "67d0016d16cb80e1b1588617",
];

export default function EventsSelection() {
  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);
  const [registeredEvents, setRegisteredEvents] = useState<string[]>([]);
  const [pendingInvites, setPendingInvites] = useState<string[]>([]);
  const [allEvents, setAllEvents] = useState<IEvent[]>([]);
  const [isOutsider, setIsOutsider] = useState<boolean>(true); // Default to true for outsiders

  const router = useRouter();

  // Fetch all events
  const {
    data: allEventsData,
    // loading: allEventsLoading,
    // error: allEventsError,
    fn: fetchAllEventsFn,
  } = useFetch(getAllEventsAction);

  // Fetch registered events
  const {
    data: registeredData,
    loading: registeredLoading,
    // error: registeredError,
    fn: fetchRegisteredEventsFn,
  } = useFetch(getRegisteredEventsAction);

  // Fetch pending invites
  const {
    data: invitesData,
    loading: invitesLoading,
    // error: invitesError,
    fn: fetchPendingInvitesFn,
  } = useFetch(getPendingInvitesAction);

  // Submit selected events
  const {
    data: submitData,
    loading: submitLoading,
    error: submitError,
    fn: submitEventsFn,
  } = useFetch(submitEventsAction);

  useEffect(() => {
    // Fetch registered events and pending invites on component mount
    fetchAllEventsFn();
    fetchRegisteredEventsFn();
    fetchPendingInvitesFn();
    fetchUserStatus();
  }, []);

  // Fetch user status (Insider/Outsider)
  const fetchUserStatus = async () => {
    try {
      const user = await getUser();
      setIsOutsider(user?.isOutsider ?? true); // Default to true if not available
    } catch (error) {
      console.error("Failed to fetch user status", error);
    }
  };

  useEffect(() => {
    if (allEventsData) {
      setAllEvents(allEventsData.events);
    }
    if (registeredData) {
      setRegisteredEvents(registeredData.events);
    }
    if (invitesData) {
      setPendingInvites(invitesData.invites);
    }
  }, [allEventsData, registeredData, invitesData]);

  useEffect(() => {
    if (submitData) {
      toast({
        title: "Success",
        description: "Successfully registered for events",
        variant: "default",
      });
      router.push("/dashboard");
    }
    if (submitError) {
      // Extract a descriptive error message if available
      const errorMessage =
        (submitError as { message?: string }).message ||
        "An unexpected error occurred. Please try again.";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    }
  }, [submitData, submitError]);

  const toggleEventSelection = (eventId: string) => {
    if (registeredEvents.includes(eventId)) return; // Prevent toggling registered events
    if (registrationClosedEvents.includes(eventId)) return; // Prevent toggling registrationClosedEvents events

    setSelectedEvents((prev) =>
      prev.includes(eventId)
        ? prev.filter((id) => id !== eventId)
        : [...prev, eventId]
    );
  };

  const handleSubmit = async () => {
    if (selectedEvents.length === 0) {
      toast({
        title: "Error",
        description: "Please select at least one event",
        variant: "destructive",
      });
      return;
    }

    await submitEventsFn({ eventIds: selectedEvents });
  };

  const getEventStatus = (eventId: string) => {
    if (registeredEvents.includes(eventId)) {
      return "registered";
    }
    if (registrationClosedEvents.includes(eventId)) {
      return "closed";
    }
    if (selectedEvents.includes(eventId)) {
      return "selected";
    }
    if (pendingInvites.includes(eventId)) {
      return "invited";
    }
    return "available";
  };

  const getCardClassName = (status: string) => {
    const baseClass = "cursor-pointer transition-all";
    switch (status) {
      case "registered":
        return `${baseClass} opacity-75 cursor-not-allowed bg-gray-50`;
      case "invited":
        return `${baseClass} ring-2 ring-yellow-400 ${
          selectedEvents.includes(status) ? "bg-primary/5" : "bg-yellow-50"
        }`;
      case "selected":
        return `${baseClass} ring-2 ring-primary bg-primary/5`;
      case "closed":
        return `${baseClass} opacity-75 cursor-not-allowed bg-gray-50`;

      default:
        return `${baseClass} hover:bg-gray-50`;
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Select Events</h1>

      {registeredLoading || invitesLoading ? (
        <div className="text-center">Loading events...</div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {allEvents?.map((event) => {
              const status = getEventStatus(event._id.toString());

              return (
                <Card
                  key={event._id.toString()}
                  className={getCardClassName(status)}
                  onClick={() => toggleEventSelection(event._id.toString())}
                >
                  <CardHeader>
                    <CardTitle className="text-lg flex justify-between items-center">
                      {event.name}
                      {status === "registered" && (
                        <Badge className="bg-green-500">Registered</Badge>
                      )}
                      {status === "invited" && (
                        <Badge className="bg-yellow-500">Team Invite</Badge>
                      )}
                      {status === "selected" && (
                        <Badge className="bg-red-300">Selected</Badge>
                      )}
                      {status === "closed" && (
                        <Badge className="bg-slate-400">Closed</Badge>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm space-y-2">
                      <p>
                        <strong>Team Size:</strong> {event.teamSize} members
                      </p>
                      <p>
                        <strong>Prize Pool:</strong> ₹
                        {event.prizeMoney.toLocaleString()}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {isOutsider && (
            <p className="my-2 text-gray-300 text-center">
              Note: One participant can participate in atmost 7 Events.
            </p>
          )}

          <div className="flex justify-center">
            <Button
              onClick={handleSubmit}
              disabled={
                // submitLoading || selectedEvents.length === 0 || (isOutsider && selectedEvents?.length + registeredEvents?.length > 7)
                submitLoading || selectedEvents.length === 0
              }
              className="w-full max-w-md"
            >
              {submitLoading ? "Submitting..." : "Register for Selected Events"}
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
