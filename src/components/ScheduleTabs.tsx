import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { ScheduleGrid } from "./ScheduleGrid";
import { GoogleSheetsService } from "@/services/GoogleSheetsService";

export const ScheduleTabs = () => {
  const [scheduleData, setScheduleData] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadSchedules = async () => {
      try {
        setLoading(true);
        const data = await GoogleSheetsService.fetchAllSchedules();
        setScheduleData(data);
        setError(null);
      } catch (err) {
        setError('Failed to load schedule data from Google Sheets');
        console.error('Error loading schedules:', err);
      } finally {
        setLoading(false);
      }
    };

    loadSchedules();
  }, []);

  if (loading) {
    return (
      <div className="w-full max-w-7xl mx-auto p-6">
        <div className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
            Skate Camp Bali 2025
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover the world on skates! Explore the culture, food and wonderful world of Bali.
          </p>
        </div>
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin mr-2" />
          <span>Loading schedules from Google Sheets...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-7xl mx-auto p-6">
        <div className="mb-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
            Skate Camp Bali 2025
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover the world on skates! Explore the culture, food and wonderful world of Bali.
          </p>
        </div>
        <div className="text-center py-12 text-destructive">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      <div className="mb-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
          Skate Camp Bali 2025
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Discover the world on skates! Explore the culture, food and wonderful world of Bali.
        </p>
      </div>

      <Tabs defaultValue="icp" className="space-y-8">
        <TabsList className="grid w-full grid-cols-3 lg:max-w-2xl mx-auto bg-muted/30 shadow-elegant border h-14 p-1">
        {Object.entries(scheduleData).map(([key, schedule]) => {
          const Icon = Calendar;
            return (
              <TabsTrigger 
                key={key} 
                value={key}
                className={cn(
                  "flex items-center gap-2 h-12 px-4 font-medium transition-all duration-300",
                  "text-foreground bg-background/50 border border-border/50 rounded-lg",
                  "hover:text-foreground hover:bg-background hover:border-border",
                  "hover:shadow-sm",
                  "data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-primary-glow data-[state=active]:text-primary-foreground",
                  "data-[state=active]:border-primary/20 data-[state=active]:shadow-primary"
                )}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline font-semibold">{schedule.title}</span>
                <span className="sm:hidden font-semibold">{schedule.badge}</span>
              </TabsTrigger>
            );
          })}
        </TabsList>

        {Object.entries(scheduleData).map(([key, schedule]) => (
          <TabsContent key={key} value={key} className="space-y-6 animate-fade-in">
            <div className="bg-card rounded-xl p-6 shadow-elegant border">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                <div className="flex items-center gap-4 mb-4 md:mb-0">
                  <div className="p-3 rounded-lg bg-gradient-to-r from-primary to-primary-glow">
                    <Calendar className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">{schedule.title}</h2>
                    <p className="text-muted-foreground">{schedule.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge 
                    variant="outline" 
                    className={cn(
                      "px-4 py-2 font-medium border-primary text-primary",
                      key === 'icp' && "border-primary text-primary",
                      key === 'path1' && "border-secondary text-secondary", 
                      key === 'kids' && "border-accent text-accent"
                    )}
                  >
                    {schedule.badge}
                  </Badge>
                  <div className="text-sm text-muted-foreground">
                    {schedule.dates}
                  </div>
                </div>
              </div>
              
              <ScheduleGrid sessions={schedule.sessions} scheduleType={key} />
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};