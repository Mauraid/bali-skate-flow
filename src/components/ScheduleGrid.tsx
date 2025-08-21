import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronUp, Clock, User, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

interface Session {
  time: string;
  instructor: string;
  session: string;
  type: 'warmup' | 'technique' | 'learning' | 'break' | 'social' | 'adventure' | 'activity';
}

interface DaySession {
  date: string;
  sessions: Session[];
}

interface ScheduleGridProps {
  sessions: DaySession[];
  scheduleType: string;
}

const getTypeColor = (type: Session['type']) => {
  switch (type) {
    case 'warmup':
      return 'border-secondary text-secondary bg-secondary/10';
    case 'technique':
      return 'border-primary text-primary bg-primary/10';
    case 'learning':
      return 'border-accent text-accent bg-accent/10';
    case 'break':
      return 'border-muted text-muted bg-muted/10';
    case 'social':
      return 'border-accent text-accent bg-accent/10';
    case 'adventure':
      return 'border-secondary text-secondary bg-secondary/10';
    case 'activity':
      return 'border-primary text-primary bg-primary/10';
    default:
      return 'border-muted text-muted bg-muted/10';
  }
};

const getTypeIcon = (type: Session['type']) => {
  switch (type) {
    case 'warmup':
      return '🧘‍♀️';
    case 'technique':
      return '🛼';
    case 'learning':
      return '📚';
    case 'break':
      return '🍽️';
    case 'social':
      return '🎉';
    case 'adventure':
      return '🌅';
    case 'activity':
      return '🎯';
    default:
      return '📅';
  }
};

const SessionCard = ({ session, isExpanded, onToggle }: { 
  session: Session; 
  isExpanded: boolean; 
  onToggle: () => void; 
}) => {
  const hasDetails = session.instructor || session.time;
  
  return (
    <Card 
      className={cn(
        "transition-all duration-300 hover:shadow-primary cursor-pointer",
        "border-l-4 hover:scale-[1.02] group",
        session.type === 'technique' && "border-l-primary",
        session.type === 'warmup' && "border-l-secondary",
        session.type === 'learning' && "border-l-accent",
        session.type === 'break' && "border-l-muted",
        session.type === 'social' && "border-l-accent",
        session.type === 'adventure' && "border-l-secondary",
        session.type === 'activity' && "border-l-primary",
        isExpanded && "shadow-elegant"
      )}
      onClick={hasDetails ? onToggle : undefined}
    >
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1">
            <div className="text-xl">{getTypeIcon(session.type)}</div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                  {session.session}
                </h4>
                {session.type !== 'break' && (
                  <Badge variant="outline" className={getTypeColor(session.type)}>
                    {session.type}
                  </Badge>
                )}
              </div>
              {session.time && (
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  {session.time}
                </div>
              )}
            </div>
          </div>
          {hasDetails && (
            <div className="flex items-center gap-2 text-muted-foreground">
              {isExpanded ? (
                <ChevronUp className="w-4 h-4 transition-transform group-hover:text-primary" />
              ) : (
                <ChevronDown className="w-4 h-4 transition-transform group-hover:text-primary" />
              )}
            </div>
          )}
        </div>

        {isExpanded && hasDetails && (
          <div className="mt-4 pt-4 border-t space-y-3 animate-slide-in">
            {session.instructor && (
              <div className="flex items-center gap-2 text-sm">
                <User className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">Instructor:</span>
                <span className="font-medium text-foreground">{session.instructor}</span>
              </div>
            )}
            {session.time && (
              <div className="flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4 text-secondary" />
                <span className="text-muted-foreground">Duration:</span>
                <span className="font-medium text-foreground">{session.time}</span>
              </div>
            )}
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="w-4 h-4 text-accent" />
              <span className="text-muted-foreground">Location:</span>
              <span className="font-medium text-foreground">
                {session.type === 'break' ? 'Dining Area' : 
                 session.type === 'social' ? 'Common Area' :
                 session.type === 'adventure' ? 'Around Bali' : 'Training Ground'}
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const DaySchedule = ({ daySession }: { daySession: DaySession }) => {
  const [expandedSessions, setExpandedSessions] = useState<Set<number>>(new Set());

  const toggleSession = (index: number) => {
    const newExpanded = new Set(expandedSessions);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedSessions(newExpanded);
  };

  const formatDate = (dateStr: string) => {
    const [day, month, year] = dateStr.split('.');
    const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    return {
      day: date.toLocaleDateString('en-US', { weekday: 'long' }),
      date: date.toLocaleDateString('en-US', { day: 'numeric', month: 'long' })
    };
  };

  const { day, date } = formatDate(daySession.date);

  return (
    <div className="space-y-4">
      <div className="text-center md:text-left">
        <h3 className="text-xl font-bold text-foreground">{day}</h3>
        <p className="text-muted-foreground">{date}</p>
      </div>
      
      <div className="grid gap-3">
        {daySession.sessions.map((session, index) => (
          <SessionCard
            key={index}
            session={session}
            isExpanded={expandedSessions.has(index)}
            onToggle={() => toggleSession(index)}
          />
        ))}
      </div>
    </div>
  );
};

export const ScheduleGrid = ({ sessions }: ScheduleGridProps) => {
  return (
    <div className="grid gap-8 md:gap-12">
      {sessions.map((daySession, index) => (
        <DaySchedule key={index} daySession={daySession} />
      ))}
    </div>
  );
};