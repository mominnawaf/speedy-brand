export interface Topic {
    id: number;
    name: string;
    category: string; 
    description?: string;
    keywords: Array<string>;
    created_at?: Date;
    updated_at?: Date;
}