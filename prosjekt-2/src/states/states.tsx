import { atom } from 'recoil';

export const gitlabRepoState = atom({
    key: 'gitlabRepo',
    default: '0',
});

export const accessTokenState = atom({
    key: 'accessToken',
    default: '0',
});