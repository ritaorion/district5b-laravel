import { User } from '@/types/User'
import { NavigationResource } from "@/types/Navigation";

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth?: {
        user?: User;
    };
    navigationResources: NavigationResource[];
};
