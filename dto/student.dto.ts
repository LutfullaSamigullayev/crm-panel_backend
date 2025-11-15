export interface AddStudentDto {
  full_name: string;
  phone_number: string;
  profession: string;
  parent_name: string;
  parent_number: string;
  img_url: string;
}

export interface UpdateStudentDto {
    full_name?: string;
    phone_number?: string;
    profession?: string;
    parent_name?: string;
    parent_number?: string;
    img_url?: string;
  }