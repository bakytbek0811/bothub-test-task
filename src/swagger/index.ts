export const swaggerDocument = {
    openapi: '3.0.0',
    info: {
        title: 'Library API',
        version: '1.0.0',
        description: 'A simple API for managing a collection of books and users',
    },
    servers: [
        {
            url: 'http://localhost:3000',
            description: 'Development server',
        },
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
            },
        },
        schemas: {
            Book: {
                type: 'object',
                properties: {
                    id: { type: 'string' },
                    title: { type: 'string' },
                    author: { type: 'string' },
                    publicationDate: { type: 'string', format: 'date' },
                    genres: { type: 'array', items: { type: 'string' } },
                },
            },
            User: {
                type: 'object',
                properties: {
                    id: { type: 'string' },
                    username: { type: 'string' },
                    email: { type: 'string', format: 'email' },
                    role: { type: 'integer' },
                },
            },
            RegisterUser: {
                type: 'object',
                properties: {
                    username: { type: 'string' },
                    password: { type: 'string' },
                    email: { type: 'string', format: 'email' },
                },
                required: ['username', 'password', 'email'],
            },
            LoginUser: {
                type: 'object',
                properties: {
                    username: { type: 'string' },
                    password: { type: 'string' },
                },
                required: ['username', 'password'],
            },
            UpdateRole: {
                type: 'object',
                properties: {
                    role: { type: 'integer' },
                },
                required: ['role'],
            },
        },
    },
    security: [
        {
            bearerAuth: [],
        },
    ],
    tags: [
        {
            name: 'Books',
            description: 'API for books in the library',
        },
        {
            name: 'Users',
            description: 'API for managing users and their roles',
        },
    ],
    paths: {
        '/books': {
            post: {
                tags: ['Books'],
                summary: 'Add a new book',
                security: [
                    {
                        bearerAuth: [],
                    },
                ],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    title: { type: 'string' },
                                    author: { type: 'string' },
                                    publicationDate: { type: 'string', format: 'date' },
                                    genres: { type: 'array', items: { type: 'string' } },
                                },
                                required: ['title', 'author', 'publicationDate', 'genres'],
                            },
                        },
                    },
                },
                responses: {
                    201: {
                        description: 'The added book',
                    },
                },
            },
            get: {
                tags: ['Books'],
                summary: 'Get the list of all books',
                responses: {
                    200: {
                        description: 'The list of books',
                    },
                },
            },
        },
        '/books/{id}': {
            get: {
                tags: ['Books'],
                summary: 'Get a book by ID',
                parameters: [
                    {
                        in: 'path',
                        name: 'id',
                        required: true,
                        schema: {
                            type: 'string',
                        },
                    },
                ],
                responses: {
                    200: {
                        description: 'The book data',
                    },
                    404: {
                        description: 'Book not found',
                    },
                },
            },
            put: {
                tags: ['Books'],
                summary: 'Update a book by ID',
                security: [
                    {
                        bearerAuth: [],
                    },
                ],
                parameters: [
                    {
                        in: 'path',
                        name: 'id',
                        required: true,
                        schema: {
                            type: 'string',
                        },
                    },
                ],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    title: { type: 'string' },
                                    author: { type: 'string' },
                                    publicationDate: { type: 'string', format: 'date' },
                                    genres: { type: 'array', items: { type: 'string' } },
                                },
                                required: ['title', 'author', 'publicationDate', 'genres'],
                            },
                        },
                    },
                },
                responses: {
                    200: {
                        description: 'The updated book',
                    },
                    404: {
                        description: 'Book not found',
                    },
                },
            },
            delete: {
                tags: ['Books'],
                summary: 'Delete a book by ID',
                security: [
                    {
                        bearerAuth: [],
                    },
                ],
                parameters: [
                    {
                        in: 'path',
                        name: 'id',
                        required: true,
                        schema: {
                            type: 'string',
                        },
                    },
                ],
                responses: {
                    204: {
                        description: 'Book deleted',
                    },
                    404: {
                        description: 'Book not found',
                    },
                },
            },
        },
        '/users/register': {
            post: {
                tags: ['Users'],
                summary: 'Register a new user',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    username: { type: 'string' },
                                    password: { type: 'string' },
                                    email: { type: 'string', format: 'email' },
                                },
                                required: ['username', 'password', 'email'],
                            },
                        },
                    },
                },
                responses: {
                    201: {
                        description: 'The registered user',
                    },
                },
            },
        },
        '/users/login': {
            post: {
                tags: ['Users'],
                summary: 'Authenticate a user',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    username: { type: 'string' },
                                    password: { type: 'string' },
                                },
                                required: ['username', 'password'],
                            },
                        },
                    },
                },
                responses: {
                    200: {
                        description: 'JWT token',
                    },
                },
            },
        },
        '/users/me': {
            get: {
                tags: ['Users'],
                summary: 'Get current user info',
                security: [
                    {
                        bearerAuth: [],
                    },
                ],
                responses: {
                    200: {
                        description: 'The current user info',
                    },
                },
            },
        },
        '/users/{id}/role': {
            put: {
                tags: ['Users'],
                summary: 'Update user role by ID',
                security: [
                    {
                        bearerAuth: [],
                    },
                ],
                parameters: [
                    {
                        in: 'path',
                        name: 'id',
                        required: true,
                        schema: {
                            type: 'string',
                        },
                    },
                ],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    role: { type: 'integer' },
                                },
                                required: ['role'],
                            },
                        },
                    },
                },
                responses: {
                    200: {
                        description: 'The updated user role',
                    },
                },
            },
        },
    },
};
