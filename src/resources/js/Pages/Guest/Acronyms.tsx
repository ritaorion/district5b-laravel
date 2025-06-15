import { useState, useEffect } from 'react';
import { Input } from '@/Components/ui/input';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/Components/ui/table';
import { Search } from 'lucide-react';
import Breadcrumbs from "@/Components/Breadcrumbs";
import { Head } from '@inertiajs/react';
import PrimaryLayout from '@/Layouts/PrimaryLayout';

interface AcronymData {
    acronym: string;
    description: string;
}

interface AcronymsProps {
    acronyms: AcronymData[];
}

export default function Acronyms({ acronyms }: AcronymsProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredAcronyms, setFilteredAcronyms] = useState<AcronymData[]>(acronyms);

    useEffect(() => {
        if (searchTerm.trim() === '') {
            setFilteredAcronyms(acronyms);
        } else {
            const filtered = acronyms.filter(
                (acronymItem) =>
                    acronymItem.acronym.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    acronymItem.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredAcronyms(filtered);
        }
    }, [searchTerm, acronyms]);

    return (
        <PrimaryLayout>
            <Head title="AA Acronyms and Terms" />
            <div className="container mx-auto py-6">
                <div className="max-w-4xl mx-auto">
                    <Breadcrumbs
                        pages={[
                            { title: 'Home', href: '/', active: false },
                            { title: 'Acronyms', href: '/acronyms', active: true },
                        ]}
                    />

                    <h1 className="text-3xl font-bold mb-6">
                        AA Acronyms and Terms
                    </h1>

                    <p className="text-muted-foreground mb-6">
                        This page provides explanations for common acronyms and terms used in Alcoholics Anonymous.
                        Use the search box to quickly find specific acronyms or descriptions.
                    </p>

                    <div className="relative mb-6">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <Search className="h-5 w-5 text-muted-foreground"/>
                        </div>
                        <Input
                            type="text"
                            placeholder="Search acronyms or descriptions..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                        />
                    </div>

                    <p className="mb-4 text-muted-foreground">
                        Showing {filteredAcronyms.length} of {acronyms.length} acronyms
                    </p>

                    <div className="border rounded-md">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-1/4">Acronym</TableHead>
                                    <TableHead>Description</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredAcronyms.length > 0 ? (
                                    filteredAcronyms.map((acronymItem, index) => (
                                        <TableRow key={index}>
                                            <TableCell className="font-medium whitespace-normal break-words">
                                                {acronymItem.acronym}
                                            </TableCell>
                                            <TableCell className="whitespace-normal break-words">
                                                {acronymItem.description}
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={2} className="text-center py-4">
                                            No acronyms found matching your search term.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        </PrimaryLayout>
    );
}
