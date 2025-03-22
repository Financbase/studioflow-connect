
export interface ContrastResult {
  ratio: number;
  compliance: {
    AA: boolean;
    AAA: boolean;
  };
  isAccessible: boolean;
}

export interface ColorPaletteVisualizerProps {
  colors: Record<string, string>;
}

export interface ColorCardProps {
  colorKey: string;
  colorValue: string;
  contrast: ContrastResult;
  backgroundColors: Record<string, string>;
}

export interface ExampleUsageProps {
  colorKey: string;
  colorValue: string;
  colors: Record<string, string>;
}

export interface UIPreviewProps {
  colors: Record<string, string>;
}
