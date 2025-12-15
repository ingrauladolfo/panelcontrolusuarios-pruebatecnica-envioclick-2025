export const isPublic = (path: string) => {
    const publicPaths = ['/login'];
    return publicPaths.includes(path);
};
