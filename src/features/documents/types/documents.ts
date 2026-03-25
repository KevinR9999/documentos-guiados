export type FlowId =
  | 'strategic_manifesto'
  | 'ideal_client_manifesto'
  | 'inventory_of_self'
  | 'reels_scripts';

export type FieldType = 'text' | 'textarea' | 'select';

export interface FieldOption {
  label: string;
  value: string;
}

export interface FieldDefinition {
  id: string;
  label: string;
  type: FieldType;
  required?: boolean;
  placeholder?: string;
  helpText?: string;
  options?: FieldOption[];
}

export interface StepDefinition {
  id: string;
  title: string;
  description?: string;
  fields: FieldDefinition[];
}

export interface FlowDefinition {
  id: FlowId;
  title: string;
  description: string;
  estimatedMinutes: number;
  steps: StepDefinition[];
}