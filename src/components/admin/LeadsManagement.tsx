import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { RefreshCw, Users, ShoppingCart, Briefcase } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  lead_type: string;
  source: string | null;
  status: string | null;
  created_at: string;
  order_count: number;
  completed_orders: number;
}

export function LeadsManagement() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("get-leads");
      if (error) throw error;
      setLeads(data?.leads || []);
    } catch (error) {
      console.error("Error fetching leads:", error);
      toast.error("Failed to load leads");
    } finally {
      setLoading(false);
    }
  };

  const getLeadTypeBadge = (type: string) => {
    switch (type) {
      case "customer":
        return <Badge className="bg-green-500"><ShoppingCart className="w-3 h-3 mr-1" />Customer</Badge>;
      case "opportunity":
        return <Badge className="bg-purple-500"><Briefcase className="w-3 h-3 mr-1" />Opportunity</Badge>;
      default:
        return <Badge variant="secondary">{type}</Badge>;
    }
  };

  const getStatusBadge = (status: string | null) => {
    switch (status) {
      case "new":
        return <Badge variant="outline" className="border-blue-500 text-blue-600">New</Badge>;
      case "contacted":
        return <Badge variant="outline" className="border-yellow-500 text-yellow-600">Contacted</Badge>;
      case "converted":
        return <Badge variant="outline" className="border-green-500 text-green-600">Converted</Badge>;
      default:
        return <Badge variant="outline">{status || "Unknown"}</Badge>;
    }
  };

  const customerLeads = leads.filter(l => l.lead_type === "customer");
  const opportunityLeads = leads.filter(l => l.lead_type === "opportunity");

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Leads</p>
                <p className="text-3xl font-bold">{leads.length}</p>
              </div>
              <Users className="w-10 h-10 text-purple-500 opacity-50" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Customers</p>
                <p className="text-3xl font-bold">{customerLeads.length}</p>
              </div>
              <ShoppingCart className="w-10 h-10 text-green-500 opacity-50" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Opportunities</p>
                <p className="text-3xl font-bold">{opportunityLeads.length}</p>
              </div>
              <Briefcase className="w-10 h-10 text-purple-500 opacity-50" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Leads Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>All Leads</CardTitle>
          <Button variant="outline" size="sm" onClick={fetchLeads} disabled={loading}>
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </CardHeader>
        <CardContent>
          {leads.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No leads found</p>
              <p className="text-sm">Leads will appear here when visitors sign up</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Orders</TableHead>
                    <TableHead>Source</TableHead>
                    <TableHead>Created</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leads.map((lead) => (
                    <TableRow key={lead.id}>
                      <TableCell className="font-medium">{lead.name}</TableCell>
                      <TableCell className="text-muted-foreground">{lead.email}</TableCell>
                      <TableCell className="text-muted-foreground">{lead.phone || "-"}</TableCell>
                      <TableCell>{getLeadTypeBadge(lead.lead_type)}</TableCell>
                      <TableCell>{getStatusBadge(lead.status)}</TableCell>
                      <TableCell>
                        {lead.order_count > 0 ? (
                          <span className="font-medium">
                            {lead.completed_orders}/{lead.order_count}
                          </span>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell className="text-muted-foreground capitalize">
                        {lead.source || "website"}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {format(new Date(lead.created_at), "MMM d, yyyy")}
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
}
