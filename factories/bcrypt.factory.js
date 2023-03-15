const mockBcryptReturnTrue = {
    compare: jest.fn().mockImplementation((plainText, hashText) => Promise.resolve(true))
}

const mockBcryptReturnFalse = {
    compare: jest.fn().mockImplementation((plainText, hashText) => Promise.resolve(false))
}

module.exports = {
    mockBcryptReturnTrue,
    mockBcryptReturnFalse
}