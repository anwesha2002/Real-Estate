export interface ChatModels{
    to :string,
    from :string,
    message : string,
    name? : string,
    customer? : string,
    propertyImage? : string
}

export interface ChatRoommodels{
    firstUserId? : {
        avatar : string | undefined,
        name : string | undefined,
        _id : string | undefined
    } | undefined,
    secondUserId? : {
        avatar : string | undefined,
        name : string | undefined,
        _id : string | undefined
    } | undefined,
    unReadCount : number ,
    lastMessage? : {
        from : string | undefined,
        to : string | undefined,
        _id : string | undefined,
    } | undefined,
    chatId? : string | undefined,
    chatName? : string | undefined,
    customer? : string | undefined,

}