const user = {
    _id: '1',
    name: 'Tanya',
    email: 'tanya@test.com',
    picture: 'https://cloudinary.com/asdf'
}
module.exports = {
    Query: {
        me: () => user
    }
}