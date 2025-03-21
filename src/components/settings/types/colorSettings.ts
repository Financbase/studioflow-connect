
export type ColorKey = 
  | "background" 
  | "foreground" 
  | "card" 
  | "card-foreground" 
  | "primary" 
  | "primary-foreground" 
  | "secondary" 
  | "secondary-foreground" 
  | "muted" 
  | "muted-foreground" 
  | "accent" 
  | "accent-foreground" 
  | "border" 
  | "input" 
  | "ring" 
  | "destructive" 
  | "destructive-foreground";

export interface ColorSetting {
  name: string;
  key: ColorKey;
  value: string;
  description: string;
}
