import { faker } from '@faker-js/faker';

export const posts = [...Array(9)].map((_, index) => ({
    id: faker.datatype.uuid(),
    cover: `/static/mock-images/covers/cover_${index + 2}.jpg`,
    title: ["A3 Company","B5 Company","C8 Company","D4 Company","E7 Company","F6 Company","N9 Company","Z0 Company","L2 Company"][index],
    createdAt: faker.date.past(),
    createdAtb: faker.date.past(),
    lisance: [
    [["04.02.2022","08.03.2022","AAC"],["05.02.2022","09.03.2022","AAF"]],
    [["05.02.2022","09.03.2022","AAD"]],
    [["06.02.2022","06.03.2022","MIT"]],
    [["07.02.2022","04.05.2022","AAE"]],
    [["08.02.2022","05.07.2022","MIT"]],
    [["09.02.2022","03.08.2022","AAF"]],
    [["01.02.2022","01.09.2022","BBA"]],
    [["02.02.2022","05.03.2022","KLM"]],
    [["04.02.2022","04.03.2022","AAB"]]][index],

    total:[
    {a:718,b:1.55,c:1.23,d:125},
    {a:618,b:1.75,c:1.93,d:674},
    {a:712,b:1.45,c:1.45,d:135},
    {a:318,b:1.95,c:1.84,d:144},
    {a:711,b:1.02,c:1.86,d:365},
    {a:918,b:1.01,c:1.03,d:210},
    {a:714,b:1.76,c:1.91,d:155},
    {a:798,b:1.65,c:1.23,d:187},
    {a:743,b:1.41,c:1.43,d:144}][index],
    users:[ "thomas"],
    author: {
      name: faker.name.findName(),
      avatarUrl: `/static/mock-images/avatars/avatar_${index + 2}.jpg`,
    },
  }));
