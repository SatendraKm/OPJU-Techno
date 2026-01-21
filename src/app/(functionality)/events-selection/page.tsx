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
import { useRouter } from "next/navigation";

/* ---------- TYPES ---------- */
type EventDTO = {
  _id: string;
  name: string;
  image: string;
  teamSize: number;
  prizeMoney: number;
};

type GroupedEvents = {
  [mainEvent: string]: (EventDTO & {
    mainEvent: string;
    subName: string;
  })[];
};

const MAX_SECTIONS = 4;
const MAX_SUBEVENTS = 7;

export default function EventsSelection() {
  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);
  const [registeredEvents, setRegisteredEvents] = useState<string[]>([]);
  const [pendingInvites, setPendingInvites] = useState<string[]>([]);
  const [allEvents, setAllEvents] = useState<EventDTO[]>([]);

  const router = useRouter();

  const { data: allEventsData, fn: fetchAllEventsFn } =
    useFetch(getAllEventsAction);

  const { data: registeredData, fn: fetchRegisteredEventsFn } =
    useFetch(getRegisteredEventsAction);

  const { data: invitesData, fn: fetchPendingInvitesFn } =
    useFetch(getPendingInvitesAction);

  const {
    data: submitData,
    loading: submitLoading,
    error: submitError,
    fn: submitEventsFn,
  } = useFetch(submitEventsAction);

  /* ---------- FETCH DATA ---------- */
  useEffect(() => {
    fetchAllEventsFn();
    fetchRegisteredEventsFn();
    fetchPendingInvitesFn();
  }, []);

  useEffect(() => {
    if (allEventsData) setAllEvents(allEventsData.events);
    if (registeredData) setRegisteredEvents(registeredData.events);
    if (invitesData) setPendingInvites(invitesData.invites);
  }, [allEventsData, registeredData, invitesData]);

  useEffect(() => {
    if (submitData?.success) {
      toast({
        title: "Success",
        description: "Successfully registered",
      });
      setTimeout(() => router.push("/dashboard"), 500);
    }

    if (submitError) {
      toast({
        title: "Error",
        description: submitError.message,
        variant: "destructive",
      });
    }
  }, [submitData, submitError, router]);

  /* ---------- HELPERS ---------- */
  const getMainEventName = (eventId: string) => {
    const ev = allEvents.find((e) => e._id === eventId);
    return ev ? ev.name.split(" – ")[0] : null;
  };

  const getTotalMainSections = () => {
    const set = new Set<string>();

    registeredEvents.forEach((id) => {
      const main = getMainEventName(id);
      if (main) set.add(main);
    });

    selectedEvents.forEach((id) => {
      const main = getMainEventName(id);
      if (main) set.add(main);
    });

    return Array.from(set);
  };

  /* ---------- GROUP EVENTS ---------- */
  const groupedEvents = allEvents.reduce<GroupedEvents>((acc, event) => {
    const [mainEvent, subEvent] = event.name.split(" – ");

    if (!acc[mainEvent]) acc[mainEvent] = [];

    acc[mainEvent].push({
      ...event,
      mainEvent,
      subName: subEvent || event.name,
    });

    return acc;
  }, {});

  /* ---------- SELECTION LOGIC ---------- */
  const toggleEventSelection = (eventId: string, mainEvent: string) => {
    if (registeredEvents.includes(eventId)) return;

    const alreadySelected = selectedEvents.includes(eventId);

    if (!alreadySelected) {
      /* ---- SUB-EVENT LIMIT ---- */
      const totalSubEvents =
        registeredEvents.length + selectedEvents.length;

      if (totalSubEvents >= MAX_SUBEVENTS) {
        toast({
          title: "Limit reached",
          description: "You can select only 7 sub-events in total",
          variant: "destructive",
        });
        return;
      }

      /* ---- MAIN EVENT LIMIT (FIXED) ---- */
      const totalMainSections = getTotalMainSections();

      if (
        !totalMainSections.includes(mainEvent) &&
        totalMainSections.length >= MAX_SECTIONS
      ) {
        toast({
          title: "Section limit",
          description: "You can choose only 4 main events in total",
          variant: "destructive",
        });
        return;
      }
    }

    setSelectedEvents((prev) =>
      alreadySelected
        ? prev.filter((id) => id !== eventId)
        : [...prev, eventId]
    );
  };

  const handleSubmit = async () => {
    if (selectedEvents.length === 0) {
      toast({
        title: "Error",
        description: "Select at least one sub-event",
        variant: "destructive",
      });
      return;
    }

    await submitEventsFn({ eventIds: selectedEvents });
  };

  const getStatus = (eventId: string) => {
    if (registeredEvents.includes(eventId)) return "registered";
    if (selectedEvents.includes(eventId)) return "selected";
    if (pendingInvites.includes(eventId)) return "invited";
    return "available";
  };

  /* ---------- UI ---------- */
  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-center mb-4">
        Select Events
      </h1>

      <p className="text-center text-sm text-gray-400 mb-2">
        Sections selected: {getTotalMainSections().length} / 4
      </p>

      <p className="text-center text-sm text-gray-400 mb-6">
        Sub-events selected:{" "}
        {registeredEvents.length + selectedEvents.length} / 7
      </p>

      {Object.keys(groupedEvents).map((mainEvent) => (
        <div key={mainEvent} className="mb-10">
          <h2 className="text-xl font-semibold mb-4 border-b pb-1">
            {mainEvent}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {groupedEvents[mainEvent].map((event) => {
              const status = getStatus(event._id);

              return (
                <Card
                  key={event._id}
                  className={`cursor-pointer transition-all
                    ${
                      status === "registered"
                        ? "opacity-70 cursor-not-allowed"
                        : status === "selected"
                        ? "ring-2 ring-primary bg-primary/5"
                        : "hover:bg-gray-50"
                    }`}
                  onClick={() =>
                    toggleEventSelection(event._id, mainEvent)
                  }
                >
                  <CardHeader>
                    <CardTitle className="text-base flex justify-between">
                      {event.subName}

                      {status === "registered" && (
                        <Badge className="bg-green-500">
                          Registered
                        </Badge>
                      )}

                      {status === "selected" && (
                        <Badge className="bg-red-400">
                          Selected
                        </Badge>
                      )}
                    </CardTitle>
                  </CardHeader>

                  <CardContent>
                    <p>
                      <strong>Team Size:</strong> {event.teamSize}
                    </p>
                    <p>
                      <strong>Prize Pool:</strong> ₹
                      {event.prizeMoney.toLocaleString()}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      ))}

      <div className="flex justify-center mt-6">
        <Button
          onClick={handleSubmit}
          disabled={submitLoading || selectedEvents.length === 0}
          className="w-full max-w-md"
        >
          {submitLoading
            ? "Submitting..."
            : "Register Selected Sub-events"}
        </Button>
      </div>
    </div>
  );
}
