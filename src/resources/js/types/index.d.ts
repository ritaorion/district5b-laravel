import { User } from '@/types/User'
import { NavigationResource } from "@/types/Navigation";
import { SiteSetting } from "@/types/SiteSetting";

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth?: {
        user?: User;
    };
    navigationResources: NavigationResource[];
    siteSettings: SiteSetting;
};
