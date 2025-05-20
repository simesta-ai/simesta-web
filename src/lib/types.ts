type Course = {
    id: string;
    title: string;
    description: string;
    image: string;
    progress?: number;
    topics_completed: string
    created_at: Date;
}

export type { Course }