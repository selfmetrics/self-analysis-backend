import { getMyPage, deleteUser, updateNickname } from "../services/userService.js";
import { success } from "../utils/responses.js";

export const myPage = async(req, res, next) => {
    try {
        const result = await getMyPage(req.userId);

        return success(result, "회원 정보에 성공하였습니다.");
    } catch (err) {
        next(err);
    }
};

export const deleteAccount = async(req, res, next) => {
    try {
        const result = await deleteUser(req.userId);

        return success(result, "회원 탈퇴에 성공하였습니다.");
    } catch (err) {
        next(err);
    }
};

export const nameChange = async(req, res, next) => {
    try {
        const { nickname } = req.body;

        const result = await updateNickname(req.userid, nickname);

        return success(result, "닉네임 변경에 성공하였습니다.");
    } catch (err) {
        next(err);
    }
};

