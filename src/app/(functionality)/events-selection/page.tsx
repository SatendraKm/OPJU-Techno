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

const MAX_SECTIONS = 4;   // main events
const MAX_SUBEVENTS = 7;  // sub events

export default function EventsSelection() {
  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);
  const [registeredEvents, setRegisteredEvents] = useState<string[]>([]);
  const [pendingInvites, setPendingInvites] = useState<string[]>([]);
  const [allEvents, setAllEvents] = useState<IEvent[]>([]);

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
    if (submitData) {
      toast({
        title: "Success",
        description: "Successfully registered",
      });
      router.push("/dashboard");
    }

    if (submitError) {
      toast({
        title: "Error",
        description: submitError.message,
        variant: "destructive",
      });
    }
  }, [submitData, submitError]);

  // ---------------- GROUP EVENTS ----------------
  const groupedEvents = allEvents.reduce((acc: any, event) => {
    const [mainEvent, subEvent] = event.name.split(" – ");

    if (!acc[mainEvent]) acc[mainEvent] = [];

    acc[mainEvent].push({
      ...event,
      mainEvent,
      subName: subEvent || event.name,
    });

    return acc;
  }, {});

  // -------- FIXED MAIN EVENT COUNTER --------
  const getSelectedMainSections = () => {
    const set = new Set<string>();

    selectedEvents.forEach((id) => {
      const ev = allEvents.find((e) => e._id.toString() === id);
      if (ev) {
        const main = ev.name.split(" – ")[0];
        set.add(main);
      }
    });

    return Array.from(set);
  };

  // ---------------- LOGIC ----------------
  const toggleEventSelection = (eventId: string, mainEvent: string) => {
    if (registeredEvents.includes(eventId)) return;

    const alreadySelected = selectedEvents.includes(eventId);
    const selectedMainSections = getSelectedMainSections();

    // ADDING NEW
    if (!alreadySelected) {

      // SUB EVENT LIMIT (7)
      if (selectedEvents.length >= MAX_SUBEVENTS) {
        toast({
          title: "Limit reached",
          description: "You can select only 7 sub-events",
          variant: "destructive",
        });
        return;
      }

      // MAIN EVENT LIMIT (4)
      if (
        !selectedMainSections.includes(mainEvent) &&
        selectedMainSections.length >= MAX_SECTIONS
      ) {
        toast({
          title: "Section limit",
          description: "You can choose only 4 main events",
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

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-center mb-4">
        Select Events
      </h1>

      <p className="text-center text-sm text-gray-400 mb-2">
        Sections selected: {getSelectedMainSections().length} / 4
      </p>

      <p className="text-center text-sm text-gray-400 mb-6">
        Sub-events selected: {selectedEvents.length} / 7
      </p>

      {/* MAIN EVENT LOOP */}
      {Object.keys(groupedEvents).map((mainEvent) => (
        <div key={mainEvent} className="mb-10">

          <h2 className="text-xl font-semibold mb-4 border-b pb-1">
            {mainEvent}
          </h2>

          {/* SUB EVENTS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

            {groupedEvents[mainEvent].map((event: any) => {
              const status = getStatus(event._id.toString());

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
                    toggleEventSelection(event._id.toString(), mainEvent)
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
                      <strong>Team Size:</strong>{" "}
                      {event.teamSize}
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

      {/* SUBMIT */}
      <div className="flex justify-center mt-6">
        <Button
          onClick={handleSubmit}
          disabled={
            submitLoading ||
            selectedEvents.length === 0
          }
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
