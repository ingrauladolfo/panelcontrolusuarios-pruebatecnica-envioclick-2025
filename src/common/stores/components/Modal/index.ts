import type { SendMessageState } from '@/common/interfaces';
import type { Message, MessagesMap } from '@/common/interfaces/stores/components/Modal';
import { create } from 'zustand';




const loadFromStorage = (): MessagesMap => {
    try {
        const raw = localStorage.getItem('userMessages') || localStorage.getItem('messages') || '[]';
        const parsed = JSON.parse(raw);
        // support two formats:
        // 1) object map: { uuid: [{...}, ...], ... }
        // 2) array: [{ userId, title, content, date }, ...]
        if (Array.isArray(parsed)) {
            const map: MessagesMap = {};
            parsed.forEach((m: any) => {
                const uid = String(m.userId ?? m.user?.id ?? '').trim();
                if (!uid) return;
                map[uid] = map[uid] || [];
                map[uid].push({
                    title: m.title ?? '',
                    content: m.content ?? '',
                    date: m.date ? new Date(m.date).toISOString() : new Date().toISOString(),
                });
            });
            return map;
        }
        if (parsed && typeof parsed === 'object') {
            // normalize dates
            const map: MessagesMap = {};
            Object.entries(parsed).forEach(([k, v]) => {
                if (Array.isArray(v)) {
                    map[k] = v.map((m: any) => ({
                        title: m.title ?? '',
                        content: m.content ?? '',
                        date: m.date ? new Date(m.date).toISOString() : new Date().toISOString(),
                    }));
                }
            });
            return map;
        }
    } catch (err) {
        console.warn('loadFromStorage userMessages parse error', err);
    }
    return {};
};

const saveToStorage = (messages: MessagesMap) => {
    try {
        localStorage.setItem('userMessages', JSON.stringify(messages));
    } catch (err) {
        console.error('saveToStorage userMessages error', err);
    }
};

export const useSendMessageStore = create<SendMessageState>((set, get) => ({
    messages: loadFromStorage(),

    sendMessage: (userId: string, message: Message) => {
        if (!userId) return;
        const messages = { ...(get().messages || {}) };
        messages[userId] = messages[userId] || [];
        // ensure message has ISO date
        const msg: Message = {
            title: message.title ?? '',
            content: message.content ?? '',
            date: message.date ? new Date(message.date).toISOString() : new Date().toISOString(),
        };
        messages[userId].push(msg);
        set({ messages });
        saveToStorage(messages);
    },

    getMessages: (userId: string) => {
        const messages = get().messages || {};
        return Array.isArray(messages[userId]) ? messages[userId].slice().sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()) : [];
    },

    setMessagesForUser: (userId: string, msgs: Message[]) => {
        const messages = { ...(get().messages || {}) };
        messages[userId] = (msgs || []).map(m => ({
            title: m.title ?? '',
            content: m.content ?? '',
            date: m.date ? new Date(m.date).toISOString() : new Date().toISOString(),
        }));
        set({ messages });
        saveToStorage(messages);
    },
}));
