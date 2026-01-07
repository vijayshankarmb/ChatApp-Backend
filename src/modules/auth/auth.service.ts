import { User } from "../user/user.model";

interface RegisterUserPayload {
    username: string;
    email: string;
    password: string;
}

interface LoginUserPayload {
    email: string;
    password: string;
}

export const registerUser = async (payload: RegisterUserPayload) => {

    const { username, email, password } = payload;

    const existingUser = await User.findOne(
        { $or: [{ username }, { email }] }
    );

    if (existingUser) {
        throw new Error("User already exists");
    }

    const user = await User.create(
        {
            username,
            email,
            password
        }
    );

    return {
        id: user._id, 
        username: user.username,
        email: user.email
    }

}

export const loginUser = async (payload: LoginUserPayload) => {

    const { email, password } = payload;

    const user = await User.findOne({ email });

    if (!user) {
        throw new Error("User not found");
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
        throw new Error("Invalid password");
    }

    return {
        id: user._id,
        username: user.username,
        email: user.email
    }

}