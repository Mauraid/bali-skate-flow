import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";
import { ScheduleGrid } from "./ScheduleGrid";

const scheduleData = {
  icp: {
    title: "ICP Certification",
    icon: Trophy,
    description: "4-day intensive certification program",
    dates: "07-10 December 2025",
    badge: "Certification",
    sessions: [
      {
        date: "07.12.2025",
        sessions: [
          { time: "9:00-9:45", instructor: "Kris", session: "Mobile Yoga", type: "warmup" as const },
          { time: "10:00-11:00", instructor: "Si", session: "Urban Obstacles", type: "technique" as const },
          { time: "11:15-12:00", instructor: "Tomasz", session: "Skate Cross", type: "technique" as const },
          { time: "12:00-13:30", instructor: "", session: "Lunch", type: "break" as const },
          { time: "13:30-14:30", instructor: "Mike", session: "Edges", type: "technique" as const },
          { time: "14:45-15:45", instructor: "Mauraid", session: "Fundamentals", type: "learning" as const },
          { time: "16:00-17:00", instructor: "Tomy", session: "Speed Skating", type: "technique" as const },
          { time: "19:00", instructor: "All", session: "Evening Welcome Meal", type: "social" as const }
        ]
      },
      {
        date: "08.12.2025",
        sessions: [
          { time: "9:00-9:45", instructor: "Kris", session: "Mobile Yoga", type: "warmup" as const },
          { time: "10:00-11:00", instructor: "Si", session: "Urban Obstacles", type: "technique" as const },
          { time: "11:15-12:00", instructor: "Tomasz", session: "Skate Cross", type: "technique" as const },
          { time: "12:00-13:30", instructor: "", session: "Lunch", type: "break" as const },
          { time: "13:30-14:30", instructor: "Mike", session: "Edges", type: "technique" as const },
          { time: "14:45-15:45", instructor: "Mauraid", session: "Fundamentals", type: "learning" as const },
          { time: "16:00-17:00", instructor: "Tomy", session: "Speed Skating", type: "technique" as const }
        ]
      },
      {
        date: "09.12.2025",
        sessions: [
          { time: "9:00-9:45", instructor: "Kris", session: "Mobile Yoga", type: "warmup" as const },
          { time: "10:00-11:00", instructor: "Si", session: "Urban Obstacles", type: "technique" as const },
          { time: "11:15-12:00", instructor: "Tomasz", session: "Skate Cross", type: "technique" as const },
          { time: "12:00-13:30", instructor: "", session: "Lunch", type: "break" as const },
          { time: "13:30-14:30", instructor: "Mike", session: "Edges", type: "technique" as const },
          { time: "14:45-15:45", instructor: "Mauraid", session: "Fundamentals", type: "learning" as const },
          { time: "16:00-17:00", instructor: "Tomy", session: "Speed Skating", type: "technique" as const }
        ]
      },
      {
        date: "10.12.2025",
        sessions: [
          { time: "9:00-9:45", instructor: "Kris", session: "Mobile Yoga", type: "warmup" as const },
          { time: "10:00-11:00", instructor: "Si", session: "Urban Obstacles", type: "technique" as const },
          { time: "11:15-12:00", instructor: "Tomasz", session: "Skate Cross", type: "technique" as const },
          { time: "12:00-13:30", instructor: "", session: "Lunch", type: "break" as const },
          { time: "13:30-14:30", instructor: "Mike", session: "Edges", type: "technique" as const },
          { time: "14:45-15:45", instructor: "Mauraid", session: "Fundamentals", type: "learning" as const },
          { time: "16:00-17:00", instructor: "Tomy", session: "Speed Skating", type: "technique" as const },
          { time: "19:00", instructor: "All", session: "Gala", type: "social" as const },
          { time: "", instructor: "", session: "Culture Show", type: "social" as const }
        ]
      }
    ]
  },
  path1: {
    title: "Path 1 Schedule",
    icon: Calendar,
    description: "4-day adventure program",
    dates: "10-13 December 2025",
    badge: "Adventure",
    sessions: [
      {
        date: "10.12.2025",
        sessions: [
          { time: "9:00-9:45", instructor: "Kris", session: "Mobile Yoga", type: "warmup" as const },
          { time: "10:00-11:00", instructor: "Si", session: "Urban Obstacles", type: "technique" as const },
          { time: "11:15-12:00", instructor: "Tomasz", session: "Skate Cross", type: "technique" as const },
          { time: "12:00-13:30", instructor: "", session: "Lunch", type: "break" as const },
          { time: "13:30-14:30", instructor: "Mike", session: "Edges", type: "technique" as const },
          { time: "14:45-15:45", instructor: "Mauraid", session: "Fundamentals", type: "learning" as const },
          { time: "16:00-17:00", instructor: "Tomy", session: "Speed Skating", type: "technique" as const },
          { time: "19:00", instructor: "All", session: "Gala", type: "social" as const },
          { time: "", instructor: "", session: "Culture Show", type: "social" as const }
        ]
      },
      {
        date: "11.12.2025",
        sessions: [
          { time: "9:00-9:45", instructor: "Kris", session: "Mobile Yoga", type: "warmup" as const },
          { time: "10:00-11:00", instructor: "Si", session: "Urban Obstacles", type: "technique" as const },
          { time: "11:15-12:00", instructor: "Tomasz", session: "Skate Cross", type: "technique" as const },
          { time: "12:00-13:30", instructor: "", session: "Lunch", type: "break" as const },
          { time: "13:30-14:30", instructor: "Mike", session: "Edges", type: "technique" as const },
          { time: "14:45-15:45", instructor: "Mauraid", session: "Fundamentals", type: "learning" as const },
          { time: "16:00-17:00", instructor: "Tomy", session: "Speed Skating", type: "technique" as const },
          { time: "20:00", instructor: "", session: "Evening Skate Around the City", type: "adventure" as const }
        ]
      },
      {
        date: "12.12.2025",
        sessions: [
          { time: "9:00-9:45", instructor: "Kris", session: "Mobile Yoga", type: "warmup" as const },
          { time: "10:00-11:00", instructor: "Si", session: "Urban Obstacles", type: "technique" as const },
          { time: "11:15-12:00", instructor: "Tomasz", session: "Skate Cross", type: "technique" as const },
          { time: "12:00-13:30", instructor: "", session: "Lunch", type: "break" as const },
          { time: "13:30-14:30", instructor: "Mike", session: "Edges", type: "technique" as const },
          { time: "14:45-15:45", instructor: "Mauraid", session: "Fundamentals", type: "learning" as const },
          { time: "16:00-17:00", instructor: "Tomy", session: "Speed Skating", type: "technique" as const },
          { time: "17:00-17:30", instructor: "All", session: "Passport Stamp Collecting", type: "activity" as const },
          { time: "20:00", instructor: "", session: "Final Evening Together", type: "social" as const }
        ]
      },
      {
        date: "13.12.2025",
        sessions: [
          { time: "9:00-11:00", instructor: "All", session: "Morning Beach Skate", type: "adventure" as const },
          { time: "10:00-11:00", instructor: "All", session: "Final Goodbyes/Photos", type: "social" as const }
        ]
      }
    ]
  },
  kids: {
    title: "Kids Path Schedule",
    icon: Users,
    description: "3-day kids program",
    dates: "10-12 December 2025",
    badge: "Kids",
    sessions: [
      {
        date: "10.12.2025",
        sessions: [
          { time: "9:00-9:45", instructor: "Kris", session: "Mobile Yoga", type: "warmup" as const },
          { time: "10:00-11:00", instructor: "Si", session: "Urban Obstacles", type: "technique" as const },
          { time: "11:15-12:00", instructor: "Tomasz", session: "Skate Cross", type: "technique" as const },
          { time: "12:00-13:30", instructor: "", session: "Lunch", type: "break" as const },
          { time: "13:30-14:30", instructor: "Mike", session: "Edges", type: "technique" as const },
          { time: "14:45-15:45", instructor: "Mauraid", session: "Fundamentals", type: "learning" as const },
          { time: "16:00-17:00", instructor: "Tomy", session: "Speed Skating", type: "technique" as const },
          { time: "19:00", instructor: "All", session: "Gala", type: "social" as const },
          { time: "", instructor: "", session: "Culture Show", type: "social" as const }
        ]
      },
      {
        date: "11.12.2025",
        sessions: [
          { time: "9:00-9:45", instructor: "Kris", session: "Mobile Yoga", type: "warmup" as const },
          { time: "10:00-11:00", instructor: "Si", session: "Urban Obstacles", type: "technique" as const },
          { time: "11:15-12:00", instructor: "Tomasz", session: "Skate Cross", type: "technique" as const },
          { time: "12:00-13:30", instructor: "", session: "Lunch", type: "break" as const },
          { time: "13:30-14:30", instructor: "Mike", session: "Edges", type: "technique" as const },
          { time: "14:45-15:45", instructor: "Mauraid", session: "Fundamentals", type: "learning" as const },
          { time: "16:00-17:00", instructor: "Tomy", session: "Speed Skating", type: "technique" as const },
          { time: "20:00", instructor: "", session: "Evening Skate Around the City", type: "adventure" as const }
        ]
      },
      {
        date: "12.12.2025",
        sessions: [
          { time: "9:00-9:45", instructor: "Kris", session: "Mobile Yoga", type: "warmup" as const },
          { time: "10:00-11:00", instructor: "Si", session: "Urban Obstacles", type: "technique" as const },
          { time: "11:15-12:00", instructor: "Tomasz", session: "Skate Cross", type: "technique" as const },
          { time: "12:00-13:30", instructor: "", session: "Lunch", type: "break" as const },
          { time: "13:30-14:30", instructor: "Mike", session: "Edges", type: "technique" as const },
          { time: "14:45-15:45", instructor: "Mauraid", session: "Fundamentals", type: "learning" as const },
          { time: "16:00-17:00", instructor: "Tomy", session: "Speed Skating", type: "technique" as const },
          { time: "17:00-17:30", instructor: "All", session: "Passport Stamp Collecting", type: "activity" as const },
          { time: "20:00", instructor: "", session: "Final Evening Together", type: "social" as const }
        ]
      }
    ]
  }
};

export const ScheduleTabs = () => {
  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      <div className="mb-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-4">
          Skate Camp Bali 2025
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Discover the world on skates! Explore the culture, food and wonderful world of Bali.
        </p>
      </div>

      <Tabs defaultValue="icp" className="space-y-8">
        <TabsList className="grid w-full grid-cols-3 lg:max-w-lg mx-auto bg-card shadow-elegant border">
          {Object.entries(scheduleData).map(([key, schedule]) => {
            const Icon = schedule.icon;
            return (
              <TabsTrigger 
                key={key} 
                value={key}
                className={cn(
                  "flex items-center gap-2 data-[state=active]:bg-gradient-primary",
                  "data-[state=active]:text-primary-foreground transition-all duration-300"
                )}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{schedule.title}</span>
                <span className="sm:hidden">{schedule.badge}</span>
              </TabsTrigger>
            );
          })}
        </TabsList>

        {Object.entries(scheduleData).map(([key, schedule]) => (
          <TabsContent key={key} value={key} className="space-y-6 animate-fade-in">
            <div className="bg-card rounded-xl p-6 shadow-elegant border">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                <div className="flex items-center gap-4 mb-4 md:mb-0">
                  <div className="p-3 rounded-lg bg-gradient-primary">
                    <schedule.icon className="w-6 h-6 text-primary-foreground" />
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