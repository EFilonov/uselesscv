// src/app/interfaces/clientData.interface.ts
import { Document } from '@contentful/rich-text-types';

/* ---- Main data interface ---- */
export interface clientData {
    name: string;
    occupation: string;
    profile: string;
    skills: SkillEntry[];
    languages: LanguageEntry[];
    educationSchool: string;
    educationYears: string;
    achievements: HistoryEntry[];
    address: string;
    phoneShort: string;
    phoneFull: string;
    emailShort: string;
    emailFull: string;
    nationality: string;
    coverLetter: Document; // ← Используем правильный тип из Contentful
}

/* ---- Generic helper types ---- */
export interface Metadata {
    tags: any[];
    concepts: any[];
}

export interface SysLink {
    type: string;
    linkType?: string;
    id?: string;
}

export interface Environment {
    sys: {
        id: string;
        type: string;
        linkType: string;
    };
}

export interface ContentType {
    sys: {
        type: string;
        linkType: string;
        id: string;
    };
}

export interface Sys {
    space: { sys: SysLink };
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    environment: Environment;
    publishedVersion: number;
    revision: number;
    contentType: ContentType;
    locale: string;
}

/* ---- Skills ---- */
export interface SkillEntry {
    metadata: Metadata;
    sys: Sys;
    fields: SkillFields;
}

export interface SkillFields {
    skillItem: string;
    skillPercentage: number;
}

/* ---- Languages ---- */
export interface LanguageEntry {
    metadata: Metadata;
    sys: Sys;
    fields: LanguageFields;
}

export interface LanguageFields {
    item: string;
    percentage: number;
}

/* ---- Employment / History / Achievements ---- */
export interface HistoryEntry {
    metadata: Metadata;
    sys: Sys;
    fields: HistoryFields;
}

export interface HistoryFields {
    title: string;
    company: string;
    date: string;
    achievements: string[];
}
