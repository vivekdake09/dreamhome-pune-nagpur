
import React, { useState } from 'react';
import { Check, X, Clock, Calendar, Phone, Mail } from 'lucide-react';
import { format } from 'date-fns';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SiteVisit, updateSiteVisitStatus } from '@/services/siteVisitService';
import { toast } from 'sonner';

interface SiteVisitsListProps {
  visits: SiteVisit[];
  onStatusChange: () => void;
  isLoading: boolean;
}

const SiteVisitsList: React.FC<SiteVisitsListProps> = ({ 
  visits, 
  onStatusChange,
  isLoading 
}) => {
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  
  const handleStatusChange = async (id: string, status: SiteVisit['status']) => {
    try {
      setUpdatingId(id);
      await updateSiteVisitStatus(id, status);
      toast.success('Status updated successfully');
      onStatusChange();
    } catch (error: any) {
      toast.error('Failed to update status', {
        description: error.message
      });
    } finally {
      setUpdatingId(null);
    }
  };
  
  const getStatusBadge = (status: SiteVisit['status']) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">Pending</Badge>;
      case 'confirmed':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">Confirmed</Badge>;
      case 'completed':
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">Completed</Badge>;
      case 'cancelled':
        return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300">Cancelled</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <div className="text-center text-foreground">Loading site visit requests...</div>
      </div>
    );
  }

  if (visits.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No site visit requests found.
      </div>
    );
  }
  
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Visitor</TableHead>
            <TableHead>Property</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Schedule</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {visits.map((visit) => (
            <TableRow key={visit.id}>
              <TableCell className="font-medium">{visit.visitor_name}</TableCell>
              <TableCell>{visit.property_name}</TableCell>
              <TableCell>
                <div className="flex flex-col text-sm">
                  <span className="flex items-center gap-1">
                    <Phone className="h-3 w-3" /> {visit.visitor_phone}
                  </span>
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <Mail className="h-3 w-3" /> {visit.visitor_email}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col text-sm">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" /> {visit.visit_date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" /> {visit.visit_time}
                  </span>
                </div>
              </TableCell>
              <TableCell>{getStatusBadge(visit.status)}</TableCell>
              <TableCell className="text-right">
                <Select 
                  defaultValue={visit.status} 
                  onValueChange={(value) => {
                    handleStatusChange(visit.id, value as SiteVisit['status']);
                  }}
                  disabled={updatingId === visit.id}
                >
                  <SelectTrigger className="w-[130px]">
                    <SelectValue placeholder="Change status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="confirmed">Confirm</SelectItem>
                    <SelectItem value="completed">Complete</SelectItem>
                    <SelectItem value="cancelled">Cancel</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default SiteVisitsList;
