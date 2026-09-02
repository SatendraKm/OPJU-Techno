"use client";

import { useEffect, useState, useCallback } from "react";
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

/* ================================================================
   TYPES
   — EventDTO: shape of a single event coming from the server
   — GroupedEvents: events grouped by their main section name
   ================================================================ */
type EventDTO = {
  _id: string;
  name: string;
  image: string;
  teamSize: number;
  prizeMoney: number;
};

type GroupedEvents = {
  [mainEvent: string]: (EventDTO & {
    mainEvent: string; // e.g. "Robovation"
    subName: string; // e.g. "Robo Soccer"
  })[];
};

/* ================================================================
   LIMITS
   — MAX_SECTIONS: max number of main event sections a user can pick from
   — MAX_SUBEVENTS: max total sub-events a user can register for
   ================================================================ */
const MAX_SECTIONS = 4;
const MAX_SUBEVENTS = 7;

/* ================================================================
   🔒 CLOSED EVENTS
   — Add a section name here to close its registration.
   — Remove a name to reopen it.
   — Matching is case-insensitive and uses "includes",
     so "back trace" will match "Back Trace (Reverse Engineering)".
   ================================================================ */
const CLOSED_EVENTS: string[] = [];

/* ================================================================
   HELPERS
   — normalize: lowercases and trims a string for safe comparison
   — isEventBlocked: returns true if the main event is in CLOSED_EVENTS
   — Defined outside the component so they aren't recreated on every render
   ================================================================ */
const normalize = (v: string) => v.toLowerCase().trim();

const isEventBlocked = (mainEvent: string): boolean => {
  const n = normalize(mainEvent);
  return CLOSED_EVENTS.some((closed) => n.includes(normalize(closed)));
};

/* ================================================================
   COMPONENT: EventsSelection
   — Fetches all events, registered events, and pending invites
   — Lets users select sub-events and submit for registration
   ================================================================ */
export default function EventsSelection() {
  /* ---------- STATE ----------
     selectedEvents   — IDs the user has clicked to select in this session
     registeredEvents — IDs already registered (fetched from server)
     pendingInvites   — IDs where user has a pending team invite
     allEvents        — full list of events from the server
  */
  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);
  const [registeredEvents, setRegisteredEvents] = useState<string[]>([]);
  const [pendingInvites, setPendingInvites] = useState<string[]>([]);
  const [allEvents, setAllEvents] = useState<EventDTO[]>([]);

  const router = useRouter();

  /* ---------- DATA FETCHING (useFetch hooks) ----------
     Each useFetch wraps a server action and gives back:
     — data: the response
     — loading: boolean while in-flight
     — error: any error that occurred
     — fn: the function to call to trigger the fetch
  */
  const { data: allEventsData, fn: fetchAllEventsFn } =
    useFetch(getAllEventsAction);

  const { data: registeredData, fn: fetchRegisteredEventsFn } = useFetch(
    getRegisteredEventsAction,
  );

  const { data: invitesData, fn: fetchPendingInvitesFn } = useFetch(
    getPendingInvitesAction,
  );

  const {
    data: submitData,
    loading: submitLoading,
    error: submitError,
    fn: submitEventsFn,
  } = useFetch(submitEventsAction);

  /* ---------- STABLE FETCH REFS ----------
     useCallback gives stable function references so they can be
     safely listed in useEffect dependency arrays without causing
     infinite re-render loops.
  */
  const stableFetchAll = useCallback(() => fetchAllEventsFn(), []);
  const stableFetchRegistered = useCallback(
    () => fetchRegisteredEventsFn(),
    [],
  );
  const stableFetchInvites = useCallback(() => fetchPendingInvitesFn(), []);

  /* ---------- EFFECT: initial data load ----------
     Runs once on mount. Fetches all three data sources in parallel.
  */
  useEffect(() => {
    stableFetchAll();
    stableFetchRegistered();
    stableFetchInvites();
  }, [stableFetchAll, stableFetchRegistered, stableFetchInvites]);

  /* ---------- EFFECT: sync fetched data into state ----------
     Whenever any of the fetch responses update, push the new
     values into local state so the UI re-renders.
  */
  useEffect(() => {
    if (allEventsData) setAllEvents(allEventsData.events);
    if (registeredData) setRegisteredEvents(registeredData.events);
    if (invitesData) setPendingInvites(invitesData.invites);
  }, [allEventsData, registeredData, invitesData]);

  /* ---------- EFFECT: handle submit result ----------
     After the user hits "Register", show a success toast and
     redirect to dashboard, or show an error toast on failure.
  */
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

  /* ================================================================
     HELPER: getMainEventName
     — Given an event ID, finds its full name and returns the part
       before " – " as the main section name.
       e.g. "Robovation – Robo Soccer" → "Robovation"
     ================================================================ */
  const getMainEventName = (eventId: string) => {
    const ev = allEvents.find((e) => e._id === eventId);
    return ev ? ev.name.split(" – ")[0] : null;
  };

  /* ================================================================
     HELPER: getTotalMainSections
     — Returns a unique list of main section names the user has
       already registered for OR selected in this session.
     — Used to enforce the MAX_SECTIONS (4) limit.
     ================================================================ */
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

  /* ================================================================
     DERIVED DATA: groupedEvents
     — Reduces the flat allEvents array into an object keyed by
       main section name, each holding an array of its sub-events.
       e.g. { "Robovation": [roboSoccer, roboRace, ...], ... }
     ================================================================ */
  const groupedEvents = allEvents.reduce<GroupedEvents>((acc, event) => {
    const [mainEvent, subEvent] = event.name.split(" – ");

    if (!acc[mainEvent]) acc[mainEvent] = [];

    acc[mainEvent].push({
      ...event,
      mainEvent,
      subName: subEvent || event.name, // fallback if no " – " separator
    });

    return acc;
  }, {});

  /* ================================================================
     HELPER: getPrizePoolForMainEvent
     — Returns the highest prize money across all sub-events in a
       section, shown in the section heading.
     ================================================================ */
  const getPrizePoolForMainEvent = (mainEvent: string) => {
    const events = groupedEvents[mainEvent];
    if (!events?.length) return null;
    return Math.max(...events.map((e) => e.prizeMoney));
  };

  /* ================================================================
     HANDLER: toggleEventSelection
     — Called when a user clicks a card.
     — Runs through all guards in order:
         1. Is the section closed? → block
         2. Is the user already registered? → block
         3. Have they hit the sub-event limit (7)? → block
         4. Have they hit the section limit (4)? → block
         5. Otherwise → toggle selected state
     ================================================================ */
  const toggleEventSelection = (eventId: string, mainEvent: string) => {
    const event = allEvents.find((e) => e._id === eventId);
    if (!event) return;

    // Guard 1: section is in CLOSED_EVENTS
    if (isEventBlocked(mainEvent)) {
      toast({
        title: "Registration Closed",
        description: `${mainEvent} registrations are currently closed.`,
        variant: "destructive",
      });
      return;
    }

    // Guard 2: already registered on the server
    if (registeredEvents.includes(eventId)) return;

    const alreadySelected = selectedEvents.includes(eventId);

    if (!alreadySelected) {
      // Guard 3: total sub-events limit
      const totalSubEvents = registeredEvents.length + selectedEvents.length;
      if (totalSubEvents >= MAX_SUBEVENTS) {
        toast({
          title: "Limit reached",
          description: "You can select only 7 sub-events in total",
          variant: "destructive",
        });
        return;
      }

      // Guard 4: total main sections limit
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

    // Toggle: add if not selected, remove if already selected
    setSelectedEvents((prev) =>
      alreadySelected
        ? prev.filter((id) => id !== eventId)
        : [...prev, eventId],
    );
  };

  /* ================================================================
     HANDLER: handleSubmit
     — Validates at least one event is selected, then calls the
       server action to register the selected event IDs.
     ================================================================ */
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

  /* ================================================================
     HELPER: getStatus
     — Returns the display status of a single event card:
         "registered" — already registered on server (green badge)
         "selected"   — chosen in this session (red badge)
         "invited"    — has a pending team invite (yellow badge)
         "available"  — default, no action taken
     ================================================================ */
  const getStatus = (eventId: string) => {
    if (registeredEvents.includes(eventId)) return "registered";
    if (selectedEvents.includes(eventId)) return "selected";
    if (pendingInvites.includes(eventId)) return "invited";
    return "available";
  };

  /* ================================================================
     LOADING STATE
     — Show a spinner while the initial events fetch is in progress.
     — Condition: allEventsData hasn't arrived yet AND no events in state.
     ================================================================ */
  const isLoading = !allEventsData && allEvents.length === 0;

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto p-6 text-white flex flex-col items-center justify-center min-h-[40vh] gap-4">
        <div className="w-8 h-8 border-4 border-white/20 border-t-white rounded-full animate-spin" />
        <p className="text-gray-400 text-sm">Loading events...</p>
      </div>
    );
  }

  /* ================================================================
     RENDER
     ================================================================ */
  return (
    <div className="max-w-6xl mx-auto p-6 text-white">
      <h1 className="text-3xl font-bold text-center mb-4">Select Events</h1>

      {/* Live counters shown to the user */}
      <p className="text-center text-sm text-gray-300 mb-2">
        Sections selected: {getTotalMainSections().length} / 4
      </p>
      <p className="text-center text-sm text-gray-300 mb-6">
        Sub-events selected: {registeredEvents.length + selectedEvents.length} /
        7
      </p>

      {/* Render each main event section */}
      {Object.keys(groupedEvents).map((mainEvent) => {
        // Compute blocked and prize once per section (not per card)
        const blocked = isEventBlocked(mainEvent);
        const prize = getPrizePoolForMainEvent(mainEvent);

        return (
          <div key={mainEvent} className="mb-10">
            {/* Section heading with optional prize pool */}
            <h2 className="text-xl font-semibold mb-4 border-b border-white/20 pb-1 flex items-center gap-3">
              {mainEvent}
              {prize && (
                <span className="text-sm text-white font-medium">
                  (Prize Pool ₹{prize})
                </span>
              )}
            </h2>

            {/* Grid of sub-event cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {groupedEvents[mainEvent].map((event) => {
                const status = getStatus(event._id);

                return (
                  <Card
                    key={event._id}
                    onClick={() =>
                      !blocked && toggleEventSelection(event._id, mainEvent)
                    }
                    className={`transition-all border-white/10
                      ${
                        blocked
                          ? "opacity-40 cursor-not-allowed bg-gray-500/10 text-gray-400" // closed
                          : status === "registered"
                            ? "opacity-70 cursor-not-allowed bg-white/5 text-gray-300" // already registered
                            : status === "selected"
                              ? "ring-2 ring-red-500 bg-red-500/15 text-white cursor-pointer" // selected this session
                              : status === "invited"
                                ? "ring-2 ring-yellow-400 bg-yellow-400/10 text-white cursor-pointer" // pending invite
                                : "bg-white/5 text-gray-200 hover:bg-white/10 cursor-pointer" // available
                      }`}
                  >
                    <CardHeader>
                      <CardTitle className="text-base flex justify-between items-center">
                        {event.subName}

                        {/* Badge: only one badge shows at a time, priority: blocked > registered > selected > invited */}
                        {blocked && (
                          <Badge className="bg-gray-600 text-white">
                            Closed
                          </Badge>
                        )}
                        {!blocked && status === "registered" && (
                          <Badge className="bg-green-600 text-white">
                            Registered
                          </Badge>
                        )}
                        {!blocked && status === "selected" && (
                          <Badge className="bg-red-500 text-white">
                            Selected
                          </Badge>
                        )}
                        {!blocked && status === "invited" && (
                          <Badge className="bg-yellow-500 text-white">
                            Invited
                          </Badge>
                        )}
                      </CardTitle>
                    </CardHeader>

                    <CardContent>
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
        );
      })}

      {/* Submit button — disabled until at least one event is selected */}
      <div className="flex justify-center mt-8">
        <Button
          onClick={handleSubmit}
          disabled={submitLoading || selectedEvents.length === 0}
          className="w-full max-w-md bg-red-600 hover:bg-red-700 text-white font-semibold"
        >
          {submitLoading ? "Submitting..." : "Register Selected Sub-events"}
        </Button>
      </div>
    </div>
  );
}
