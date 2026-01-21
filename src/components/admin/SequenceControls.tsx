import { Button } from "@/components/ui/button";
import { Pause, Play, RotateCcw } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface SequenceControlsProps {
  sequenceId: string;
  status: string;
  onUpdate: () => void;
}

export function SequenceControls({ sequenceId, status, onUpdate }: SequenceControlsProps) {
  const handleAction = async (action: "pause" | "resume" | "reset") => {
    try {
      const { error } = await supabase.functions.invoke("update-drip-sequence", {
        body: { sequenceId, action },
      });

      if (error) throw error;

      toast.success(`Sequence ${action}d successfully`);
      onUpdate();
    } catch (error) {
      console.error(`Error ${action}ing sequence:`, error);
      toast.error(`Failed to ${action} sequence`);
    }
  };

  return (
    <div className="flex gap-1">
      {status === "active" && (
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => handleAction("pause")}
          title="Pause sequence"
        >
          <Pause className="h-4 w-4" />
        </Button>
      )}
      {status === "paused" && (
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => handleAction("resume")}
          title="Resume sequence"
        >
          <Play className="h-4 w-4" />
        </Button>
      )}
      {status !== "active" && (
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => handleAction("reset")}
          title="Reset sequence"
        >
          <RotateCcw className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
