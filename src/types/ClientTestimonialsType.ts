import { reviewType } from "./reviewType";

export interface ClientTestimonialsType extends reviewType {
    user: {
        firstName: string,
        lastName: string,
        image: string
    }
}