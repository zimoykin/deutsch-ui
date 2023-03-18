import { MessageType } from '@/types/message-types.type';

export const speaker = (topic?: MessageType) => {
    if (topic === 'networkError') {
        return '🤖';
    }
    if (topic === 'error') {
        return Math.random() > 0.5 ? '🚒' : '🚑';
    }
    if (topic === 'success') {
        return Math.random() > 0.5 ? '🚀' : '🌈';
    }
    if (topic === 'info') {
        return '📯';
    }
    return Math.random() > 0.5 ? '🦖 ' : '🦄 ';
};
