type Event = {
    id: string
    title: string
    date: Date
    description: string
    type: "meeting" | "personal" | "deadline"
    url?: string
    venue?: {
        venue: string
        address?: string
        city?: string
        country?: string
        zip?: string
    } | null
    start_time?: string
    end_time?: string
}

type NativeEvent = {
    id: number;
    title: string;
    description: string;
    location: string;
    start_time: string;
    end_time: string;
    created_at: string;
    updated_at: string;
}

type WordPressEvent = {
    id: number
    title: string
    description: string
    url: string
    start_date: string
    end_date: string
    venue: {
        venue: string
        address?: string
        city?: string
        country?: string
        zip?: string
    } | null
}

export type { Event, WordPressEvent, NativeEvent };
