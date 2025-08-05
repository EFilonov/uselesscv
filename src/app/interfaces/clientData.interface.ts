export interface ContactInfo {
    short: string;
    full: string;
}

export interface Skill {
    item: string;
    percentage: number;
}

export interface Language {
    item: string;
    percentage: number;
}

export interface EmploymentHistory {
    title: string;
    company: string;
    date: string;
    achievements: string[];
}

export interface Education {
    school: string;
    years: string;
}

export interface clientData {
    name: string;
    occupation: string;
    address: string;
    phone: ContactInfo;
    email: ContactInfo;
    nationality: string;
    skills: Skill[];
    languages: Language[];
    profile: string;
    ehistory: EmploymentHistory[];
    education: Education;
}
