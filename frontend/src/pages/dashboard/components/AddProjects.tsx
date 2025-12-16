import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import Input from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { createProject, Project, CreateProjectPayload } from '@/lib/api';
import { useState } from 'react';

// Validation for Google Play app ID format
const googlePlayIdRegex = /^[a-zA-Z][a-zA-Z0-9_]*(\.[a-zA-Z][a-zA-Z0-9_]*)+$/;

// Validation for App Store ID format (numeric)
const appStoreIdRegex = /^\d{6,15}$/;

const formSchema = z.object({
  name: z.string().min(3, "Project name must be at least 3 characters").max(100),
  platform: z.enum(['app_store', 'play_store']),
  appId: z.string().min(2, "App ID is required"),
  description: z.string().max(500).optional()
}).refine((data) => {
  if (data.platform === 'play_store') {
    return googlePlayIdRegex.test(data.appId);
  } else {
    return appStoreIdRegex.test(data.appId);
  }
}, {
  message: "Invalid app ID format",
  path: ["appId"]
});

interface AddProjectProps {
  onSuccess: (project: Project) => void;
  onClose: () => void;
}

const AddProject = ({ onSuccess, onClose }: AddProjectProps) => {
  const [loading, setLoading] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      platform: "play_store" as const,
      appId: "",
      description: ""
    }
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      
      const payload: CreateProjectPayload = {
        name: values.name,
        description: values.description || undefined,
        [values.platform === 'play_store' 
            ? 'google_play_app_id' 
            : 'app_store_app_id']: values.appId
      };
    
      const newProject = await createProject(payload);
      onSuccess(newProject);
      toast.success('Project created successfully!');
      form.reset();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to create project';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-8">New Project Setup</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project Name</FormLabel>
                <FormControl>
                  <Input placeholder="My Awesome App" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="platform"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Platform</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select platform" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="play_store">
                      Google Play Store
                    </SelectItem>
                    <SelectItem value="app_store">Apple App Store</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="appId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>App ID</FormLabel>
                <FormControl>
                  <Input placeholder="com.example.myapp" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description (Optional)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe your project..."
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create Project"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddProject;