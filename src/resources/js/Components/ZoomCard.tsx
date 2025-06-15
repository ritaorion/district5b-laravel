import { Card, CardContent } from "@/Components/ui/card";

interface ZoomCardProps {
    className?: string;
}

const ZoomCard = ({ className = "" }: ZoomCardProps) => {
    return (
        <Card className={`bg-white shadow-lg ${className}`}>
            <CardContent className="p-6">
                <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-medium text-xs">zoom</span>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <p className="text-sm text-gray-700">
                            We host a Service Manual Step Study, on the
                            third Saturday of the month from 10:00 a.m. to
                            11:00 am. All AAs are welcome.
                        </p>
                        <p className="text-sm font-medium">Meeting ID: 911 603 2610</p>
                        <p className="text-sm">Password: Service</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default ZoomCard; 