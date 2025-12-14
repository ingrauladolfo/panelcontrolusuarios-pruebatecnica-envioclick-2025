// useUsersStore.ts
import type { UsersStore } from "@/common/interfaces";
import { create } from "zustand";

export const useUsersStore = create<UsersStore>((set, get) => ({
    users: [],
    currentPage: 1,
    itemsPerPage: 10,
    nationalities: [],
    gender: '',
    nationality: '',
    age: 0,

    getUsers: () => {
        const users = localStorage.getItem('users');
        if (users) {
            set({ users: JSON.parse(users) });
        }
    },

    getNationalities: () => {
        const nationalities = localStorage.getItem('userNationalities');
        if (nationalities) {
            set({ nationalities: JSON.parse(nationalities) });
        }
    },

    handlePageChange: (page: any) => {
        if (page !== '...') {
            set({ currentPage: page });
        }
    },

    handleItemsPerPageChange: (e: any) => {
        set({ itemsPerPage: parseInt(e.target.value), currentPage: 1 });
    },

    handleGenderChange: (e: any) => {
        set({ gender: e.target.value, currentPage: 1 });
    },

    handleNationalityChange: (e: any) => {
        set({ nationality: e.target.value, currentPage: 1 });
    },

    handleAgeChange: (e: any) => {
        set({ age: parseInt(e.target.value), currentPage: 1 });
    },

    resetFilters: () => {
        set({ gender: '', nationality: '', age: 0, currentPage: 1 });
    },

    renderPageNumbers: (pages: number, currentPage: number) => {
        if (pages <= 5) {
            return Array(pages).fill(0).map((_, i) => i + 1);
        }

        const isNearStart = currentPage <= 3;
        const isNearEnd = currentPage >= pages - 2;

        const startPages = isNearStart ? Array(3).fill(0).map((_, i) => i + 1) : [1, 2, '...'];
        const middlePages = isNearStart || isNearEnd ? [] : [currentPage - 1, currentPage, currentPage + 1];
        const endPages = isNearEnd ? Array(3).fill(0).map((_, i) => pages - 2 + i) : ['...', pages - 1, pages];

        return [...startPages, ...middlePages, ...endPages];
    },
}));