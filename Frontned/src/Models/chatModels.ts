export interface ChatModels{
    to :string,
    from :string,
    message : string,
    name? : string,
    customer? : string
}

export interface chatRoommodels{
    firstUserId : string,
    secondUserId : string,
    messages : string[],
    chatId : string,
    chatName : string,
    customer : string,
}