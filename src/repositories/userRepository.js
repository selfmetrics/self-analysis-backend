import prisma from "../lib/prisma.js";

export const findUserById = async (id) => {
    return prisma.user.findFirst({
        where : { id, deletedAt : null }
    })
};

export const deleteUserById = async (id) => {
    return prisma.user.update({
        where : { id, deletedAt : null },
        data : {
            deletedAt : new Date(),
            email: `deleted_${id}_${Date.now()}`,
            providerId: `deleted_${id}_${Date.now()}`,
            nickname : null,
        }
    });
};

export const updateUserNickname = async (id, nickname) => {
    return prisma.user.update({
        where : { id, deletedAt : null },
        data : { nickname }
    });
};