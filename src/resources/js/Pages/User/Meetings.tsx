import PrimaryLayout from "@/Layouts/PrimaryLayout";
import {Head} from "@inertiajs/react";

export default function Meetings() {
    return (
        <PrimaryLayout>
            <Head title={'Meetings'} />
            <div className="p-4">
                <h1 className="text-2xl font-bold mb-4">Meetings</h1>
                <p>
                    Meetings are <strong>not</strong> managed directly through this app. Meetings are retrieved directly from the Area 42 website.
                    The API endpoint we are grabbing data from is:
                    <br/>
                    <br/>
                    <a href={'https://nevadaarea42.org/wp-json/tribe/events/v1/events?search=meeting&per_page=50&page=1&order=asc&orderby=start_date'} target={'_blank'}><code>https://nevadaarea42.org/wp-json/tribe/events/v1/events?search=meeting&per_page=50&page=1&order=asc&orderby=start_date</code></a>
                    <br/>
                    <br/>
                    For context, we grab the data from the above URL and perform filter operations to simply grab the items relevant to our users.
                    If this behavior needs to be changed, please contact the developer.
                </p>
            </div>
        </PrimaryLayout>
    );
}
