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
      toast({ title: "Success", description: "Successfully registered" });
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

  /* ---------- PRIZE POOL PER SECTION ---------- */
  const getPrizePoolForMainEvent = (mainEvent: string) => {
    const events = groupedEvents[mainEvent];
    if (!events || events.length === 0) return null;

    return Math.max(...events.map((e) => e.prizeMoney));
  };

  /* ---------- SELECTION LOGIC ---------- */
  const toggleEventSelection = (eventId: string, mainEvent: string) => {
    if (registeredEvents.includes(eventId)) return;

    const alreadySelected = selectedEvents.includes(eventId);

    if (!alreadySelected) {
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
    <div className="max-w-6xl mx-auto p-6 text-white">
      <h1 className="text-3xl font-bold text-center mb-4">
        Select Events
      </h1>

      <p className="text-center text-sm text-gray-300 mb-2">
        Sections selected: {getTotalMainSections().length} / 4
      </p>

      <p className="text-center text-sm text-gray-300 mb-6">
        Sub-events selected:{" "}
        {registeredEvents.length + selectedEvents.length} / 7
      </p>

      {Object.keys(groupedEvents).map((mainEvent) => (
        <div key={mainEvent} className="mb-10">
          <h2 className="text-xl font-semibold mb-4 border-b border-white/20 pb-1 flex items-center gap-3">
            {mainEvent}

            {getPrizePoolForMainEvent(mainEvent) && (
  <span className="text-sm text-white font-medium">
  (Prize Pool ₹{getPrizePoolForMainEvent(mainEvent)})
</span>
)}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {groupedEvents[mainEvent].map((event) => {
              const status = getStatus(event._id);

              return (
                <Card
                  key={event._id}
                  onClick={() =>
                    toggleEventSelection(event._id, mainEvent)
                  }
                  className={`cursor-pointer transition-all border-white/10
                    ${
                      status === "registered"
                        ? "opacity-70 cursor-not-allowed bg-white/5 text-gray-300"
                        : status === "selected"
                        ? "ring-2 ring-red-500 bg-red-500/15 text-white"
                        : "bg-white/5 text-gray-200 hover:bg-white/10"
                    }`}
                >
                  <CardHeader>
                    <CardTitle className="text-base flex justify-between items-center">
                      {event.subName}

                      {status === "registered" && (
                        <Badge className="bg-green-600 text-white">
                          Registered
                        </Badge>
                      )}

                      {status === "selected" && (
                        <Badge className="bg-red-500 text-white">
                          Selected
                        </Badge>
                      )}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="space-y-1">
                    <p>
                      <span className="font-semibold">Team Size:</span>{" "}
                      {event.teamSize}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      ))}

      <div className="flex justify-center mt-8">
        <Button
          onClick={handleSubmit}
          disabled={submitLoading || selectedEvents.length === 0}
          className="w-full max-w-md bg-red-600 hover:bg-red-700 text-white font-semibold"
        >
          {submitLoading
            ? "Submitting..."
            : "Register Selected Sub-events"}
        </Button>
      </div>
    </div>
  );
}
