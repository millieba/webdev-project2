import { atom } from 'recoil';

export const gitlabRepoState = atom({
    key: 'gitlabRepo',
    // TODO: Siden vil ikke loade om denne ikke linker til en "valid" adresse - må skrive feilhåndtering så denne kan være null
    default: 'https://gitlab.stud.idi.ntnu.no/api/v4/projects/17534/repository/commits',
});

export const accessTokenState = atom({
    key: 'accessToken',
    default: '0',
});