const findOneReturnValue = (params) => {
    return Promise.resolve({
        id: 1,
        email: 'saefulloh@email.com',
        password: '$2a$10$uB4ipw1ncbt.7UQnmK6fI.uiMFuetpoSr7GvalDbcU98ms6DbLQl2'
    })
}

const findOneReturnNull = (params) => {
    return Promise.resolve(null)
}

module.exports = {
    findOneReturnNull, findOneReturnValue
}