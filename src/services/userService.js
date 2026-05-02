import { findUserById, deleteUserById, updateUserNickname } from "../repositories/userRepository";

export const getMyPage = async(userId) => {
    const user = await findUserById(userId);

    if (!user) {
        throw new Error("회원 정보 조회에 실패하였습니다.");
    }

    return {
        id : user.id,
        email : user.email,
        nickname : user.nickname
    };
};

export const deleteUser = async(userId) => {
    await deleteUserById(userId);

    return null;
};

export const updateNickname = async(userId, nickname) => {
    const user = await updateUserNickname(userId, nickname);

    return {
        nickname : user.nickname
    }
};