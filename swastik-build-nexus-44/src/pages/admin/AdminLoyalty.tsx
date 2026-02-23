import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Trash2, Loader2, Gift, Mail, Phone, User } from 'lucide-react';
import { toast } from 'sonner';
import { loyaltyApi } from '@/services/cmsApi';

interface LoyaltySubmission {
    id: number;
    firstName: string;
    lastName: string;
    contactNumber: string;
    email: string;
    refereeName: string;
    refereeContact: string;
    preferredUnit: string;
    status: string;
    createdAt: string;
}

const AdminLoyalty = () => {
    const [submissions, setSubmissions] = useState<LoyaltySubmission[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchData = async () => {
        try {
            setLoading(true);
            const data = await loyaltyApi.getAll();
            setSubmissions(data.submissions || []);
        } catch (err: any) {
            console.error('Failed to fetch loyalty submissions:', err);
            toast.error('Failed to load submissions');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this submission?')) return;
        try {
            await loyaltyApi.delete(id);
            setSubmissions(prev => prev.filter(s => s.id !== id));
            toast.success('Submission deleted');
        } catch (err: any) {
            toast.error('Failed to delete submission');
        }
    };

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const filteredSubmissions = submissions.filter(s =>
        s.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.contactNumber.includes(searchTerm) ||
        s.refereeName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                <span className="ml-2 text-muted-foreground">Loading submissions...</span>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold flex items-center gap-3">
                        <Gift className="w-8 h-8 text-brand-blue" />
                        Loyalty Referrals
                    </h1>
                    <p className="text-muted-foreground">
                        Manage and track referrals submitted via the Swastik One Family program
                    </p>
                </div>
                <div className="bg-brand-blue/10 px-4 py-2 rounded-lg border border-brand-blue/20">
                    <span className="text-brand-blue font-bold">{submissions.length}</span> Submissions
                </div>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between gap-4">
                        <CardTitle>Submissions List</CardTitle>
                        <div className="relative w-72">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search by name, email or phone..."
                                className="pl-9 h-10"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    {filteredSubmissions.length === 0 ? (
                        <div className="py-12 text-center text-muted-foreground">
                            {submissions.length === 0
                                ? 'No loyalty submissions yet.'
                                : 'No submissions match your search.'}
                        </div>
                    ) : (
                        <div className="rounded-md border">
                            <Table>
                                <TableHeader className="bg-muted/50">
                                    <TableRow>
                                        <TableHead className="font-bold">Referrer Info</TableHead>
                                        <TableHead className="font-bold">Referee Details</TableHead>
                                        <TableHead className="font-bold">Preferred Unit</TableHead>
                                        <TableHead className="font-bold">Submission Date</TableHead>
                                        <TableHead className="text-right font-bold">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredSubmissions.map((sub) => (
                                        <TableRow key={sub.id} className="hover:bg-muted/30 transition-colors">
                                            <TableCell>
                                                <div className="space-y-1">
                                                    <div className="flex items-center gap-2 font-semibold text-brand-navy">
                                                        <User className="w-3 h-3" />
                                                        {sub.firstName} {sub.lastName}
                                                    </div>
                                                    <div className="flex flex-col text-xs text-muted-foreground">
                                                        <span className="flex items-center gap-1"><Mail className="w-2 h-2" /> {sub.email}</span>
                                                        <span className="flex items-center gap-1"><Phone className="w-2 h-2" /> {sub.contactNumber}</span>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="space-y-1">
                                                    <div className="font-medium">{sub.refereeName}</div>
                                                    <div className="text-xs text-muted-foreground flex items-center gap-1">
                                                        <Phone className="w-2 h-2" /> {sub.refereeContact}
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-brand-blue/10 text-brand-blue uppercase">
                                                    {sub.preferredUnit}
                                                </span>
                                            </TableCell>
                                            <TableCell className="text-sm text-muted-foreground">
                                                {formatDate(sub.createdAt)}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="text-destructive hover:bg-destructive/10"
                                                    onClick={() => handleDelete(sub.id)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default AdminLoyalty;
