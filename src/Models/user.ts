import { Booking } from "./booking";
import { Role } from "./role";

export interface User {
    id: number;
    name: string;
    email: string;
    role: Role;
    bookings: Booking[];
}