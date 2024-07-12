import { RoleDto } from "./role-dto.enum";

export interface UserDto {
    username: String;
    roles: RoleDto[];
    active: boolean;
}
