import {User} from "../entities/user.entity";
import {IsString} from "class-validator";

export class UserDto implements Readonly<UserDto> {
    id: string

    @IsString()
    username: string

    @IsString()
    password: string

    @IsString()
    confirmPassword: string

    @IsString()
    firstName: string

    @IsString()
    lastName: string

    createdAt: Date
    updatedAt: Date

    public static from(dto: Partial<UserDto>) {
        const user = new UserDto();
        user.id = dto.id
        user.username = dto.username;
        user.firstName = dto.firstName
        user.lastName = dto.lastName
        user.createdAt = dto.createdAt
        user.updatedAt = dto.updatedAt
        return user;
    }

    public static fromEntity(user: User) {
        return this.from({
            id: user.id,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        })
    }

    public toEntity() {
        const newUser = new User()
        newUser.id = this.id
        newUser.username = this.username;
        newUser.password = this.password
        newUser.hashPassword()
        newUser.firstName = this.firstName;
        newUser.lastName = this.lastName;
        newUser.createdAt = this.createdAt;
        newUser.updatedAt = this.updatedAt;
        return newUser;
    }
}