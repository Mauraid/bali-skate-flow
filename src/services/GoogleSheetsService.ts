interface ScheduleSession {
  time: string;
  instructor: string;
  session: string; // Changed from 'name' to 'session' to match ScheduleGrid
  type: 'warmup' | 'technique' | 'learning' | 'break' | 'social' | 'adventure' | 'activity';
}

interface DaySession {
  date: string;
  sessions: ScheduleSession[];
}

interface ScheduleData {
  title: string;
  icon: string;
  description: string;
  dates: string;
  badge: string;
  sessions: DaySession[];
}

const SHEET_URLS = {
  icp: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSqRHc06sDjAFqbu41pzeJK0QHB9YSovLUaRhBu7tbsMcpiZJgH-JAOuJUi-Omy8-6TUdDeGNp0-RXg/pub?gid=0&single=true&output=csv',
  path1: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSqRHc06sDjAFqbu41pzeJK0QHB9YSovLUaRhBu7tbsMcpiZJgH-JAOuJUi-Omy8-6TUdDeGNp0-RXg/pub?gid=122183591&single=true&output=csv',
  kids: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSqRHc06sDjAFqbu41pzeJK0QHB9YSovLUaRhBu7tbsMcpiZJgH-JAOuJUi-Omy8-6TUdDeGNp0-RXg/pub?gid=1377983576&single=true&output=csv'
};

export class GoogleSheetsService {
  static async fetchScheduleData(scheduleType: keyof typeof SHEET_URLS): Promise<ScheduleData> {
    try {
      const response = await fetch(SHEET_URLS[scheduleType]);
      if (!response.ok) {
        throw new Error(`Failed to fetch ${scheduleType} schedule`);
      }
      
      const csvText = await response.text();
      return this.parseCSVToSchedule(csvText, scheduleType);
    } catch (error) {
      console.error(`Error fetching ${scheduleType} schedule:`, error);
      throw error;
    }
  }

  static async fetchAllSchedules(): Promise<Record<string, ScheduleData>> {
    try {
      const [icpData, path1Data, kidsData] = await Promise.all([
        this.fetchScheduleData('icp'),
        this.fetchScheduleData('path1'),
        this.fetchScheduleData('kids')
      ]);

      return {
        icp: icpData,
        path1: path1Data,
        kids: kidsData
      };
    } catch (error) {
      console.error('Error fetching all schedules:', error);
      throw error;
    }
  }

  private static parseCSVToSchedule(csvText: string, scheduleType: keyof typeof SHEET_URLS): ScheduleData {
    const lines = csvText.split('\n').filter(line => line.trim());
    const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
    
    // Default metadata based on schedule type
    const metadata = this.getScheduleMetadata(scheduleType);
    
    // Parse sessions by date
    const sessionsByDate: Record<string, ScheduleSession[]> = {};
    
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map(v => v.trim().replace(/"/g, ''));
      
      if (values.length < 4) continue; // Skip incomplete rows
      
      const date = values[0];
      const time = values[1];
      const instructor = values[2];
      const session = values[3]; // Changed from 'name' to 'session'
      const type = this.determineSessionType(session);
      
      if (!date || date === '') continue; // Skip empty dates
      
      if (!sessionsByDate[date]) {
        sessionsByDate[date] = [];
      }
      
      sessionsByDate[date].push({
        time,
        instructor,
        session, // Changed from 'name' to 'session'
        type
      });
    }
    
    // Convert to DaySession array
    const sessions: DaySession[] = Object.entries(sessionsByDate).map(([date, sessions]) => ({
      date,
      sessions
    }));
    
    return {
      ...metadata,
      sessions
    };
  }

  private static getScheduleMetadata(scheduleType: keyof typeof SHEET_URLS) {
    const metadata = {
      icp: {
        title: "ICP Certification",
        icon: "Calendar",
        description: "International Coaching Pathway - Complete certification program",
        dates: "Dynamic dates from Google Sheets",
        badge: "Certification"
      },
      path1: {
        title: "Path 1 Schedule",
        icon: "Calendar", 
        description: "Intermediate level coaching pathway",
        dates: "Dynamic dates from Google Sheets",
        badge: "Path 1"
      },
      kids: {
        title: "Kids Path Schedule",
        icon: "Calendar",
        description: "Youth development program",
        dates: "Dynamic dates from Google Sheets", 
        badge: "Kids"
      }
    };
    
    return metadata[scheduleType];
  }

  private static determineSessionType(sessionName: string): ScheduleSession['type'] {
    const name = sessionName.toLowerCase();
    
    if (name.includes('lunch') || name.includes('break') || name.includes('coffee') || name.includes('meal')) {
      return 'break';
    } else if (name.includes('yoga') || name.includes('warm') || name.includes('stretch')) {
      return 'warmup';
    } else if (name.includes('edge') || name.includes('fundamental') || name.includes('technique') || name.includes('speed')) {
      return 'technique';
    } else if (name.includes('obstacle') || name.includes('cross') || name.includes('skate')) {
      return 'learning';
    } else if (name.includes('gala') || name.includes('evening') || name.includes('culture') || name.includes('final') || name.includes('goodbye')) {
      return 'social';
    } else if (name.includes('beach') || name.includes('city') || name.includes('around')) {
      return 'adventure';
    } else {
      return 'activity';
    }
  }
}