import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Plus, Search, Filter, Edit, Trash2, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { inquiriesApi, projectsApi } from '@/services/cmsApi';

interface Inquiry {
    id: number;
    name: string;
    email?: string;
    phone: string;
    message?: string;
    projectId?: number;
    source?: string;
    status: string;
    createdAt: string;
    updatedAt: string;
}

interface Project {
    id: number;
    name: string;
    slug: string;
}

const AdminLeads = () => {
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [leads, setLeads] = useState<Inquiry[]>([]);
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('');

    const [newLead, setNewLead] = useState({
        prefix: '',
        firstName: '',
        lastName: '',
        gender: '',
        nationality: '',
        maritalStatus: '',
        email: '',
        phone: '',
        project: '',
        message: '',
    });

    const fetchData = async () => {
        try {
            setLoading(true);
            const [inquiriesData, projectsData] = await Promise.all([
                inquiriesApi.getAll(),
                projectsApi.getAll().catch(() => ({ projects: [] })),
            ]);
            setLeads(inquiriesData.inquiries || []);
            setProjects(projectsData.projects || []);
        } catch (err: any) {
            console.error('Failed to fetch leads:', err);
            setError(err.message || 'Failed to load leads');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleInputChange = (field: string, value: string) => {
        setNewLead((prev) => ({ ...prev, [field]: value }));
    };

    const handleCreateLead = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const name = `${newLead.prefix ? newLead.prefix + ' ' : ''}${newLead.firstName} ${newLead.lastName}`.trim();
            const result = await inquiriesApi.submit({
                name,
                email: newLead.email || undefined,
                phone: newLead.phone,
                message: newLead.message || undefined,
                projectId: newLead.project || undefined,
                source: 'admin',
            });

            if (result.inquiry) {
                setLeads((prev) => [result.inquiry, ...prev]);
            }

            setIsAddDialogOpen(false);
            setNewLead({
                prefix: '',
                firstName: '',
                lastName: '',
                gender: '',
                nationality: '',
                maritalStatus: '',
                email: '',
                phone: '',
                project: '',
                message: '',
            });
            toast.success('Lead created successfully');
        } catch (err: any) {
            toast.error(err.message || 'Failed to create lead');
        }
    };

    const handleStatusChange = async (id: number, newStatus: string) => {
        try {
            await inquiriesApi.updateStatus(id, newStatus);
            setLeads((prev) =>
                prev.map((lead) => (lead.id === id ? { ...lead, status: newStatus } : lead))
            );
            toast.success('Status updated');
        } catch (err: any) {
            toast.error(err.message || 'Failed to update status');
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this lead?')) return;
        try {
            await inquiriesApi.delete(id);
            setLeads((prev) => prev.filter((l) => l.id !== id));
            toast.success('Lead deleted');
        } catch (err: any) {
            toast.error(err.message || 'Failed to delete lead');
        }
    };

    const getStatusBadge = (status: string) => {
        const styles: Record<string, string> = {
            new: 'bg-blue-100 text-blue-700',
            contacted: 'bg-green-100 text-green-700',
            closed: 'bg-gray-100 text-gray-700',
        };
        return styles[status] || 'bg-gray-100 text-gray-700';
    };

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    // Filter leads based on search and status
    const filteredLeads = leads.filter((lead) => {
        const matchesSearch =
            !searchTerm ||
            lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            lead.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            lead.phone.includes(searchTerm);
        const matchesStatus = !statusFilter || lead.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                <span className="ml-2 text-muted-foreground">Loading leads...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="space-y-6">
                <h1 className="text-3xl font-bold">Leads Management</h1>
                <Card className="border-destructive">
                    <CardContent className="pt-6">
                        <p className="text-destructive">⚠️ {error}</p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold">Leads Management</h1>
                    <p className="text-muted-foreground">
                        Track and manage your real estate inquiries ({leads.length} total)
                    </p>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <CardTitle>Leads Overview</CardTitle>
                        <div className="flex items-center gap-2">
                            <div className="relative">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search leads..."
                                    className="pl-8 w-[250px]"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v === 'all' ? '' : v)}>
                                <SelectTrigger className="w-[130px]">
                                    <Filter className="h-4 w-4 mr-2" />
                                    <SelectValue placeholder="Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Status</SelectItem>
                                    <SelectItem value="new">New</SelectItem>
                                    <SelectItem value="contacted">Contacted</SelectItem>
                                    <SelectItem value="closed">Closed</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    {filteredLeads.length === 0 ? (
                        <div className="py-8 text-center text-muted-foreground">
                            {leads.length === 0
                                ? 'No leads yet. They will appear here when customers contact you.'
                                : 'No leads matching your search criteria.'}
                        </div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Contact</TableHead>
                                    <TableHead>Source</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredLeads.map((lead) => (
                                    <TableRow key={lead.id}>
                                        <TableCell className="font-medium">{lead.name}</TableCell>
                                        <TableCell>
                                            <div className="text-sm">
                                                {lead.email && <div>{lead.email}</div>}
                                                <div className="text-muted-foreground">{lead.phone}</div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <span className="text-xs bg-muted px-2 py-1 rounded">
                                                {lead.source || 'website'}
                                            </span>
                                        </TableCell>
                                        <TableCell>{formatDate(lead.createdAt)}</TableCell>
                                        <TableCell>
                                            <Select
                                                value={lead.status}
                                                onValueChange={(v) => handleStatusChange(lead.id, v)}
                                            >
                                                <SelectTrigger className="w-[120px] h-8">
                                                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getStatusBadge(lead.status)}`}>
                                                        {lead.status}
                                                    </span>
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="new">New</SelectItem>
                                                    <SelectItem value="contacted">Contacted</SelectItem>
                                                    <SelectItem value="closed">Closed</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="text-destructive"
                                                onClick={() => handleDelete(lead.id)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default AdminLeads;
