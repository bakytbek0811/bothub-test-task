import { Serializer } from 'jsonapi-serializer';

const UserSerializer = new Serializer('users', {
    keyForAttribute: 'camelCase',
    attributes: ['username', 'email', 'role'],
});
const BookSerializer = new Serializer('books', {
    keyForAttribute: 'camelCase',
    attributes: ['title', 'author', 'publicationDate', 'genres'],
});

export const serializeJson = <T>(serializer: 'USER' | 'BOOK', data: T) => {
    if (serializer === 'USER') return UserSerializer.serialize(data);
    if (serializer === 'BOOK') return BookSerializer.serialize(data);

    return data;
};
