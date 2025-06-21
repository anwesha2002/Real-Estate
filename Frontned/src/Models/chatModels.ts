export interface ChatModels{
    to :string,
    from :string,
    message : string,
    name? : string,
    customer? : string,
    propertyImage? : string
}

export interface ChatRoommodels{
    firstUserId : string,
    secondUserId : string,
    unReadCount : number,
    lastMessage : {
        from : string
    },
    chatId : string,
    chatName : string,
    customer : string,
}