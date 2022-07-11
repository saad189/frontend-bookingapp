export interface Booking {
    id: number;
    startTime: Date;
    labId: number;
    endTime: Date;
    title: string;
    userId: number;
    uid: string;
    dateAdded: Date;
}

export interface BookingEditInfo {
    id: number;
    action: string;
    startTime?: Date;
    endTime?: Date;
    labName?: string;
    title?: string;
}

export interface BookingEvent {
    start: Date;
    end: Date;
    title: string;
    email: string;
    labId: number;
    uid: string;
    action?: string;
}