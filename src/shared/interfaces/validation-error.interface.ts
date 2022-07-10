export interface ValidationError {
  recover?: boolean;
  message: string;
  property: string;
  continue?: boolean;
}
