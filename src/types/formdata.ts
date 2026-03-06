export interface InputData {
  title: string;
  date: string;
  description: string;
}

export interface EventData extends InputData {
  id?: string;
}

export interface EventFormProps {
  prefilled: EventData | string | null;
  onSave: (data: InputData, e: React.SubmitEvent<HTMLFormElement>) => void;
  onClose: () => void;
}