// UsersStore.ts
import type { User } from "./User";

export interface UsersStore {
    users: User[];
    currentPage: number;
    itemsPerPage: number;
    nationalities: string[];
    gender: string;
    nationality: string;
    age: number;
    getUsers: () => void;
    getNationalities: () => void;
    handlePageChange: (page: any) => void;
    handleItemsPerPageChange: (e: any) => void;
    handleGenderChange: (e: any) => void;
    handleNationalityChange: (e: any) => void;
    handleAgeChange: (e: any) => void;
    resetFilters: () => void;
    renderPageNumbers: (pages: number, currentPage: number) => (number | string)[];
}