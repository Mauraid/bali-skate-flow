interface ScheduleSession {
  time: string;
  instructor: string;
  name: string;
  type: 'theory' | 'practical' | 'assessment' | 'break';
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
      const name = values[3];
      const type = this.determineSessionType(name);
      
      if (!sessionsByDate[date]) {
        sessionsByDate[date] = [];
      }
      
      sessionsByDate[date].push({
        time,
        instructor,
        name,
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
    
    if (name.includes('break') || name.includes('lunch') || name.includes('coffee')) {
      return 'break';
    } else if (name.includes('assessment') || name.includes('test') || name.includes('exam')) {
      return 'assessment';
    } else if (name.includes('theory') || name.includes('lecture') || name.includes('presentation')) {
      return 'theory';
    } else {
      return 'practical';
    }
  }
}