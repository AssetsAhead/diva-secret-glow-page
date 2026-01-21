import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Lock, RefreshCw, LogOut, Mail, Users } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";

const ADMIN_PASSWORD = "DivaAdmin2024!";

interface DripSequence {
  id: string;
  lead_id: string;
  sequence_type: string;
  current_step: number;
  status: string;
  started_at: string;
  next_send_at: string;
  completed_at: string | null;
  lead?: {
    name: string;
    email: string;
  };
}

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [sequences, setSequences] = useState<DripSequence[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const authStatus = sessionStorage.getItem("admin_authenticated");
    if (authStatus === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchSequences();
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem("admin_authenticated", "true");
      toast.success("Welcome to Admin Dashboard");
    } else {
      toast.error("Invalid password");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("admin_authenticated");
    setPassword("");
    navigate("/");
  };

  const fetchSequences = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("get-drip-sequences");
      
      if (error) throw error;
      
      setSequences(data?.sequences || []);
    } catch (error) {
      console.error("Error fetching sequences:", error);
      toast.error("Failed to load drip sequences");
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Active</Badge>;
      case "completed":
        return <Badge className="bg-blue-500">Completed</Badge>;
      case "paused":
        return <Badge className="bg-yellow-500">Paused</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getSequenceTypeBadge = (type: string) => {
    switch (type) {
      case "customer_welcome":
        return <Badge variant="outline" className="border-purple-500 text-purple-600">Customer</Badge>;
      case "opportunity_nurture":
        return <Badge variant="outline" className="border-pink-500 text-pink-600">Opportunity</Badge>;
      default:
        return <Badge variant="outline">{type}</Badge>;
    }
  };

  const getTotalSteps = (type: string) => {
    return type === "opportunity_nurture" ? 4 : 7;
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
              <Lock className="w-6 h-6 text-purple-600" />
            </div>
            <CardTitle>Admin Dashboard</CardTitle>
            <p className="text-muted-foreground text-sm">Enter password to access</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                type="password"
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-pink-600">
                Access Dashboard
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img 
              src="/lovable-uploads/31d847f2-6d21-4c6b-bf8f-34eabd0a5cc7.png" 
              alt="Diva Secret" 
              className="h-10 w-auto"
            />
            <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Sequences</p>
                  <p className="text-3xl font-bold">{sequences.length}</p>
                </div>
                <Mail className="w-10 h-10 text-purple-500 opacity-50" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Sequences</p>
                  <p className="text-3xl font-bold">
                    {sequences.filter(s => s.status === "active").length}
                  </p>
                </div>
                <Users className="w-10 h-10 text-green-500 opacity-50" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Completed</p>
                  <p className="text-3xl font-bold">
                    {sequences.filter(s => s.status === "completed").length}
                  </p>
                </div>
                <Mail className="w-10 h-10 text-blue-500 opacity-50" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Drip Sequences Table */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Drip Sequences</CardTitle>
            <Button variant="outline" size="sm" onClick={fetchSequences} disabled={loading}>
              <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </Button>
          </CardHeader>
          <CardContent>
            {sequences.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <Mail className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No drip sequences found</p>
                <p className="text-sm">Sequences will appear here when leads sign up</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Lead Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Sequence Type</TableHead>
                      <TableHead>Progress</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Next Send</TableHead>
                      <TableHead>Started</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sequences.map((seq) => (
                      <TableRow key={seq.id}>
                        <TableCell className="font-medium">
                          {seq.lead?.name || "Unknown"}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {seq.lead?.email || "-"}
                        </TableCell>
                        <TableCell>{getSequenceTypeBadge(seq.sequence_type)}</TableCell>
                        <TableCell>
                          <span className="font-medium">
                            Step {seq.current_step} / {getTotalSteps(seq.sequence_type)}
                          </span>
                        </TableCell>
                        <TableCell>{getStatusBadge(seq.status)}</TableCell>
                        <TableCell>
                          {seq.status === "completed" 
                            ? "-" 
                            : format(new Date(seq.next_send_at), "MMM d, HH:mm")}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {format(new Date(seq.started_at), "MMM d, yyyy")}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
