import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Edit, Trash2, Eye, Loader2 } from 'lucide-react';
import { projectsApi, getImageUrl } from '@/services/cmsApi';
import { toast } from 'sonner';

interface Project {
  id: number;
  slug: string;
  name: string;
  subtitle?: string;
  location: string;
  price?: string;
  image?: string;
  description: string;
  configuration?: string;
  status: string;
  tag?: string;
  maharera?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

const AdminProjects = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const data = await projectsApi.getAll();
      setProjects(data.projects || []);
    } catch (err: any) {
      console.error('Failed to fetch projects:', err);
      setError(err.message || 'Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (id: number, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"? This action cannot be undone.`)) return;
    try {
      await projectsApi.delete(id);
      toast.success(`"${name}" deleted successfully`);
      setProjects((prev) => prev.filter((p) => p.id !== id));
    } catch (err: any) {
      toast.error(err.message || 'Failed to delete project');
    }
  };

  const handleStatusChange = async (project: Project, newStatus: string) => {
    try {
      const formData = new FormData();
      formData.append('status', newStatus);
      await projectsApi.update(project.id, formData);
      setProjects((prev) =>
        prev.map((p) => (p.id === project.id ? { ...p, status: newStatus } : p))
      );
      toast.success(`"${project.name}" status changed to ${newStatus}`);
    } catch (err: any) {
      toast.error(err.message || 'Failed to update status');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-500';
      case 'ongoing':
        return 'bg-blue-500';
      case 'planning':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  const statusCounts = {
    completed: projects.filter((p) => p.status.toLowerCase() === 'completed').length,
    ongoing: projects.filter((p) => p.status.toLowerCase() === 'ongoing').length,
    planning: projects.filter((p) => p.status.toLowerCase() === 'planning').length,
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        <span className="ml-2 text-muted-foreground">Loading projects...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Projects Management</h1>
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
          <h1 className="text-3xl font-bold">Projects Management</h1>
          <p className="text-muted-foreground">
            Manage your real estate projects ({projects.length} total)
          </p>
        </div>
        <Button onClick={() => navigate('/admin/projects/new')}>
          <Plus className="mr-2 h-4 w-4" />
          Add New Project
        </Button>
      </div>

      {/* Statistics Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="py-4 text-center">
            <div className="text-2xl font-bold text-primary">{projects.length}</div>
            <div className="text-sm text-muted-foreground">Total Projects</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="py-4 text-center">
            <div className="text-2xl font-bold text-green-600">{statusCounts.completed}</div>
            <div className="text-sm text-muted-foreground">Completed</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="py-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{statusCounts.ongoing}</div>
            <div className="text-sm text-muted-foreground">Ongoing</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="py-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">{statusCounts.planning}</div>
            <div className="text-sm text-muted-foreground">Planning</div>
          </CardContent>
        </Card>
      </div>

      {/* Project Cards */}
      {projects.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground mb-4">No projects found. Add your first project!</p>
            <Button onClick={() => navigate('/admin/projects/new')}>
              <Plus className="mr-2 h-4 w-4" />
              Add New Project
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card key={project.id} className="overflow-hidden">
              {project.image && (
                <div className="h-40 overflow-hidden">
                  <img
                    src={getImageUrl(project.image) || ''}
                    alt={project.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                </div>
              )}
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{project.name}</CardTitle>
                    <CardDescription>{project.location}</CardDescription>
                  </div>
                  {/* Status Dropdown */}
                  <Select
                    value={project.status}
                    onValueChange={(v) => handleStatusChange(project, v)}
                  >
                    <SelectTrigger className="w-[130px] h-8">
                      <Badge
                        variant="secondary"
                        className={`${getStatusColor(project.status)} text-white`}
                      >
                        {project.status}
                      </Badge>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ongoing">
                        <span className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-blue-500" />
                          Ongoing
                        </span>
                      </SelectItem>
                      <SelectItem value="completed">
                        <span className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-green-500" />
                          Completed
                        </span>
                      </SelectItem>
                      <SelectItem value="planning">
                        <span className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-yellow-500" />
                          Planning
                        </span>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {project.configuration && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Config:</span>
                      <span>{project.configuration}</span>
                    </div>
                  )}
                  {project.price && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Price:</span>
                      <span>{project.price}</span>
                    </div>
                  )}
                  {project.maharera && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">MahaRERA:</span>
                      <span className="truncate max-w-[150px]">{project.maharera}</span>
                    </div>
                  )}
                  <div className="flex justify-between pt-3 gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(`/project/${project.slug}`, '_blank')}
                    >
                      <Eye className="mr-1 h-3 w-3" />
                      View
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate(`/admin/projects/${project.id}`)}
                    >
                      <Edit className="mr-1 h-3 w-3" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-destructive hover:text-destructive"
                      onClick={() => handleDelete(project.id, project.name)}
                    >
                      <Trash2 className="mr-1 h-3 w-3" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminProjects;