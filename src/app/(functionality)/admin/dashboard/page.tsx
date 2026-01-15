"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import useFetch from "@/hooks/use-fetch";
import { getUser } from "@/actions/user-actions";
import {
  getAllEventsAction,
  getManagedEventsAction,
} from "@/actions/event-actions";
import { IEvent } from "@/models/event.model";
import { User, CalendarDays, ChevronRight, Search } from "lucide-react";
import { eventOrder } from "@/data/eventOrder";

export default function AdminDashboard() {
  const router = useRouter();
  const [eventsData, setEventsData] = useState<IEvent[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<IEvent[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  const {
    data: userFetchData,
    error: userFetchError,
    fn: userFetchFn,
  } = useFetch(getUser);

  const {
    data: eventsFetchData,
    error: eventsFetchError,
    fn: eventsFetchFn,
  } = useFetch(getAllEventsAction);

  const {
    data: managedEventsFetchData,
    error: managedEventsFetchError,
    fn: managedEventsFetchFn,
  } = useFetch(getManagedEventsAction);

  useEffect(() => {
    const fetchData = async () => {
      await userFetchFn();
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (userFetchData) {
      if (userFetchData.permissions.isManager) {
        managedEventsFetchFn(userFetchData.permissions.managedEvents);
      } else {
        eventsFetchFn();
      }
    }
  }, [userFetchData]);

  useEffect(() => {
    if (eventsFetchData) {
      const sortedEventDetails = eventsFetchData.events.sort(
        (a: IEvent, b: IEvent) => {
          return eventOrder.indexOf(a.name) - eventOrder.indexOf(b.name);
        }
      );
      setEventsData(sortedEventDetails);
      setFilteredEvents(sortedEventDetails);
      setLoading(false);
    }

    if (managedEventsFetchData) {
      const sortedManagedEvents = managedEventsFetchData.events.sort(
        (a: IEvent, b: IEvent) => {
          return eventOrder.indexOf(a.name) - eventOrder.indexOf(b.name);
        }
      );
      setEventsData(sortedManagedEvents);
      setFilteredEvents(sortedManagedEvents);
      setLoading(false);
    }
  }, [eventsFetchData, managedEventsFetchData]);

  useEffect(() => {
    if (userFetchError || eventsFetchError || managedEventsFetchError) {
      toast({
        title: "Error",
        description: "Failed to fetch data",
        variant: "destructive",
      });
      setLoading(false);
    }
  }, [userFetchError, eventsFetchError, managedEventsFetchError]);

  // Filter events based on search query
  useEffect(() => {
    const filtered = eventsData.filter((event) =>
      event.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredEvents(filtered);
  }, [searchQuery, eventsData]);

  const handleEventClick = (eventId: string) => {
    router.push(`/admin/event-data/${eventId}`);
  };

  const handleOthersNavigation = (path: string) => {
    router.push(path);
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6 space-y-6 bg-slate-400">
        <div className="space-y-4">
          <Skeleton className="h-8 w-[200px] mx-auto" />
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-[150px]" />
            </CardHeader>
            <CardContent className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-[150px]" />
            </CardHeader>
            <CardContent className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">Admin Dashboard</h1>

      <div className="grid md:grid-cols-2 gap-6">
        {userFetchData && (
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Admin Profile
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="space-y-2">
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{userFetchData.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Full Name</p>
                  <p className="font-medium">{userFetchData.fullName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Branch</p>
                  <p className="font-medium">{userFetchData.branch}</p>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-sm text-muted-foreground">Role</p>
                  <Badge
                    variant={
                      userFetchData.permissions?.isManager
                        ? "default"
                        : "secondary"
                    }
                  >
                    {userFetchData.permissions?.isManager
                      ? "Event Manager"
                      : "Admin"}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarDays className="w-5 h-5" />
              Managed Events
            </CardTitle>
            <div className="flex items-center gap-2 mt-2 relative">
              <Search className="w-4 h-4 absolute left-3 text-muted-foreground" />
              <Input
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px] pr-4">
              {filteredEvents.length > 0 ? (
                <div className="space-y-4">
                  {filteredEvents.map((event) => (
                    <Card
                      key={event._id.toString()}
                      className="cursor-pointer hover:bg-accent transition-colors"
                      onClick={() => handleEventClick(event._id.toString())}
                    >
                      <CardContent className="p-4 flex items-center justify-between">
                        <div className="space-y-1">
                          <p className="font-medium">{event.name}</p>
                          {/* {event.date && (
														<p className="text-sm text-muted-foreground">
															{new Date(
																event.date
															).toLocaleDateString()}
														</p>
													)} */}
                        </div>
                        <ChevronRight className="w-5 h-5 text-muted-foreground" />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <CalendarDays className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>
                    {searchQuery
                      ? "No matching events found"
                      : "No events found"}
                  </p>
                </div>
              )}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      {!userFetchData.permissions.isManager && (
        <div className="my-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Other Data</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="">
                <div className="space-y-4">
                  <Card
                    className="cursor-pointer hover:bg-accent transition-colors"
                    onClick={() =>
                      handleOthersNavigation("/admin/accommodation-data")
                    }
                  >
                    <CardContent className="p-4 flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="font-medium">Accommodation Data</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground" />
                    </CardContent>
                  </Card>
                  <Card
                    className="cursor-pointer hover:bg-accent transition-colors"
                    onClick={() =>
                      handleOthersNavigation("/admin/payment-data")
                    }
                  >
                    <CardContent className="p-4 flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="font-medium">Payments Data</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground" />
                    </CardContent>
                  </Card>
                  <Card
                    className="cursor-pointer hover:bg-accent transition-colors"
                    onClick={() => handleOthersNavigation("/admin/count-data")}
                  >
                    <CardContent className="p-4 flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="font-medium">
                          Counts Data of every Event
                        </p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground" />
                    </CardContent>
                  </Card>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
