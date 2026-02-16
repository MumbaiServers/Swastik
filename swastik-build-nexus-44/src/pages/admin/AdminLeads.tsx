
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Plus, Search, Filter, MoreVertical, Edit, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

const AdminLeads = () => {
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [leads, setLeads] = useState([
        {
            id: 1,
            name: 'John Doe',
            prefix: 'Mr.',
            email: 'john@example.com',
            phone: '+91 9876543210',
            status: 'New',
            project: 'Swastik Elite',
            date: '2024-03-20'
        },
        {
            id: 2,
            name: 'Jane Smith',
            prefix: 'Mrs.',
            email: 'jane@example.com',
            phone: '+91 9876543211',
            status: 'Contacted',
            project: 'Swastik Heights',
            date: '2024-03-19'
        }
    ]);

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
        message: ''
    });

    const handleInputChange = (field: string, value: string) => {
        setNewLead(prev => ({ ...prev, [field]: value }));
    };

    const handleCreateLead = (e: React.FormEvent) => {
        e.preventDefault();
        const lead = {
            id: leads.length + 1,
            name: `${newLead.firstName} ${newLead.lastName}`,
            prefix: newLead.prefix,
            email: newLead.email,
            phone: newLead.phone,
            status: 'New',
            project: newLead.project || 'General Inquiry',
            date: new Date().toISOString().split('T')[0]
        };
        setLeads([lead, ...leads]);
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
            message: ''
        });
        toast.success('Lead created successfully');
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold">Leads Management</h1>
                    <p className="text-muted-foreground">
                        Track and manage your real estate inquiries
                    </p>
                </div>

                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Add New Lead
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>Add New Lead</DialogTitle>
                            <DialogDescription>
                                Enter the details of the new lead/inquiry.
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleCreateLead} className="space-y-6 py-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="prefix">Prefix</Label>
                                    <Select onValueChange={(v) => handleInputChange('prefix', v)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Prefix" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Mr.">Mr.</SelectItem>
                                            <SelectItem value="Mrs.">Mrs.</SelectItem>
                                            <SelectItem value="Ms.">Ms.</SelectItem>
                                            <SelectItem value="Dr.">Dr.</SelectItem>
                                            <SelectItem value="Prof.">Prof.</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2 md:col-span-1">
                                    <Label htmlFor="firstName">First Name</Label>
                                    <Input
                                        id="firstName"
                                        placeholder="First Name"
                                        required
                                        value={newLead.firstName}
                                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2 md:col-span-1">
                                    <Label htmlFor="lastName">Last Name</Label>
                                    <Input
                                        id="lastName"
                                        placeholder="Last Name"
                                        required
                                        value={newLead.lastName}
                                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="gender">Gender</Label>
                                    <Select onValueChange={(v) => handleInputChange('gender', v)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Gender" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Male">Male</SelectItem>
                                            <SelectItem value="Female">Female</SelectItem>
                                            <SelectItem value="Other">Other</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="nationality">Nationality</Label>
                                    <Select onValueChange={(v) => handleInputChange('nationality', v)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Nationality" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Indian">Indian</SelectItem>
                                            <SelectItem value="NRI">NRI</SelectItem>
                                            <SelectItem value="Foreign National">Foreign National</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="maritalStatus">Marital Status</Label>
                                    <Select onValueChange={(v) => handleInputChange('maritalStatus', v)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Single">Single</SelectItem>
                                            <SelectItem value="Married">Married</SelectItem>
                                            <SelectItem value="Divorced">Divorced</SelectItem>
                                            <SelectItem value="Widowed">Widowed</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email ID</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="email@example.com"
                                        required
                                        value={newLead.email}
                                        onChange={(e) => handleInputChange('email', e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Contact Number</Label>
                                    <Input
                                        id="phone"
                                        placeholder="+91 00000 00000"
                                        required
                                        value={newLead.phone}
                                        onChange={(e) => handleInputChange('phone', e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="project">Interested Project</Label>
                                <Select onValueChange={(v) => handleInputChange('project', v)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Project" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Swastik Elite">Swastik Elite</SelectItem>
                                        <SelectItem value="Swastik Heights">Swastik Heights</SelectItem>
                                        <SelectItem value="Swastik Grandeur">Swastik Grandeur</SelectItem>
                                        <SelectItem value="Swastik Crown">Swastik Crown</SelectItem>
                                        <SelectItem value="Swastik Palace">Swastik Palace</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="message">Message/Notes</Label>
                                <Textarea
                                    id="message"
                                    placeholder="Additional information..."
                                    value={newLead.message}
                                    onChange={(e) => handleInputChange('message', e.target.value)}
                                />
                            </div>

                            <DialogFooter>
                                <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                                    Cancel
                                </Button>
                                <Button type="submit">Create Lead</Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
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
                                />
                            </div>
                            <Button variant="outline" size="icon">
                                <Filter className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Contact</TableHead>
                                <TableHead>Project</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {leads.map((lead) => (
                                <TableRow key={lead.id}>
                                    <TableCell className="font-medium">
                                        {lead.prefix && `${lead.prefix} `}{lead.name}
                                    </TableCell>
                                    <TableCell>
                                        <div className="text-sm">
                                            <div>{lead.email}</div>
                                            <div className="text-muted-foreground">{lead.phone}</div>
                                        </div>
                                    </TableCell>
                                    <TableCell>{lead.project}</TableCell>
                                    <TableCell>{lead.date}</TableCell>
                                    <TableCell>
                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${lead.status === 'New' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                                            }`}>
                                            {lead.status}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="icon">
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="text-destructive">
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
};

export default AdminLeads;
