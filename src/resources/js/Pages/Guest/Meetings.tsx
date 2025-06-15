import * as React from "react"
import { addDays, format, getDay, isSameDay, isSameMonth, startOfMonth, parseISO } from "date-fns"
import { CalendarIcon, ChevronLeft, ChevronRight, MapPin, ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/Components/ui/button"
import { Card } from "@/Components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/Components/ui/dialog"
import { Popover, PopoverContent, PopoverTrigger } from "@/Components/ui/popover"
import { Calendar } from "@/Components/ui/calendar"
import Breadcrumbs from "@/Components/Breadcrumbs"
import { Head } from '@inertiajs/react'
import PrimaryLayout from '@/Layouts/PrimaryLayout'
import { Event, WordPressEvent } from "@/types/Event"

interface MeetingsProps {
    events: WordPressEvent[]
    searchTerm: string
}

export default function Meetings({ events: initialEvents, searchTerm }: MeetingsProps) {
    const [date, setDate] = React.useState<Date>(new Date())
    const [month, setMonth] = React.useState<Date>(new Date())
    const [selectedEvent, setSelectedEvent] = React.useState<Event | null>(null)
    const [isDialogOpen, setIsDialogOpen] = React.useState(false)
    const [events, setEvents] = React.useState<Event[]>([])

    React.useEffect(() => {
        const transformedEvents: Event[] = initialEvents.map((event: WordPressEvent) => {
            const startDate = parseISO(event.start_date)
            const startTime = format(startDate, 'h:mm a')
            const endTime = event.end_date ? format(parseISO(event.end_date), 'h:mm a') : undefined

            return {
                id: event.id.toString(),
                title: event.title,
                date: startDate,
                description: event.description,
                type: "meeting" as const,
                url: event.url,
                venue: event.venue,
                start_time: startTime,
                end_time: endTime
            }
        })

        setEvents(transformedEvents)
    }, [initialEvents])

    const firstDayOfMonth = startOfMonth(month)
    const startDay = getDay(firstDayOfMonth)

    const days = React.useMemo(() => {
        const daysArray = []
        const daysInView = 42 // 6 weeks
        const startDate = addDays(firstDayOfMonth, -startDay)
        for (let i = 0; i < daysInView; i++) {
            const currentDate = addDays(startDate, i)
            daysArray.push(currentDate)
        }
        return daysArray
    }, [firstDayOfMonth, startDay])

    const getEventsForDay = (day: Date) => {
        return events.filter((event) => isSameDay(event.date, day))
    }

    const handleEventClick = (event: Event) => {
        setSelectedEvent(event)
        setIsDialogOpen(true)
    }

    return (
        <PrimaryLayout>
            <Head title="AA Meetings Calendar" />
            <div className="container mx-auto py-6">
                <div className="max-w-4xl mx-auto">
                    <Breadcrumbs
                        pages={[
                            { title: 'Home', href: '/', active: false },
                            { title: 'Meetings', href: '/meetings', active: true },
                        ]}
                    />

                    <div className="mb-6">
                        <h1 className="text-3xl font-bold mb-2">AA Meetings Calendar</h1>
                        <p className="text-muted-foreground">
                            Find upcoming Alcoholics Anonymous meetings and events in your area.
                            {events.length > 0 && ` Currently showing ${events.length} events.`}
                        </p>
                    </div>

                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold">{format(month, "MMMM yyyy")}</h2>
                        <div className="flex items-center gap-2">
                            <Button variant="outline" size="icon" onClick={() => setMonth(addDays(month, -30))}>
                                <ChevronLeft className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" onClick={() => setMonth(new Date())}>
                                This Month
                            </Button>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <div className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 gap-2 cursor-pointer">
                                        <CalendarIcon className="h-4 w-4" />
                                        <span>Select</span>
                                    </div>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar
                                        mode="single"
                                        selected={date}
                                        onSelect={(newDate: Date | undefined) => {
                                            if (newDate) {
                                                setDate(newDate)
                                                setMonth(newDate)
                                            }
                                        }}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                            <Button variant="outline" size="icon" onClick={() => setMonth(addDays(month, 30))}>
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    {/* Calendar header - days of week */}
                    <div className="grid grid-cols-7 gap-1 mb-1">
                        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                            <div key={day} className="text-center font-medium py-2 text-muted-foreground">
                                {day}
                            </div>
                        ))}
                    </div>

                    {/* Calendar grid */}
                    <div className="grid grid-cols-7 gap-1 mb-6">
                        {days.map((day, index) => {
                            const dayEvents = getEventsForDay(day)
                            const isCurrentMonth = isSameMonth(day, month)
                            const isToday = isSameDay(day, new Date())

                            return (
                                <div
                                    key={day.toString()}
                                    className={cn(
                                        "min-h-[100px] p-2 border rounded-md",
                                        !isCurrentMonth && "opacity-50 bg-muted",
                                        isToday && "border-primary bg-primary/5"
                                    )}
                                >
                                    <div className={cn(
                                        "text-right mb-1 text-sm",
                                        isToday && "font-bold text-primary"
                                    )}>
                                        {format(day, "d")}
                                    </div>
                                    <div className="space-y-1">
                                        {dayEvents.map((event) => (
                                            <CalendarEvent
                                                key={event.id}
                                                event={event}
                                                onClick={() => handleEventClick(event)}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    {/* No events message */}
                    {events.length === 0 && (
                        <div className="text-center py-10">
                            <p className="text-muted-foreground">
                                No meetings found for the current search.
                                <br />
                                Try refreshing the page or check back later.
                            </p>
                        </div>
                    )}

                    {/* Event Detail Dialog */}
                    {isDialogOpen && selectedEvent && (
                        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>{selectedEvent.title}</DialogTitle>
                                    <DialogDescription>
                                        {format(selectedEvent.date, "MMMM d, yyyy")}
                                        {selectedEvent.start_time && ` at ${selectedEvent.start_time}`}
                                        {selectedEvent.end_time && ` - ${selectedEvent.end_time}`}
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="mt-4 space-y-4">
                                    {selectedEvent.description && (
                                        <p className="text-sm text-muted-foreground">
                                            {selectedEvent.description}
                                        </p>
                                    )}
                                    {selectedEvent.venue && (
                                        <div className="flex items-start gap-2">
                                            <MapPin className="h-5 w-5 mt-0.5 text-muted-foreground" />
                                            <div>
                                                <div className="font-medium">{selectedEvent.venue.venue}</div>
                                                {selectedEvent.venue.address && (
                                                    <div className="text-sm text-muted-foreground">
                                                        {selectedEvent.venue.address}
                                                        {selectedEvent.venue.city && `, ${selectedEvent.venue.city}`}
                                                        {selectedEvent.venue.zip && ` ${selectedEvent.venue.zip}`}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <DialogFooter className="mt-6">
                                    {selectedEvent.url && (
                                        <Button asChild>
                                            <a
                                                href={selectedEvent.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2"
                                            >
                                                View Event <ExternalLink className="h-4 w-4" />
                                            </a>
                                        </Button>
                                    )}
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    )}
                </div>
            </div>
        </PrimaryLayout>
    );
}

function CalendarEvent({ event, onClick }: { event: Event; onClick: () => void }) {
    return (
        <Card
            className="p-2 cursor-pointer hover:bg-accent text-sm transition-colors"
            onClick={onClick}
        >
            <div className="font-medium truncate text-xs">{event.title}</div>
            {event.start_time && (
                <div className="text-xs text-muted-foreground">{event.start_time}</div>
            )}
        </Card>
    );
}
